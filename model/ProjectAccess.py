import uuid, json, os, pymongo

from models import Project

def addProject(project):
    res = {}
    res['result'] = 1
    res['message'] = ''

    if Project.insert_one(project).inserted_id != '':
        res['message'] = 'success'
    else:
        res['result'] = 0
        res['message'] = 'Fail to add Project!'

    return res


def deleteProjectById(id):
    res = {}
    res['result'] = 1
    res['message'] = ''

    if Project.delete_one({'id': id}).deleted_count == 1:
        res['message'] = 'success'
    else:
        res['result'] = 0
        res['message'] = 'Fail to delete Project!'

    return res


def editProject(project):
    res = {}
    res['result'] = 1
    res['message'] = ''

    if Project.update({'id': project['id']}, {"$set": project}):
        res['message'] = 'success'
    else:
        res['result'] = 0
        res['message'] = 'Fail to modify project!'

    return res


def getAllProject():
    projectList = []
    for item in Project.find():
        project = {
            'id' : item['id'],
            'name' : item['name'],
            'description' : item['description'],

        }
        projectList.append(project)
    return projectList


def getProjectById(id):
    item = Project.find_one({'id': id})
    if item:
        project = {
            'id' : item['id'],
            'name' : item['name'],
            'description' : item['description'],
        }
        return project
    else: 
        return None

def getProjectByName(name):
    item = Project.find_one({'name': name})
    if item:
        project = {
            'id' : item['id'],
            'name' : item['name'],
            'description' : item['description'],
        }
        return project
    else: 
        return None