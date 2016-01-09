from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt

from model import VehicleAccess, TaskRecordAccess
from model import ProjectVehicleRecordAccess, ProjectUserRecordAccess

import json, pymongo, httplib, hashlib, uuid

def getAllVehicle(request):
    res = {}

    if not request.session.session_key:
        res['result'] = 0
        res['message'] = 'The user does not log in'
    elif request.method == 'GET':
        vehicleList = VehicleAccess.getAllVehicle()
        if len(vehicleList) == 0:
            res['result'] = 0
            res['message'] = 'No vehicle.'
        else:
            res['result'] = 1
            res['data'] = vehicleList
    else:
        res['result'] = 0
        res['message'] = 'Wrong request.'

    return HttpResponse(json.dumps(res), content_type="application/json")


@csrf_exempt
def addVehicle(request):
    res = {}

    if request.method == 'POST':
        info = json.loads(request.body)
        if not VehicleAccess.getVehicleById(info['id']):
            info['id'] = uuid.uuid1().hex
            info['status'] = 0
            info['data'] = {}
            info['task'] = {}
            info['accept']= 0
            info['project_id'] = ""
            info['user_id'] = ""
            final = VehicleAccess.addVehicle(info)
            res['result'] = final['result']
            res['message'] = final['message']
        else:
            res['result'] = 0
            res['message'] = 'The vehicle number has exist!'
    else:
        res['result'] = 0
        res['message'] = 'Wrong request.'

    return HttpResponse(json.dumps(res), content_type="application/json")


@csrf_exempt
def editVehicle(request):
    res = {}

    if request.method == 'POST':
        info = json.loads(request.body)
        if VehicleAccess.getVehicleById(info['id']):
            if info['task'] != "":
                info['accept'] = info['accept'] | 2
            final = VehicleAccess.editVehicle(info)
            res['result'] = final['result']
            res['message'] = final['message']
        else:
            res['result'] = 0
            res['message'] = 'The vehicle does not exist!'
    else:
        res['result'] = 0
        res['message'] = 'Wrong request.'

    return HttpResponse(json.dumps(res), content_type="application/json")


@csrf_exempt
def deleteVehicle(request):
    res = {}

    if request.method == 'POST':
        info = json.loads(request.body)
        if VehicleAccess.getVehicleById(info['id']):
            final = VehicleAccess.deleteVehicleById(info['id'])
            res['result'] = final['result']
            res['message'] = final['message']
        else:
            res['result'] = 0
            res['message'] = 'The vehicle does not exist!'
    else:
        res['result'] = 0
        res['message'] = 'Wrong request.'

    return HttpResponse(json.dumps(res), content_type="application/json")


@csrf_exempt
def assignTask(request):
    res = {}

    if request.method == 'POST':
        info = json.loads(request.body)
        vehicle = VehicleAccess.getVehicleById(info['vehicle_id'])
        user = UserAccess.getUserById(vehicle['user_id'])
        if vehicle:
            vehicle['accept'] = vehicle['accept'] | 2
            vehicle['task'] = info['task']
            if user['status'] == 2:
                user['status'] = 3
                vehicle['status'] = 3
            UserAccess.editUser(user)
            final = VehicleAccess.editVehicle(vehicle)
            res['result'] = final['result']
            res['message'] = final['message']

            record = {
                'id' : uuid.uuid1().hex,
                'vehicle_id' : vehicle_id,
                'time' : datetime.now(),
                'task' : info['task']
            }
            TaskRecordAccess.addTaskRecord(record)
        else:
            res['result'] = 0
            res['message'] = 'The vehicle does not exist!'
    else:
        res['result'] = 0
        res['message'] = 'Wrong request.'

    return HttpResponse(json.dumps(res), content_type="application/json")


@csrf_exempt
def assignProject(request):
    res = {}

    if request.method == 'POST':
        info = json.loads(request.body)
        vehicle = VehicleAccess.getVehicleById(info['vehicle_id'])
        user = UserAccess.getUserById(info['user_id'])
        if vehicle:
            if info['op'] == 1:
                vehicle['accept'] = vehicle['accept'] | 1
                vehicle['user_id'] = info['user_id']
                vehicle['project_id'] = info['project_id']
                vehicle['status'] = 1
                user['status'] = 1

                project_vehicle_record = {
                    "id" : uuid.uuid1().hex,
                    "project_id" : info['project_id'],
                    "vehicle_id" : vehicle["id"],
                    "start_time" : datetime.now(),
                    "end_time" : ""
                }
                ProjectVehicleRecordAccess.addProjectVehicleRecord(project_vehicle_record)

                project_user_record = {
                    "id" : uuid.uuid1().hex,
                    "project_id" : info['project_id'],
                    "user_id" : user["id"],
                    "start_time" : datetime.now(),
                    "end_time" : ""
                }
                ProjectUserRecordAccess.addProjectUserRecord(project_user_record)
                
            else:
                vehicle['accept'] = vehicle['accept'] | 1
                vehicle['user_id'] = ""
                vehicle['project_id'] = ""
                vehicle['status'] = 0
                user['status'] = 0

                user_record_list = ProjectUserRecordAccess.getAllProjectUserRecord()
                for item in user_record_list:
                    if item['user_id'] == user['id'] and item['end_time'] == "":
                        user_record = item
                        user_record['end_time'] = datetime.now()
                        ProjectUserRecordAccess.editProjectUserRecord(user_record)
                        break

                vehicle_record_list = ProjectVehicleRecordAccess.getAllProjectVehicleRecord()
                for item in vehicle_record_list:
                    if item['vehicle_id'] == vehicle['id'] and item['end_time'] == "":
                        vehicle_record = item
                        vehicle_record['end_time'] = datetime.now()
                        ProjectVehicleRecordAccess.editProjectVehicleRecord(vehicle_record)
                        break

            UserAccess.editUser(user)
            final = VehicleAccess.editVehicle(vehicle)
            res['result'] = final['result']
            res['message'] = final['message']
        else:
            res['result'] = 0
            res['message'] = 'The vehicle does not exist!'
    else:
        res['result'] = 0
        res['message'] = 'Wrong request.'

    return HttpResponse(json.dumps(res), content_type="application/json")

