/**
 * @license MIT
 * Copyright © 2026 Kiran Brahmatewari. All rights reserved.
 * 
 * This work is licensed under the terms of the MIT license.
 * Refer to https://opensource.org/licenses/MIT for a copy.
 */
const days = [ "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat" ];
const months = [ "Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec" ];
const delay = 1000; // 1 second

function initializeTimestamp() {
    let date = new Date();
    let weekDay = days[date.getDay()];
    let day = date.getDate();
    let month = months[date.getMonth()];
    let time = date.toLocaleTimeString("en-us", { hour12: false });
    return weekDay.concat(" ", month, " ", day, " ", time);
}

function currentTimestamp() {
    let date = new Date();
    return date.toLocaleTimeString("en-us", { hour12: false });
}

function updateTimestamp() {
    document.querySelector("#menutime").textContent = currentTimestamp();
}

function randomInt(min, max) {
    let minCeiled = Math.ceil(min);
    let maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled); // Min and max are inclusive
}

export function initTimestamp() {
    setInterval(updateTimestamp, delay);
    updateTimestamp();

    document.getElementById("timestamp").innerHTML = "Last login: ".concat(initializeTimestamp(), " on ttys00", randomInt(0, 6));
}