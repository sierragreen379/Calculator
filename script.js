// Retrieve elements from the DOM and assign them to variables
const displayValue = document.getElementById("display_value");
const previousEquation = document.getElementById("previous_equation");
const clear = document.getElementById("clear");
const pos_neg = document.getElementById("pos_neg");
const percent = document.getElementById("percent");
const decimal = document.getElementById("decimal");
const plus = document.getElementById("plus");
const minus = document.getElementById("minus");
const multiply = document.getElementById("multiply");
const divide = document.getElementById("divide");
const equals = document.getElementById("equals");
const zero = document.getElementById("zero");
const one = document.getElementById("one");
const two = document.getElementById("two");
const three = document.getElementById("three");
const four = document.getElementById("four");
const five = document.getElementById("five");
const six = document.getElementById("six");
const seven = document.getElementById("seven");
const eight = document.getElementById("eight");
const nine = document.getElementById("nine");

let equationTracker = [];

// Add clicked button value to display and to equationTracker variable
const addToDisplay = (num) => {
    return function () {
        if (displayValue.textContent == 0 && num !== ".") {
            displayValue.textContent = num;
        } else {
            let oldValue = displayValue.textContent;
            displayValue.textContent = `${oldValue}${num}`;
        }
        if (num === "\327") {
            equationTracker.push("*");
        } else if (num === "\367") {
            equationTracker.push("/");
        } else {
            equationTracker.push(num);
        }
    }
}

const clearDisplay = () => {
    displayValue.textContent = 0;
    previousEquation.textContent = "";
    equationTracker = [];
}

// Change number from positive to negative or vice versa
const posToNegOrNegToPos = () => {
    if (displayValue.textContent.includes("-")) {
        const newStr = displayValue.textContent.slice(1);
        displayValue.textContent = newStr;
    } else {
        displayValue.textContent = `-${displayValue.textContent}`;
    }
}

const convertToPercent = () => {
    const percent = displayValue.textContent / 100;
    displayValue.textContent = percent;
}

// Store operators here to call and do the math in mathEquals()
let operators = {
    "*": function (a, b) {
        return a * b;
    },
    "/": function (a, b) {
        return a / b;
    },
    "+": function (a, b) {
        return a + b;
    },
    "-": function (a, b) {
        return a - b;
    }
}

const mathEquals = () => {
    console.log(equationTracker);
    while (equationTracker.length > 1) {
        let multiplicationSign = equationTracker.indexOf("*");
        let divisionSign = equationTracker.indexOf("/");
        let additionSign = equationTracker.indexOf("+");
        let subtractionSign = equationTracker.indexOf("-");
        if (multiplicationSign != -1) {
            let multipliedNum = operators["*"](equationTracker[multiplicationSign - 1], equationTracker[multiplicationSign + 1]);
            equationTracker.splice(multiplicationSign - 1, 3, multipliedNum);
            console.log(equationTracker);
            continue;
        } else if (divisionSign != -1) {
            let dividedNum = operators["/"](equationTracker[divisionSign - 1], equationTracker[divisionSign + 1]);
            equationTracker.splice(divisionSign - 1, 3, dividedNum);
            console.log(equationTracker);
            continue;
        } else if (additionSign != -1) {
            let addedNum = operators["+"](equationTracker[additionSign - 1], equationTracker[additionSign + 1]);
            equationTracker.splice(additionSign - 1, 3, addedNum);
            console.log(equationTracker);
        } else if (subtractionSign != -1) {
            let subtractedNum = operators["-"](equationTracker[subtractionSign - 1], equationTracker[subtractionSign + 1]);
            equationTracker.splice(subtractionSign - 1, 3, subtractedNum);
            console.log(equationTracker);
        }
    }

    previousEquation.textContent = `${displayValue.textContent}=`;
    displayValue.textContent = +equationTracker;
}

// Click events for numbers
zero.addEventListener("click", addToDisplay(0));
one.addEventListener("click", addToDisplay(1));
two.addEventListener("click", addToDisplay(2));
three.addEventListener("click", addToDisplay(3));
four.addEventListener("click", addToDisplay(4));
five.addEventListener("click", addToDisplay(5));
six.addEventListener("click", addToDisplay(6));
seven.addEventListener("click", addToDisplay(7));
eight.addEventListener("click", addToDisplay(8));
nine.addEventListener("click", addToDisplay(9));

// Click events for other buttons
clear.addEventListener("click", clearDisplay);
pos_neg.addEventListener("click", posToNegOrNegToPos);
percent.addEventListener("click", convertToPercent);
decimal.addEventListener("click", addToDisplay("."));
plus.addEventListener("click", addToDisplay("\53"));
minus.addEventListener("click", addToDisplay("\55"));
multiply.addEventListener("click", addToDisplay("\327"));
divide.addEventListener("click", addToDisplay("\367"));
equals.addEventListener("click", mathEquals);