function showNoProUser(id){
    var list = {};
    var add_user_pro = '';

    list ="<div><button type='button' id='add_user'>Add User</button> \
            <button type='button' id='back'>Back</button></div>";
    list += "<div><table><tr><th colspan = '3'>User Not In Project</th></tr><tr><th>Name</th><th>Type</th><th>Status</th></tr>";
    for (var i  = 0; i < userList.length; i++) {
        if (userList[i]['project_id'] == '') {
            var row = '<tr>';
            row += '<td>' + userList[i]['name'] + '</td>';
            row += '<td>' + userList[i]['type'] + '</td>';
            row += '<td>' + userList[i]['status'] + '</td>';
            row += '</tr>';
            list += row;
        }
    }
    list +='</div>';
    $('#display').html(list);
    $('#add_user').css('height', '10%');
    $('#add_user').css('width', '49%');
    $('#back').css('height', '10%');
    $('#back').css('width', '49%');

    $('tr').click(function() {
        $(this).parent().children("tr").css("background", "#ffffff");
        $(this).css("background", "#1E90FF");
        add_user_pro = $(this).children().first().text();
    });

    $('#back').click(function(){
        showProUser(id);
    });

    $('#add_user').click(function(){
        var user_id = "";
        for (var i = 0; i < userList.length; i++) {
            if (add_user_pro == userList[i]['user_name']) {
                user_id = userList[i]['id'];
                break;
            }
        }

        var data = {
            'user_id': user_id,
            'project_id': id,
            'op': 1
        }
        var result = {};
        $.ajax({
            url: '/controller/user/assignProject',
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
            getAllUser();
            showNoProUser(id);
        }else {
            $('#display').html(result['message']);
        }
    });
}

function showProUser(id){
    var list = {};
    var del_user_pro = '';

    list ="<div><button type='button' id='add_user_pro'>Add User To Pro</button> \
            <button type='button' id='del_user_pro'>Delete User From Pro</button></div>";
    list += "<div><table><tr><th colspan = '3'>User In Project</th></tr><tr><th>Name</th><th>Type</th><th>Status</th></tr>";
    for (var i  = 0; i < userList.length; i++) {
        if (userList[i]['project_id'] == id) {
            var row = '<tr>';
            row += '<td>' + userList[i]['name'] + '</td>';
            row += '<td>' + userList[i]['type'] + '</td>';
            row += '<td>' + userList[i]['status'] + '</td>';
            row += '</tr>';
            list += row;
        }
    }
    list +='</div>';
    $('#display').html(list);
    $('#add_user_pro').css('height', '10%');
    $('#add_user_pro').css('width', '49%');
    $('#del_user_pro').css('height', '10%');
    $('#del_user_pro').css('width', '49%');

    $('tr').click(function() {
        $(this).parent().children("tr").css("background", "#ffffff");
        $(this).css("background", "#1E90FF");
        del_user_pro = $(this).children().first().text();
    });

    $('#add_user_pro').click(function(){
        showNoProUser(id);
    });

    $('#del_user_pro').click(function(){
        var user_id = "";
        for (var i = 0; i < userList.length; i++) {
            if (del_user_pro == userList[i]['user_name']) {
                user_id = userList[i]['id'];
                break;
            }
        }

        var data = {
            'user_id': user_id,
            'project_id': id,
            'op': 0
        }
        var result = {};
        $.ajax({
            url: '/controller/user/assignProject',
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
            getAllUser();
            showProUser(id);
        }else {
            $('#display').html(result['message']);
        }
    });
}

function showNoProVehicle(id){
    var list = {};
    var add_vehicle_pro = '';

    list ="<div><button type='button' id='add_vehicle'>Add Vehicle</button> \
            <button type='button' id='back'>Back</button></div>";
    list += "<div><table><tr><th colspan = '3'>Vehicle Not In Project</th></tr><tr><th>Name</th><th>Type</th><th>Status</th></tr>";
    for (var i  = 0; i < vehicleList.length; i++) {
        if (vehicleList[i]['project_id'] == '') {
            var row = '<tr>';
            row += '<td>' + vehicleList[i]['number'] + '</td>';
            row += '<td>' + vehicleList[i]['status'] + '</td>';
            row += '</tr>';
            list += row;
        }
    }
    list +='</div>';
    $('#display').html(list);
    $('#add_vehicle').css('height', '10%');
    $('#add_vehicle').css('width', '49%');
    $('#back').css('height', '10%');
    $('#back').css('width', '49%');

    $('tr').click(function() {
        $(this).parent().children("tr").css("background", "#ffffff");
        $(this).css("background", "#1E90FF");
        add_vehicle_pro = $(this).children().first().text();
    });

    $('#back').click(function(){
        showProVehicle(id);
    });

    $('#add_vehicle').click(function(){
        var vehicle_id = "";
        for (var i = 0; i < vehicleList.length; i++) {
            if (add_vehicle_pro == vehicleList[i]['number']) {
                vehicle_id = vehicleList[i]['id'];
                break;
            }
        }

        var data = {
            'vehicle_id': vehicle_id,
            'project_id': id,
            'op': 1
        }
        var result = {};
        $.ajax({
            url: '/controller/vehicle/assignProject',
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
            getAllVehicle();
            showNoProVehicle(id);
        }else {
            $('#display').html(result['message']);
        }
    });
}

function showProVehicle(id){
    var list = {};
    var del_vehicle_pro = '';

    list ="<div><button type='button' id='add_vehicle'>Add Vehicle To Pro</button> \
            <button type='button' id='del_vehicle'>Del Vehicle From Pro</button></div>";
    list += "<div><table><tr><th colspan = '3'>Vehicle In Project</th></tr><tr><th>Name</th><th>Type</th><th>Status</th></tr>";
    for (var i  = 0; i < vehicleList.length; i++) {
        if (vehicleList[i]['project_id'] == id) {
            var row = '<tr>';
            row += '<td>' + vehicleList[i]['number'] + '</td>';
            row += '<td>' + vehicleList[i]['status'] + '</td>';
            row += '</tr>';
            list += row;
        }
    }
    list +='</div>';
    $('#display').html(list);
    $('#add_vehicle').css('height', '10%');
    $('#add_vehicle').css('width', '49%');
    $('#del_vehicle').css('height', '10%');
    $('#del_vehicle').css('width', '49%');

    $('tr').click(function() {
        $(this).parent().children("tr").css("background", "#ffffff");
        $(this).css("background", "#1E90FF");
        del_vehicle_pro = $(this).children().first().text();
    });

    $('#add_vehicle').click(function(){
        showNoProVehicle(id);
    });

    $('#del_vehicle').click(function(){
        var vehicle_id = "";
        for (var i = 0; i < vehicleList.length; i++) {
            if (del_vehicle_pro == vehicleList[i]['number']) {
                vehicle_id = vehicleList[i]['id'];
                break;
            }
        }

        var data = {
            'vehicle_id': vehicle_id,
            'project_id': id,
            'op': 0
        }
        var result = {};
        $.ajax({
            url: '/controller/vehicle/assignProject',
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
            getAllVehicle();
            showProVehicle(id);
        }else {
            $('#display').html(result['message']);
        }
    });
}


function getAllProject(){
    var result = {};
    $.ajax({
        url: '/controller/project/getAllProject',
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
            projectList = result['data'];
        }else {
            projectList = []
            for (var i = 0; i < result['data'].length; i++) {
                if (result['data'][i]['id'] == onlineUser['project_id']) {
                    projectList.push(result['data'][i]);
                    break;
                }
            }
        }
    }
}

function refreshProjectList() {
    getAllProject();

    list = '<table><tr><th>Name</th><th>Description</th></tr>';
    for (var i = 0; i < projectList.length; i++) {
        var row = '<tr>';
        row = row + '<td>' + projectList[i]['name'] + '</td>';
        row = row + '<td>' + projectList[i]['description'] + '</td>';
        row = row + '</tr>';
        list += row;
    }
    list += '</table>';
    $('#list').html(list);

    $('tr').click(function() {
        $(this).parent().children("tr").css("background", "#ffffff");
        $(this).css("background", "#1E90FF");
        var project = $(this).children().first().text();
        currentProject = project;
        displayProject(project);
    });
}

function displayProject(name) {
    var project = {};
    for (var i = 0; i < projectList.length; i++) {
        if (name == projectList[i]['name']) {
            project = projectList[i];
            break;
        }
    }

    info = '<table>';
    info += '<tr><th>Name</th><td>' + project['name'] + '</td></tr>';
    info += '<tr><th>Description</th><td>' + project['description'] + '</td></tr>';
    info += '</table>';
    if (onlineUser['type'] == 'admin') {
        info += "<div align = 'center'><button type='button' id='user_manager'>Manage user</button> \
            <button type='button' id='vehicle_manager'>Manage vehicle</button></div>";
            $('#user_manager').css('height', '10%');
            $('#user_manager').css('width', '35%');
            $('#user_manager').css('margin', '10px');
            $('#vehicle_manager').css('margin', '10px');
            $('#vehicle_manager').css('height', '10%');
            $('#vehicle_manager').css('width', '35%');
            $('#display').html(info);

            $('#user_manager').click(function(){
                showProUser(project['id']);
            });

            $('#vehicle_manager').click(function(){
                showProVehicle(project['id']);
            });
    }else {
        $('#display').html(info);
    }
}

function addProject() {
    page = "<div id = 'project_page'>  \
        <h1>Add Project</h1>\
        <form>\
            Name  &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp       <input type='text' id='name' placeholder='Please input project name'><br />\
            Type     &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp        <input type='text' id='description' placeholder='Please input description'><br />\
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
        var name = $('#name').val();
        var description = $('#description').val();

        if(name == '') {
            $('.error').fadeOut('fast', function(){
                $(this).css('top', '5px');
            });
            $('.error').fadeIn('fast', function(){
                $(this).parent().find('#name').focus();
            });
            return false;
        }

        if(description == '') {
            $('.error').fadeOut('fast', function(){
                $(this).css('top', '52px');
            });
            $('.error').fadeIn('fast', function(){
                $(this).parent().find('#description').focus();
            });
            return false;
        }

        var data = {
            "name": name,
            "description": description
        };
        var result = {};
        $.ajax({
            url: '/controller/project/addProject',
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
            refreshProjectList();
            displayProject(name);
        }else {
            $('#display').html(result['message']);
        }
    });
}

function deleteProject(name) {
    var project = {};
    for (var i = 0; i < projectList.length; i++) {
        if (name == projectList[i]['name']) {
            project = projectList[i];
            break;
        }
    }

    var result = {};
    var data = project;
    $.ajax({
        url: '/controller/project/deleteProject',
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
        refreshProjectList();
        $('#display').html('Deleted!');
    }else {
        $('#display').html(result['message']);
    }
}

function editProject(name) {
    var project = {};
    for (var i = 0; i < projectList.length; i++) {
        if (name == projectList[i]['name']) {
            project = projectList[i];
            break;
        }
    }

    page = "<div id = 'project_page'>  \
        <h1>Edit Project</h1>\
        <form>\
            Name  &nbsp&nbsp       <input type='text' id='name' placeholder='Please input project name'><br />\
            Descr   &nbsp&nbsp       <input type='text' id='description' placeholder='Please input description'><br />\
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

    $('#name').val(project['name']);
    $('#description').val(project['description']);

    $('#cancel_button').click(function(){
        $('#display').html('');
    });

    $('#confirm_button').click(function(){
        var name = $('#name').val();
        var description = $('#description').val();

        if(name == '') {
            $('.error').fadeOut('fast', function(){
                $(this).css('top', '5px');
            });
            $('.error').fadeIn('fast', function(){
                $(this).parent().find('#name').focus();
            });
            return false;
        }

        if(description == '') {
            $('.error').fadeOut('fast', function(){
                $(this).css('top', '52px');
            });
            $('.error').fadeIn('fast', function(){
                $(this).parent().find('#description').focus();
            });
            return false;
        }

        project['name'] = name;
        project['description'] = description;

        var data = project;
        var result = {};
        $.ajax({
            url: '/controller/project/editProject',
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
            refreshProjectList();
            displayProject(name);
        }else {
            $('#display').html(result['message']);
        }
    });

}