var userID;

$(document).ready(function () {
    manageStorage();

    resumeSession(function (result) {
        userID = result.user;
        //alert("ID: " + userID);
        $.ajax({
            url: "https://paninos.ddns.net/food-api/API/permission/getPermissionByUserID.php",
            type: "GET",
            data: {
                ID: userID
            },
            success: function (result) {
                //alert("got permission: " + result[0].permission);
                if (!managePermissions(result, sections.inventory)) {
                    window.location.replace("dashboard.html");
                }
            },
            error: function (xhr, textStatus, errorThrown) {
                alert(errorThrown);
            }
        });
    });
});

function manageStorage() {
    showProductList();
}

function showProductList() {
    var li = "<div class=\"item-details item-header\"><div class=\"id-column\"><p>ID</p></div><div class=\"id-name\"><p>Nome</p></div><div class=\"id-price\"><p>Prezzo</p></div><div class=\"id-column\"><p>Tag</p></div><div class=\"id-column\"><p>Quantità</p></div></div>";
    getProducts(function (productArray) {
        productArray.forEach(element => {
            console.log(element.name);

            li += "<button class=\"item-details\" onClick=\"selectProduct(this)\" id=\"" + element.id + "\"><div class=\"id-column\"><p>" + element.id + "</p></div><div class=\"id-name\"><p>" + element.name + "</p></div><div class=\"id-price\"><p>" + element.price + "</p></div><div class=\"id-column\"><p>" + element.tag + "</p></div><div class=\"id-column\"><p>" + element.quantity + "</p></div></button>";
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

function selectProduct(button) {
    $.ajax({
        url: "https://paninos.ddns.net/food-api/API/product/getProduct.php",
        type: "GET",
        data: {
            PRODUCT_ID: button.id
        },
        success: function (result) {
            showProduct(result[0]);
        },
        error: function (xhr, textError, errorStatus) {
            alert(errorStatus);
        }
    });
}

function showProduct(product) {
    $("#edit_form_ID").attr("placeholder", product.id);
    $("#edit_form_Nome").attr("placeholder", product.name);
    $("#edit_form_Prezzo").attr("placeholder", product.price);
    $("#edit_form_Tags").attr("placeholder", product.tag);
    $("#edit_form_Quantita").attr("placeholder", product.quantity);
}

function updateProduct(name, price, tag, quantity) {

}