var map = new BMap.Map("allmap");
map.centerAndZoom(new BMap.Point(116.404, 39.915), 11);
map.enableScrollWheelZoom(true);
var vehicleIcon = new BMap.Icon("assets/img/lorry.png", new BMap.Size(48,48));
var destIcon = new BMap.Icon("assets/img/dest.png", new BMap.Size(48,48));


function refreshAllMarker() {
    for (var i = 0; i < vehicleList.length; i++) {
        var number = vehicleList[i]['number'];
        if (markerList[number] == undefined) {
            if (vehicleList[i]['data']['location'] == undefined)
                break;
            markerList[number] = {};
            var lng = vehicleList[i]['data']['location']['lng'];
            var lat = vehicleList[i]['data']['location']['lat'];
            markerList[number]['point'] = new BMap.Point(lng, lat);
            setMarker(markerList[number]['point'], number);
            if (vehicleList[i]['task']['path'] != undefined) {
                drawPath(number, vehicleList[i]['task']['path']);
            }
        }else {
            markerList[number]['point'].lng = vehicleList[i]['data']['location']['lng'];
            markerList[number]['point'].lat = vehicleList[i]['data']['location']['lat']; 
            markerList[number]['marker'].setPosition(markerList[number]['point']);  
        }
    }
}

function animateMarker(number) {
    if (markerList[number] != undefined)
        markerList[number]['marker'].setAnimation(BMAP_ANIMATION_DROP);
}

function deleteMarker(number) {
    map.removeOverlay(markerList[number]['marker']);
    delete markerList[number]['marker'];
    delete markerList[number]['point'];
    delete markerList[number];
}

function setMarker(point, number){
    markerList[number]['marker'] = new BMap.Marker(point, {icon: vehicleIcon});
    map.addOverlay(markerList[number]['marker']);
    markerList[number]['marker'].addEventListener("click", function() {
        displayVehicle(number);
    });
}


function selectDes(e) {
    var r=confirm("The location is " + e.point.lng + ", " + e.point.lat);
    if (r==true) {
        var data = {};
        data['user_id'] =taskVehicle['user_id'];
        data['vehicle_id'] =taskVehicle['id'];

        var dest = e.point;
        var origin = new BMap.Point( taskVehicle['data']['location']['lng'], taskVehicle['data']['location']['lat']);
        data['task'] = {};

        data['task']['origin'] = {'lat': origin.lat, 'lng': origin.lng};
        data['task']['dest'] = {'lat': dest.lat, 'lng': dest.lng};

        var origin_city = '';
        var dest_city = '';
        var geoc = new BMap.Geocoder();
        geoc.getLocation(origin, function(rs){
            origin_city = rs.addressComponents.city;
        });
        geoc.getLocation(dest, function(rs){
            dest_city = rs.addressComponents.city;
        });

        data['task']['origin_region'] = origin_city;
        data['task']['destination_region'] = dest_city;
        var path = getPath(data);
        drawPath(taskVehicle['number'], path);

        map.removeEventListener("click",selectDes);
        markerList[taskVehicle['number']]['marker'].setAnimation(null);
    } else{
    }
}

function drawPath(number, pathArr){
    var pathSize = pathArr.length;
    var path = [];

    for (var i = 0; i < pathSize; i++) {
        point = new BMap.Point(0,0);
        point.lng = parseFloat(pathArr[i].lng);
        point.lat = parseFloat(pathArr[i].lat);
        path.push(point);
    }
    var polyline = new BMap.Polyline(
        path,
        {strokeColor:"blue", strokeWeight:6, strokeOpacity:0.5}
    );
    if (markerList[number]['polyine'] != undefined) {
        map.removeOverlay(markerList[number]['polyine']);
        map.removeOverlay(markerList[number]['destMarker']);
    }

    var point = new BMap.Point(0,0);
    point.lng = parseFloat(pathArr[pathSize - 1].lng);
    point.lat = parseFloat(pathArr[pathSize - 1].lat);
    markerList[number]['destMarker'] = new BMap.Marker(point, {icon: destIcon});
    map.addOverlay(markerList[number]['destMarker']);
    markerList[number]['destMarker'].addEventListener("click", function() {
        displayVehicle(number);
    });

    markerList[number]['polyine'] = polyline;
    map.addOverlay(polyline);    
}


var p3 = new BMap.Point(116.404,39.915);
var p4 = new BMap.Point(116.358328,39.919141);