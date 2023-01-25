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
    //alert(permission);
    switch(permission){
        case "1":
            $("#btnOrder").removeClass('hidden-by-default');
            $("#btnStorage").removeClass('hidden-by-default');
            $("#btnUsers").removeClass('hidden-by-default');
            break;
        case "2":
            $("#btnOrder").removeClass('hidden-by-default');
            $("#btnStorage").removeClass('hidden-by-default');
            $("#btnUsers").removeClass('hidden-by-default');
            break; 
        case "3":
            $("#btnOrder").removeClass('hidden-by-default');
            //$("btnStorage").remove();
            //$("btnUsers").remove();
            break; 
        default:
            alert("No permesso");
            break; 
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
