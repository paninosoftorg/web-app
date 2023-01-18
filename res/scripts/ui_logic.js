const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

switch (urlParams.get('type')) {
    case "signin":
        splideShowNext("signin_step_email");
        break;
    case "signup":
        //splideShowNext("signup_step_name");
        break;
    default:
        splideReset();
        document.getElementById('extra_message').style.display = "none";
        splideShowNext("error");
        break;
}

document.getElementById('signin_goto_step_password').addEventListener('click', () => {
    if (ValidateEmail(document.getElementById('signin_input_email').value)) {
        document.getElementById('signin_error_email').innerHTML = null;
        splideShowNext("signin_step_password");
    } else {
        document.getElementById('signin_error_email').innerHTML = "Inserisci un indirizzo email valido";
    }
});

document.getElementById('signin_goto_submit').addEventListener('click', () => {
    if (!isBlank(document.getElementById('signin_input_password').value)) {
        document.getElementById('signin_error_password').innerHTML = null;
        alert("Dati inviati: \n\n" + document.getElementById('signin_input_email').value + "\n\n" + document.getElementById('signin_input_password').value);
    } else {
        document.getElementById('signin_error_password').innerHTML = "Inserisci una password";
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

function isBlank(str) {
    return (!str || /^\s*$/.test(str));
}

function ValidateEmail(email) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        return (true)
    }
    return (false)
}

splide.on('active', function () {
    switch (splideCurrentSlide()) {
        case "signin_step_email":
            ShowExtraMessage(1)
            break;
        case "signin_step_password":
            ShowExtraMessage(0)
            break;
        case "signup_step_name":
            ShowExtraMessage(2)
            break;
    }
});

document.getElementById('signin_goto_step_email').addEventListener('click', () => {
    splideBack("signin_step_email");
});

function ShowExtraMessage(id) {
    let messages = ['<a href="#">Recupera una password dimenticata</a>', '<a href="#">Crea un nuovo account Paninosoft</a>', '<a href="#">Accedi al tuo account Paninosoft</a>'];
    document.getElementById('extra_message').innerHTML = messages[id];
}