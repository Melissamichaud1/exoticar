from django.db import models

# Create your models here.
class Salesman(models.Model):
    name = models.CharField(max_length=50)
    employee_id = models.PositiveIntegerField(unique=True)
    sale = models.ForeignKey(
        "Sale",
        related_name="sales",
        on_delete=models.PROTECT,
    )
    def __str__(self):
        return self.name

class Customer(models.Model):
    name = models.CharField(max_length=50)
    address = models.CharField(max_length=50)
    phone_number = models.PositiveSmallIntegerField(min_length=7, max_length=15)

    def __str__(self):
        return self.name


class Sale(models.Model):
    price = models.PositiveIntegerField()
