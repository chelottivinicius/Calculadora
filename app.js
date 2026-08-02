// Lógica básica da calculadora (Vanilla JS)
const display = document.getElementById('display');
const keys = document.querySelector('.keys');

const calculator = {
  displayValue: '0',
  firstOperand: null,
  operator: null,
  waitingForSecondOperand: false,
};

function updateDisplay() {
  display.textContent = calculator.displayValue;
}

function inputDigit(digit) {
  const { displayValue, waitingForSecondOperand } = calculator;
  if (waitingForSecondOperand) {
    calculator.displayValue = digit;
    calculator.waitingForSecondOperand = false;
  } else {
    calculator.displayValue = displayValue === '0' ? digit : displayValue + digit;
  }
}

function inputDecimal() {
  if (calculator.waitingForSecondOperand) {
    calculator.displayValue = '0.';
    calculator.waitingForSecondOperand = false;
    return;
  }
  if (!calculator.displayValue.includes('.')) {
    calculator.displayValue += '.';
  }
}

function handleOperator(nextOperator) {
  const { firstOperand, displayValue, operator } = calculator;
  const inputValue = parseFloat(displayValue);
  if (operator && calculator.waitingForSecondOperand) {
    calculator.operator = nextOperator;
    return;
  }
  if (firstOperand == null && !isNaN(inputValue)) {
    calculator.firstOperand = inputValue;
  } else if (operator) {
    const result = performCalculation[operator](firstOperand, inputValue);
    calculator.displayValue = String(result);
    calculator.firstOperand = result;
  }
  calculator.waitingForSecondOperand = true;
  calculator.operator = nextOperator;
}

const performCalculation = {
  add: (a,b) => a + b,
  subtract: (a,b) => a - b,
  multiply: (a,b) => a * b,
  divide: (a,b) => (b === 0 ? 'Error' : a / b),
};

function resetCalculator() {
  calculator.displayValue = '0';
  calculator.firstOperand = null;
  calculator.operator = null;
  calculator.waitingForSecondOperand = false;
}

function handlePercent() {
  const value = parseFloat(calculator.displayValue);
  calculator.displayValue = String(value / 100);
}

function toggleSign() {
  const value = parseFloat(calculator.displayValue);
  calculator.displayValue = String(value * -1);
}

keys.addEventListener('click', (e) => {
  const target = e.target;
  if (!target.matches('button')) return;
  const digit = target.dataset.digit;
  const action = target.dataset.action;

  if (digit) {
    inputDigit(digit);
    updateDisplay();
    return;
  }

  if (action) {
    switch(action) {
      case 'decimal': inputDecimal(); break;
      case 'clear': resetCalculator(); break;
      case 'percent': handlePercent(); break;
      case 'plusminus': toggleSign(); break;
      case 'equals':
        if (calculator.operator && !calculator.waitingForSecondOperand) {
          handleOperator(null);
          calculator.operator = null;
          calculator.waitingForSecondOperand = false;
        }
        break;
      default:
        // operators: add, subtract, multiply, divide
        if (['add','subtract','multiply','divide'].includes(action)) {
          handleOperator(action);
        }
    }
    updateDisplay();
  }
});

// Keyboard support
window.addEventListener('keydown', (e) => {
  if ((e.key >= '0' && e.key <= '9') || e.key === '.') {
    if (e.key === '.') inputDecimal(); else inputDigit(e.key);
    updateDisplay();
    e.preventDefault();
    return;
  }
  switch(e.key) {
    case 'Enter':
    case '=':
      if (calculator.operator && !calculator.waitingForSecondOperand) {
        handleOperator(null);
        calculator.operator = null;
        calculator.waitingForSecondOperand = false;
        updateDisplay();
      }
      e.preventDefault();
      break;
    case '+': handleOperator('add'); updateDisplay(); break;
    case '-': handleOperator('subtract'); updateDisplay(); break;
    case '*': handleOperator('multiply'); updateDisplay(); break;
    case '/': handleOperator('divide'); updateDisplay(); break;
    case '%': handlePercent(); updateDisplay(); break;
    case 'Backspace': resetCalculator(); updateDisplay(); break;
  }
});

// Inicializa
updateDisplay();
