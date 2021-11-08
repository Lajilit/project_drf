from django.core.management.base import BaseCommand

from notes.models import Project, Note


class Command(BaseCommand):
    def handle(self, *args, **options):
        projects = [
            {
                "repo": "https://github.com/Lajilit/project_drf",
                "users": [1, 2, 4]
            },
            {
                "repo": "https://github.com/Lajilit/project_drf",
                "users": [2, 3, 4]
            },
            {
                "repo": "https://github.com/Lajilit/project_drf",
                "users": [5]
            },
            {
                "repo": "https://github.com/Lajilit/project_drf",
                "users": [2, 3]
            },
            {
                "repo": "https://github.com/Lajilit/project_drf",
                "users": [1, 3, 4]
            },
            {
                "repo": "https://github.com/Lajilit/project_drf",
                "users": [2, 3, 1]
            },
            {
                "repo": "https://github.com/Lajilit/project_drf",
                "users": [4]
            },
            {
                "repo": "https://github.com/Lajilit/project_drf",
                "users": [5, 3]
            },
            {
                "repo": "https://github.com/Lajilit/project_drf",
                "users": [1]
            },
            {
                "repo": "https://github.com/Lajilit/project_drf",
                "users": [1, 2, 3, 4, 5]
            }
        ]
        project_id = 0
        note_id = 0
        for project in projects:
            project_id += 1
            new_project = Project.objects.create(
                name=f"test project {project_id}",
                repo=project['repo'],
            )
            new_project.users.set(project['users'])
            new_project.save()
            for i in range(5):
                note_id += 1
                new_note = Note.objects.create(
                    name=f'Test note {note_id}',
                    text=f'Test note {note_id} text',
                    author=new_project.users.first(),
                    project=new_project
                )
