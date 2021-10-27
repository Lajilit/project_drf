from rest_framework.serializers import HyperlinkedModelSerializer
from .models import CustomUser


class CustomUserModelSerializer(HyperlinkedModelSerializer):
   class Meta:
       model = CustomUser
       fields = [
           'firstname',
           'lastname',
           'email'
           ]