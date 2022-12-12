from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json

from .encoders import (
    SalesmanEncoder,
    SaleEncoder,
    CustomerEncoder,
    AutomobileVOEncoder
)
from .models import Sale, Salesman, Customer, AutomobileVO


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


@require_http_methods(["GET", "PUT", "DELETE"])
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
    elif request.method == "GET":
            salesman = Salesman.objects.get(id=employee_id)
            return JsonResponse(
                salesman,
                encoder=SalesmanEncoder,
                safe=False,
            )
    else:
        content = json.loads(request.body)
        Salesman.objects.filter(employee_id=employee_id).update(**content)
        salesman = Salesman.objects.get(id=employee_id)
        return JsonResponse(
            salesman,
            encoder=SalesmanEncoder,
            safe=False,
        )



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


@require_http_methods(["GET", "PUT", "DELETE"])
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
    elif request.method == "GET":
        customer = Customer.objects.get(id=id)
        return JsonResponse(
            customer,
            encoder=CustomerEncoder,
            safe=False,
        )
    else:
        content = json.loads(request.body)
        Customer.objects.filter(id=id).update(**content)
        customer = Customer.objects.get(id=id)
        return JsonResponse(
            customer,
            encoder=CustomerEncoder,
            safe=False,
        )


@require_http_methods(["GET", "POST"])
def api_list_sales(request):
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
            salesman = Salesman.objects.get(employee_id=salesman)
            content["salesman"] = salesman
        except Salesman.DoesNotExist:
            response = JsonResponse(
                {"message": "Salesman isn't a salesman here"}
            )
            response.status_code = 400
            return response
        try:
            vin = content["auto"]
            auto = AutomobileVO.objects.get(vin=vin)
            content["auto"] = auto
        except AutomobileVO.DoesNotExist:
            response = JsonResponse(
                {"message": "Could not add sale, doesn't match inventory"},
            )
            response.status_code = 400
            return response

        sale = Sale.objects.create(**content)
        return JsonResponse(
            sale,
            encoder=SaleEncoder,
            safe=False,
            )


@require_http_methods(["GET"])
def api_list_for_sale(request):
    if request.method == "GET":
        autos = AutomobileVO.objects.filter(sales__isnull=True)
        return JsonResponse(
            {"autos": autos},
            encoder=AutomobileVOEncoder,
            safe=False,
        )
