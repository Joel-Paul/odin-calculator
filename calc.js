
const OP_ADD = '+';
const OP_SUB = '-';
const OP_MUL = '*';
const OP_DIV = '/';
const OP_EQL = '=';

const OPS = [OP_DIV, OP_MUL, OP_SUB, OP_ADD, OP_EQL];

const NEGATE = '+/-';

const CLASS_IN = 'input';
const CLASS_OP = 'operator';

const INPUT_DIGITS = 11;
const HIST_DIGITS = 19;

// The number of digits that should be displayed
// by a single number in the history display.
// Accounts for the operator and equals symbol (i.e. -2)
// and dividing by two lets two numbers fit in the display.
const histLength = Math.floor((HIST_DIGITS - 2) / 2);

const history = document.querySelector('.history');
const output = document.querySelector('.output');

const back = document.querySelector('.back');
const del = document.querySelector('.del');
const ac = document.querySelector('.ac');

const digits = document.querySelector('.digits');
const operators = document.querySelector('.operators');

let prevInput = 0;
let input = 0;

let currentOp = '';

let prevInputDisplay = '';
let inputDisplay = '';

let calculated = false;

setupEvents();
createNumpad();
resetCalculator()

function setupEvents() {
  back.addEventListener('click', removeLastChar);
  del.addEventListener('click', clearCurrent);
  ac.addEventListener('click', resetCalculator);

  window.addEventListener('keydown', keyDown);
  window.addEventListener('keyup', keyUp);
}

function createNumpad() {
  createDigits();
  createOperators();
}

function createDigits() {
  // Add '0' and '.' buttons first.
  const row = document.createElement('div');
  row.classList.add('row');
  row.appendChild(createButton(0, CLASS_IN, 'zero'));
  row.appendChild(createButton('.', CLASS_IN));
  digits.appendChild(row);

  // Create a 3x3 of numbers 1-9.
  for (let y = 0; y < 3; y++) {
    digits.appendChild(createNumRow(y));
  }
}

function createOperators() {
  OPS.forEach(op => operators.appendChild(createButton(op, CLASS_OP)));
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

function createButton(value, ...classList) {
  const numButton = document.createElement('button');
  numButton.innerText = value;
  if (classList != undefined) numButton.classList.add(...classList);
  numButton.addEventListener('click', clickedButton);
  return numButton;
}

function clickedButton(e) {
  handleKey(e.target.innerText);
}

function setInput(inputText) {
  if (calculated) resetCalculator();
  if (inputDisplay.length >= INPUT_DIGITS) return;
  if (inputText === '.') {
    if (inputDisplay.includes('.')) return;
    if (inputDisplay === '') inputDisplay = '0';
  }
  inputDisplay += inputText;
  input = +inputDisplay;
}

function setOperator(operatorText) {
  const hasInput = inputDisplay !== '';
  const hasPrevInput = prevInputDisplay !== '';

  if (operatorText === OP_EQL) {
    if (calculated || !hasInput) return;
    calculated = true;

    let result = operate(currentOp, prevInput, input);
    prevInput = input;
    prevInputDisplay += currentOp + formatNumString(prevInput, histLength);
    input = result;
    inputDisplay = formatNumString(input, INPUT_DIGITS);
  } else if (hasInput && hasPrevInput) {
    if (calculated) {
      // Use this calculation as the previous input.
      calculated = false;
      prevInput = input;
      prevInputDisplay = formatNumString(prevInput, histLength);
      input = 0;
      inputDisplay = '';
    } else {
      // Evaluate this expression and use it as the previous input.
      prevInput = operate(currentOp, prevInput, input);
      prevInputDisplay = formatNumString(prevInput, histLength);
      input = 0;
      inputDisplay = '';
    }
  } else if (hasInput) {
    calculated = false;
    prevInput = input;
    prevInputDisplay = formatNumString(prevInput, histLength);
    input = 0;
    inputDisplay = '';
  } else if (!hasInput && !hasPrevInput) {
    prevInput = 0;
    prevInputDisplay = '0';
  }
  currentOp = operatorText;
}

function formatNumString(input, digits) {
  const num = +input;
  if (num.toString().length > digits) {
    // Convert to scientific notation.
    let numExp = num.toExponential(digits - 5);
    if (numExp.length > digits) {
      numExp = num.toExponential(2 * digits - numExp.length - 5);
    }
    return numExp;
  }
  return num.toString();
}

function keyDown(e) {
  handleKey(e.key);
}

function keyUp(e) {
}

function handleKey(key) {
  if (isInput(key)) {
    setInput(key);
  } else if (OPS.includes(key)) {
    setOperator(key);
  } else {
    checkSpecialKeys(key);
  }
  updateDisplay();
}

function isInput(string) {
  return string !== ' ' && (!isNaN(+string) || string === '.');
}

function checkSpecialKeys(key) {
  switch (key) {
    case 'Escape':
      clearCurrent();
      break;
    case 'Backspace':
      removeLastChar();
      break;
    case 'Enter':
      setOperator(OP_EQL);
      break;
  }
}

function updateDisplay() {
  history.innerHTML = prevInputDisplay + currentOp;
  output.innerHTML = inputDisplay === '' ? '0' : inputDisplay;
}

function removeLastChar() {
  if (calculated) {
    const temp = inputDisplay.toString();
    resetCalculator();
    inputDisplay = temp;
  }
  inputDisplay = inputDisplay.slice(0, -1);
  updateDisplay();
}

function clearCurrent() {
  if (inputDisplay === '') resetCalculator();
  inputDisplay = '';
  updateDisplay();
}

function resetCalculator() {
  prevInputDisplay = '';
  inputDisplay = '';
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
    default:
      return +num2;
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
