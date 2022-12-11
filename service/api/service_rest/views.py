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

@require_http_methods(["DELETE", "GET", "PUT"])
def api_show_technician(request, id):
    if request.method == "GET":
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
                {"message": 'Technician does not exist, try again!'},
                status=400,
                )
    elif request.method == "DELETE":
        try:
            count, _ = Technician.objects.filter(id=id).delete()
            return JsonResponse({"deleted": count > 0})
        except Technician.DoesNotExist:
            return JsonResponse({"message": "Technician does not exist, try again!"})
    else:
        try:
            content = json.loads(request.body)
            Technician.objects.filter(id=id).update(**content)
            technicians = Technician.objects.get(id=id)
            return JsonResponse(
                technicians,
                encoder=TechnicianDetailEncoder,
                safe=False,
            )
        except Technician.DoesNotExist:
            response = JsonResponse({"message": "Technician does not exist, try again!"})
            response.status_code = 404
            return response




@require_http_methods(["GET", "POST"])
def api_list_appointments(request):
    if request.method == "GET":
        services = Service.objects.all()
        return JsonResponse(
            {"services": services},
            encoder=AppointmentListEncoder,
        )
    # Create service
    else:
        content = json.loads(request.body)
        try:
            technician = Technician.objects.get(employee_number=content["technician"])
            content["technician"] = technician
        except Technician.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid technician, try again!"}
            )
        try:
            service = Service.objects.create(**content)
            return JsonResponse(
                service,
                encoder=AppointmentDetailEncoder,
                safe=False,
            )
        except:
            response = JsonResponse(
                {"message": "Could not create service appointment, try again! "},
            )
            response.status_code = 400
            return response


@require_http_methods(['DELETE','GET','PUT'])
def api_show_appointments(request, id):
    if request.method == "GET":
        try:
            service = Service.objects.get(id=id)
            return JsonResponse(
                service,
                encoder=AppointmentDetailEncoder,
                safe=False
            )
        except Service.DoesNotExist:
            response = JsonResponse({"message:" "This appointment does not exist, try again!"})
            response.status_code = 404
            return response
    elif request.method == "DELETE":
        try:
            count, _ = Service.objects.filter(id=id).delete()
            return JsonResponse({"deleted": count > 0})
        except Service.DoesNotExist:
            return JsonResponse({"message": "Service does not exist, try again!"})
    else:
        try:
            content = json.loads(request.body)
            Service.objects.filter(id=id).update(**content)
            service = Service.objects.get(id=id)
            return JsonResponse(
                service,
                encoder=AppointmentDetailEncoder,
                safe=False,
            )
        except Service.DoesNotExist:
            response = JsonResponse({"message:" "This appointment does not exist, try again!"})
            response.status_code = 404
            return response


@require_http_methods(['GET'])
def api_automobile(request):
    if request.method == 'GET':
        autos = AutomobileVO.objects.all()
        return JsonResponse(
            {'autos': autos},
            encoder=AutomobileVOEncoder
        )
    else:
        response = JsonResponse({"message": "Automobile does not exist, try again!"})
        response.status_code = 404
        return response
