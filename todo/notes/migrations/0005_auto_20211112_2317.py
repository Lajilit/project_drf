# Generated by Django 3.2.8 on 2021-11-12 20:17

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('notes', '0004_auto_20211111_2337'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='note',
            options={'verbose_name': 'заметка', 'verbose_name_plural': 'заметки'},
        ),
        migrations.AlterModelOptions(
            name='project',
            options={'verbose_name': 'проект', 'verbose_name_plural': 'проекты'},
        ),
    ]
