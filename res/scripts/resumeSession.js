var sessionToken;
var locarray = window.location.pathname.split("/");
var lastItem = locarray[locarray.length - 1];

function resumeSession(_callback) {
    var sessionCookie = getCookie("sessionToken");

    if(!sessionCookie && lastItem.split("?")[0] != "index.html"){
        window.location.replace("index.html?type=signin");
        return null;
    }

    if(!sessionCookie){
        return null;
    }

    $.ajax({
        type: 'GET',
        url: 'https://paninos.ddns.net/food-api/API/sessionToken/getUserByToken.php',
        data: {
            token: sessionCookie
        },
        success: function(result) {
            if(checkSessionExpiry(result[0])){
                _callback(result[0]);
            }
        },
        error: function(xhr, textStatus, errorThrown){
            alert(errorThrown);
        }
    });
}

function checkSessionExpiry(result){
    var date = new Date(result.expiry);

    if(new Date() > date && lastItem != "index.html"){
        window.location.replace("index.html?type=signin&callback=" + window.location.pathname);
        setCookie("sessionToken", "", "");
        alert("Sessione scaduta");
        return false;
    }else{
        if(lastItem == "index.html"){
            window.location.replace("dashboard.html");
        }
        return true;
    }
}