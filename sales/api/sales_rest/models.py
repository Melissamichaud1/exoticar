from django.db import models
from django.urls import reverse

# Create your models here.
class Salesman(models.Model):
    name = models.CharField(max_length=50)
    employee_id = models.PositiveIntegerField(unique=True)

    def get_api_url(self):
        return reverse("api_salesman", kwargs={"pk": self.employee_id})


class Customer(models.Model):
    name = models.CharField(max_length=50)
    address = models.CharField(max_length=50)
    phone_number = models.PositiveIntegerField()

    def get_api_url(self):
        return reverse("api_customer", kwargs={"pk": self.id})


class AutomobileVO(models.Model):
    color = models.CharField(max_length=50)
    year = models.PositiveSmallIntegerField()
    vin = models.CharField(max_length=17)
    import_href = models.CharField(max_length=200, null=True)
    for_sale = models.BooleanField(default=True)

    def get_api_url(self):
        return reverse("api_automobile_vo", kwargs={"pk": self.id})


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

    def get_api_url(self):
        return reverse("api_sale", kwargs={"pk": self.id})
