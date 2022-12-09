from django.urls import path

from .views import api_list_appointments, api_show_appointments, api_list_technician, api_delete_technician, api_automobile

urlpatterns = [
    path("technicians/", api_list_technician, name="api_list_technician"),
    path("technicians/<int:id>/", api_delete_technician, name="api_delete_technician"),
    path("service/", api_list_appointments, name="api_list_appointments"),
    path("service/<int:id>/", api_show_appointments, name="api_show_appointments"),
    path("auto/", api_automobile, name="api_automobile")
]
