from mixer.backend.django import mixer
from django.contrib.auth import get_user_model
from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIRequestFactory, force_authenticate, APIClient, APITestCase

from users.models import CustomUser
from .models import Project, Note
from .views import ProjectModelViewSet


class TestProjectViewSet(TestCase):

    def setUp(self):
        self.test_superuser = get_user_model().objects.create_superuser(
            'django', 'django@gb.local', '12345'
        )
        self.test_users = []
        for i in range(5):
            self.test_users.append(get_user_model().objects.create_user(
                f'test_user_{i}',
                f'test_email_{i}@mail.ru',
                '12345',
                first_name=f'Firstname {i}',
                last_name=f"Lastname {i}"
            ))
        self.projects_url = '/api/projects/'
        self.test_project_data = {
            'name': 'test project 1',
            'repo': 'https://github.com/Lajilit/project_drf'
        }
        self.test_project_users = [user.id for user in CustomUser.objects.filter(pk__lte=3)]
        self.test_project = {
            'users': self.test_project_users,
            'name': self.test_project_data['name'],
            'repo': self.test_project_data['repo']
        }
        self.test_project_data_updated = {
            'users': [user.id for user in CustomUser.objects.filter(pk__lte=2)],
            'name': 'project_updated',
            'repo': 'https://github.com/Lajilit/project_drf_updated'
        }

    def test_get_projects_list_guest(self):
        factory = APIRequestFactory()
        request = factory.get(self.projects_url)
        view = ProjectModelViewSet.as_view({'get': 'list'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_get_projects_list_authenticated(self):
        factory = APIRequestFactory()
        request = factory.get(self.projects_url)
        force_authenticate(request, user=self.test_users[0])
        view = ProjectModelViewSet.as_view({'get': 'list'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_project_guest(self):
        factory = APIRequestFactory()
        request = factory.post(
            self.projects_url,
            self.test_project,
            format='json'
        )
        view = ProjectModelViewSet.as_view({'post': 'create'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_create_project_authenticated(self):
        factory = APIRequestFactory()
        request = factory.post(
            self.projects_url,
            self.test_project,
            format='json'
        )
        force_authenticate(request, user=self.test_superuser)
        view = ProjectModelViewSet.as_view({'post': 'create'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_get_project_detail_guest(self):
        project = Project.objects.create(**self.test_project_data)
        project.users.set(self.test_project_users)
        client = APIClient()
        response = client.get(f'{self.projects_url}{project.id}/')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_get_project_detail_authenticated(self):
        project = Project.objects.create(**self.test_project_data)
        project.users.set(self.test_project_users)
        client = APIClient()
        client.force_authenticate(user=self.test_users[0])
        response = client.get(f'{self.projects_url}{project.id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_edit_project_guest(self):
        project = Project.objects.create(**self.test_project_data)
        project.users.set(self.test_project_users)

        client = APIClient()
        response = client.put(f'{self.projects_url}{project.id}/', self.test_project_data_updated)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        client.logout()

    def test_edit_project_authenticated(self):
        project = Project.objects.create(**self.test_project_data)
        project.users.set(self.test_project_users)

        client = APIClient()
        client.login(username='django', password='12345')
        response = client.put(f'{self.projects_url}{project.id}/', self.test_project_data_updated)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        project = Project.objects.get(id=project.id)
        project_users = CustomUser.objects.filter(project__id=project.id)
        project_users_id = [user.id for user in project_users]

        self.assertEqual(project.name, self.test_project_data_updated['name'])
        self.assertEqual(project.repo, self.test_project_data_updated['repo'])
        self.assertEqual(project_users_id, self.test_project_data_updated['users'])
        client.logout()


class TestNoteViewSet(APITestCase):

    def setUp(self):
        self.test_superuser = get_user_model().objects.create_superuser(
            'django', 'django@gb.local', '12345'
        )
        self.test_users = []
        for i in range(5):
            self.test_users.append(get_user_model().objects.create_user(
                f'test_user_{i}',
                f'test_email_{i}@mail.ru',
                '12345',
                first_name=f'Firstname {i}',
                last_name=f"Lastname {i}"
            ))
        self.notes_url = '/api/notes/'

    def test_get_notes_list_guest(self):
        response = self.client.get(self.notes_url)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_get_notes_list_authenticated(self):
        self.client.login(username='django', password='12345')
        response = self.client.get(self.notes_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_edit_note_without_mixer(self):
        self.client.force_login(user=self.test_superuser)
        test_project_data = {
                    'name': 'test project 1',
                    'repo': 'https://github.com/Lajilit/project_drf'
                }
        test_project_users = [user.id for user in CustomUser.objects.filter(pk__gte=3)]
        project = Project.objects.create(**test_project_data)
        project.users.set(test_project_users)
        user = CustomUser.objects.get(id=project.users.first().id)
        note = Note.objects.create(name='Test_note', user=user, project=project, text='text')

        test_note_data_updated = {
            'name': 'test note updated',
            'user': user.id,
            'project': project.id,
            'text': 'text updated'
        }

        response = self.client.put(f'{self.notes_url}{note.id}/', test_note_data_updated)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        note_updated = Note.objects.get(id=note.id)
        self.assertEqual(note_updated.name, 'test note updated')
        self.assertEqual(note_updated.text, 'text updated')

    def test_note_edit_mixer(self):
        self.client.force_login(user=self.test_superuser)
        note = mixer.blend(Note, project__users=[user.id for user in CustomUser.objects.filter(pk__gte=3)])

        test_note_data_updated = {
            'name': 'test note updated',
            'user': note.user.id,
            'project': note.project.id,
            'text': 'text updated'
        }
        response = self.client.put(f'{self.notes_url}{note.id}/', test_note_data_updated)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        note_updated = Note.objects.get(id=note.id)
        self.assertEqual(note_updated.name, 'test note updated')
        self.assertEqual(note_updated.text, 'text updated')
