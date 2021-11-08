from rest_framework.viewsets import ModelViewSet

from .models import Project, Note
from .serializers import ProjectModelSerializer, NoteModelSerializer


class ProjectModelViewSet(ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectModelSerializer


class NoteModelViewSet(ModelViewSet):
    queryset = Note.objects.all()
    serializer_class = NoteModelSerializer

    def destroy(self, request, *args, **kwargs):
        note = self.get_object()  # deleting note
        note.closed = True
        note.save()
        return super(NoteModelViewSet, self).destroy(request, *args, **kwargs)
