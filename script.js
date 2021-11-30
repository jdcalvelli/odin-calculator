//DECLARATIONS
let displayValue = '0';

let firstValue;
let operation;
let secondValue;

//UI
const calculatorDisplay = document.querySelector('.calculatorDisplay');

const buttonList = document.querySelectorAll('button');


//SETUP
calculatorDisplay.textContent = displayValue;

//LOGIC
buttonList.forEach((button, index) => {
  //check what index is, if its within the first bit, add event listener where it updatesDisplay to add on i+1 to displayValue
  if (index < 9) {
    button.addEventListener('click', () => {
      if (displayValue == '0') {
        displayValue = `${index + 1}`
        calculatorDisplay.textContent = displayValue;
      }
      else {
        displayValue += `${index + 1}`;
        calculatorDisplay.textContent = displayValue;
      }
    });
  }
});



//HELPER FUNCTIONS
function add(val1, val2) {
  return val1 + val2;
}

function subtract(val1, val2) {
  return val1 - val2;
}

function multiply(val1, val2) {
  return val1 * val2;
}

function divide(val1, val2) {
  return val1 / val2;
}

function operate(operand1, operand2, operation) {
  return operation(operand1, operand2);
}

function updateDisplay() {
  calculatorDisplay.textContent = displayValue;
}
