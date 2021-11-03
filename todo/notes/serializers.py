from rest_framework.relations import StringRelatedField
from rest_framework.serializers import HyperlinkedModelSerializer, \
    ModelSerializer

from users.models import CustomUser
from users.serializers import CustomUserModelSerializer
from .models import Project, Note


class ProjectModelSerializer(HyperlinkedModelSerializer):

    class Meta:
        model = Project
        fields = '__all__'


class NoteModelSerializer(HyperlinkedModelSerializer):

    class Meta:
        model = Note
        fields = '__all__'
