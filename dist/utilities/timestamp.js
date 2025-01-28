"use strict";

var days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
var months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
function currentTimestamp() {
  var date = new Date();
  var weekDay = days[date.getDay()];
  var day = date.getDate();
  var month = months[date.getMonth()];
  var time = date.toLocaleTimeString("en-us", {
    hour12: false
  });
  return weekDay.concat(" ", month, " ", day, " ", time);
}
function updateTimeStamp() {
  document.querySelector("#menutime").textContent = currentTimestamp();
}
setInterval(updateTimeStamp, 1000);
updateTimeStamp();
function randomInt(min, max) {
  var minCeiled = Math.ceil(min);
  var maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled); // Min and max are inclusive
}
document.getElementById("timestamp").innerHTML = "Last login: ".concat(currentTimestamp(), " on ttys00", randomInt(0, 6));