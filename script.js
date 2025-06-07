let display = document.getElementById("display");
let justCalculated = false;

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}  

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if (b === 0) return "Cannot divide by zero";
  return a / b;
}

// Helper: Check if character is an operator
function isOperator(char) {
  return ["+", "-", "*", "/"].includes(char);
}

// Append value with input validation
function appendValue(value) {
  const current = display.value;
  const lastChar = current.slice(-1);

  // Prevent entering multiple consecutive operators
  if (isOperator(value) && (current === "" || isOperator(lastChar))) {
    return; // Ignore invalid input
  }

  // If a result was just shown and user types a digit, start fresh
  if (justCalculated && !isOperator(value)) {
    display.value = "";
    justCalculated = false;
  }

  display.value += value;
}

function clearDisplay() {
  display.value = "";
}

function deleteLast() {
  display.value = display.value.slice(0, -1);
}

function calculateResult() {
  const input = display.value;

  // Match number/operator/number pattern (supports floats)
  const regex = /^(-?\d+\.?\d*)([+\-*/])(-?\d+\.?\d*)$/;
  const match = input.match(regex);

  if (!match) {
    display.value = "Error";
    justCalculated = true;
    return;
  }

  const num1 = parseFloat(match[1]);
  const operator = match[2];
  const num2 = parseFloat(match[3]);

  let result;

  switch (operator) {
    case "+":
      result = add(num1, num2);
      break;
    case "-":
      result = subtract(num1, num2);
      break;
    case "*":
      result = multiply(num1, num2);
      break;
    case "/":
      result = divide(num1, num2);
      break;
    default:
      result = "Error";
  }

  display.value = result;
  justCalculated = true;
}


// Keyboard input support
function handleKeyboardInput(event) {
  const allowedKeys = "0123456789+-*/.";

  if (allowedKeys.includes(event.key)) {
    appendValue(event.key);
  } else if (event.key === "Enter") {
    event.preventDefault();
    calculateResult();
  } else if (event.key === "Backspace") {
    deleteLast();
  } else if (event.key === "Escape") {
    clearDisplay();
  }
}

document.addEventListener("keydown", handleKeyboardInput);