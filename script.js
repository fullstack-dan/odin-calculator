const body = document.querySelector('body');
const output = document.querySelector('#output')
var currentOp = "";
var operators;
var operands;

const buttons = document.querySelectorAll('.button');
buttons.forEach(button => {
    button.addEventListener('click', () => {
        if (button.classList.contains('operator')) {
            currentOp += (` ${button.dataset.val} `);
        } else {
            currentOp += button.dataset.val;
        }
        
        output.textContent = currentOp;
    });
});

const equalsButton = document.querySelector('#equals');

equalsButton.addEventListener('click', () => {
    calculate(currentOp);
    currentOp = "";
});

function calculate(data) {
    if (!parse(data)) { //call to parser
        return;
    }




}

function parse(data) {
    if (!validate(data)) { //call to validator
        alert('Invalid operation! Please try again.');
        return false;
    }
    
    

}

function validate(data) {
    let trimmed = data.trim().replace(/\s/g, '');
    let valid = true;

    if (isNaN(trimmed.charAt(trimmed.length - 1))) valid = false; //check last char for operators

    if (isNaN(trimmed.charAt(0))) { //check first char for a number or negative value
        if (trimmed.charAt(0) == "-") {
            if (isNaN(trimmed.charAt(1))) valid = false;
        }
    } else {
        for (i = 0; i < trimmed.length; i++) {
            if (trimmed.charAt(i-1)) {
                if (trimmed.charAt(i) == trimmed.charAt(i-1)) { //check for repeated operators
                    if (isNaN(trimmed.charAt(i))) valid = false;
                }
            }
        }
    }
    
    return valid;
}

const add = function (val1, val2) {
    return val1 + val2;
};

const subtract = function (val1, val2) {
    return val1 - val2;
};

const sum = function (array) {
    let sum = 0;
    if (!(array.length >= 1)) {
        return 0;
    } else {
        for (let i = 0; i < array.length; i++) {
            sum += array[i];
        }
    }
    return sum;
};

const multiply = function (array) {
    let prod = 1;
    for (let i = 0; i < array.length; i++) {
        prod *= array[i];
    }
    return prod;
};
const divide = function (val1, val2) {
    return val1 / val2;
};

const power = function (val1, val2) {
    return Math.pow(val1, val2);
};

const factorial = function (val) {
    let fac = 1;
    while (val != 0) {
        fac *= val--;
    }
    return fac;
};