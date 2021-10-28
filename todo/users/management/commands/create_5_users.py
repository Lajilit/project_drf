from django.core.management.base import BaseCommand
from users.models import CustomUser


class Command(BaseCommand):
    def handle(self, *args, **options):
        super_user = CustomUser.objects.create_superuser('lajil',
                                                         'lajilit@gmail.com',
                                                         '12345',
                                                         first_name=
                                                         'Ekaterina',
                                                         last_name='Vakhrusheva')
        users = [
            {
                "username": "test_1",
                "first_name": "Test",
                "last_name": "1",
                "email": "test_1@mail.ru"
            },
            {
                "username": "test_2",
                "first_name": "Test",
                "last_name": "2",
                "email": "test_2@mail.ru"
            },
            {
                "username": "test_3",
                "first_name": "Test",
                "last_name": "3",
                "email": "test_3@mail.ru"
            },
            {
                "username": "test_4",
                "first_name": "Test",
                "last_name": "4",
                "email": "test_4@mail.ru"
            },
            {
                "username": "test_5",
                "first_name": "Test",
                "last_name": "5",
                "email": "test_5@mail.ru"
            }

        ]

        for user in users:
            new_user = CustomUser.objects.create_user(
                user['username'],
                user['email'],
                '12345',
                first_name=user['first_name'],
                last_name=user['last_name']
            )
