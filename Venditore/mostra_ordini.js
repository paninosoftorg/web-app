var date = new Date();
var dd = String(date.getDate()).padStart(2, "0");
var mm = String(date.getMonth() + 1).padStart(2, "0");
var yyyy = date.getFullYear();
var full = dd + "-" + mm + "-" + yyyy;

function compareDates(date1, date2) {
  var d1 = new Date(date1);
  var d2 = new Date(date2);
  if (d1 = d2) {
    return 1;
  } else {
    return 0;
  }
}

function reqListener() {
  let data = [this.responseText];
  const obj = JSON.parse(data);

  var li = "";
  for (let i = 0; i < obj.length; i++) {
    for (let j = 0; j < obj[i].orders.length; j++) {
      if (compareDates(obj[i].orders[j].order_creation_date, full) == 1)
      {
        li +=
          "Classe:" +
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
          "<br />"
          + "<br />";
      }
    }
  }
  document.getElementById("myList").innerHTML = li;
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
