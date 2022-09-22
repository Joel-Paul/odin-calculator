
const OP_ADD = '+';
const OP_SUB = '-';
const OP_MUL = '*';
const OP_DIV = '/';

const OPS = [OP_ADD, OP_SUB, OP_MUL, OP_DIV];

const digits = document.querySelector('.digits');
const operators = document.querySelector('.operators');

createNumpad();

function createNumpad() {
  createDigits();
  createOperators();
}

function createDigits() {
  // Add '0', '.', and '=' buttons first.
  const row = document.createElement('div');
  row.classList.add('row');
  row.appendChild(createButton(0, 'input'));
  row.appendChild(createButton('.', 'input'));
  row.appendChild(createButton('=', 'operator'));
  digits.appendChild(row);

  // Create a 3x3 of numbers 1-9.
  for (let y = 0; y < 3; y++) {
    digits.appendChild(createNumRow(y));
  }
}

function createOperators() {
  OPS.forEach(op => operators.appendChild(createButton(op, 'operator')));
  return operators;
}

function createNumRow(rowIndex) {
  const row = document.createElement('div');
  row.classList.add('row');
  for (let x = 0; x < 3; x++) {
    row.appendChild(createButton(3 * rowIndex + x + 1, 'input'));
  }
  return row;
}

function createButton(value, classList) {
  const numButton = document.createElement('button');
  numButton.innerText = value;
  if (classList != undefined) numButton.classList.add(classList);
  return numButton;
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
