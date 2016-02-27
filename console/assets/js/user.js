function getCurrentUser() {
    var result = {};
    $.ajax({
        url: '/controller/user/current',
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
        onlineUser = result['data'];
        return true;
    }else {
        return false;
    }
}

function getAllUser(){
    var result = {};
    $.ajax({
        url: '/controller/user/getAllUser',
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
            userList = result['data'];
        }else {
            userList = []
            for (var i = 0; i < result['data'].length; i++) {
                if (result['data'][i]['project_id'] == onlineUser['project_id']) {
                    userList.push(result['data'][i]);
                }
            }
        }
    }
}

function refreshUserList() {
    getAllUser();

    list = '<table><tr><th>Name</th><th>Type</th><th>Status</th></tr>';
    for (var i = 0; i < userList.length; i++) {
        var row = '<tr>';
        row = row + '<td>' + userList[i]['name'] + '</td>';
        row = row + '<td>' + userList[i]['type'] + '</td>';
        row = row + '<td>' + userList[i]['status'] + '</td>';
        row = row + '</tr>';
        list += row;
    }
    list += '</table>';
    $('#list').html(list);

    $('tr').click(function() {
        $(this).parent().children("tr").css("background", "#ffffff");
        $(this).css("background", "#1E90FF");
        var username = $(this).children().first().text();
        currentUser = username;
        displayUser(username);
    });
}

function displayUser(username) {
    var user = {};
    projectname = '';

    for (var i = 0; i < userList.length; i++) {
        if (username == userList[i]['user_name']) {
            user = userList[i];
            break;
        }
    }

    for (var i = 0; i < vehicleList.length; i++) {
        if (user['vehicle_id'] == vehicleList[i]['id']) {
            vehiclenumber = vehicleList[i]['number'];
            break;
        }
    }

    for (var i = 0; i < projectList.length; i++) {
        if (user['project_id'] == projectList[i]['id']) {
            projectname = projectList[i]['name'];
            break;
        }
    }

    info = '<table>';
    info += '<tr><th>User Name</th><td>' + user['user_name'] + '</td></tr>';
    info += '<tr><th>Name</th><td>' + user['name'] + '</td></tr>';
    info += '<tr><th>Type</th><td>' + user['type'] + '</td></tr>';
    info += '<tr><th>Project</th><td>' + projectname + '</td></tr>';
    if (user['type'] == 'driver')
        info += '<tr><th>Vehicle</th><td>' + vehiclenumber + '</td></tr>';
    info += '<tr><th>Phone</th><td>' + user['phone'] + '</td></tr>';
    info += '<tr><th>Status</th><td>' + user['status'] + '</td></tr>';
    info += '</table>';
    $('#display').html(info);
}

function addUser() {
    page = "<div id = 'user_page'>  \
        <h1>Add User</h1>\
        <form>\
            User Name <input type='text' id='username' placeholder='请输入您的用户名！'><br />\
            Password   &nbsp  <input type='password' id='password' placeholder='请输入您的用户密码！'><br />\
            Name  &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp       <input type='text' id='name' placeholder='请输入您的用户名！'><br />\
            Type     &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp        <input type='text' id='type' placeholder='请输入您的用户名！'><br />\
            Phone       &nbsp&nbsp&nbsp&nbsp&nbsp    <input type='text' id='phone' placeholder='请输入您的用户名！'><br />\
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
        var username = $('#username').val();
        var password = $('#password').val();
        var name = $('#name').val();
        var type = $('#type').val();
        var phone = $('#phone').val();
        if(username == '') {
            $('.error').fadeOut('fast', function(){
                $(this).css('top', '5px');
            });
            $('.error').fadeIn('fast', function(){
                $(this).parent().find('#username').focus();
            });
            return false;
        }
        
        if(password == '') {
            $('.error').fadeOut('fast', function(){
                $(this).css('top', '52px');
            });
            $('.error').fadeIn('fast', function(){
                $(this).parent().find('#password').focus();
            });
            return false;
        }

        if(name == '') {
            $('.error').fadeOut('fast', function(){
                $(this).css('top', '99px');
            });
            $('.error').fadeIn('fast', function(){
                $(this).parent().find('#name').focus();
            });
            return false;
        }

        if(type == '') {
            $('.error').fadeOut('fast', function(){
                $(this).css('top', '146px');
            });
            $('.error').fadeIn('fast', function(){
                $(this).parent().find('#type').focus();
            });
            return false;
        }

        if(phone == '') {
            $('.error').fadeOut('fast', function(){
                $(this).css('top', '193px');
            });
            $('.error').fadeIn('fast', function(){
                $(this).parent().find('#phone').focus();
            });
            return false;
        }

        var data = {
            "user_name" : username,
            "password" : password,
            "name": name,
            "type": type,
            "phone": phone
        };
        var result = {};
        $.ajax({
            url: '/controller/user/addUser',
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
            refreshUserList();
            displayUser(username);
        }else {
            $('#display').html(result['message']);
        }
    });
}

