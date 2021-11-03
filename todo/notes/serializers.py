from rest_framework.relations import StringRelatedField
from rest_framework.serializers import HyperlinkedModelSerializer

from users.serializers import CustomUserModelSerializer
from .models import Project, Note


class ProjectModelSerializer(HyperlinkedModelSerializer):
    users = StringRelatedField(many=True)
    class Meta:
       model = Project
       fields = '__all__'


class NoteModelSerializer(HyperlinkedModelSerializer):
   author = CustomUserModelSerializer()
   class Meta:
       model = Note
       fields = '__all__'