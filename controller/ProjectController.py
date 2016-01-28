from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt

from model import ProjectAccess

import json, pymongo, httplib, hashlib, uuid

def getAllProject(request):
    res = {}

    if not request.session.session_key:
        res['result'] = 0
        res['message'] = 'The user does not log in'
    elif request.method == 'GET':
        projectList = ProjectAccess.getAllProject()
        if len(projectList) == 0:
            res['result'] = 0
            res['message'] = 'No project.'
        else:
            res['result'] = 1
            res['data'] = projectList
    else:
        res['result'] = 0
        res['message'] = 'Wrong request.'

    return HttpResponse(json.dumps(res), content_type="application/json")


@csrf_exempt
def addProject(request):
    res = {}

    if request.method == 'POST':
        info = json.loads(request.body)
        if not ProjectAccess.getProjectByName(info['name']):
            info['id'] = uuid.uuid1().hex
            final = ProjectAccess.addProject(info)
            res['result'] = final['result']
            res['message'] = final['message']
        else:
            res['result'] = 0
            res['message'] = 'The project number has exist!'
    else:
        res['result'] = 0
        res['message'] = 'Wrong request.'

    return HttpResponse(json.dumps(res), content_type="application/json")


@csrf_exempt
def editProject(request):
    res = {}

    if request.method == 'POST':
        info = json.loads(request.body)
        if ProjectAccess.getProjectById(info['id']):
            final = ProjectAccess.editProject(info)
            res['result'] = final['result']
            res['message'] = final['message']
        else:
            res['result'] = 0
            res['message'] = 'The project does not exist!'
    else:
        res['result'] = 0
        res['message'] = 'Wrong request.'

    return HttpResponse(json.dumps(res), content_type="application/json")


@csrf_exempt
def deleteProject(request):
    res = {}

    if request.method == 'POST':
        info = json.loads(request.body)
        if ProjectAccess.getProjectById(info['id']):
            final = ProjectAccess.deleteProjectById(info['id'])
            res['result'] = final['result']
            res['message'] = final['message']
        else:
            res['result'] = 0
            res['message'] = 'The project does not exist!'
    else:
        res['result'] = 0
        res['message'] = 'Wrong request.'

    return HttpResponse(json.dumps(res), content_type="application/json")




