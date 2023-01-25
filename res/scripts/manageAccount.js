var userID;
var userPerm;

$(document).ready(function(){
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
                getUser();
            },
            error: function(xhr, textStatus, errorThrown){
                alert(errorThrown);
            }
        });
    });
});

function getUser(){
    $.ajax({
        url: "https://paninos.ddns.net/food-api/API/user/getUser.php",
        type: "GET",
        data: {
            id: userID
        },
        success: function(result){
            setParams(result[0]);
        },
        error: function(xhr, textStatus, errorThrown){
            alert("Error:" + errorThrown);
        }
    });
}

function setParams(user){
    $("#name").html(user.name);
    $("#surname").html(user.surname);
    $("#email").html(user.email);
    $("#role").html(userPerm);
}

$("#btnLogout").click(function(){
    logout();
});