let oldNumber = 0;
let currentNumber = '';
let currentOperator = '+';

let label = document.querySelector('#label');
let lastOperatorLabel = document.querySelector('.lastOperatorLabel');
let lastNumberLabel = document.querySelector('.lastNumberLabel');
let keyboard = document.querySelector('.keyboard');

//change keyobard type
let changeTypes = [...document.querySelectorAll('.changeType')];
changeTypes.forEach(changeType => {
    changeType.onclick = () => {
        keyboard.classList.toggle('type2');
    }
});

//add characters
let characters = document.querySelectorAll('.character');
characters.forEach(character => character.addEventListener('click', () => addCharacter(character.innerText)));

//use C as a backspace
let backspace = document.querySelector('.backspace');
backspace.addEventListener('click', () => deleteLastCharacter());

//change sign
let signChanger = document.querySelector('.signChanger');
signChanger.addEventListener('click', () => changeSign());

//operator
let operators = [ document.querySelector('.divide'), document.querySelector('.multiplication'), document.querySelector('.minus'), document.querySelector('.plus'), document.querySelector('.percent') ];
operators.forEach(operator => operator.addEventListener('click', () => addOperator(operator.innerText)));

//equal
let equal = document.querySelector('.equal');
equal.addEventListener('click', () => equals());

//sqaure root
let radical = document.querySelector('.radical');
radical.addEventListener('click', () => {
    lastOperatorLabel.innerText = currentOperator = radical.innerText;
    lastNumberLabel.innerText = oldNumber = +currentNumber;
    label.innerText = currentNumber = Math.sqrt(oldNumber) + '';
});

//module
let moduleOperator = document.querySelector('.module');
moduleOperator.addEventListener('click', () => {
    if (currentNumber.slice(0, 1) === '-') {
        label.innerText = currentNumber = currentNumber.slice(1);
    }
});

//power
let power = document.querySelector('.power');
power.addEventListener('click', () => addOperator('pow'));

//3radical
let rad = document.querySelector('.xradical');
rad.addEventListener('click', () => addOperator('rad'));

function addCharacter(character) {
    if (character == '.' && currentNumber.split('.').length > 1) return;
    currentNumber += character;
    label.innerText = currentNumber;
}

function deleteLastCharacter() {
    currentNumber = currentNumber.slice(0, -1) || '';
    label.innerText = currentNumber || 0;
}

function deleteNumber() {
    currentNumber = ''
    label.innerText = 0;
}

function changeSign() {
    if (currentNumber.slice(0, 1) === '-') currentNumber = currentNumber.slice(1);
    else currentNumber = '-' + currentNumber;
    label.innerText = currentNumber || 0;
}

function calculate(term1, term2, operator) {
    if (operator === '+') term1 += +term2;
    else if (operator === '-') term1 -= +term2;
    else if (operator === 'X') term1 *= +term2;
    else if (operator === '÷') term1 /= +term2;
    else if (operator === '%') term1 = (term1 / 100) * +term2;
    else if (operator === 'pow') term1 **= +term2;
    else if (operator === 'rad') term1 **= (1/+term2);
    else throw new Error('Error');

    return +parseFloat(term1).toPrecision(5);
}

function addOperator(operator) {
    if (currentNumber !== '') {
        oldNumber = calculate(oldNumber, currentNumber, currentOperator);
        currentNumber = '';
        label.innerText = 0;
        lastNumberLabel.innerText = oldNumber;
    }
    lastOperatorLabel.innerText = currentOperator =  operator;
}

function equals() {
    if (['+', '-', 'X', '÷', '%', 'pow', 'rad'].includes(currentOperator)) {
        label.innerText = calculate(oldNumber, currentNumber, currentOperator);
        lastNumberLabel.innerText = oldNumber = 0;
        currentNumber = '';
        lastOperatorLabel.innerText = currentOperator = '+';
    }
}

//keyboard shortcuts
addEventListener('keydown', (event) => {
    if (isFinite(event.key) || (event.key === '.')) addCharacter(event.key);
    else if (event.key === 'Escape') deleteNumber();
    else if (event.key === '=') equals();
    else if (event.key === '/') addOperator('÷');
    else if (['Backspace', 'Delete'].includes(event.key)) deleteLastCharacter();
    else if (['x', '*'].includes(event.key)) addOperator('X');
    else if (['+', '-', '%'].includes(event.key)) addOperator(event.key);
})


