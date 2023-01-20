$(document).ready(function(){
    alert("dash ready");
    resumeSession(function(result){
        alert(result.user);
        $("#userID").html(result.user);
    });
});

$("#logout").click(function(){
    logout();
});