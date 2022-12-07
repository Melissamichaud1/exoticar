from django.db import models
from django.urls import reverse

# Create your models here.

# Inventory -> models.py -> Automobile model
class AutomobileVO(models.Model):
    color = models.CharField(max_length=50)
    year = models.PositiveSmallIntegerField()
    vin = models.CharField(max_length=20)
    import_href = models.CharField(max_length=200, unique=True, null=True)


# Create a technician
class Technician(models.Model):
    name = models.CharField(max_length=50)
    employee_number = models.PositiveBigIntegerField(unique=True)

    def get_api_url(self):
        return reverse("api_technician", kwargs={"pk": self.pk})


# Represents user who wants to create a service appt
class Service(models.Model):
    vin = models.CharField(max_length=20)
    vehicle_owner = models.CharField(max_length=200)
    starts = models.DateTimeField()
    reason = models.CharField(max_length=200)
    finished = models.BooleanField(default=False)
    vip = models.BooleanField(default=False)

    auto = models.ForeignKey(
        AutomobileVO,
        related_name="services",
        on_delete=models.CASCADE,
    )

    technician = models.ForeignKey(
        Technician,
        related_name="technicians",
        on_delete=models.PROTECT,
    )

    def get_api_url(self):
        return reverse("api_service", kwargs={"pk": self.pk})
