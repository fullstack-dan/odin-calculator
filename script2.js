const body = document.querySelector('body');
const output = document.querySelector('#output');

var activeInput = false;
var operands = [];
var operators = [];
var solution = "";

const buttons = document.querySelectorAll('.button');
buttons.forEach(button => {
    button.addEventListener('click', () => {
        if (!button.classList.contains('operator')) {
            if (!activeInput) {
                output.textContent = button.dataset.val;
                activeInput = true;
            } else {
                output.textContent += button.dataset.val;
            }
        } else {
            if (!activeInput) return;
            operands.push(output.textContent);
            operators.unshift(button.dataset.val);
            activeInput = false;
            calculate(false)
        }
    });
});


const equalsButton = document.querySelector('#equals');
equalsButton.addEventListener('click', function() {
    operands.push(output.textContent);
    operators.unshift("=");
    calculate(true);
});

function calculate(finalOutput) {
    if(!finalOutput) {
        if (operands.length < 2) return;
    }

    let temp;
    switch (operators[1]) {
        case "*":
            temp = Number(operands[0]) * Number(operands[1]);
            break;
        case "+":
            temp = Number(operands[0]) + Number(operands[1]);
            break;
        case "-":
            temp = Number(operands[0]) - Number(operands[1]);
            break;
        case "/":
            temp = Number(operands[0]) / Number(operands[1]);
            break;
        default:
            break;
    }

    if (finalOutput) {
        solution = temp;
        output.textContent = solution;
        activeInput = false;
        operands = [];
        operators = [];
    } else {
        solution = temp;
        output.textContent = solution;
        operands = [temp];
    }
}