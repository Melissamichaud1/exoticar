from django.db import models
from django.urls import reverse

# Create your models here.
class Salesman(models.Model):
    name = models.CharField(max_length=50)
    employee_id = models.PositiveIntegerField(unique=True)

    def __str__(self):
        return self.name

    def get_api_url(self):
        return reverse("api_vehicle_model", kwargs={"pk": self.employee_id})


class Customer(models.Model):
    name = models.CharField(max_length=50)
    address = models.CharField(max_length=50)
    phone_number = models.PositiveIntegerField()

    def __str__(self):
        return self.name

    def get_api_url(self):
        return reverse("api_customer", kwargs={"id": self.id})


class AutomobileVO(models.Model):
    color = models.CharField(max_length=50)
    year = models.PositiveSmallIntegerField()
    vin = models.CharField(max_length=17)
    # for_sale = models.BooleanField(default=True)
    import_href = models.CharField(max_length=200, null=True)


class Sale(models.Model):
    price = models.PositiveIntegerField()
    customer = models.ForeignKey(
        Customer,
        related_name="purchases",
        on_delete=models.PROTECT,
        )
    salesman = models.ForeignKey(
        Salesman,
        related_name="sales",
        on_delete=models.PROTECT,
        )
    auto = models.ForeignKey(
        AutomobileVO,
        related_name="sales",
        on_delete=models.PROTECT,
        )
