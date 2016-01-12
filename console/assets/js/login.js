/*
var submit_button = document.getElementById('submit_button');
var user_name = document.getElementById('user_name');
var password = document.getElementById('password');

submit_button.onclick = function() {
    var data = {
        "user_name" : user_name.value,
        "password" : password.value
    };
    console.log(data);
    $.ajax({
        url: '/controller/user/login',
        type: 'POST',
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify(data),
        async: false,
        success: function(info) {
            console.log(info);
        },
        error: function() {
            alert("error ! ");
        }
    });
};
*/

jQuery(document).ready(function() {
    $('.page-container form').submit(function(){
        var username = $(this).find('.username').val();
        var password = $(this).find('.password').val();
        if(username == '') {
            $(this).find('.error').fadeOut('fast', function(){
                $(this).css('top', '27px');
            });
            $(this).find('.error').fadeIn('fast', function(){
                $(this).parent().find('.username').focus();
            });
            return false;
        }
        
        if(password == '') {
            $(this).find('.error').fadeOut('fast', function(){
                $(this).css('top', '96px');
            });
            $(this).find('.error').fadeIn('fast', function(){
                $(this).parent().find('.password').focus();
            });
            return false;
        }

        var data = {
            "user_name" : username,
            "password" : password
        };
        var result = {};
        $.ajax({
            url: '/controller/user/login',
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
            window.location.href = "/static/console.html";
            return false;
        }else {
            $('.message').text(result['message']);
            return false;
        }
    });

});