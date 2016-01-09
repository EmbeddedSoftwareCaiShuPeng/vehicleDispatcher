import uuid, json, os, pymongo

from models import VehicleRecord

def addVehicleRecord(record):
    res = {}
    res['result'] = 1
    res['message'] = ''

    if VehicleRecord.insert_one(record).inserted_id != '':
        res['message'] = 'success'
    else:
        res['result'] = 0
        res['message'] = 'Fail to add vehicle record!'

    return res


def deleteVehicleRecord(id):
    res = {}
    res['result'] = 1
    res['message'] = ''

    if VehicleRecord.delete_one({'id': id}).deleted_count == 1:
        res['message'] = 'success'
    else:
        res['result'] = 0
        res['message'] = 'Fail to delete vehicle record!'

    return res


def getAllVehicleRecord():
    recordList = []
    for item in VehicleRecord.find():
        record = {
            'id' : item['id'],
            'vehicle_id' : item['vehicle_id'],
            'time' : item['time'],
            'data' : item['data'],
        }
        recordList.append(record)
    return recordList


def editVehicleRecord(record):
    res = {}
    res['result'] = 1
    res['message'] = ''

    if VehicleRecord.update({'id': record['id']}, {"$set": record}):
        res['message'] = 'success'
    else:
        res['result'] = 0
        res['message'] = 'Fail to modify vehicle record!'

    return res

