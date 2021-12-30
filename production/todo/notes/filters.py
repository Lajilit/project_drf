from django_filters import rest_framework as filters
from django_filters.widgets import RangeWidget

from notes.models import Project, Note


class ProjectFilter(filters.FilterSet):
    name = filters.CharFilter(
        field_name='name',
        label='Project name contains:',
        lookup_expr='contains')

    class Meta:
        model = Project
        fields = []


class NoteFilter(filters.FilterSet):
    project = filters.ModelChoiceFilter(
        label='Note for project:',
        queryset=Project.objects.all())
    create_date = filters.DateFromToRangeFilter(
        field_name='create_date',
        label='Created date from-to:',
        widget=RangeWidget(attrs={'class': 'datepicker', 'type': 'date'})
    )

    class Meta:
        model = Note
        fields = []
