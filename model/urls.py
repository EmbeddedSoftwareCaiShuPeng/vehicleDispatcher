from django.conf.urls import url

from . import tests

app_name = 'model'
urlpatterns = [
    url(r'^addUser', tests.addUser),
    url(r'^editUser', tests.editUser),
    url(r'^deleteUser', tests.deleteUserById),
    url(r'^getAllUser', tests.getAllUser),
    url(r'^getUserByName', tests.getUserByName),
    url(r'^addVehicle', tests.addVehicle),
    url(r'^editVehicle', tests.editVehicle),
    url(r'^deleteVehicle', tests.deleteVehicleById),
    url(r'^getAllVehicle', tests.getAllVehicle),
    url(r'^getVehicleByNumber', tests.getVehicleByNumber),
]