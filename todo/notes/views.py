from rest_framework.pagination import LimitOffsetPagination
from rest_framework.viewsets import ModelViewSet

from .models import Project, Note
from .serializers import ProjectModelSerializer, NoteModelSerializer


class ProjectLimitOffsetPagination(LimitOffsetPagination):
    default_limit = 10


class ProjectModelViewSet(ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectModelSerializer
    pagination_class = ProjectLimitOffsetPagination


class NoteLimitOffsetPagination(LimitOffsetPagination):
    default_limit = 20


class NoteModelViewSet(ModelViewSet):
    queryset = Note.objects.all()
    serializer_class = NoteModelSerializer
    pagination_class = NoteLimitOffsetPagination

    def destroy(self, request, *args, **kwargs):
        note = self.get_object()  # deleting note
        note.closed = True
        note.save()
        return super(NoteModelViewSet, self).destroy(request, *args, **kwargs)
