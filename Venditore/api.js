function reqListener() {
    console.log(this.responseText);
  }
  
  const req = new XMLHttpRequest();
  req.addEventListener("load", reqListener);
  req.open("GET", "http://paninos.ddns.net/food-api/API/order/getArchiveOrder.php");
  req.send();