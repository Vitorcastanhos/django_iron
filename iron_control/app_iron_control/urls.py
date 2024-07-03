from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('save-input/', views.save_input, name='save_input'),
    path('load-inputs/', views.load_inputs, name='load_inputs'),
]
