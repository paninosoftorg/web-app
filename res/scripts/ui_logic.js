const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

switch (urlParams.get('type')) {
    case "signin":
        splideShowNext("signin_step_email");
        ShowExtraMessage(1)
        break;
    case "signup":
        //splideShowNext("signup_step_name");
        ShowExtraMessage(2)
        break;
    default:
        splideReset();
        document.getElementById('extra_message').style.display = "none";
        splideShowNext("error");
        break;
}

document.getElementById('signin_goto_step_password').addEventListener('click', () => {
    if (document.getElementById('signin_input_email').checkValidity()) {
        splideShowNext("signin_step_password");
        ShowExtraMessage(0)
    }
});

document.getElementById('signin_goto_step_email').addEventListener('click', () => {
    splideBack("signin_step_email");
    ShowExtraMessage(1)
});

function ShowExtraMessage(id) {
    let messages = ['<a href="#">Recupera una password dimenticata</a>', '<a href="#">Crea un nuovo account Paninosoft</a>', '<a href="#">Accedi al tuo account Paninosoft</a>'];
    document.getElementById('extra_message').innerHTML = messages[id];
}