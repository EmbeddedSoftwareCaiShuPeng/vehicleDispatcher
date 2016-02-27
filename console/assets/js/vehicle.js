
function getPath(data) {
    var result = {};
    $.ajax({
        url: '/controller/vehicle/assignTask',
        type: 'POST',
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify(data),
        async: false,
        success: function(info) {
            result = info;
        },
        error: function() {
            alert("error ! ");
        }
    });
    if (result['result'] == 1) {
        return result['data'];
    }else {
        $('#display').html(result['message']);
        return {};
    }
}


function getAllVehicle(){
    var result = {};
    $.ajax({
        url: '/controller/vehicle/getAllVehicle',
        type: 'GET',
        dataType: 'json',
        async: false,
        success: function(info) {
            result = info;
        },
        error: function() {
            alert("error ! ");
        }
    });
    if (result['result'] == 1) {
        if (onlineUser['type'] == 'admin') {
            vehicleList = result['data'];
        }else {
            vehicleList = []
            for (var i = 0; i < result['data'].length; i++) {
                if (result['data'][i]['project_id'] == onlineUser['project_id']) {
                    vehicleList.push(result['data'][i]);
                }
            }
        }
    }
}

function refreshVehicleList() {
    getAllVehicle();

    list = '<table><tr><th>Number</th><th>Status</th></tr>';
    for (var i = 0; i < vehicleList.length; i++) {
        var row = '<tr>';
        row = row + '<td>' + vehicleList[i]['number'] + '</td>';
        row = row + '<td>' + vehicleList[i]['status'] + '</td>';
        row = row + '</tr>';
        list += row;
    }
    list += '</table>';
    $('#list').html(list);

    $('tr').click(function() {
        $(this).parent().children("tr").css("background", "#ffffff");
        $(this).css("background", "#1E90FF");
        var number = $(this).children().first().text();
        currentVehicle = number;
        animateMarker(number);
        displayVehicle(number);
    });
}

function showUserAva(number) {
    var list = {};
    var assigned_user = '';

    list ="<div><button type='button' id='confirm'>Confirm</button> \
            <button type='button' id='back'>Back</button></div>";
    list += "<div><table><tr><th colspan = '2'>User In Project</th></tr><tr><th>Name</th><th>Status</th></tr>";
    for (var i  = 0; i < userList.length; i++) {
        if (userList[i]['vehicle_id'] == '') {
            var row = '<tr>';
            row += '<td>' + userList[i]['name'] + '</td>';
            row += '<td>' + userList[i]['status'] + '</td>';
            row += '</tr>';
            list += row;
        }
    }
    list +='</div>';
    $('#display').html(list);
    $('#confirm').css('height', '10%');
    $('#confirm').css('width', '49%');
    $('#back').css('height', '10%');
    $('#back').css('width', '49%');

    $('tr').click(function() {
        $(this).parent().children("tr").css("background", "#ffffff");
        $(this).css("background", "#1E90FF");
        assigned_user = $(this).children().first().text();
    });

    $('#back').click(function(){
        displayVehicle(number);
    });

    $('#confirm').click(function(){
        var user_id = "";
        var vehicle_id = "";
        var user = {};
        var vehicle = {};

        for (var i = 0; i < userList.length; i++) {
            if (assigned_user == userList[i]['user_name']) {
                user_id = userList[i]['id'];
                user = userList[i];
                break;
            }
        }

        for (var i = 0; i < vehicleList.length; i++) {
            if (number == vehicleList[i]['number']) {
                vehicle_id = vehicleList[i]['id'];
                vehicle = vehicleList[i];
                break;
            }
        }

        user['vehicle_id'] = vehicle_id;
        vehicle['user_id'] = user_id;

        var data = user;
        var result = {};
        $.ajax({
            url: '/controller/user/editUser',
            type: 'POST',
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify(data),
            async: false,
            success: function(info) {
                result = info;
            },
            error: function() {
                alert("error ! ");
            }
        });
        if (result['result'] == 1) {
        }else {
            $('#display').html(result['message']);
        }

        var data = vehicle;
        var result = {};
        $.ajax({
            url: '/controller/vehicle/editVehicle',
            type: 'POST',
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify(data),
            async: false,
            success: function(info) {
                result = info;
            },
            error: function() {
                alert("error ! ");
            }
        });
        if (result['result'] == 1) {
            displayVehicle(number);
        }else {
            $('#display').html(result['message']);
        }
    });
}


