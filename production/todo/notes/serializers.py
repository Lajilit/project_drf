from rest_framework.serializers import ModelSerializer

from users.serializers import CustomUserModelSerializer
from .models import Project, Note


class ProjectModelSerializer(ModelSerializer):
    # users = CustomUserModelSerializer(many=True)

    class Meta:
        model = Project
        fields = '__all__'


class ProjectModelGetSerializer(ModelSerializer):
    users = CustomUserModelSerializer(many=True)

    class Meta:
        model = Project
        fields = '__all__'


class NoteModelSerializer(ModelSerializer):
    # project = ProjectModelSerializer()
    # user = CustomUserModelSerializer()

    class Meta:
        model = Note
        fields = '__all__'


class NoteModelGetSerializer(ModelSerializer):
    project = ProjectModelSerializer()
    user = CustomUserModelSerializer()

    class Meta:
        model = Note
        fields = '__all__'
