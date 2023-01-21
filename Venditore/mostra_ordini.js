var date = new Date();
var dd = String(date.getDate()).padStart(2, "0");
var mm = String(date.getMonth() + 1).padStart(2, "0");
var yyyy = date.getFullYear();
var fulldate = dd + "-" + mm + "-" + yyyy;
var reverse_date = yyyy + "-" + mm + "-" + dd;
var getdate = reverse_date;
var modificatedate = fulldate;
let status_ID = 4;
request();

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

/*function PutOnClick(id) {
  const http = new easyHTTP();

  const data = {
    Order_id: id,
  };

  var url = "https://paninos.ddns.net/food-api/API/order/" + id;

  http.put(url, data, function (err, post) {
    if (err) {
      console.log(err);
    } else {
      console.log(post);
    }
  });
}*/

function reqListener() {
  order_controls_open = '<div class="order-controls">';
  order_controls_close =
    '<button class="button list-button" id="order_number" onClick="PutOnClick(obj[i].orders[j].order_id);">Completa ordine</button></div>';

  let data = [this.responseText];
  obj = JSON.parse(data);
  var classi = [];
  var li = "";
  for (let i = 0; i < obj.length; i++) {
    for (let j = 0; j < obj[i].orders.length; j++) {
      if (obj[i].orders[j].order_creation_date == modificatedate) {
        if (classi.includes(obj[i].class)) {
          li +=
            order_controls_open +
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
          +"<br></li></div>" + order_controls_close;
        } else {
          li +=
            order_controls_open +
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
            "<br /></li>" +
            order_controls_close;
          classi.push(obj[i].class);
        }
      }
    }
  }
  document.getElementById("lista_ordini").innerHTML = li;
}

var case1 =
  '<button class="button list-button" id="order_number" onClick="order_cases(1);">Ordini completati</button>';
var case2 =
  '<button class="button list-button" id="order_number" onClick="order_cases(2);">Ordini da ritirare</button>';
var case3 =
  '<button class="button list-button" id="order_number" onClick="order_cases(3);">Ordini annullato</button>';
var case4 =
  '<button class="button list-button" id="order_number" onClick="order_cases(4);">Ordini da preparare</button>';
var case5 =
  '<button class="button list-button" id="order_number" onClick="order_cases(5);">Ordini ritirati</button>';

function order_cases(num) {
  switch (num) {
    case 1:
      status_ID = 1;
      request();
      var li = case2 + case3 + case4 + case5;
      document.getElementById("lista_botton").innerHTML = li;
      document.getElementById("lista_ordini").innerHTML = "";
      break;
    case 2:
      status_ID = 2;
      request();
      var li = case1 + case3 + case4 + case5;
      document.getElementById("lista_botton").innerHTML = li;
      document.getElementById("lista_ordini").innerHTML = "";
      break;
    case 3:
      status_ID = 3;
      request();
      var li = case1 + case2 + case4 + case5;
      document.getElementById("lista_botton").innerHTML = li;
      document.getElementById("lista_ordini").innerHTML = "";
      break;
    case 4:
      status_ID = 4;
      request();
      var li = case1 + case2 + case3 + case5;
      document.getElementById("lista_botton").innerHTML = li;
      document.getElementById("lista_ordini").innerHTML = "";
      break;
    case 5:
      status_ID = 5;
      request();
      var li = case1 + case2 + case3 + case4;
      document.getElementById("lista_botton").innerHTML = li;
      document.getElementById("lista_ordini").innerHTML = "";
      break;
  }
}

function request() {
  const req = new XMLHttpRequest();
  req.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      req.addEventListener("load", reqListener);
    }
    else if(this.status == 204){
      document.getElementById("lista_ordini").innerHTML = "Nessun ordine trovato";
    }
  };
  req.open(
    "GET",
    "https://paninos.ddns.net/food-api/API/order/getArchiveBriefOrder.php?status_ID=" +
      status_ID,
    true
  );
  req.send();
}
/*
function putRequest() {
  const req = new XMLHttpRequest();
  req.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      req.addEventListener("load", putRequest);
    }
  };
  req.open("PUT", "https", true);
  req.send();
}

function easyHTTP() {
  this.http = new XMLHttpRequest();
}

easyHTTP.prototype.put = function (url, data, callback) {
  this.http.open("PUT", url, true);
  this.http.setRequestHeader("Content-type", "application/json");
  let self = this;

  this.http.onload = function () {
    callback(null, self.http.responseText);
  };

  this.http.send(JSON.stringify(data));
};*/
