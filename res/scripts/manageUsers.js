$(document).ready(function () {
    manageUsers();
});

function manageUsers() {
    showUsers();
}

function showUsers() {
    var li = "";
    getUsers(function (userArray) {
        userArray.forEach(element => {
            console.log(element.name);
            li += "<ul id=\"row\"><li>" + element.name + "</li><li>" + element.surname + "</li><li>" + element.year + element.section + "</li><li>" + element.email + "</li></ul>"
        });
        $(".container").html(li);
    });
}

function getUsers(_callback) {
    $.ajax({
        url: "https://paninos.ddns.net/food-api/API/user/getArchiveUsers.php",
        type: "GET",
        success: function (result) {
            _callback(result);
        },
        error: function (xhr, textError, errorStatus) {
            alert(errorStatus);
        }
    });
}