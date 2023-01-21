var date = new Date();
var dd = String(date.getDate()).padStart(2, "0");
var mm = String(date.getMonth() + 1).padStart(2, "0");
var yyyy = date.getFullYear();
var fulldate = dd + "-" + mm + "-" + yyyy;
var reverse_date = yyyy + "-" + mm + "-" + dd;
var getdate = reverse_date;
var modificatedate = fulldate;

document.getElementById("datepicker").value = getdate;

function getDate() {
  var data = $("#datepicker").val();
  var today = new Date(data);
  var day = String(today.getDate()).padStart(2, "0");
  var month = String(today.getMonth() + 1).padStart(2, "0");
  var year = today.getFullYear();
  getdate = year + "-" + month + "-" + day;
  document.getElementById("datepicker").value = getdate;
  modificatedate = day + "-" + month + "-" + year;
  request();
}

function increment() {
  var today = new Date(getdate);
  today.setDate(today.getDate() + 1);
  var day = String(today.getDate()).padStart(2, "0");
  var month = String(today.getMonth() + 1).padStart(2, "0");
  var year = today.getFullYear();
  getdate = year + "-" + month + "-" + day;
  document.getElementById("datepicker").value = getdate;
  modificatedate = day + "-" + month + "-" + year;
  request();
}

function decrement() {
  var today = new Date(getdate);
  today.setDate(today.getDate() - 1);
  var day = String(today.getDate()).padStart(2, "0");
  var month = String(today.getMonth() + 1).padStart(2, "0");
  var year = today.getFullYear();
  getdate = year + "-" + month + "-" + day;
  document.getElementById("datepicker").value = getdate;
  modificatedate = day + "-" + month + "-" + year;
  request();
}

function reqListener() {
  let data = [this.responseText];
  obj = JSON.parse(data);
  var classi = [];
  var li = "";
  for (let i = 0; i < obj.length; i++) {
    for (let j = 0; j < obj[i].orders.length; j++) {
      if (obj[i].orders[j].order_creation_date == modificatedate) {
        if (classi.includes(obj[i].class)) {
          li +=
            "<li>Numero ordine: " +
            obj[i].orders[j].order_id +
            "<br> Utente: " +
            obj[i].orders[j].user_name_surname +
            "<br />" +
            obj[i].orders[j].pickup_point +
            " - " +
            obj[i].orders[j].order_creation_date +
            " - " +
            obj[i].orders[j].pickup_time +
            " - " +
            obj[i].orders[j].ordered_products +
            " - €" +
            obj[i].orders[j].total_price;
          +"<br></li>";
        } else {
          li +=
            "<li>Classe: " +
            obj[i].class +
            "<br> Numero ordine: " +
            obj[i].orders[j].order_id +
            "<br> Utente: " +
            obj[i].orders[j].user_name_surname +
            "<br />" +
            obj[i].orders[j].pickup_point +
            " - " +
            obj[i].orders[j].order_creation_date +
            " - " +
            obj[i].orders[j].pickup_time +
            " - " +
            obj[i].orders[j].ordered_products +
            " - €" +
            obj[i].orders[j].total_price +
            "<br>" +
            "<br /></li>";
          classi.push(obj[i].class);
        }
      }
    }
  }
  document.getElementById("lista_ordini").innerHTML = li;
}

function request() {
  const req = new XMLHttpRequest();
  req.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      req.addEventListener("load", reqListener);
    }
  };
  req.open(
    "GET",
    "https://paninos.ddns.net/food-api/API/order/getArchiveBriefOrder.php",
    true
  );
  req.send();
}
