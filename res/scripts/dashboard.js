var userID;

$(document).ready(function(){
    //alert("dash ready");
    resumeSession(function(result){
        userID = result.user;
        //alert("ID: " + userID);
        $.ajax({
            url: "https://paninos.ddns.net/food-api/API/permission/getPermissionByUserID.php",
            type: "GET",
            data: {
                ID: userID
            },
            success: function(result){
                //alert("got permission: " + result[0].permission);
                checkPermission(result[0].permission);
            },
            error: function(xhr, textStatus, errorThrown){
                alert(errorThrown);
            }
        });
    });

});

function checkPermission(permission){
    //alert("Permission: " + permission);
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

$("#btnUsers").click(function(){
    window.location.replace("users.html");
});

$("#btnOrder").click(function(){
    window.location.replace("Venditore/mostra_ordini.html");
});

$("#btnStorage").click(function(){
    window.location.replace("inventory.html");
});
