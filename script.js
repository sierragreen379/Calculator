// Retrieve elements from the DOM and assign them to variables
const displayValue = document.getElementById("display_value");
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

// Add clicked button value to display
const addToDisplay = (num) => {
    return function () {
        if (displayValue.textContent == 0 && num !== ".") {
            displayValue.textContent = num;
        } else {
            let oldValue = displayValue.textContent;
            displayValue.textContent = `${oldValue}${num}`;
        }
    }
}

// Clear function
const clearDisplay = () => {
    displayValue.textContent = 0;
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

// Equals function  // Equation is a string
const mathEquals = () => {
    let equation = displayValue.textContent;
    
    for (let i = 0; i < equation.length; i++) {
        let num1 = Number(equation.slice(0, i))
        let num2 = Number(equation.slice(i + 1));
        switch (equation[i]) {
            case "\53":
                displayValue.textContent = num1 + num2;
                break;
            case "\55":
                displayValue.textContent = num1 - num2;
                break;
            case "\327":
                displayValue.textContent = num1 * num2;
                break;
            case "\367":
                displayValue.textContent = num1 / num2;
                break;
            default:
                break;
        }
    }
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