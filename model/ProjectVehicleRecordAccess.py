import uuid, json, os, pymongo

from models import ProjectVehicleRecord

def addProjectVehicleRecord(record):
    res = {}
    res['result'] = 1
    res['message'] = ''

    if ProjectVehicleRecord.insert_one(record).inserted_id != '':
        res['message'] = 'success'
    else:
        res['result'] = 0
        res['message'] = 'Fail to add project vehicle record!'

    return res


def deleteProjectVehicleRecord(id):
    res = {}
    res['result'] = 1
    res['message'] = ''

    if ProjectVehicleRecord.delete_one({'id': id}).deleted_count == 1:
        res['message'] = 'success'
    else:
        res['result'] = 0
        res['message'] = 'Fail to delete project vehicle record!'

    return res


def getAllProjectVehicleRecord():
    recordList = []
    for item in ProjectVehicleRecord.find():
        record = {
            'id' : item['id'],
            'project_id' : item['project_id'],
            'user_id' : item['user_id'],
            'start_time' : item['start_time'],
            'end_time' : item['end_time'],
        }
        recordList.append(record)
    return recordList


def editProjectVehicleRecord(record):
    res = {}
    res['result'] = 1
    res['message'] = ''

    if ProjectVehicleRecord.update({'id': record['id']}, {"$set": record}):
        res['message'] = 'success'
    else:
        res['result'] = 0
        res['message'] = 'Fail to modify project vehicle record!'

    return res

