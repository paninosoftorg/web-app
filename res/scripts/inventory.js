$(document).ready(function () {
    manageStorage();
});

function manageStorage() {
    showProducts();
}

function showProducts() {
    var li = "<div class=\"item-details item-header\"><div class=\"id-column\"><p>ID</p></div><div class=\"id-name\"><p>Nome</p></div><div class=\"id-price\"><p>Prezzo</p></div><div class=\"id-column\"><p>Tag</p></div><div class=\"id-column\"><p>Quantità</p></div></div>";
    getProducts(function (productArray) {
        productArray.forEach(element => {
            console.log(element.name);
            
            li += "<button class=\"item-details\" onClick=\"selectProduct(this)\" id=\""+element.id+"\"><div class=\"id-column\"><p>" + element.id + "</p></div><div class=\"id-name\"><p>" + element.name + "</p></div><div class=\"id-price\"><p>"+element.price+"</p></div><div class=\"id-column\"><p>"+element.tag+"</p></div><div class=\"id-column\"><p>"+element.quantity+"</p></div></button>";
            //<div class=\"checklist-column\"><p><input type=\"checkbox\" name=\"checklist\" id=\"checklist\"></p></div>
        });
        $(".inventory-list-items").html(li);
    });
}

function getProducts(_callback) {
    $.ajax({
        url: "https://paninos.ddns.net/food-api/API/product/getArchiveProducts.php",
        type: "GET",
        success: function (result) {
            _callback(result);
        },
        error: function (xhr, textError, errorStatus) {
            alert(errorStatus);
        }
    });
}

function selectProduct(button){
    alert(button.id);
}