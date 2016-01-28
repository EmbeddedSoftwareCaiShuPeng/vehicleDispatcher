from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt

from model import VehicleAccess, VehicleRecordAccess, UserAccess

import json, pymongo, httplib, hashlib, uuid
from datetime import datetime


@csrf_exempt
def vehicleRegister(request):
    res = {}

    if request.method == 'POST':
        info = json.loads(request.body)
        vehicle_number = info['vehicle_number']
        vehicle = VehicleAccess.getVehicleByNumber(vehicle_number)
        if vehicle:
            res['data'] = {}
            res['data']['vehicle_id'] = vehicle['id'] 
            res['result'] = 1
        else:
            res['result'] = 0
            res['message'] = 'The vehicle does not exist'
    else:
        res['result'] = 0
        res['message'] == 'Wrong request.'

    return HttpResponse(json.dumps(res), content_type="application/json")    


@csrf_exempt
def vehicleData(request):
    res = {}

    if request.method == 'POST':
        info = json.loads(request.body)
        vehicle_id = info['vehicle_id']
        vehicle = VehicleAccess.getVehicleById(vehicle_id)
        if vehicle:
            vehicle['data'] = info['data']
            vehicle_record = {
                'id' : uuid.uuid1().hex,
                'vehicle_id' : vehicle_id,
                'time' : datetime.now(),
                'data' : info['data']
            }
            VehicleRecordAccess.addVehicleRecord(vehicle_record)

            if vehicle['status'] == 3 \
                and info['data']['location']['lat'] == vehicle['task']['dest']['lat'] \
                and info['data']['location']['lng'] == vehicle['task']['dest']['lng']:
                vehicle['task'] = {}
                vehicle['status'] = 2
                user = UserAccess.getUserBuId(vehicle['user_id'])
                user['status'] =2
                UserAccess.editUser(user)

            res['data'] = {}
            res['result'] = 1
            VehicleAccess.editVehicle(vehicle)
        else:
            res['result'] = 0
            res['message'] = 'The vehicle does noe exist.'
    else:
        res['result'] = 0
        res['message'] = 'Wrong request.'

    return HttpResponse(json.dumps(res), content_type="application/json")


def vehicleTask(request):
    res = {}

    if request.method == 'GET':
        info = request.GET
        vehicle_id = info['vehicle_id']
        vehicle = VehicleAccess.getVehicleById(vehicle_id)
        if vehicle:
            if  vehicle['accept']== 1:
                res['result'] = 1
                res['data'] = vehicle['task']
                vehicle['accept'] = 0
            else:
                res['result'] = 0
                res['message'] = 'No new task.'
            VehicleAccess.editVehicle(vehicle)
        else:
            res['result'] = 0
            res['message'] = 'The vehicle does not exist.'
    else:
        res['result'] = 0
        res['message'] = 'Wrong request.'

    return HttpResponse(json.dumps(res), content_type="application/json")




