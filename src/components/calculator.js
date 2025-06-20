/**
 * @license MIT
 * Copyright © 2024 – 2025 Kiran Brahmatewari. All rights reserved.
 * 
 * This work is licensed under the terms of the MIT license.
 * Refer to https://opensource.org/licenses/MIT for a copy.
 */

document.addEventListener("DOMContentLoaded", function() {
  const OPS = [ "*", "/", "+", "-", "%" ];
  const screen = document.querySelector(".screen");
  const outcome = document.querySelector(".outcome");

  function opsEnd(input) {
    const lastChar = input[input.length - 1];
    return OPS.includes(lastChar);
  }

  document.querySelectorAll(".val").forEach(button => {
    button.addEventListener("click", function(event) {
      event.preventDefault();

      const a = this.getAttribute("href");
      let screenVal;

      // Don't allow operations as first input or consecutive operations
      if ((OPS.includes(a) || (a == "*-1")) && (outcome.value == "")) return;
      else if (OPS.includes(a) && (opsEnd(outcome.value))) return;

      // if ((a == ".") && ($(".outcome").val().includes("."))) return;
      // else if (((a == "*") ) && opsEnd($(".outcome").val())) return;
      // else if ((a == "/") && ($(".outcome").val()[$(".outcome").val().length - 1] == "/")) return;
      // else if ((a == "+") && ($(".outcome").val()[$(".outcome").val().length - 1] == "+")) return;
      // else if ((a == "-") && ($(".outcome").val()[$(".outcome").val().length - 1] == "-")) return;
      // else if ((a == "%") && ($(".outcome").val()[$(".outcome").val().length - 1] == "%")) return;
      // else if ((a == ".") && ($(".outcome").val().includes("."))) return;
      // else if (((a == "*-1") || (a == "%") || (a == "*") || (a == "/") || (a == "-") || (a == "+")) && ($(".outcome").val() == "")) return;

      // Determine display value for operators
      else if (a == "*") screenVal = "×";
      else if (a == "/") screenVal = "÷";
      else if (a == "-") screenVal = "−";
      else screenVal = a;

      // Update display and internal value
      screen.innerHTML += screenVal;
      outcome.value += a;
    });
  });

  $(".equal").click(function() {
    try {
      const result = eval(outcome.value);
      outcome.value = result;
      screen.innerHTML = result;
    } catch (error) {
      console.log("Error: Expression is invalid and cannot be evaluated");
    }
  });

  document.querySelector(".clear").addEventListener("click", function() {
    outcome.value = "";
    screen.innerHTML = "";
  });
});