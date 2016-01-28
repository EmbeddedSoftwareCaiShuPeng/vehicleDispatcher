from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt

from model import UserAccess, VehicleAccess

import json, pymongo, httplib, hashlib

@csrf_exempt
def login(request):
    res = {}

    if request.session.session_key:
        res['result'] = 0
        res['message'] = 'The user has logon.'
    elif request.method == 'POST':
        info = json.loads(request.body)
        user_name = info['user_name']
        password = info['password']
        vehicle_id = info['vehicle_id']
        user = UserAccess.getUserByName(user_name)
        vehicle = VehicleAccess.getVehicleById(vehicle_id)
        if user:
            if vehicle['user_id'] != user['id']:
                res['result'] = 0
                res['message'] = 'The user login wrong vehicle or no vehicle assigned to the user.'
            elif  hashlib.sha1(info['password']).hexdigest() == user['password']:
                request.session['user_id'] = user['id']
                request.session['vehicle_id'] = vehicle_id
                res['result'] = 1
                res['data'] = {}
                res['data']['user_id'] = user['id']
                res['data']['user_type'] = user['type']
                res['data']['name'] = user['name']
                if vehicle['task']:
                    user['status'] = 3
                    vehicle['status'] = 3
                else:
                    user['status'] = 2
                    vehicle['status'] = 2
                UserAccess.editUser(user)
                VehicleAccess.editVehicle(vehicle)
            else:
                res['result'] = 0
                res['message'] = 'The password is wrong.'
        else:
            res['result'] = 0
            res['message'] = 'The user does not exist.'
    else:
        res['result'] = 0
        res['message'] = 'Wrong request.'

    return HttpResponse(json.dumps(res), content_type="application/json")


def logout(request):
    res = {}

    if not request.session.session_key:
        res['result'] = 0
        res['message'] = 'The user does not log in'
    elif request.method == 'GET':
        request.session.flush()
        res['result'] = 1
        user = UserAccess.getUserById(request.session['user_id'])
        vehicle = VehicleAccess.getVehicleById(request.session['vehicle_id'])
        user['status'] = 1
        vehicle['status'] = 1
        UserAccess.editUser(user)
        VehicleAccess.editVehicle(vehicle)
    else:
        res['result'] = 0
        res['message'] = 'Wrong request.'

    return HttpResponse(json.dumps(res), content_type="application/json")