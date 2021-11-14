from django.core.management.base import BaseCommand

from notes.models import Project, Note


class Command(BaseCommand):
    """ Команда создает новые проекты и заметки в базе данных.
    Первый аргумент - количество проектов, второй аргумент - начальный номер проекта,
    третий аргумент - количество заметок, четвертый аргумент - начальный номер заметки"""

    def add_arguments(self, parser):
        parser.add_argument('projects', type=int, help="projects count")
        parser.add_argument('first_p', type=int, help="first project number")
        parser.add_argument('notes', type=int, help="project_notes count")
        parser.add_argument('first_n', type=int, help="first note number")

    def handle(self, *args, **options):
        projects = options['projects']
        first_p = options['first_p']
        notes = options['notes']
        first_n = options['first_n']

        for i in range(projects + 1):
            new_project = Project.objects.create(
                name=f"test project {first_p}",
                repo='https://github.com/Lajilit/project_drf',
            )
            first_p += 1
            new_project.users.set([1, 2, 3])
            new_project.save()
            for i in range(notes + 1):
                new_note = Note.objects.create(
                    name=f'Test note {first_n}',
                    text=f'Test note {first_n} text',
                    user=new_project.users.first(),
                    project=new_project
                )
                first_n += 1
