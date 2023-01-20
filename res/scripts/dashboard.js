$(document).ready(function(){
    alert("dash ready");
    resumeSession(function(result){
        alert(result.user);
        $("#btnLogout").html(result.user);
    });
});

$("#btnLogout").click(function(){
    logout();
});