from django.contrib.auth import get_user_model
from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIRequestFactory, force_authenticate, APIClient

from users.models import CustomUser
from .models import Project
from .views import ProjectModelViewSet


class TestProjectViewSet(TestCase):

    def setUp(self):
        self.superuser = get_user_model().objects.create_superuser(
            'django', 'django@gb.local', '12345'
        )
        self.users = []
        for i in range(5):
            self.users.append(get_user_model().objects.create_user(
                f'test_user_{i}',
                f'test_email_{i}@mail.ru',
                '12345',
                first_name=f'Firstname {i}',
                last_name=f"Lastname {i}"
            ))
        self.project_users = CustomUser.objects.filter(pk__lte=3)
        self.project_data = {
            'users': [user.id for user in self.project_users],
            'name': 'test project 1',
            'repo': 'https://github.com/Lajilit/project_drf'
        }

    def test_get_list_guest(self):
        # 1 APIRequestFactory
        factory = APIRequestFactory()
        request = factory.get('/api/projects/')
        view = ProjectModelViewSet.as_view({'get': 'list'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_get_list_auth(self):
        # 2
        factory = APIRequestFactory()
        request = factory.get('/api/projects/')
        force_authenticate(request, user=self.users[0])
        view = ProjectModelViewSet.as_view({'get': 'list'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_guest(self):
        # 3
        factory = APIRequestFactory()
        request = factory.post(
            '/api/projects/',
            self.project_data,
            format='json'
        )
        view = ProjectModelViewSet.as_view({'post': 'create'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_create_admin(self):
        # 4
        factory = APIRequestFactory()
        request = factory.post(
            '/api/projects/',
            self.project_data,
            format='json'
        )
        force_authenticate(request, user=self.superuser)
        view = ProjectModelViewSet.as_view({'post': 'create'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_get_detail_guest(self):
        # 5. APIClient
        api_project_data = {
            'name': 'test project 1',
            'repo': 'https://github.com/Lajilit/project_drf'
        }
        project_users = CustomUser.objects.all()
        project = Project.objects.create(**api_project_data)
        project.users.set(project_users)
        client = APIClient()
        response = client.get(f'/api/projects/{project.id}/')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_get_detail_user(self):
        # 6. APIClient
        api_project_data = {
            'name': 'test project 1',
            'repo': 'https://github.com/Lajilit/project_drf'
        }
        project_users_queryset = CustomUser.objects.all()
        api_project = Project.objects.create(**api_project_data)
        api_project.users.set(project_users_queryset)
        client = APIClient()
        client.force_authenticate(user=self.users[0])
        response = client.get(f'/api/projects/{api_project.id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_edit_admin(self):
        # 7.
        project_users_queryset = CustomUser.objects.all()

        api_project_data = {
            'name': 'test project 1',
            'repo': 'https://github.com/Lajilit/project_drf'
        }

        api_project = Project.objects.create(**api_project_data)
        api_project.users.set(project_users_queryset)

        api_project_data_upd = self.project_data
        api_project_data_upd['name'] = 'project X'

        client = APIClient()
        client.login(username='django', password='12345')
        response = client.put(f'/api/projects/{api_project.id}/',
                              api_project_data_upd)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        project = Project.objects.get(id=api_project.id)
        project_users = CustomUser.objects.filter(project__id=api_project.id)
        project_users_id = [user.id for user in project_users]
        self.assertEqual(project.name, api_project_data_upd['name'])
        self.assertEqual(project.repo, api_project_data_upd['repo'])
        self.assertEqual(project_users_id, api_project_data_upd['users'])
        client.logout()