function displayVehicle(number) {
    var vehicle = {};
    var username = "";
    var projectname = "";

    for (var i = 0; i < vehicleList.length; i++) {
        if (number == vehicleList[i]['number']) {
            vehicle = vehicleList[i];
            break;
        }
    }

    for (var i = 0; i < userList.length; i++) {
        if (vehicle['user_id'] == userList[i]['id']) {
            username = userList[i]['user_name'];
            break;
        }
    }

    for (var i = 0; i < projectList.length; i++) {
        if (vehicle['project_id'] == projectList[i]['id']) {
            projectname = projectList[i]['name'];
            break;
        }
    }

    info = "<table>";
    info += "<tr><th>Number</th><td colspan = '2'>" + vehicle['number'] + "</td></tr>";
    info += "<tr><th>User</th><td colspan = '2'>" + username + "</td></tr>";
    info += "<tr><th>Project</th><td colspan = '2'>" + projectname + "</td></tr>";
    info += "<tr><th rowspan = '2'>Location</th><th>Lat</th><td>" + vehicle['data']['location']['lat'] + "</td></tr>";
    info += "<tr><th>Lng</th><td>" + vehicle['data']['location']['lng'] + "</td></tr>";
    info += "<tr><th>Temperature</th><td colspan = '2'>" + vehicle['data']['temp'] + "</td></tr>";
    if (vehicle['task']['path'] != undefined){
        info += "<tr><th rowspan = '2'>Destination</th><th>Lat</th><td>" + vehicle['task']['dest']['lat'] + "</td></tr>";
        info += "<tr><th>Lng</th><td>" + vehicle['task']['dest']['lng'] + "</td></tr>";
    }
    info += "<tr><th>Status</th><td colspan = '2'>" + vehicle['status'] + "</td></tr>";
    info += "</table>";
    if (onlineUser['type'] == 'admin')
        $('#display').html(info);
    else if (vehicle['user_id'] == ''){
        info += "<div><button type='button' id='assign_user'>Assign User</button>";
        $('#display').html(info);
        $('#assign_user').css('height', '10%');
        $('#assign_user').css('width', '100%');
        $('#assign_user').click(function(){
            showUserAva(number);
        });
    }else {
        info += "<div align = 'center'><button type='button' id='remove_user'>Remove User</button>";
        info += "<button type='button' id='assign_task'>Assign Task</button></div>";
        $('#display').html(info);
        $('#remove_user').css('height', '10%');
        $('#remove_user').css('width', '35%');
        $('#remove_user').css('margin', '10px');
        $('#assign_task').css('margin', '10px');
        $('#assign_task').css('height', '10%');
        $('#assign_task').css('width', '35%');

         $('#assign_task').click(function(){
            taskVehicle = vehicle;
            markerList[vehicle['number']]['marker'].setAnimation(BMAP_ANIMATION_BOUNCE);
            map.addEventListener("click",selectDes);
        });

        $('#remove_user').click(function(){
            var user_id = "";
            var vehicle_id = "";
            var user = {};

            for (var i = 0; i < userList.length; i++) {
                if (vehicle['user_id'] == userList[i]['id']) {
                    user = userList[i];
                    break;
                }
            }

            user['vehicle_id'] = '';
            vehicle['user_id'] = '';

            var data = user;
            var result = {};
            $.ajax({
                url: '/controller/user/editUser',
                type: 'POST',
                dataType: 'json',
                contentType: 'application/json',
                data: JSON.stringify(data),
                async: false,
                success: function(info) {
                    result = info;
                },
                error: function() {
                    alert("error ! ");
                }
            });
            if (result['result'] == 1) {
            }else {
                $('#display').html(result['message']);
            }

            var data = vehicle;
            var result = {};
            $.ajax({
                url: '/controller/vehicle/editVehicle',
                type: 'POST',
                dataType: 'json',
                contentType: 'application/json',
                data: JSON.stringify(data),
                async: false,
                success: function(info) {
                    result = info;
                },
                error: function() {
                    alert("error ! ");
                }
            });
            if (result['result'] == 1) {
                displayVehicle(number);
            }else {
                $('#display').html(result['message']);
            }      
        });
    }
}

