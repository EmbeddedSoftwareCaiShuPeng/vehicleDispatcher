from django.conf.urls import url

from . import UserInterface, VehicleInterface

app_name = 'terminalManager'
urlpatterns = [
    url(r'^user/login', UserInterface.login),
    url(r'^user/logout', UserInterface.logout),
    url(r'^vehicle/register', VehicleInterface.vehicleRegister),
    url(r'^vehicle/data', VehicleInterface.vehicleData),
    url(r'^vehicle/task', VehicleInterface.vehicleTask),
]