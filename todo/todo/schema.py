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

    project_by_id = graphene.Field(ProjectType, id=graphene.Int(required=True))
    user_by_id = graphene.Field(UserType, id=graphene.Int(required=True))

    project_users = graphene.List(UserType, id=graphene.Int(required=True))
    project_notes = graphene.List(NoteType, id=graphene.Int(required=True))

    user_projects = graphene.List(ProjectType, id=graphene.Int(required=True))
    user_notes = graphene.List(NoteType, id=graphene.Int(required=True))

    def resolve_all_projects(root, info):
        return Project.objects.all()

    def resolve_all_notes(root, info):
        return Note.objects.all()

    def resolve_all_users(root, info):
        return CustomUser.objects.all()

    def resolve_project_by_id(root, info, id):
        try:
            return Project.objects.get(id=id)
        except Project.DoesNotExist:
            return None

    def resolve_user_by_id(root, info, id):
        try:
            return CustomUser.objects.get(id=id)
        except CustomUser.DoesNotExist:
            return None

    def resolve_project_users(root, info, id):
        return CustomUser.objects.filter(project__id=id)

    def resolve_project_notes(root, info, id):
        return Note.objects.filter(project__id=id)

    def resolve_user_projects(root, info, id):
        return Project.objects.filter(users__id=id)

    def resolve_user_notes(root, info, id):
        return Note.objects.filter(user__id=id)


class ProjectNameMutation(graphene.Mutation):
    class Arguments:
        name = graphene.String(required=True)
        id = graphene.ID()

    project = graphene.Field(ProjectType)

    @classmethod
    def mutate(cls, root, info, name, id):
        project = Project.objects.get(id=id)
        project.name = name
        project.save()
        return ProjectNameMutation(project=project)


class Mutation(graphene.ObjectType):
    update_project_name = ProjectNameMutation.Field()


schema = graphene.Schema(query=Query, mutation=Mutation)
