from random import sample

from django.core.management.base import BaseCommand

from notes.models import Project, Note
from users.models import CustomUser


class Command(BaseCommand):
    """ Команда создает новые проекты и заметки в базе данных.
    Первый аргумент - количество проектов, второй аргумент - количество заметок для каждого проекта"""

    def add_arguments(self, parser):
        parser.add_argument('projects', type=int, help="projects count")
        parser.add_argument('notes', type=int, help="project_notes count")

    def handle(self, *args, **options):
        projects_count = options['projects']
        project_number = Project.objects.all().count() + 1
        project_notes_count = options['notes']
        note_number = Note.objects.all().count() + 1
        users_count = CustomUser.objects.all().count()

        for i in range(projects_count):
            new_project = Project.objects.create(
                name=f"test project {project_number}",
                repo='https://github.com/Lajilit/project_drf',
            )
            project_number += 1
            all_users = [i + 1 for i in range(users_count)]
            new_project.users.set(sample(all_users, 3))
            new_project.save()
            print(f'Проект создан: {new_project.name}')
            for _ in range(project_notes_count):
                new_note = Note.objects.create(
                    name=f'Test note {note_number}',
                    text=f'Test note {note_number} text',
                    user=new_project.users.first(),
                    project=new_project
                )
                print(f'Заметка создана: {new_note.name}')
                note_number += 1
