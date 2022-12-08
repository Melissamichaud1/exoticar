from django.urls import path

from .views import api_customer, api_list_customers, api_salesman, api_list_salesman, api_list_sales

urlpatterns = [
    path("customers/", api_list_customers, name="api_list_customers"),
    path("customers/<int:id>/", api_customer, name="api_customer"),
    path("salesmen/", api_list_salesman, name="api_list_salesman"),
    path("salesman/<int:employee_id>/", api_salesman, name="api_salesman"),
    path("sales/", api_list_sales, name="api_list_sales"),
]
