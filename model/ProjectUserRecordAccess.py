import uuid, json, os, pymongo

from models import ProjectUserRecord

def addProjectUserRecord(record):
    res = {}
    res['result'] = 1
    res['message'] = ''

    if ProjectUserRecord.insert_one(record).record != '':
        res['message'] = 'success'
    else:
        res['result'] = 0
        res['message'] = 'Fail to add project user record!'

    return res


def deleteProjectUserRecord(id):
    res = {}
    res['result'] = 1
    res['message'] = ''

    if ProjectUserRecord.delete_one({'id': id}).deleted_count == 1:
        res['message'] = 'success'
    else:
        res['result'] = 0
        res['message'] = 'Fail to delete project user record!'

    return res


def getAllProjectUserRecord():
    recordList = []
    for item in ProjectUserRecord.find():
        record = {
            'id' : item['id'],
            'project_id' : item['project_id'],
            'vehicle_id' : item['vehicle_id'],
            'start_time' : item['start_time'],
            'end_time' : item['end_time'],
        }
        recordList.append(record)
    return recordList


def editProjectUserRecord(record):
    res = {}
    res['result'] = 1
    res['message'] = ''

    if ProjectUserRecord.update({'id': record['id']}, {"$set": record}):
        res['message'] = 'success'
    else:
        res['result'] = 0
        res['message'] = 'Fail to modify project user record!'

    return res

