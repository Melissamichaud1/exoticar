from .models import AutomobileVO, Service, Technician
from common.json import ModelEncoder


class AutomobileVOEncoder(ModelEncoder):
    model = AutomobileVO
    properties = ["vin"]


class TechnicianListEncoder(ModelEncoder):
    model = Technician
    properties = ["name", "employee_number", "id"]


class TechnicianDetailEncoder(ModelEncoder):
    model = Technician
    properties = ["name", "employee_number", "id"]


class AppointmentListEncoder(ModelEncoder):
    model = Service
    properties = [
        "vin",
        "vehicle_owner",
        "date",
        "time",
        "technician",
        "reason",
        "id",
        "finished",
    ]
    encoders = {
        "technician": TechnicianDetailEncoder(),
    }


class AppointmentDetailEncoder(ModelEncoder):
    model = Service
    properties = [
        "vin",
        "vehicle_owner",
        "date",
        "time",
        "technician",
        "reason",
        "id",
        "finished",
    ]
    encoders = {
        "technician": TechnicianDetailEncoder(),
    }
