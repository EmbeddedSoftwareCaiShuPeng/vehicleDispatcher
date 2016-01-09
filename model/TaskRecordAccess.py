import uuid, json, os, pymongo

from models import TaskRecord

def addTaskRecord(record):
    res = {}
    res['result'] = 1
    res['message'] = ''

    if TaskRecord.insert_one(record).inserted_id != '':
        res['message'] = 'success'
    else:
        res['result'] = 0
        res['message'] = 'Fail to add task record!'

    return res


def deleteTaskRecord(id):
    res = {}
    res['result'] = 1
    res['message'] = ''

    if TaskRecord.delete_one({'id': id}).deleted_count == 1:
        res['message'] = 'success'
    else:
        res['result'] = 0
        res['message'] = 'Fail to delete task record!'

    return res


def getAllTaskRecord():
    recordList = []
    for item in TaskRecord.find():
        record = {
            'id' : item['id'],
            'vehicle_id' : item['vehicle_id'],
            'time' : item['time'],
            'task' : item['task'],
        }
        recordList.append(record)
    return recordList


def editTaskRecord(record):
    res = {}
    res['result'] = 1
    res['message'] = ''

    if TaskRecord.update({'id': record['id']}, {"$set": record}):
        res['message'] = 'success'
    else:
        res['result'] = 0
        res['message'] = 'Fail to modify task record!'

    return res

