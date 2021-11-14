from django.core.management.base import BaseCommand
from users.models import CustomUser


class Command(BaseCommand):
    """ Команда создает новых пользователей в базе данных."""

    def add_arguments(self, parser):
        parser.add_argument('count', type=int, help="users count")

    def handle(self, *args, **options):
        num = options['count']
        first = CustomUser.objects.all().count() + 1

        for i in range(num):
            new_user = CustomUser.objects.create_user(
                f'test_user_{first}',
                f'test_email_{first}@mail.ru',
                '12345',
                first_name=f'Firstname {first}',
                last_name=f"Lastname {first}"
            )
            first += 1
