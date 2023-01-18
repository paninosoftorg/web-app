$('#signin_goto_submit').click(function(){
    var email = $('#signin_input_email').val();
    var password = $('#signin_input_password').val(); 
    
    
    $.ajax({
        type: "POST",
        url: "http://paninos.ddns.net/food-api/API/user/login.php",
        data: JSON.stringify({
            "email": email,
            "password": password
        }),
        success: function(result) {
            alert("API request successful: " + result.userID);
        },
        error: function(xhr, textStatus, errorThrown){
            alert(errorThrown);
        }
      });
});
