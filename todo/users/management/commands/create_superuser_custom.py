from django.core.management.base import BaseCommand
from users.models import CustomUser


class Command(BaseCommand):
    """ Команда создает Суперпользователя с заданными параметрами"""

    def handle(self, *args, **options):
        super_user = CustomUser.objects.create_superuser('lajil',
                                                         'lajilit@gmail.com',
                                                         '12345',
                                                         first_name='Ekaterina',
                                                         last_name='Vakhrusheva')
        print(f'Суперпользователь создан: {super_user.username}')
