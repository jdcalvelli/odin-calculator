//DECLARATIONS
let displayValue = '0';

let firstValue = null;
let operation = null;
let secondValue = null;

//UI
const calculatorDisplay = document.querySelector('.calculatorDisplay');

const buttonList = document.querySelectorAll('button');


//SETUP
//zeroes the display on startup
updateDisplay();

//LOGIC
buttonList.forEach((button, index) => {
  //check what index is, if its within the first bit, add event listener where it updatesDisplay to add on i+1 to displayValue
  if (index < 10) {
    button.addEventListener('click', () => {
      if (displayValue == '0' || displayValue == 'Error' || firstValue != null) {
        displayValue = `${index}`
        updateDisplay();
      }
      else {
        displayValue += `${index}`;
        updateDisplay();
      }
    });
  }
  else if (index == 10) {
    //addition fcn establishment
    button.addEventListener('click', () => {
      executeCalculatorLogic(add);
    });
  }
  else if (index == 11) {
    //subtraction fcn establishment
    button.addEventListener('click', () => {
      executeCalculatorLogic(subtract);
    });
  }
  else if (index == 12) {
    //multiplication fcn establishment
    button.addEventListener('click', () => {
      executeCalculatorLogic(multiply);
    });
  }
  else if (index == 13) {
    //division fcn establishment
    button.addEventListener('click', () => {
      executeCalculatorLogic(divide);
    });
  }
  else if (index == 14) {
    //execute operate function for equals sign
    button.addEventListener('click', () => {

      //set second value
      secondValue = parseInt(displayValue);

      //check if we're dividing and second value is 0
      if (secondValue == 0 && operation == divide) {
        //display error and null out everything
        displayValue = 'Error';
        updateDisplay();

        firstValue = null;
        operation = null;
        secondValue = null;
      }
      else {
        //else actually do the thing
        //display original operation outcome
        displayValue = Math.round(operate(firstValue, secondValue, operation) * 10000) / 10000;
        updateDisplay();
        //set firstValue equal to result of original operation
        firstValue = parseInt(displayValue);
        //null out second value
        secondValue = null;
        //replace old operation with new operation
        operation = null;
      }
    });
  }
  else if (index == 15) {
    //clear out all values of repute
    button.addEventListener('click', () => {
      firstValue = null;
      operation = null;
      secondValue = null;
      displayValue = '0';
      updateDisplay();
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

function executeCalculatorLogic(operationArg) {
  if (firstValue == null) {
    firstValue = parseInt(displayValue);
    updateDisplay();
    operation = operationArg;
  }
  else if (firstValue != null && operation != null) {
    //set second value
    secondValue = parseInt(displayValue);

    //check if we're dividing and second value is 0
    if (secondValue == 0 && operation == divide) {
      //display error and null out everything
      displayValue = 'Error';
      updateDisplay();

      firstValue = null;
      operation = null;
      secondValue = null;
    }
    else {
      //else actually do the thing
      //display original operation outcome
      displayValue = Math.round(operate(firstValue, secondValue, operation) * 10000) / 10000;
      updateDisplay();
      //set firstValue equal to result of original operation
      firstValue = parseInt(displayValue);
      //null out second value
      secondValue = null;
      //replace old operation with new operation
      operation = operationArg;
    }
  }
  else if (firstValue != null && operation == null) {
    operation = operationArg;
  }
}
