function pageInit() {
    var admin_page = "\
         <ul>\
            <li><button id = 'add'>Add</button></li> \
            <li><button id = 'delete'>Delete</button></li> \
            <li><button id = 'edit'>Edit</button></li> \
        </ul>";
    var manager_page = "\
         <ul>\
            <li><button id = 'refresh'>Refresh</button></li> \
        </ul>";
    if (onlineUser['type'] == 'admin')
        $('#oplist').html(admin_page);
    else
        $('#oplist').html(manager_page);
        $('#refresh').parent().css('width', '100%');
}


function itemInit() {
    $('#user').click(function(){
        state = 0;
        currentVehicle = "";
        currentProject = "";
        refreshUserList();
    });

    $('#vehicle').click(function(){
        state = 1;
        currentUser = "";
        currentProject = "";
        refreshVehicleList();
    });

    $('#project').click(function(){
        state = 2;
        currentVehicle = "";
        currentUser = "";
        refreshProjectList();
    });
}


function opInit() {
    if (onlineUser['type'] == 'admin') {
        $('#add').click(function(){
            switch(state) {
                case 0: addUser(); break;
                case 1: addVehicle(); break;
                case 2: addProject(); break;
            }
        });

        $('#delete').click(function(){
            switch(state) {
                case 0: 
                    if (currentUser != '') {
                        deleteUser(currentUser);
                        currentUser = '';
                    }else {
                        $('#display').html('Please choose one user!');
                    }
                    break;
                case 1: 
                    if (currentVehicle != '') {
                        deleteVehicle(currentVehicle);
                        currentVehicle = '';
                    }else {
                        $('#display').html('Please choose one vehicle!');
                    }
                    break;
                case 2: 
                    if (currentProject != '') {
                        deleteProject(currentProject);
                        currentProject = '';
                    }else {
                        $('#display').html('Please choose one user!');
                    }
                    break;
            }
        });

        $('#edit').click(function(){
            switch(state) {
                case 0: 
                    if (currentUser != '') {
                        editUser(currentUser);
                    }else {
                        $('#display').html('Please choose one user!');
                    }
                    break;
                case 1: 
                    if (currentVehicle != '') {
                        editVehicle(currentVehicle);
                    }else {
                        $('#display').html('Please choose one vehicle!');
                    }
                    break;
                case 2: 
                    if (currentProject != '') {
                        editProject(currentProject);
                    }else {
                        $('#display').html('Please choose one project!');
                    }
                    break;
            }
        });
    }
    else {
        $('#refresh').click(function(){
            switch(state) {
                case 0: getAllUser();  refreshUserList(); break;
                case 1: getAllVehicle(); refreshVehicleList(); break;
                case 2: getAllProject(); refreshProjectList(); break;
            }
        });
    }
}