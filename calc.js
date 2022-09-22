
const OP_ADD = '+';
const OP_SUB = '-';
const OP_MUL = '*';
const OP_DIV = '/';

const numpad = document.querySelector('.numpad');

createNumpad();

function createNumpad() {
  // Create a 3x3 of numbers 1-9
  for (let y = 0; y < 3; y++) {
    numpad.appendChild(createNumRow(y));
  }
}

function createNumRow(rowIndex) {
  const row = document.createElement('div');
  row.classList.add('row');
  for (let x = 0; x < 3; x++) {
    const num = document.createElement('div');
    num.classList.add('num');
    num.innerText = 3 * rowIndex + x + 1;
    row.appendChild(num);
  }
  return row;
}

function operate(operator, num1, num2) {
  switch (operator) {
    case OP_ADD:
      return add(num1, num2);
    case OP_SUB:
      return subtract(num1, num2);
    case OP_MUL:
      return multiply(num1, num2);
    case OP_DIV:
      return divide(num1, num2);
  }
}

function add(num1, num2) {
  return num1 + num2;
}

function subtract(num1, num2) {
  return num1 - num2;
}

function multiply(num1, num2) {
  return num1 * num2;
}

function divide(num1, num2) {
  return num1 / num2;
}
