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
    if(permission = 1 && permission = 2 ){
        $("#btnUsers").show();
    }
    if(permission = 1 && permission = 2 && permission = 3){
        $("#btnStorage").show();
        $("#btnOrders").show();
    }
}

$("#btnLogout").click(function(){
    logout();
});

$("#btnUsers").click(function(){
    window.location.href = "users.html";
});

$("#btnOrder").click(function(){
    window.location.href = "orders.html";
});

$("#btnStorage").click(function(){
    window.location.href = "inventory.html";
});
