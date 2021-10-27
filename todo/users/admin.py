from django.contrib import admin

from todo.users.models import CustomUser

admin.site.register(CustomUser)
