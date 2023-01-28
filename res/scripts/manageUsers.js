$(document).ready(function () {
    manageUsers();
    resumeSession(function(result){
        userID = result.user;
        $.ajax({
            url: "https://paninos.ddns.net/food-api/API/permission/getPermissionByUserID.php",
            type: "GET",
            data: {
                ID: userID
            },
            success: function(result){
                userPerm = result[0].description;
                if(!managePermissions(result, sections.users)){
                    window.location.replace("dashboard.html");
                }
            },
            error: function(xhr, textStatus, errorThrown){
                alert(errorThrown);
            }
        });
    });
});

function manageUsers() {
    showUsers();
}

function showUsers() {
    getUsers(function (userArray) {
        $("#table_id").DataTable({
            data: userArray,
            columns: [
              {data: 'name'},
              {data: 'surname'},
              {data: 'year'},
              {data: 'section'},
              {data: 'email'}
            ]
          }); 
    });
}

function getUsers(_callback) {
    $.ajax({
        url: "https://paninos.ddns.net/food-api/API/user/getArchiveUsers.php",
        type: "GET",
        success: function (result) {
            _callback(result);
        },
        error: function (xhr, textError, errorStatus) {
            alert(errorStatus);
        }
    });
}