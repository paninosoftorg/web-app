$('#signin_goto_submit').click(function () {
    if (!isBlank($('#signin_input_password').val())) {
        $('#signin_error_password').html(null);
        var email = $('#signin_input_email').val();
        var password = $('#signin_input_password').val();


        $.ajax({
            type: "POST",
            url: "http://paninos.ddns.net/food-api/API/user/login.php",
            data: JSON.stringify({
                "email": email,
                "password": password
            }),
            success: function (result) {
                postSuccess(result);
            },
            error: function (xhr, textStatus, errorThrown) {
                alert(errorThrown);
            }
        });

    } else {
        $('#signin_error_password').html("Inserisci una password");
    }

});

function postSuccess(result){
    if (urlParams.get('callback') == 'self') {
        $('#post_results').html(JSON.stringify(result));
        splideReset();
        splideShowNext("result_to_self");
    } else {
        window.location.href = urlParams.get('callback') + "?userID=" + result.userID;
    }
}