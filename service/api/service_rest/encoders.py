
from .models import AutomobileVO, Service, Technician
from common.json import ModelEncoder

class AutomobileVOEncoder(ModelEncoder):
    model = AutomobileVO
    properties = ["color", "year", "vin", "import_href"]


class TechnicianListEncoder(ModelEncoder):
    model = Technician
    properties = ["name", "employee_number", "id"]

class TechnicianDetailEncoder(ModelEncoder):
    model = Technician
    properties = ["name", "employee_number", "id"]


class AppointmentListEncoder(ModelEncoder):
    model = Service
    properties = ["vin", "vehicle_owner", "date", "time", "technician", "reason", "id", "auto", "finished", "vip"]
    encoders = {
        "auto": AutomobileVOEncoder(),
        "technician": TechnicianDetailEncoder(),
    }

class AppointmentDetailEncoder(ModelEncoder):
    model = Service
    properties = ["vin", "vehicle_owner", "date", "time", "technician", "reason", "id", "auto", "finished", "vip"]
    encoders = {
        "auto": AutomobileVOEncoder(),
        "technician": TechnicianDetailEncoder(),
    }
