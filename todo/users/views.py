from rest_framework.mixins import ListModelMixin, RetrieveModelMixin, \
    UpdateModelMixin
from rest_framework.viewsets import GenericViewSet

from .models import CustomUser
from .serializers import CustomUserModelSerializer


class CustomUserCustomViewSet(ListModelMixin, RetrieveModelMixin,
                              UpdateModelMixin, GenericViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserModelSerializer
