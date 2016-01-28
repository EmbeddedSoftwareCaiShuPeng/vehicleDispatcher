#!/usr/bin/env python
#coding = utf8
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt

from model import VehicleAccess, TaskRecordAccess, UserAccess
from model import ProjectVehicleRecordAccess, ProjectUserRecordAccess
from datetime import datetime

import json, pymongo, httplib, hashlib, uuid, os, sys

reload(sys)
sys.setdefaultencoding( "utf-8" )

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
        if not VehicleAccess.getVehicleByNumber(info['number']):
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
            if info['task']:
                info['accept'] = 1
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
            path = getPath(info['task'])
            if path:
                task = {
                    'origin' : info['task']['origin'],
                    'dest' : info['task']['dest'],
                    'path' : path
                }

                record = {
                    'id' : uuid.uuid1().hex,
                    'vehicle_id' : vehicle['id'],
                    'user_id' : user['id'],
                    'time' : datetime.now(),
                    'task' : task
                }
                TaskRecordAccess.addTaskRecord(record)
                res['result'] = 1
                res['data'] = path

                vehicle['accept'] = 1
                vehicle['task'] = task
                if user['status'] == 2:
                    user['status'] = 3
                    vehicle['status'] = 3
                UserAccess.editUser(user)
                VehicleAccess.editVehicle(vehicle)
            else:
                res['result'] = 0
                res['message'] = 'Can not get the path from baidu map.'
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
        if vehicle:
            if info['op'] == 1:
                vehicle['project_id'] = info['project_id']
                vehicle['status'] = 1

                project_vehicle_record = {
                    "id" : uuid.uuid1().hex,
                    "project_id" : info['project_id'],
                    "vehicle_id" : vehicle["id"],
                    "start_time" : datetime.now(),
                    "end_time" : ""
                }
                ProjectVehicleRecordAccess.addProjectVehicleRecord(project_vehicle_record)
                
            else:
                vehicle['project_id'] = ''
                vehicle['status'] = 0

                vehicle_record_list = ProjectVehicleRecordAccess.getAllProjectVehicleRecord()
                for item in vehicle_record_list:
                    if item['vehicle_id'] == vehicle['id'] and item['end_time'] == "":
                        vehicle_record = item
                        vehicle_record['end_time'] = datetime.now()
                        ProjectVehicleRecordAccess.editProjectVehicleRecord(vehicle_record)
                        break

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


def getPath(data):
    path = []
    httpClient = None

    try:
        request = "/direction/v1?mode=driving"
        request +=  "&origin=" + str(data['origin']['lat']) + "," + str(data['origin']['lng'])
        request +=  "&destination=" + str(data['dest']['lat']) + "," + str(data['dest']['lng'])
        request +=  "&origin_region=" + data['origin_region'] + "&destination_region=" + data['destination_region']
        request += "&output=json&ak=l4a3qvfb1lKErn4SjvNs7Oyd"
        print request
        httpClient = httplib.HTTPConnection('api.map.baidu.com', 80, timeout=30)
        httpClient.request('GET', request)
        response = httpClient.getresponse()
        result = json.loads(response.read())
        routeArr = result['result']['routes'][0]['steps']
        for item in routeArr:
            pointArr = item['path'].split(';')
            for p in pointArr:
                p_split = p.split(',')
                point = {}
                point['lng'] = p_split[0]
                point['lat'] = p_split[1]
                path.append(point)

    except Exception, e:
        print e
    finally:
        if httpClient:
            httpClient.close()   
    return path    


