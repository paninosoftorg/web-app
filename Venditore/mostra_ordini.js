function reqListener() {
  let data = [this.responseText];
  const obj = JSON.parse(data);

  var li = "";
  for (let i = 0; i < obj.length; i++) {
     li += obj[i].user + "<br />" + obj[i].created + "<br />";
  }
  document.getElementById("myList").innerHTML = li;
}

const req = new XMLHttpRequest();
req.addEventListener("load", reqListener);
req.open("GET", "http://paninos.ddns.net/food-api/API/order/getArchiveOrder.php");
req.send();