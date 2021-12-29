from random import sample

from django.core.management.base import BaseCommand

from notes.models import Project, Note
from users.models import CustomUser


class Command(BaseCommand):
    """ Команда создает новые проекты и заметки в базе данных.
    Первый аргумент - количество проектов, второй аргумент - количество заметок для каждого проекта"""

    def handle(self, *args, **options):
        project_number = 1
        note_number = 1
        users = CustomUser.objects.all()

        for i in range(10):
            new_project = Project.objects.create(
                name=f"test project {project_number}",
                repo='https://github.com/Lajilit/project_drf',
            )
            project_number += 1
            all_users = [user.id for user in users]
            new_project.users.set(sample(all_users, 3))
            new_project.save()
            print(f'Проект создан: {new_project.name}')
            for _ in range(10):
                new_note = Note.objects.create(
                    name=f'Test note {note_number}',
                    text=f'Test note {note_number} text',
                    user=new_project.users.first(),
                    project=new_project
                )
                print(f'Заметка создана: {new_note.name}')
                note_number += 1
