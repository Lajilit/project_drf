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
            'email',
            'notes',
            'projects'
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

    project_by_id = graphene.Field(ProjectType, pk=graphene.Int(required=True))
    user_by_id = graphene.Field(UserType, pk=graphene.Int(required=True))

    project_users = graphene.List(UserType, pk=graphene.Int(required=True))
    project_notes = graphene.List(NoteType, pk=graphene.Int(required=True))

    user_projects = graphene.List(ProjectType, pk=graphene.Int(required=True))
    user_notes = graphene.List(NoteType, pk=graphene.Int(required=True))

    def resolve_all_projects(root, info):
        return Project.objects.all()

    def resolve_all_notes(root, info):
        return Note.objects.all()

    def resolve_all_users(root, info):
        return CustomUser.objects.all()

    def resolve_project_by_id(root, info, pk):
        try:
            return Project.objects.get(pk=pk)
        except Project.DoesNotExist:
            return None

    def resolve_user_by_id(root, info, pk):
        try:
            return CustomUser.objects.get(pk=pk)
        except CustomUser.DoesNotExist:
            return None

    def resolve_project_users(root, info, pk):
        return CustomUser.objects.filter(project__id=pk)

    def resolve_project_notes(root, info, pk):
        return Note.objects.filter(project__id=pk)

    def resolve_user_projects(root, info, pk):
        return Project.objects.filter(users__id=pk)

    def resolve_user_notes(root, info, pk):
        return Note.objects.filter(user__id=pk)


schema = graphene.Schema(query=Query)
