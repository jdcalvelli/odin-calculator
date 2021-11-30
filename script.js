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
  if (index < 10) {
    button.addEventListener('click', () => {
      if (displayValue == '0') {
        displayValue = `${index}`
        calculatorDisplay.textContent = displayValue;
      }
      else {
        displayValue += `${index}`;
        calculatorDisplay.textContent = displayValue;
      }
    });
  }
  else if (index == 10) {
    //addition fcn establishment
    button.addEventListener('click', () => {
      executeOperationFromUI(add);
    });
  }
  else if (index == 11) {
    //subtraction fcn establishment
    button.addEventListener('click', () => {
      executeOperationFromUI(subtract);
    });
  }
  else if (index == 12) {
    //multiplication fcn establishment
    button.addEventListener('click', () => {
      executeOperationFromUI(multiply);
    });
  }
  else if (index == 13) {
    //division fcn establishment
    button.addEventListener('click', () => {
      executeOperationFromUI(divide);
    });
  }
  else if (index == 14) {
    //execute operate function
    button.addEventListener('click', () => {
      secondValue = parseInt(displayValue);
      displayValue = operate(firstValue, secondValue, operation);
      calculatorDisplay.textContent = displayValue;
    });
  }
  else if (index == 15) {
    //clear out all values of repute
    button.addEventListener('click', () => {
      firstValue = 0;
      operation = 0;
      secondValue = 0;
      displayValue = '0';
      calculatorDisplay.textContent = displayValue;
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

function executeOperationFromUI(operationArg) {
  firstValue = parseInt(displayValue);
  displayValue = '0';
  calculatorDisplay.textContent = displayValue;
  operation = operationArg;
}
