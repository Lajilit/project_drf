from django.db import models

# Create your models here.
from users.models import CustomUser


class Project(models.Model):
    name = models.CharField(
        verbose_name='Название проекта',
        max_length=128
    )
    repo = models.URLField(
        verbose_name='Ссылка на репозиторий'
    )
    users = models.ManyToManyField(
        CustomUser,
        verbose_name='Пользователи проекта')

    class Meta:
        verbose_name = 'проект'
        verbose_name_plural = 'проекты'
        ordering = ['pk']

    def __str__(self):
        return f'{self.name}'


class Note(models.Model):
    name = models.CharField(
        max_length=128,
        verbose_name='Заголовок'
    )
    project = models.ForeignKey(
        Project,
        models.CASCADE,
        related_name='project_notes',
        verbose_name='Project'
    )
    user = models.ForeignKey(
        CustomUser,
        models.PROTECT,
        related_name='user_notes',
        verbose_name='User'
    )
    create_date = models.DateTimeField(
        auto_now_add=True,
        verbose_name='Дата создания'
    )
    update_date = models.DateTimeField(
        auto_now=True,
        verbose_name='Дата изменения'
    )
    text = models.TextField(
        verbose_name='Текст заметки'
    )
    is_active = models.BooleanField(
        default=True,
        verbose_name='Статус активности'
    )

    class Meta:
        verbose_name = 'заметка'
        verbose_name_plural = 'заметки'
        ordering = ['pk']

    def __str__(self):
        return f'{self.project.name}: ({self.name})'
