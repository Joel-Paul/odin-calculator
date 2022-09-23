
const OP_ADD = '+';
const OP_SUB = '-';
const OP_MUL = '*';
const OP_DIV = '/';
const OP_EQL = '=';

const CLASS_IN = 'input';
const CLASS_OP = 'operator';

const history = document.querySelector('.history');
const output = document.querySelector('.output');

const back = document.querySelector('.back');
const del = document.querySelector('.del');
const ac = document.querySelector('.ac');

const digits = document.querySelector('.digits');
const operators = document.querySelector('.operators');

let prevInput = '';
let input = '';
let currentOp = '';

let calculated = false;

setupEvents();
createNumpad();

function setupEvents() {
  back.addEventListener('click', removeLastChar);
  del.addEventListener('click', clearCurrent);
  ac.addEventListener('click', resetCalculator);
}

function createNumpad() {
  createDigits();
  createOperators();
}

function createDigits() {
  // Add '0', '.', and '=' buttons first.
  const row = document.createElement('div');
  row.classList.add('row');
  row.appendChild(createButton(0, CLASS_IN));
  row.appendChild(createButton('.', CLASS_IN));
  row.appendChild(createButton(OP_EQL, CLASS_OP));
  digits.appendChild(row);

  // Create a 3x3 of numbers 1-9.
  for (let y = 0; y < 3; y++) {
    digits.appendChild(createNumRow(y));
  }
}

function createOperators() {
  const ops = [OP_ADD, OP_SUB, OP_MUL, OP_DIV];
  ops.forEach(op => operators.appendChild(createButton(op, CLASS_OP)));
  return operators;
}

function createNumRow(rowIndex) {
  const row = document.createElement('div');
  row.classList.add('row');
  for (let x = 0; x < 3; x++) {
    row.appendChild(createButton(3 * rowIndex + x + 1, CLASS_IN));
  }
  return row;
}

function createButton(value, classList) {
  const numButton = document.createElement('button');
  numButton.innerText = value;
  if (classList != undefined) numButton.classList.add(classList);
  numButton.addEventListener('click', clickedButton);
  return numButton;
}

function clickedButton(e) {
  const classList = e.target.classList;
  const innerText = e.target.innerText;

  if (classList.contains(CLASS_IN)) {
    clickedInput(innerText);
  } else if (classList.contains(CLASS_OP)) {
    clickedOperator(innerText);
  }
  updateDisplay();
}

function clickedInput(inputText) {
  if (calculated) resetCalculator();
  if (inputText === '.') {
    if (input.includes('.')) return;
    if (input === '') input = '0';
  }
  input += inputText;
}

function clickedOperator(operatorText) {
  const hasInput = input !== '';
  const hasPrevInput = prevInput !== '';

  if (operatorText === OP_EQL) {
    if (calculated || !hasInput) return;
    calculated = true;

    let result = operate(currentOp, prevInput, input);
    if (result === undefined) result = input;  // undefined when no operation was used.

    prevInput += currentOp + input;
    input = result;
  } else if (hasInput && hasPrevInput) {
    if (calculated) {
      // Use this calculation as the previous input.
      calculated = false;
      prevInput = input;
      input = '';
    } else {
      // Evaluate this expression and use it as the previous input.
      prevInput = operate(currentOp, prevInput, input);
      input = '';
    }
  } else if (hasInput) {
    calculated = false;
    prevInput = input;
    input = '';
  } else if (!hasInput && !hasPrevInput) {
    prevInput = 0;
  }
  currentOp = operatorText;
}

function updateDisplay() {
  history.innerHTML = prevInput + currentOp;
  output.innerHTML = input === '' ? '0' : input;
}

function removeLastChar() {
  if (calculated) {
    const temp = input.toString();
    resetCalculator();
    input = temp;
  }
  input = input.slice(0, -1);
  updateDisplay();
}

function clearCurrent() {
  input = '';
  updateDisplay();
}

function resetCalculator() {
  prevInput = '';
  input = '';
  currentOp = '';
  calculated = false;
  updateDisplay();
}

function operate(operator, num1, num2) {
  switch (operator) {
    case OP_ADD:
      return add(+num1, +num2);
    case OP_SUB:
      return subtract(+num1, +num2);
    case OP_MUL:
      return multiply(+num1, +num2);
    case OP_DIV:
      return divide(+num1, +num2);
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
