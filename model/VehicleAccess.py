import uuid, json, os, pymongo

from models import Vehicle

def addVehicle(vehicle):
    res = {}
    res['result'] = 1
    res['message'] = ''

    if Vehicle.insert_one(vehicle).inserted_id != '':
        res['message'] = 'success'
    else:
        res['result'] = 0
        res['message'] = 'Fail to add user!'

    return res


def deleteVehicleById(id):
    res = {}
    res['result'] = 1
    res['message'] = ''

    if Vehicle.delete_one({'id': id}).deleted_count == 1:
        res['message'] = 'success'
    else:
        res['result'] = 0
        res['message'] = 'Fail to delete user!'

    return res


def editVehicle(vehicle):
    res = {}
    res['result'] = 1
    res['message'] = ''

    if Vehicle.update({'id': vehicle['id']}, {"$set": vehicle}):
        res['message'] = 'success'
    else:
        res['result'] = 0
        res['message'] = 'Fail to modify user!'

    return res


def getAllVehicle():
    vehicleList = []
    for item in Vehicle.find():
        vehicle = {
            'id' : item['id'],
            'number' : item['number'],
            'user_id' : item['user_id'],
            'project_id' : item['project_id'],
            'data' : item['data'],
            'task' : item['task'],
            'status' : item['status'],
            'accept' : item['accept'],
        }
        vehicleList.append(vehicle)
    return vehicleList


def getVehicleByNumber(number):
    item = Vehicle.find_one({'number': number})
    if item:
        vehicle = {
            'id' : item['id'],
            'number' : item['number'],
            'user_id' : item['user_id'],
            'project_id' : item['project_id'],
            'data' : item['data'],
            'task' : item['task'],
            'status' : item['status'],
            'accept' : item['accept'],
        }
        return vehicle
    else: 
        return None

def getVehicleById(id):
    item = Vehicle.find_one({'id': id})
    if item:
        vehicle = {
            'id' : item['id'],
            'number' : item['number'],
            'user_id' : item['user_id'],
            'project_id' : item['project_id'],
            'data' : item['data'],
            'task' : item['task'],
            'status' : item['status'],
            'accept' : item['accept'],
        }
        return vehicle
    else: 
        return None