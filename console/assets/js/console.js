jQuery(document).ready(function() {
    getCurrentUser();
    getAllUser();
    getAllProject();
    getAllVehicle();
    refreshAllMarker();
    pageInit();
    itemInit();
    opInit();
    $('#logout').click(function(){
        var result = {};
        $.ajax({
            url: '/controller/user/logout',
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
            window.location.href = "/static/login.html";
            return false;
        }else {
            alert(result['message']);
            return false;
        }
    });
});
