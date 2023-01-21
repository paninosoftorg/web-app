var userID;
var userPerm;

$(document).ready(function(){
    alert("acc ready");
    resumeSession(function(result){
        userID = result.user;
        alert("ID: " + userID);
        $.ajax({
            url: "https://paninos.ddns.net/food-api/API/permission/getPermissionByUserID.php",
            type: "GET",
            data: {
                ID: userID
            },
            success: function(result){
                alert(result[0].permission);
                userPerm = result[0].description;
                alert("perm:" + userPerm);
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
            alert("name:" + result[0].name);
            setParams(result[0]);
        },
        error: function(xhr, textStatus, errorThrown){
            alert(errorThrown);
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