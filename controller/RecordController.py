from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt

from model import ProjectAccess, VehicleAccess, UserAccess
from model import VehicleRecordAccess, TaskRecordAccess
from model import ProjectVehicleRecordAccess, ProjectUserRecordAccess

import json, pymongo, httplib, hashlib, uuid

def getAllVehicleRecord(request):
    res = {}

    if not request.session.session_key:
        res['result'] = 0
        res['message'] = 'The user does not log in'
    elif request.method == 'GET':
        recordList = VehicleRecordAccess.getAllVehicalRecord()
        if len(recordList) == 0:
            res['result'] = 0
            res['message'] = 'No record.'
        else:
            res['result'] = 1
            res['data'] = recordList
    else:
        res['result'] = 0
        res['message'] = 'Wrong request.'

    return HttpResponse(json.dumps(res), content_type="application/json")


@csrf_exempt
def deleteVehicleRecord(request):
    res = {}

    if request.method == 'POST':
        info = json.loads(request.body)
        final = VehicleRecordAccess.deleteVehicleRecord(info['id'])
        res['result'] = final['result']
        res['message'] = final['message']
    else:
        res['result'] = 0
        res['message'] = 'Wrong request.'

    return HttpResponse(json.dumps(res), content_type="application/json")


def getAllTaskRecord(request):
    res = {}

    if not request.session.session_key:
        res['result'] = 0
        res['message'] = 'The user does not log in'
    elif request.method == 'GET':
        recordList = TaskRecordAccess.getAllTaskRecord()
        if len(recordList) == 0:
            res['result'] = 0
            res['message'] = 'No record.'
        else:
            res['result'] = 1
            res['data'] = recordList
    else:
        res['result'] = 0
        res['message'] = 'Wrong request.'

    return HttpResponse(json.dumps(res), content_type="application/json")


@csrf_exempt
def deleteTaskRecord(request):
    res = {}

    if request.method == 'POST':
        info = json.loads(request.body)
        final = TaskRecordAccess.deleteTaskRecord(info['id'])
        res['result'] = final['result']
        res['message'] = final['message']
    else:
        res['result'] = 0
        res['message'] = 'Wrong request.'

    return HttpResponse(json.dumps(res), content_type="application/json")


def getAllProjectUserRecord(request):
    res = {}

    if not request.session.session_key:
        res['result'] = 0
        res['message'] = 'The user does not log in'
    elif request.method == 'GET':
        recordList = ProjectUserRecordAccess.getAllProjectUserRecord()
        if len(recordList) == 0:
            res['result'] = 0
            res['message'] = 'No record.'
        else:
            res['result'] = 1
            res['data'] = recordList
    else:
        res['result'] = 0
        res['message'] = 'Wrong request.'

    return HttpResponse(json.dumps(res), content_type="application/json")


@csrf_exempt
def deleteProjectUserRecord(request):
    res = {}

    if request.method == 'POST':
        info = json.loads(request.body)
        final = ProjectUserRecordAccess.deleteProjectUserRecord(info['id'])
        res['result'] = final['result']
        res['message'] = final['message']
    else:
        res['result'] = 0
        res['message'] = 'Wrong request.'

    return HttpResponse(json.dumps(res), content_type="application/json")


def getAllProjectVehicalRecord(request):
    res = {}

    if not request.session.session_key:
        res['result'] = 0
        res['message'] = 'The user does not log in'
    elif request.method == 'GET':
        recordList = ProjectVehicalRecordAccess.getAllProjectVehicalRecord()
        if len(recordList) == 0:
            res['result'] = 0
            res['message'] = 'No record.'
        else:
            res['result'] = 1
            res['data'] = recordList
    else:
        res['result'] = 0
        res['message'] = 'Wrong request.'

    return HttpResponse(json.dumps(res), content_type="application/json")


@csrf_exempt
def deleteProjectVehicalRecord(request):
    res = {}

    if request.method == 'POST':
        info = json.loads(request.body)
        final = ProjectVehicalRecordAccess.deleteProjectVehicalRecord(info['id'])
        res['result'] = final['result']
        res['message'] = final['message']
    else:
        res['result'] = 0
        res['message'] = 'Wrong request.'

    return HttpResponse(json.dumps(res), content_type="application/json")