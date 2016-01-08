from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt

from model import UserAccess

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
        if user:
            if  hashlib.sha1(info['password']).hexdigest() == user['password']:
                request.session['id'] = user['id']
                res['result'] = 1
                res['data'] = {}
                res['data']['user_id'] = user['id']
                res['data']['user_type'] = user['type']
                res['data']['name'] = user['name']
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
    else:
        res['result'] = 0
        res['message'] = 'Wrong request.'

    return HttpResponse(json.dumps(res), content_type="application/json")