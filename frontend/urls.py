from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name="index"),
    path('join', views.index, name="index"),
    path('create', views.index, name="index"),
    path('room/<str:roomCode>', views.index, name="index"),
]
