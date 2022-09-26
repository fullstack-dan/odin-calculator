const body = document.querySelector('body');
const output = document.querySelector('#output');

const buttons = document.querySelectorAll('.button');
buttons.forEach(button => {
    button.addEventListener('click', () => {
        if (button.classList.contains('operator')) {
            if (!output.textContent[0]) {
                output.textContent += button.dataset.val;
            } else {
                output.textContent += (` ${button.dataset.val} `);
            }
        } else {
            output.textContent += button.dataset.val;
        }
    });
});

const equalsButton = document.querySelector('#equals');
equalsButton.addEventListener('click', calculate(output.textContent));

function calculate(data) {
    if (!parse(data)) { //call to parser
        return;
    }

    chars = parse(data);

    //at this point dealing with string of form (a + b - c * d / e)
    while (chars.includes("*") || chars.includes("/")) {
        for (i = 0; i < chars.length; i++) {
            let temp;
            switch (chars[i]) {
                case "*":
                    temp = chars[i-1] * chars[i+1];
                    chars.splice(i-1, 3, temp);
                    i = 0;
                    break;
                case "/":
                    temp = chars[i-1] / chars[i+1];
                    chars.splice(i-1, 3, temp);
                    i = 0;
                    break;
            }
        }
    }
    while (chars.includes("+") || chars.includes("-")) {
        for (i = 0; i < chars.length; i++) {
            let temp;
            switch (chars[i]) {
                case "+":
                    temp = Number(chars[i-1]) + Number(chars[i+1]);
                    chars.splice(i-1, 3, temp);
                    i = 0;
                    break;
                case "-":
                    temp = Number(chars[i-1]) - Number(chars[i+1]);
                    chars.splice(i-1, 3, temp);
                    i = 0;
                    break;
            }
        }
    }

    output.textContent = chars[0];

}

function parse(data) {
    if (!validate(data)) { //call to validator
        alert('Invalid operation! Please try again.');
        return false;
    } else return data.split(' ');
}

function validate(data) {
    let trimmed = data.trim().replace(/\s/g, '');
    let valid = true;

    if (isNaN(trimmed.charAt(trimmed.length - 1))) valid = false; //check last char for operators

    if (isNaN(trimmed.charAt(0))) { //check first char for operators
        if (trimmed.charAt(0) == "-") {
            if (isNaN(trimmed.charAt(1))) valid = false;
        } else valid = false;
    } else {
        for (i = 0; i < trimmed.length; i++) {
            if (trimmed.charAt(i - 1)) {
                if (trimmed.charAt(i) == trimmed.charAt(i - 1)) { //check for repeated operators
                    if (isNaN(trimmed.charAt(i))) valid = false;
                }
            }
        }
    }

    return valid;
}