function addVehicle() {
    page = "<div id = 'vehicle_page'>  \
        <h1>Add Vehicle</h1>\
        <form>\
            Number  &nbsp<input type='text' id='number' placeholder='Please input vehicle number'><br />\
            <button type='button' id='confirm_button'>Confirm</button>\
            <button type='reset' id='cancel_button'>Cancel</button>\
            <div class='error'><span>+</span></div>\
        </form>\
        <div class = 'message'></div>\
         </div>";

    $('#display').html(page);
    $('#confirm_button').css('height', '10%');
    $('#confirm_button').css('width', '30%');
    $('#confirm_button').css('margin', '10px');
    $('#cancel_button').css('margin', '10px');
    $('#cancel_button').css('height', '10%');
    $('#cancel_button').css('width', '30%');

    $('#cancel_button').click(function(){
        $('#display').html('');
    });

    $('#confirm_button').click(function(){
        var number = $('#number').val();
        if(number == '') {
            $('.error').fadeOut('fast', function(){
                $(this).css('top', '5px');
            });
            $('.error').fadeIn('fast', function(){
                $(this).parent().find('#number').focus();
            });
            return false;
        }

        var data = {
            "number" : number,
        };
        var result = {};
        $.ajax({
            url: '/controller/vehicle/addVehicle',
            type: 'POST',
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify(data),
            async: false,
            success: function(info) {
                result = info;
            },
            error: function() {
                alert("error ! ");
            }
        });
        if (result['result'] == 1) {
            refreshVehicleList();
            displayVehicle(number);
        }else {
            $('#display').html(result['message']);
        }
    });
}

function deleteVehicle(number) {
    var vehicle = {};
    for (var i = 0; i < vehicleList.length; i++) {
        if (number == vehicleList[i]['number']) {
            vehicle = vehicleList[i];
            break;
        }
    }

    var result = {};
    var data = vehicle;
    $.ajax({
        url: '/controller/vehicle/deleteVehicle',
        type: 'POST',
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify(data),
        async: false,
        success: function(info) {
            result = info;
        },
        error: function() {
            alert("error ! ");
        }
    });
    if (result['result'] == 1) {
        deleteMarker(number);
        refreshVehicleList();
        $('#display').html('Deleted!');
    }else {
        $('#display').html(result['message']);
    }
}

function editVehicle(number) {
    var vehicle = {};
    for (var i = 0; i < vehicleList.length; i++) {
        if (number == vehicleList[i]['number']) {
            vehicle = vehicleList[i];
            break;
        }
    }

    page = "<div id = 'user_page'>  \
        <h1>Edit Vehicle</h1>\
        <form align='left'>\
            Number &nbsp<input type='text' id='number' ><br />\
            <button type='button' id='confirm_button'>Confirm</button>\
            <button type='reset' id='cancel_button'>Cancel</button>\
            <div class='error'><span>+</span></div>\
        </form>\
        <div class = 'message'></div>\
         </div>";

    $('#display').html(page);
    $('#confirm_button').css('height', '10%');
    $('#confirm_button').css('width', '30%');
    $('#confirm_button').css('margin', '10px');
    $('#cancel_button').css('margin', '10px');
    $('#cancel_button').css('height', '10%');
    $('#cancel_button').css('width', '30%');

    $('#number').val(vehicle['number']);

    $('#cancel_button').click(function(){
        $('#display').html('');
    });

    $('#confirm_button').click(function(){
        var number = $('#number').val();
        if(number == '') {
            $('.error').fadeOut('fast', function(){
                $(this).css('top', '5px');
            });
            $('.error').fadeIn('fast', function(){
                $(this).parent().find('#number').focus();
            });
            return false;
        }

        vehicle['number'] = number;

        var data = vehicle;
        var result = {};
        $.ajax({
            url: '/controller/vehicle/editVehicle',
            type: 'POST',
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify(data),
            async: false,
            success: function(info) {
                result = info;
            },
            error: function() {
                alert("error ! ");
            }
        });
        if (result['result'] == 1) {
            refreshVehicleList();
            displayVehicle(number);
        }else {
            $('#display').html(result['message']);
        }
    });

}