function deleteUser(username) {
    var user = {};
    for (var i = 0; i < userList.length; i++) {
        if (username == userList[i]['user_name']) {
            user = userList[i];
            break;
        }
    }

    var result = {};
    var data = user;
    $.ajax({
        url: '/controller/user/deleteUser',
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
        refreshUserList();
        $('#display').html('Deleted!');
    }else {
        $('#display').html(result['message']);
    }
}

function editUser(username) {
    var user = {};
    for (var i = 0; i < userList.length; i++) {
        if (username == userList[i]['user_name']) {
            user = userList[i];
            break;
        }
    }

    page = "<div id = 'user_page'>  \
        <h1>Edit User</h1>\
        <form>\
            User Name <input type='text' id='username' placeholder='请输入您的用户名！'><br />\
            Password   &nbsp  <input type='password' id='password' placeholder='请输入您的用户密码！'><br />\
            Name  &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp       <input type='text' id='name' placeholder='请输入您的用户名！'><br />\
            Type     &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp        <input type='text' id='type' placeholder='请输入您的用户名！'><br />\
            Phone       &nbsp&nbsp&nbsp&nbsp&nbsp    <input type='text' id='phone' placeholder='请输入您的用户名！'><br />\
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

    $('#username').val(user['user_name']);
    $('#password').val('');
    $('#name').val(user['name']);
    $('#type').val(user['type']);
    $('#phone').val(user['phone']);

    $('#cancel_button').click(function(){
        $('#display').html('');
    });

    $('#confirm_button').click(function(){
        var username = $('#username').val();
        var password = $('#password').val();
        var name = $('#name').val();
        var type = $('#type').val();
        var phone = $('#phone').val();
        if(username == '') {
            $('.error').fadeOut('fast', function(){
                $(this).css('top', '5px');
            });
            $('.error').fadeIn('fast', function(){
                $(this).parent().find('#username').focus();
            });
            return false;
        }

        if(name == '') {
            $('.error').fadeOut('fast', function(){
                $(this).css('top', '99px');
            });
            $('.error').fadeIn('fast', function(){
                $(this).parent().find('#name').focus();
            });
            return false;
        }

        if(type == '') {
            $('.error').fadeOut('fast', function(){
                $(this).css('top', '146px');
            });
            $('.error').fadeIn('fast', function(){
                $(this).parent().find('#type').focus();
            });
            return false;
        }

        if(phone == '') {
            $('.error').fadeOut('fast', function(){
                $(this).css('top', '193px');
            });
            $('.error').fadeIn('fast', function(){
                $(this).parent().find('#phone').focus();
            });
            return false;
        }
        user['user_name'] = username;
        if (user['password'] != '')
            user['password'] = password;
        user['type'] = type;
        user['name'] = name;
        user['phone'] = phone;

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
            refreshUserList();
            displayUser(username);
        }else {
            $('#display').html(result['message']);
        }
    });

}