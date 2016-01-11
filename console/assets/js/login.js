
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
        crossDomain: true,
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