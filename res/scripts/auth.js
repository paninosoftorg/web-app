const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

switch (urlParams.get('type')) {
    case "signin":
        splideShowNext("signin_step_email");
        ShowExtraMessage(0)
        break;
    case "signup":
        splideShowNext("signup_step_name");
        break;
    default:
        splideReset();
        splideShowNext("error");
        break;
}

document.getElementById('signin_goto_step_password').addEventListener('click', () => {
    if (document.getElementById('signin_input_email').checkValidity()) {
        splideShowNext("signin_step_password");
    }
});

function ShowExtraMessage(id) {
    let ids = ["signup_message", "signin_message"];
    for (let i = 0; i < ids.length; i++) {
        if (i == id) {
            document.getElementById(ids[i]).style.display = "block";
        } else {
            document.getElementById(ids[i]).style.display = "none";
        }
    }
}