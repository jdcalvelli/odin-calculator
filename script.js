//DECLARATIONS

let displayValue = '0';

let firstValue = null;
let operation = null;
let secondValue = null;



//UI

const calculatorDisplay = document.querySelector('.calculatorDisplay');

const buttonList = document.querySelectorAll('button');



//SETUP

//set display to default zero
updateDisplay();



//LOGIC

//clicking on ui
buttonList.forEach((button, index) => {
  //check what index is, if its within the first bit, add event listener where it updatesDisplay to add on i+1 to displayValue
  if (index < 10) {
    button.addEventListener('click', () => {
      setDisplayValue(index);
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
      executeCalculatorLogic(null);
    });
  }
  else if (index == 15) {
    //clear out all values of repute
    button.addEventListener('click', () => {
      clearAll();
      updateDisplay();
    });
  }
  else if (index == 16) {
    //add decimal point
    button.addEventListener('click', () => {
      displayDecimal();
    });
  }
  else if (index == 17) {
    //backspace button
    button.addEventListener('click', () => {
      backspace();
    });
  }
});

//handle keypresses instead of clicks
window.addEventListener('keydown', (e) => {
  //for numbers
  if (e.key >= 0 && e.key <= 9) {
    setDisplayValue(e.key);
  }
  // for operations
  else if (e.key == '+') {
    executeCalculatorLogic(add);
  }
  else if (e.key == '-') {
    executeCalculatorLogic(subtract);
  }
  else if (e.key == '*') {
    executeCalculatorLogic(multiply);
  }
  else if (e.key == '/') {
    executeCalculatorLogic(divide);
  }
  // for equals sign
  else if (e.key == '=') {
    executeCalculatorLogic(null);
  }
  // for clear
  else if (e.key == 'c') {
    clearAll();
    updateDisplay();
  }
  // for decimal point
  else if (e.key == '.') {
    displayDecimal();
  }
  //for backspace
  else if (e.key == 'Backspace') {
    backspace();
  }
});



//HELPER FUNCTIONS

//calculator functions

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


//ui functions

function updateDisplay() {
  calculatorDisplay.textContent = displayValue;
}

function setDisplayValue(numValue) {
  if (displayValue == '0' || displayValue == 'Error' || firstValue != null) {
    displayValue = `${numValue}`;
    updateDisplay();
  }
  else {
    displayValue += `${numValue}`;
    updateDisplay();
  }
}

function displayDecimal() {
  // first take displayvalue to array, some to see if theres already a . in it
  let isDecimalPresent = displayValue.split('').some((element) => {
    if (element == '.') {
      return true;
    }
  });

  // if decimal is present, break out
  if (isDecimalPresent) {
    return;
  }
  //if its not present, add it to displayValue
  else if (!isDecimalPresent) {
    displayValue += `.`;
    updateDisplay();
  }
}

function backspace() {
  //so that you cant remove the default zero from the display
  if (displayValue != '0') {
    //streing to array methods to handle backspace logic
    displayValue = displayValue.split('')
                               .filter((element, index, array) => {
                                 if (index != array.length - 1) {
                                   return true;
                                 }
                               })
                               .join('');
    updateDisplay();
  }
}

// logic functions

function executeCalculatorLogic(operationArg) {
  if (firstValue == null) {
    firstValue = parseFloat(displayValue);
    updateDisplay();
    operation = operationArg;
  }
  else if (firstValue != null && operation != null) {
    //set second value
    secondValue = parseFloat(displayValue);

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
      firstValue = parseFloat(displayValue);
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

function clearAll() {
  firstValue = null;
  operation = null;
  secondValue = null;
  displayValue = '0';
}
