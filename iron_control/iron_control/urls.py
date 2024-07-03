from django.contrib import admin
from django.urls import path, include
from app_iron_control import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('app_iron_control.urls')),
    path('save-input/', views.save_input, name='save_input'),
    path('load-inputs/', views.load_inputs, name='load_inputs'),
]
