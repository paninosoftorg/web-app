function logout(){
    setCookie("sessionToken", "", "");
    window.location.replace("auth.html?type=signin");
}

function generateSessionToken() {
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var tk = "";

    for (let i = 0; i < 32; i++) {
        tk += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return tk;
}

function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/;SameSite=None;Secure";
}

function getCookie(cname) {
    let name = cname + "=";
    let ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function getCookieExpiry(hours) {

    var dateCopy = new Date();

    dateCopy.setTime(dateCopy.getTime() + hours * 60 * 60 * 1000);
    dateCopy = dateCopy.toISOString();
    var date = dateCopy.split("T")[0];
    var time = dateCopy.split("T")[1].split(".")[0];
    dateCopy = date + " " + time;
    return dateCopy;

}

function createSessionToken(userID) {
    var sessionToken = generateSessionToken();
    setCookie("sessionToken", sessionToken, 1);
    var datetime = getCookieExpiry(2);

    $.ajax({
        url: 'https://paninos.ddns.net/food-api/API/sessionToken/createToken.php',
        type: 'POST',
        data: JSON.stringify({
            "user": userID,
            "token": sessionToken,
            "expiry": datetime
        }),
        success: function (response) {
            postSuccess(response);
        },
        error: function (xhr, textStatus, errorThrown) {
            alert(errorThrown);
        }
    });
}

function postSuccess(result){
    if(!urlParams.get('callback')){
        window.location.replace("dashboard.html");
    }
    else if(urlParams.get('callback') == 'self') {
        $('#post_results').html(JSON.stringify(result));
        splideReset();
        splideShowNext("result_to_self");
    } else {
        window.location.href = urlParams.get('callback');
    }
}

