var userID;

$(document).ready(function () {
  resumeSession(function (result) {
    userID = result.user;
    //alert("ID: " + userID);
    $.ajax({
      url: "https://paninos.ddns.net/food-api/API/permission/getPermissionByUserID.php",
      type: "GET",
      data: {
        ID: userID,
      },
      success: function (result) {
        //alert("got permission: " + result[0].permission);
        if (!managePermissions(result, sections.inventory)) {
          window.location.replace("dashboard.html");
        }else{
          manageStorage();
        }
      },
      error: function (xhr, textStatus, errorThrown) {
        alert(errorThrown);
      },
    });
  });
});

function manageStorage() {
  showProductList();
}

function showProductList() {
  var li = "";
  getProducts(function (productArray) {
    $("#table_id").DataTable({
      data: productArray,
      columns: [
        {data: 'id'},
        {data: 'name'},
        {data: 'price'},
        {data: 'tag'},
        {data: 'quantity'}
      ]
    }); 
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
    },
  });
}

function selectProduct(button) {
  $.ajax({
    url: "https://paninos.ddns.net/food-api/API/product/getProduct.php",
    type: "GET",
    data: {
      PRODUCT_ID: button.id,
    },
    success: function (result) {
      showProduct(result[0]);
    },
    error: function (xhr, textError, errorStatus) {
      alert(errorStatus);
    },
  });
}

function showProduct(product) {
  $("#edit_form_ID").attr("placeholder", product.id);
  $("#edit_form_Nome").attr("placeholder", product.name);
  $("#edit_form_Prezzo").attr("placeholder", product.price);
  $("#edit_form_Tags").attr("placeholder", product.tag);
  $("#edit_form_Quantita").attr("placeholder", product.quantity);
}

function updateProduct(name, price, tag, quantity) {}
