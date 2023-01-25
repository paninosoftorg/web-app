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
                if(!managePermissions(result[0].permission, sections.users)){
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
    var li = "";
    getUsers(function (userArray) {
        userArray.forEach(element => {
            console.log(element.name);
            li += "<ul id=\"row\"><li>" + element.name + "</li><li>" + element.surname + "</li><li>" + element.year + element.section + "</li><li>" + element.email + "</li></ul>"
        });
        $(".container").html(li);
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