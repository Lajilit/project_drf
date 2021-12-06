import graphene
from graphene_django import DjangoObjectType

from notes.models import Project, Note
from users.models import CustomUser


class UserType(DjangoObjectType):
    class Meta:
        model = CustomUser
        fields = [
            'id',
            'username',
            'first_name',
            'last_name',
            'email'
        ]


class ProjectType(DjangoObjectType):
    class Meta:
        model = Project
        fields = '__all__'


class NoteType(DjangoObjectType):
    class Meta:
        model = Note
        fields = '__all__'


class Query(graphene.ObjectType):
    all_projects = graphene.List(ProjectType)
    all_notes = graphene.List(NoteType)
    all_users = graphene.List(UserType)

    def resolve_all_projects(root, info):
        return Project.objects.all()

    def resolve_all_notes(root, info):
        return Note.objects.all()

    def resolve_all_users(root, info):
        return CustomUser.objects.all()


schema = graphene.Schema(query=Query)
