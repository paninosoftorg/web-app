var date = new Date();
var dd = String(date.getDate()).padStart(2, "0");
var mm = String(date.getMonth() + 1).padStart(2, "0");
var yyyy = date.getFullYear();
var fulldate = dd + "-" + mm + "-" + yyyy;
var reverse_date = yyyy + "-" + mm + "-" + dd;

document.getElementById("datepicker").value = reverse_date;

function handler(e) {
  var datainput = e.target.value;
}

var counter = 0;
function increment() {
  counter++;
  console.log(counter);
}

function decrement() {
  counter--;
  console.log(counter);
}

function reqListener() {
  let data = [this.responseText];
  const obj = JSON.parse(data);
  var classi = [];
  var li = "";
  for (let i = 0; i < obj.length; i++) {
    for (let j = 0; j < obj[i].orders.length; j++) {
      if (obj[i].orders[j].order_creation_date == fulldate) {
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

const req = new XMLHttpRequest();
req.addEventListener("load", reqListener);
req.open(
  "GET",
  "http://paninos.ddns.net/food-api/API/order/getArchiveBriefOrder.php"
);
req.send();

/*const dp = $("#datepicker").format({ 
  setDate: today,
  format:'dd mm yyyy',
  todayHighlight: true
});*/
