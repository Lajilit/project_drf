from django.contrib import admin

from notes.models import Project, Note

admin.site.register(Project)
admin.site.register(Note)
