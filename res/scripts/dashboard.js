var userID;

$(document).ready(function(){
    alert("dash ready");
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
                checkPermission();
            },
            error: function(xhr, textStatus, errorThrown){
                alert(errorThrown);
            }
        });
    });
    
});

function checkPermission(permission){
    if(permission != 1 & permission != 2 ){
        $("#btnUsers").remove();
    }
    if(permission != 1 && permission != 2 && permission != 3){
        $("#btnStorage").remove();
        $("#btnOrders").remove();
    }
}

$("#btnLogout").click(function(){
    logout();
});