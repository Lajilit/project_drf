from rest_framework.mixins import ListModelMixin, RetrieveModelMixin, \
    UpdateModelMixin
from rest_framework.viewsets import GenericViewSet

from .models import CustomUser
from .serializers import CustomUserModelSerializer, CustomUserModelStaffSerializer


class CustomUserCustomViewSet(ListModelMixin, RetrieveModelMixin,
                              UpdateModelMixin, GenericViewSet):
    queryset = CustomUser.objects.all()

    def get_serializer_class(self):
        if self.request.version == '0.2' :
            return CustomUserModelStaffSerializer
        return CustomUserModelSerializer

