from django.core.management.base import BaseCommand
from users.models import CustomUser


class Command(BaseCommand):
    """ Команда создает новых пользователей в базе данных.
    Первый аргумент - количество пользователей, второй аргумент - начальный номер пользователя"""

    def add_arguments(self, parser):
        parser.add_argument('count', type=int, help="users count", default=10)
        parser.add_argument('first', type=int, help="first user number")

    def handle(self, *args, **options):
        num = options['count']
        first = options['first']

        for i in range(first, num + first):
            new_user = CustomUser.objects.create_user(
                f'test_{i}',
                f'test_email_{i}@mail.ru',
                '12345',
                first_name=f'Firstname {i}',
                last_name=f"Lastname {i}"
            )
