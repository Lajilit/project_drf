from django.core.management.base import BaseCommand

from notes.models import Note, Project
from users.models import CustomUser


class Command(BaseCommand):
    """ Команда создает новых пользователей в базе данных."""

    def handle(self, *args, **options):
        Note.objects.all().delete()
        Project.objects.all().delete()
        CustomUser.objects.all().delete()
        super_user = CustomUser.objects.create_superuser('lajil',
                                                         'lajilit@gmail.com',
                                                         '12345',
                                                         first_name='Ekaterina',
                                                         last_name='Vakhrusheva')
        print(f'Суперпользователь создан: {super_user.username}')
        first = 1

        for i in range(10):
            new_user = CustomUser.objects.create_user(
                f'test_user_{first}',
                f'test_email_{first}@mail.ru',
                '12345',
                first_name=f'Firstname {first}',
                last_name=f"Lastname {first}"
            )
            print(f'Пользователь создан: {new_user.username}')
            first += 1
