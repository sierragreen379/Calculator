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

let equationTracker = "";

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
            equationTracker += "*";
        } else if (num === "\367") {
            equationTracker += "/";
        } else {
            equationTracker += num;
        }
    }
}

const clearDisplay = () => {
    displayValue.textContent = 0;
    previousEquation.textContent = "";
    equationTracker = "";
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

const mathEquals = () => {
    const numberRegex = /(\d+)/g;
    const numbersArr = equationTracker.match(numberRegex);
    numbersArr.forEach((strNum, index, array) => {
        array[index] = Number(strNum);
    });

    const operatorRegex = /[^0-9\.]/g;
    const operatorsArr = equationTracker.match(operatorRegex);
    // Need to iterate through one of the arrays and add the operators in the middle of the numbers in the approriate order
    // for (let i = 0; i < numbersArr.length; i += 2) {
    //     for (let j = 0; j < operatorsArr.length; j++) {
    //         numbersArr.splice(i + 1, 0, operatorsArr[j]);
    //     }
    // }

    // console.log(`Equals equationTracker: ${equationTracker}`);
    previousEquation.textContent = `${displayValue.textContent}=`;
    displayValue.textContent = Number(equationTracker);
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