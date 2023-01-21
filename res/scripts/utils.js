const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

function isBlank(str) {
    return (!str || /^\s*$/.test(str));
}

function ValidateEmail(email) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        return (true)
    }
    return (false)
}

function InventoryListHeight() {
    var height = $(window).height() - $(".top-header").height() - 40;
    $(".inventory-screen").height(height);
}