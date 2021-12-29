from django.urls import path, include
from rest_framework.routers import DefaultRouter

from users.views import CustomUserCustomViewSet

router = DefaultRouter()
router.register('users', CustomUserCustomViewSet)

app_name = 'users'
urlpatterns = [
    path('', include(router.urls)),
]