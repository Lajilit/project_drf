from django_filters import rest_framework as filters

from notes.models import Project, Note


class ProjectFilter(filters.FilterSet):
    name = filters.CharFilter(lookup_expr='contains')

    class Meta:
        model = Project
        fields = ['name']


class NoteDateFilter(filters.FilterSet):
    min_date = filters.DateTimeFilter(field_name='create_date',
                                      lookup_expr='gte',
                                      input_formats=[('%d.%m.%Y'),
                                                     ('%d-%m-%Y'),
                                                     ('%d/%m/%Y'),
                                                     ('%Y.%m.%d'),
                                                     ('%Y-%m-%d'),
                                                     ('%Y/%m/%d')]
                                      )
    max_date = filters.DateTimeFilter(field_name='create_date',
                                      lookup_expr='lt',
                                      input_formats=[('%d.%m.%Y'),
                                                     ('%d-%m-%Y'),
                                                     ('%d/%m/%Y'),
                                                     ('%Y.%m.%d'),
                                                     ('%Y-%m-%d'),
                                                     ('%Y/%m/%d')]
                                      )

    class Meta:
        model = Note
        fields = []
