// Calculadora (suporte a parênteses especial): primeiro pressione insere '(', depois sempre ')'
const display = document.getElementById('display');
const keys = document.querySelector('.keys');

const calculator = {
  expression: '0',
  parenActivated: false // false = '(' ainda não inserido pelo botão especial; true = inserir sempre ')'
};

function updateDisplay() {
  display.textContent = calculator.expression;
}

function replaceInitialZero(token) {
  return calculator.expression === '0' ? token : calculator.expression + token;
}

function inputDigit(digit) {
  calculator.expression = replaceInitialZero(digit);
}

function inputDecimal() {
  const m = calculator.expression.match(/(\d+\.?\d*)$/);
  if (m) {
    if (!m[0].includes('.')) calculator.expression += '.';
  } else {
    calculator.expression = replaceInitialZero('0.');
  }
}

function inputOperator(op) {
  if (/[-+*/]$/.test(calculator.expression)) {
    calculator.expression = calculator.expression.slice(0, -1) + op;
  } else {
    calculator.expression = replaceInitialZero(op);
  }
}

function handleParenButton() {
  if (!calculator.parenActivated) {
    // primeira vez: insere '('
    calculator.expression = replaceInitialZero('(');
    calculator.parenActivated = true;
  } else {
    // depois: sempre insere ')'
    calculator.expression += ')';
  }
}

function inputParen(paren) {
  // comportamento normal para teclado: respeitar parênteses
  if (paren === '(') calculator.expression = replaceInitialZero('(');
  else {
    const open = (calculator.expression.match(/\(/g) || []).length;
    const close = (calculator.expression.match(/\)/g) || []).length;
    if (open > close) calculator.expression += ')';
  }
}

function clearAll() {
  calculator.expression = '0';
  calculator.parenActivated = false;
}

function backspace() {
  if (calculator.expression.length <= 1) {
    calculator.expression = '0';
    calculator.parenActivated = false;
  } else {
    const removed = calculator.expression.slice(-1);
    calculator.expression = calculator.expression.slice(0, -1);
    if (removed === '(') calculator.parenActivated = false;
  }
}

function toggleSign() {
  const re = /(\d+\.?\d*)$/;
  const m = calculator.expression.match(re);
  if (m) {
    const num = m[0];
    const start = m.index;
    const toggled = String(parseFloat(num) * -1);
    calculator.expression = calculator.expression.slice(0, start) + toggled;
  } else {
    if (calculator.expression === '0') return;
    calculator.expression = '(-1)*(' + calculator.expression + ')';
  }
}

function applyPercent() {
  const re = /(\d+\.?\d*)%$/;
  const m = calculator.expression.match(re);
  if (m) {
    const num = m[1];
    const start = m.index;
    calculator.expression = calculator.expression.slice(0, start) + '(' + num + '/100)';
  } else {
    calculator.expression += '%';
  }
}

function safeEvaluateExpression(expr) {
  try {
    let sanitized = expr.replace(/×/g, '*').replace(/÷/g, '/').replace(/−/g, '-');
    sanitized = sanitized.replace(/(\d+\.?\d*)%/g, '($1/100)');
    const open = (sanitized.match(/\(/g) || []).length;
    const close = (sanitized.match(/\)/g) || []).length;
    if (open > close) sanitized += ')'.repeat(open - close);
    if (/[^0-9+\-*/().\s]/.test(sanitized)) throw new Error('Invalid characters');
    const result = Function('return ' + sanitized)();
    if (result === Infinity || result === -Infinity || Number.isNaN(result)) throw new Error('Math error');
    return String(result);
  } catch (err) {
    return 'Error';
  }
}

function calculateResult() {
  const res = safeEvaluateExpression(calculator.expression);
  calculator.expression = res;
  // Após cálculo, redefinir estado do botão de parênteses
  calculator.parenActivated = false;
}

keys.addEventListener('click', (e) => {
  const target = e.target;
  if (!target.matches('button')) return;
  const digit = target.dataset.digit;
  const action = target.dataset.action;

  // Special parentheses button uses data-digit="()" in the provided HTML
  if (digit) {
    if (digit === '()') {
      handleParenButton();
    } else {
      inputDigit(digit);
    }
    updateDisplay();
    return;
  }

  if (action) {
    switch(action) {
      case 'decimal': inputDecimal(); break;
      case 'clear': clearAll(); break;
      case 'backspace': backspace(); break;
      case 'percent': applyPercent(); break;
      case 'plusminus': toggleSign(); break;
      case 'equals': calculateResult(); break;
      case 'paren-open': inputParen('('); break;
      case 'paren-close': inputParen(')'); break;
      case 'add': inputOperator('+'); break;
      case 'subtract': inputOperator('-'); break;
      case 'multiply': inputOperator('*'); break;
      case 'divide': inputOperator('/'); break;
      default: break;
    }
    updateDisplay();
  }
});

// Keyboard support
window.addEventListener('keydown', (e) => {
  if (e.key >= '0' && e.key <= '9') {
    inputDigit(e.key);
    updateDisplay();
    e.preventDefault();
    return;
  }
  if (e.key === '.') { inputDecimal(); updateDisplay(); e.preventDefault(); return; }

  switch(e.key) {
    case 'Enter':
    case '=':
      calculateResult(); updateDisplay(); e.preventDefault(); break;
    case '+': inputOperator('+'); updateDisplay(); break;
    case '-': inputOperator('-'); updateDisplay(); break;
    case '*': inputOperator('*'); updateDisplay(); break;
    case '/': inputOperator('/'); updateDisplay(); break;
    case '%': applyPercent(); updateDisplay(); break;
    case 'Backspace': backspace(); updateDisplay(); break;
    case '(':
      inputParen('('); updateDisplay(); break;
    case ')':
      inputParen(')'); updateDisplay(); break;
    default: break;
  }
});

// Inicializa
updateDisplay();
