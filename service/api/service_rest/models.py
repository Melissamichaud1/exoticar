from django.db import models
from datetime import datetime


class AutomobileVO(models.Model):
    vin = models.CharField(max_length=20)


class Technician(models.Model):
    name = models.CharField(max_length=50)
    employee_number = models.PositiveBigIntegerField(unique=True)


class Service(models.Model):
    vin = models.CharField(max_length=20)
    vehicle_owner = models.CharField(max_length=200)
    date = models.DateField(default=datetime.now, blank=True)
    time = models.TimeField(default=datetime.now, blank=True)
    reason = models.CharField(max_length=200)
    finished = models.BooleanField(default=False)

    technician = models.ForeignKey(
        Technician,
        related_name="technicians",
        on_delete=models.PROTECT,
    )
