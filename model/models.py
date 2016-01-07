from __future__ import unicode_literals

from django.db import models

import json, os
import pymongo

DATABASE_NAME='vehicleDispatcher'
client = pymongo.MongoClient('mongodb://sysu:sysumogodb@do.cysmart.net')
database = client[DATABASE_NAME]

User = database['user']
Vehicle = database['vehicle']
Project = database['project']
TaskRecord = database['task_record']
VehicleRecord = database['vehicle_record']
ProjectUserRecord = database['project_user_record']
ProjectVehicleRecord = database['project_vehicle_record']
