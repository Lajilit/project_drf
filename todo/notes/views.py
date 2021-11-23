from rest_framework.pagination import LimitOffsetPagination
from rest_framework.viewsets import ModelViewSet

from .filters import ProjectFilter, NoteFilter
from .models import Project, Note
from .serializers import ProjectModelSerializer, NoteModelSerializer, ProjectModelGetSerializer, NoteModelGetSerializer


class ProjectLimitOffsetPagination(LimitOffsetPagination):
    default_limit = 10


class ProjectModelViewSet(ModelViewSet):
    queryset = Project.objects.all()
    pagination_class = ProjectLimitOffsetPagination
    filterset_class = ProjectFilter

    def get_serializer_class(self):
        if self.request.method in ['GET']:
            return ProjectModelGetSerializer
        return ProjectModelSerializer


class NoteLimitOffsetPagination(LimitOffsetPagination):
    default_limit = 20


class NoteModelViewSet(ModelViewSet):
    queryset = Note.objects.all()
    pagination_class = NoteLimitOffsetPagination
    filterset_class = NoteFilter

    def get_serializer_class(self):
        if self.request.method in ['GET']:
            return NoteModelGetSerializer
        return NoteModelSerializer

    def destroy(self, request, *args, **kwargs):
        note = self.get_object()  # deleting note
        note.is_active = True
        note.save()
        return super(NoteModelViewSet, self).destroy(request, *args, **kwargs)
