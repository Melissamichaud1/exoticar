from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json
from datetime import datetime

from .encoders import (
    AutomobileVOEncoder,
    TechnicianDetailEncoder,
    TechnicianListEncoder,
    AppointmentListEncoder,
    AppointmentDetailEncoder,
)

from .models import Technician, AutomobileVO, Service

@require_http_methods(["GET", "POST"])
def api_list_technician(request):
    if request.method == "GET":
        technicians = Technician.objects.all()
        return JsonResponse(
            {"technicians": technicians},
            encoder=TechnicianListEncoder,
        )
    # Create technician
    else:
        try:
            content = json.loads(request.body)
            technician = Technician.objects.create(**content)
            return JsonResponse(
                technician,
                encoder=TechnicianDetailEncoder,
                safe=False
            )
        except AutomobileVO.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid entry, try again."},
                status=400,
            )

@require_http_methods(["DELETE"])
def api_delete_technician(request, id):
    try:
        technician = Technician.objects.get(id=id)
        technician.delete()
        return JsonResponse(
            {'message': 'Technician was deleted successfully'},
            technician,
            encoder=TechnicianDetailEncoder,
            safe = False,
        )
    except Technician.DoesNotExist:
        return JsonResponse(
            {"message": 'The technician you are trying to delete does not exist'},
            status=400,
            )


@require_http_methods(["GET", "POST"])
def api_list_appointments(request, automobile_vo_id=None):
    if request.method == "GET":
        services = Service.objects.all()
        return JsonResponse(
            {"services": services},
            encoder=AppointmentListEncoder,
        )
    # Create service
    else:
        content = json.loads(request.body)
        # date = content["date"]
        # jsondate = datetime.fromisoformat(date)
        # content["date"] = jsondate
        try:
            auto_href = content["auto"]
            auto = AutomobileVO.objects.get(import_href=auto_href)
            content["auto"] = auto
        except AutomobileVO.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid automobile, try again!"}
            )
        try:
            technician = Technician.objects.get(employee_number=content["technician"])
            content["technician"]=technician
        except Technician.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid technician, try again!"}
            )
        service = Service.objects.create(**content)
        return JsonResponse(
            service,
            encoder=AppointmentDetailEncoder,
            safe=False,
        )


@require_http_methods(['PUT','DELETE'])
def api_show_appointments(request, id):
    if request.method == 'DELETE':
        try:
            service = Service.objects.get(id=id)
            service.delete()
            return JsonResponse(
                {'message': 'Appointment was deleted successfully'},
                service,
                encoder=AppointmentDetailEncoder,
                safe = False,
            )
        except Service.DoesNotExist:
            return JsonResponse({"message": 'The appointment you are tring to delete does not exist'})
    else:
        content = json.loads(request.body)
        Service.object.filter(id=id).update(**content)
        service = Service.objects.get(id=id)
        return JsonResponse(
            service,
            encoder=AppointmentDetailEncoder,
            safe=False,
        )


@require_http_methods(['GET'])
def api_automobile(request):
    if request.method == 'GET':
        auto = AutomobileVO.objects.all()
        return JsonResponse(
            {'auto': auto},
            encoder=AutomobileVOEncoder
        )
