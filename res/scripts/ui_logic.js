switch (urlParams.get('type')) {
    case "signin":
        splideShowNext("signin_step_email");
        break;
    // case "signup":
    //     splideShowNext("signup_step_name");
    //     break;
    default:
        splideReset();
        $('#extra_message').css("display", "none");
        splideShowNext("error");
        break;
}

$('#signin_goto_step_password').on('click', function () {
    if (ValidateEmail($('#signin_input_email').val())) {
        $('#signin_error_email').html(null);
        splideShowNext("signin_step_password");
    } else {
        $('#signin_error_email').html("Inserisci un indirizzo email valido");
    }
});

document.addEventListener("keydown", (event) => {
    if (event.isComposing || event.keyCode === 13) {
        switch (splideCurrentSlide()) {
            case "signin_step_email":
                document.getElementById('signin_goto_step_password').click();
                break;
            case "signin_step_password":
                document.getElementById('signin_goto_submit').click();
                break;
        }
    }
});

splide.on('active', function () {
    switch (splideCurrentSlide()) {
        case "signin_step_email":
            ShowExtraMessage(1)
            document.getElementById('signin_input_email').focus({ focusVisible: true });
            break;
        case "signin_step_password":
            ShowExtraMessage(0)
            document.getElementById('signin_input_password').focus({ focusVisible: true });
            break;
        case "signup_step_name":
            ShowExtraMessage(2)
            break;
    }
});

$('#signin_goto_step_email').on('click', function () {
    splideBack("signin_step_email");
});

function ShowExtraMessage(id) {
    let messages = [
        '<a href="#">Recupera una password dimenticata</a>',
        '<a href="#">Crea un nuovo account Paninosoft</a>',
        '<a href="#">Accedi al tuo account Paninosoft</a>'
    ];
    $('#extra_message').html(messages[id]);
}