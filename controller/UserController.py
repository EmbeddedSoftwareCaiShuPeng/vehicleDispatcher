from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt

from model import UserAccess

import json, pymongo, httplib, hashlib, uuid

def isLogin(request):
    res = {}

    if request.session.session_key:
        res['result'] = 1
    else:
        res['result'] = 0

    return HttpResponse(json.dumps(res), content_type="application/json")


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
        user = UserAccess.getUserByName(user_name)
        if user:
            if  hashlib.sha1(info['password']).hexdigest() == user['password']:
                request.session['user_id'] = user['id']
                res['result'] = 1
                res['data'] = {}
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


def getAllUser(request):
    res = {}

    if not request.session.session_key:
        res['result'] = 0
        res['message'] = 'The user does not log in'
    elif request.method == 'GET':
        userList = UserAccess.getAllUser()
        if len(userList) == 0:
            res['result'] = 0
            res['message'] = 'No user.'
        else:
            res['result'] = 1
            res['data'] = userList
    else:
        res['result'] = 0
        res['message'] = 'Wrong request.'

    return HttpResponse(json.dumps(res), content_type="application/json")


@csrf_exempt
def addUser(request):
    res = {}

    if request.method == 'POST':
        info = json.loads(request.body)
        if not UserAccess.getUserByName(info['user_name']):
            info['password'] = hashlib.sha1(info['password']).hexdigest()
            info['id'] = uuid.uuid1().hex
            info['status'] = 0
            final = UserAccess.addUser(info)
            res['result'] = final['result']
            res['message'] = final['message']
        else:
            res['result'] = 0
            res['message'] = 'The userName has exist!'
    else:
        res['result'] = 0
        res['message'] = 'Wrong request.'

    return HttpResponse(json.dumps(res), content_type="application/json")


@csrf_exempt
def editUser(request):
    res = {}

    if request.method == 'POST':
        info = json.loads(request.body)
        if UserAccess.getUserById(info['id']):
            final = UserAccess.editUser(info)
            res['result'] = final['result']
            res['message'] = final['message']
        else:
            res['result'] = 0
            res['message'] = 'The user does not exist!'
    else:
        res['result'] = 0
        res['message'] = 'Wrong request.'

    return HttpResponse(json.dumps(res), content_type="application/json")


@csrf_exempt
def deleteUser(request):
    res = {}

    if request.method == 'POST':
        info = json.loads(request.body)
        if UserAccess.getUserById(info['id']):
            final = UserAccess.deleteUserById(info['id'])
            res['result'] = final['result']
            res['message'] = final['message']
        else:
            res['result'] = 0
            res['message'] = 'The user does not exist!'
    else:
        res['result'] = 0
        res['message'] = 'Wrong request.'

    return HttpResponse(json.dumps(res), content_type="application/json")




