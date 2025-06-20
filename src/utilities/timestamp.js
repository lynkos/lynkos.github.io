/**
 * @license MIT
 * Copyright © 2024 – 2025 Kiran Brahmatewari. All rights reserved.
 * 
 * This work is licensed under the terms of the MIT license.
 * Refer to https://opensource.org/licenses/MIT for a copy.
 */

document.addEventListener("DOMContentLoaded", function() {
  const days = [ "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat" ];
  const months = [ "Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec" ];

  function initTimestamp() {
    const date = new Date();
    const weekDay = days[date.getDay()];
    const day = date.getDate();
    const month = months[date.getMonth()];
    const time = date.toLocaleTimeString("en-us", { hour12: false });
    return weekDay.concat(" ", month, " ", day, " ", time);
  }

  function currentTimestamp() {
    const date = new Date();
    return date.toLocaleTimeString("en-us", { hour12: false });
  }

  function updateTimestamp() {
    document.querySelector("#menutime").textContent = currentTimestamp();
  }

  setInterval(updateTimestamp, 1000);
  updateTimestamp();

  function randomInt(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled); // Min and max are inclusive
  }

  document.getElementById("timestamp").innerHTML = "Last login: ".concat(initTimestamp(), " on ttys00", randomInt(0, 6));
});