function reqListener() {
  let data = [this.responseText];
  
  const obj = JSON.parse(data);

  console.log(obj);
  var li = "";
  for (let i = 0; i < obj.length; i++) {
    
      li += obj[i].orders[i].user_name_surname + "<br />";
    
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

var date = new Date();
var today = date.toLocaleDateString("it-IT");

const dp = $("#datepicker").format({ 
  setDate: today,
  format:'dd mm yyyy',
  todayHighlight: true
});