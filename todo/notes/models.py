from django.db import models

# Create your models here.
from users.models import CustomUser


class Project(models.Model):
    name = models.CharField('Название проекта', max_length=128)
    url = models.URLField('Ссылка на репозиторий')
    users = models.ManyToManyField(CustomUser)

    def __str__(self):
        return self.name


class Note(models.Model):
    name = models.CharField('Заголовок', max_length=128)
    project = models.ForeignKey(Project, models.CASCADE)
    author = models.ForeignKey(CustomUser, models.PROTECT)
    create_date = models.DateTimeField('Заметка создана', auto_now_add=True)
    update_date = models.DateTimeField('Заметка обновлена', auto_now=True)
    text = models.TextField('Текст заметки')
    closed = models.BooleanField('Выполнено', default=False)

    def __str__(self):
        return f'{self.project.name}: ({self.name})'
