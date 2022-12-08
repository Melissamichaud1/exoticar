from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json

from .encoders import (
    SalesmanEncoder,
    SaleEncoder,
    CustomerEncoder,
    AutomobileVO
)
from .models import Sale, Salesman, Customer


@require_http_methods(["GET", "POST"])
def api_list_salesman(request):
    if request.method == "GET":
        salesman = Salesman.objects.all()
        return JsonResponse(
            {"salesman": salesman},
            encoder=SalesmanEncoder,
        )
    else:
        try:
            content = json.loads(request.body)
            salesman = Salesman.objects.create(**content)
            return JsonResponse(
                salesman,
                encoder=SalesmanEncoder,
                safe=False,
            )
        except:
            response = JsonResponse(
                {"message": "Could not add salesman"},
            )
            response.status_code = 400
            return response


@require_http_methods(["DELETE"])
def api_salesman(request, employee_id):
    if request.method == "DELETE":
        try:
            salesman = Salesman.objects.get(id=employee_id)
            salesman.delete()
            return JsonResponse(
                {"message": "Salesman deleted"},
                encoder=SalesmanEncoder,
                safe=False,
            )
        except Salesman.DoesNotExist:
            return JsonResponse({"message": "Salesman does not exist"})


@require_http_methods(["GET", "POST"])
def api_list_customers(request):
    if request.method == "GET":
        customers = Customer.objects.all()
        return JsonResponse(
            {"customers": customers},
            encoder=CustomerEncoder,
        )
    else:
        try:
            content = json.loads(request.body)
            customer = Customer.objects.create(**content)
            return JsonResponse(
                customer,
                encoder=CustomerEncoder,
                safe=False,
            )
        except:
            response = JsonResponse(
                {"message": "Could not add customer"},
            )
            response.status_code = 400
            return response


@require_http_methods(["DELETE"])
def api_customer(request, id):
    if request.method == "DELETE":
        try:
            customer = Customer.objects.get(id=id)
            customer.delete()
            return JsonResponse(
                {"message": "Customer deleted"},
                encoder=CustomerEncoder,
                safe=False,
            )
        except Customer.DoesNotExist:
            return JsonResponse({"message": "Customer does not exist"})


@require_http_methods(["GET", "POST"])
def api_list_sales(request, ):
    if request.method == "GET":
        sales = Sale.objects.all()
        return JsonResponse(
            {"sales": sales},
            encoder=SaleEncoder,
        )
    else:
        content = json.loads(request.body)

        try:
            customer = content["customer"]
            customer = Customer.objects.get(name=customer)
            content["customer"] = customer
        except Customer.DoesNotExist:
            response = JsonResponse(
                {"message": "Customer isn't a customer here"}
            )
            response.status_code = 400
            return response
        try:
            salesman = content["salesman"]
            salesman = Salesman.objects.get(name=salesman)
            content["salesman"] = salesman
        except Salesman.DoesNotExist:
            response = JsonResponse(
                {"message": "Salesman isn't a salesman here"}
            )
            response.status_code = 400
            return response
        try:
            auto_href = content["auto"]
            auto = AutomobileVO.objects.get(import_href=auto_href)
            content["auto"] = auto
            sale = Sale.objects.create(**content)
            return JsonResponse(
                sale,
                encoder=SaleEncoder,
                safe=False,
                )
        except AutomobileVO.DoesNotExist:
            response = JsonResponse(
                {"message": "Could not add sale, doesn't match inventory"},
            )
            response.status_code = 400
            return response
