"use strict";

function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
var screen = document.getElementById("screen");
var buttons = _toConsumableArray(document.querySelectorAll("button"));
var params = [];
var clearFocusedButtons = function clearFocusedButtons() {
  buttons.forEach(function (button) {
    button.parentNode.classList.remove("bg-opacity-40");
  });
};
var handleNumber = function handleNumber(number) {
  clearFocusedButtons();
  if (screen.value == "0") screen.value = "";
  if (number === "decimal") {
    if (screen.value.indexOf(".") === -1) {
      if (!screen.value) number = "0.";else number = ".";
    } else return;
  }
  screen.value = screen.value + number;
};
var handleOperation = function handleOperation(operation) {
  clearFocusedButtons();
  switch (operation) {
    case "clear":
      params = [];
      return screen.value = 0;
    case "invert":
      if (screen.value != "0") return screen.value = "-" + screen.value;
  }
  if (screen.value == "0") return;
  if (operation === 'percent') {
    screen.value = eval("".concat(screen.value, " / 100"));
    return;
  }
  params.push(screen.value);
  switch (operation) {
    case "add":
      params.push("+");
      break;
    case "minus":
      params.push("-");
      break;
    case "divide":
      params.push("/");
      break;
    case "multiply":
      params.push("*");
      break;
  }
  document.getElementById(operation).parentNode.classList.add("bg-opacity-40");
  if (operation === "equals") return calculate();
  screen.value = "0";
};
var calculate = function calculate() {
  clearFocusedButtons();
  var calculation = params.join(' ');
  var answer = eval(calculation);
  screen.value = answer;
  params = [];
};
var handleButton = function handleButton(action) {
  if (isNaN(action) && action !== "decimal") handleOperation(action);else handleNumber(action);
};
buttons.forEach(function (button) {
  button.addEventListener("click", function (event) {
    handleButton(event.target.id);
  });
});