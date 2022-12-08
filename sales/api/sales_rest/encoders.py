from common.json import ModelEncoder

from .models import Salesman, Sale, Customer, AutomobileVO

class SalesmanEncoder(ModelEncoder):
    model = Salesman
    properties = [
        "id",
        "name",
        "employee_id",
    ]

class CustomerEncoder(ModelEncoder):
    model = Customer
    properties = [
        "id",
        "name",
        "address",
        "phone_number",
    ]


class AutomobileVOEncoder(ModelEncoder):
    model = AutomobileVO
    properties = [
        "id",
        "color",
        "year",
        "vin",
        "import_href",
        "for_sale",
    ]

class SaleEncoder(ModelEncoder):
    model = Sale
    properties = [
        "id",
        "price",
        "customer",
        "salesman",
        "auto",
    ]
    encoders = {
        "customer": CustomerEncoder(),
        "salesman": SalesmanEncoder(),
        "auto": AutomobileVOEncoder(),
    }
