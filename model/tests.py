import uuid
import hashlib

from django.test import TestCase
from django.http import HttpResponse

from . import UserAccess
from . import VehicleAccess

def addUser(request):
    user = {
        'id' : uuid.uuid1().hex,
        'user_name' : 'cai',
        'password' : hashlib.sha1('cai').hexdigest(),
        'type' : 'admin',
        'name' : 'cai',
        'phone' : '123456789',
        'status' : 'free',
    }
    result =  UserAccess.addUser(user)['message']
    return HttpResponse("The result is %s." % result)


def editUser(request):
    user = {
        'id' : '725cafaab42711e5adb880fa5b098c48',
        'user_name' : 'cai',
        'password' : hashlib.sha1('cai').hexdigest(),
        'type' : 'admin',
        'name' : 'caishupeng',
        'phone' : '123456789',
        'status' : 'free',
    }
    result =  UserAccess.editUser(user)['message']
    return HttpResponse("The result is %s." % result)

def deleteUserById(request):
    result =  UserAccess.deleteUserById('725cafaab42711e5adb880fa5b098c48')['message']
    return HttpResponse("The result is %s." % result)

def getAllUser(request):
    userList = UserAccess.getAllUser()
    for item in userList:
        print item
    return HttpResponse("The result is %s." % userList)

def getUserByName(request):
    user = UserAccess.getUserById('fe9ff2d4b42611e5bbf880fa5b098c48')
    if user:
        print user
    return HttpResponse("The result is %s." % user)


def addVehicle(request):
    vehicle = {
        'id' : uuid.uuid1().hex,
        'number' : '8888',
        'user_id' : '123456',
        'project_id' : '123456',
        'data' : '',
        'task' : '',
        'status' : 'free',
        'accept' : '0',
    }
    result =  VehicleAccess.addVehicle(vehicle)['message']
    return HttpResponse("The result is %s." % result)


def editVehicle(request):
    vehicle = {
        'id' : 'ff1f36e6b44111e5bbc380fa5b098c48',
        'number' : '8888',
        'user_id' : '123456',
        'project_id' : '123456',
        'data' : '',
        'task' : '',
        'status' : 'busy',
        'accept' : '0',
    }
    result =  VehicleAccess.editVehicle(vehicle)['message']
    return HttpResponse("The result is %s." % result)

def deleteVehicleById(request):
    result =  VehicleAccess.deleteVehicleById('ff1f36e6b44111e5bbc380fa5b098c48')['message']
    return HttpResponse("The result is %s." % result)

def getAllVehicle(request):
    userList = VehicleAccess.getAllVehicle()
    for item in userList:
        print item
    return HttpResponse("The result is %s." % userList)

def getVehicleByNumber(request):
    user = VehicleAccess.getVehicleById('36d41660b44211e5b87480fa5b098c48')
    if user:
        print user
    return HttpResponse("The result is %s." % user)