import uuid, json, os, pymongo

from models import User

def addUser(user):
    res = {}
    res['result'] = 1
    res['message'] = ''

    if User.insert_one(user).inserted_id != '':
        res['message'] = 'success'
    else:
        res['result'] = 0
        res['message'] = 'Fail to add user!'

    return res


def deleteUserById(id):
    res = {}
    res['result'] = 1
    res['message'] = ''

    if User.delete_one({'id': id}).deleted_count == 1:
        res['message'] = 'success'
    else:
        res['result'] = 0
        res['message'] = 'Fail to delete user!'

    return res


def editUser(user):
    res = {}
    res['result'] = 1
    res['message'] = ''

    if User.update({'id': user['id']}, {"$set": user}):
        res['message'] = 'success'
    else:
        res['result'] = 0
        res['message'] = 'Fail to modify user!'

    return res

def getAllUser():
    userList = []
    for item in User.find():
        user = {
            'id' : item['id'],
            'user_name' : item['user_name'],
            'password' : item['password'],
            'type' : item['type'],
            'name' : item['name'],
            'phone' : item['phone'],
            'status' : item['status'],
        }
        userList.append(user)
    return userList


def getUserByName(name):
    item = User.find_one({'name': name})
    if item:
        user = {
            'id' : item['id'],
            'user_name' : item['user_name'],
            'password' : item['password'],
            'type' : item['type'],
            'name' : item['name'],
            'phone' : item['phone'],
            'status' : item['status'],
        }
        return user
    else: 
        return None


def getUserById(id):
    item = User.find_one({'id': id})
    if item:
        user = {
            'id' : item['id'],
            'user_name' : item['user_name'],
            'password' : item['password'],
            'type' : item['type'],
            'name' : item['name'],
            'phone' : item['phone'],
            'status' : item['status'],
        }
        return user
    else: 
        return None