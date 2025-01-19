const days = [ "Sun", "Mon", "Tues", "Wed", "Thu", "Fri", "Sat" ];
const months = [ "Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec" ];

function currentTimestamp() {
  const date = new Date();
  const weekDay = days[date.getDay()];
  const day = date.getDate();
  const month = months[date.getMonth()];
  const time = date.toLocaleTimeString("en-us", { hour12: false });
  return weekDay.concat(" ", month, " ", day, " ", time);
}

function updateTimeStamp() {
  document.querySelector("#menutime").textContent = currentTimestamp();
}

setInterval(updateTimeStamp, 1000);
updateTimeStamp();

function randomInt(min, max) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled); // Min and max are inclusive
}

document.getElementById("timestamp").innerHTML = "Last login: ".concat(currentTimestamp(), " on ttys00", randomInt(0, 6));