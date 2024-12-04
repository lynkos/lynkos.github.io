const screen = document.getElementById("screen");
const buttons = [...document.querySelectorAll("button")];

let params = [];

const clearFocusedButtons = () => {
    buttons.forEach((button) => {
      button.parentNode.classList.remove("bg-opacity-40");
    });
}

const handleNumber = (number) => {
  clearFocusedButtons();

  if (screen.value == "0") {
    screen.value = "";
  }

  if (number === "decimal") {
    if (screen.value.indexOf(".") === -1) {
      if (!screen.value) {
        number = "0.";
      } else {
        number = ".";
      }
    } else return;
  }

  screen.value = screen.value + number;
};

const handleOperation = (operation) => {
  clearFocusedButtons();

  switch (operation) {
    case "clear":
      params = [];
      return (screen.value = 0);
    case "invert":
      if (screen.value != "0") {
        return (screen.value = "-" + screen.value);
      }
  }

  if (screen.value == "0") {
    return;
  }
  
  if (operation === 'percent') {
    screen.value = eval(`${screen.value} / 100`)
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

  if (operation === "equals") {
    return calculate();
  }

  screen.value = "0";
};

const calculate = () => {
  clearFocusedButtons();
  
  const calculation = params.join(' ')
  console.log(calculation)
  const answer = eval(calculation);

  screen.value = answer

  params = [];
};

const handleButton = (action) => {
  if (isNaN(action) && action !== "decimal") {
    handleOperation(action);
  } else {
    handleNumber(action);
  }
};

buttons.forEach((button) => {
  button.addEventListener("click", (event) => {
    handleButton(event.target.id);
  });
});