
const OP_ADD = '+';
const OP_SUB = '-';
const OP_MUL = '*';
const OP_DIV = '/';

console.log(operate(OP_ADD, 5, 2));

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
