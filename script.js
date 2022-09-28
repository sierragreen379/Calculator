// Retrieve elements from the DOM and assign them to variables
const displayValue = document.getElementById("display_value");
const previousEquation = document.getElementById("previous_equation");
const clear = document.getElementById("clear");
const backspace = document.getElementById("backspace");
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
let indexCurrentNumStartsAt = 0;

// Add clicked button value to display and to equationTracker variable
const addToDisplay = (num) => {
    if (displayValue.textContent === "0" && num !== ".") {
        displayValue.textContent = num;
    // } else if (num === ".") {
    //     if (displayValue.textContent === "0") {
    //         displayValue.textContent += num;
    //     } else if (displayValue.textContent === "-0") {
    //         displayValue.textContent = "-0.";
    //     } else {
    //         let oldValue = displayValue.textContent;
    //         displayValue.textContent = `${oldValue}0.`
    //     }
    } else if (displayValue.textContent === "-0") {
        displayValue.textContent = `-${num}`;
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
        console.log(num);
    }
    if (displayValue.textContent.length > 3) {
        addCommas();
    }
    if (/[^\.\d]/.test(num)) {
        indexCurrentNumStartsAt = displayValue.textContent.lastIndexOf(num) + 1;
    }
}

// Add commas to the display number(s) at the appropriate places
const addCommas = () => {
    let oldDisplayValue = displayValue.textContent.replaceAll(",", "");
    let newDisplayValue = oldDisplayValue.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
    displayValue.textContent = newDisplayValue;
}

const clearDisplay = () => {
    displayValue.textContent = 0;
    previousEquation.textContent = "";
    equationTracker = [];
    indexCurrentNumStartsAt = 0;
}

const removeLastItem = () => {
    equationTracker.pop();
    if (displayValue.textContent !== "0") {
        let newDisplayValue = displayValue.textContent.substring(0, (displayValue.textContent.length - 1));
        displayValue.textContent = newDisplayValue;
    }
}

// Change last number typed from positive to negative or vice versa
const posToNegOrNegToPos = () => {
    let firstPartOfDisplay = displayValue.textContent.slice(0, indexCurrentNumStartsAt);
    let secondPartOfDisplay = displayValue.textContent.slice(indexCurrentNumStartsAt);
    if (displayValue.textContent[indexCurrentNumStartsAt] != "-") {
        displayValue.textContent = `${firstPartOfDisplay}-${secondPartOfDisplay}`;
    } else {
        secondPartOfDisplay = displayValue.textContent.slice(indexCurrentNumStartsAt + 1);
        displayValue.textContent = `${firstPartOfDisplay}${secondPartOfDisplay}`;
    }
}

// Converts last number typed to a percent of 100
const convertToPercent = () => { // Need to make equationTracker update correctly with the new percent value. Issues arise when the calculated percent is <1
    try {
        const displayWithoutCommas = displayValue.textContent.replaceAll(",", "");
        const percent = displayWithoutCommas / 100;
        if (!percent) {
            throw "Working on it...";
        }
        displayValue.textContent = percent;
    } catch {
        let firstPartOfDisplay = displayValue.textContent.slice(0, indexCurrentNumStartsAt);
        let secondPartOfDisplay = displayValue.textContent.slice(indexCurrentNumStartsAt);
        let convertedNum = secondPartOfDisplay.replaceAll(",", "") / 100;
        displayValue.textContent = `${firstPartOfDisplay}${convertedNum}`;
    }
    console.log(displayValue.textContent);
    let indexOfDecimalPoint = displayValue.textContent.lastIndexOf(".");
    console.log(indexOfDecimalPoint);
    if (displayValue.textContent[0] == 0 || indexCurrentNumStartsAt == 0) {
        indexOfDecimalPoint -= 1;
    }
    equationTracker.splice(indexOfDecimalPoint, 0, ".");
    addCommas();
    console.log(equationTracker);
}

// Store operators here to call
let operators = {
    "*": function (a, b) {
        return +a * +b;
    },
    "/": function (a, b) {
        return +a / +b;
    },
    "+": function (a, b) {
        return +a + +b;
    },
    "-": function (a, b) {
        return +a - +b;
    }
}

const joinNums = () => {
    let equationTrackerCopy = equationTracker.slice();
    let spliceStartIndex = 0;
    let numOfItemsToRemove = 0;
    equationTracker.forEach((element, index) => {
        let numsToJoin = [];
        if (operators[element] || !equationTracker[index + 1]) {
            if (!equationTracker[index + 1]) {
                numOfItemsToRemove++;
            }
            numsToJoin.push(equationTrackerCopy.splice(spliceStartIndex, numOfItemsToRemove));
            let joinedNum = numsToJoin.flat().join("");
            equationTrackerCopy.splice(spliceStartIndex, 0, joinedNum);
            numOfItemsToRemove = 0;
            spliceStartIndex += 2;
        } else {
            numOfItemsToRemove++;
        }
    });
    equationTracker = equationTrackerCopy;
}

const mathEquals = () => { // indexCurrentNumStartsAt needs adjusted once equals is hit
    joinNums();
    while (equationTracker.length > 1) {
        let multiplicationSign = equationTracker.indexOf("*");
        let divisionSign = equationTracker.indexOf("/");
        let additionSign = equationTracker.indexOf("+");
        let subtractionSign = equationTracker.indexOf("-");
        if (multiplicationSign != -1) {
            let multipliedNum = operators["*"](equationTracker[multiplicationSign - 1], equationTracker[multiplicationSign + 1]);
            equationTracker.splice(multiplicationSign - 1, 3, multipliedNum);
            continue;
        } else if (divisionSign != -1) {
            let dividedNum = operators["/"](equationTracker[divisionSign - 1], equationTracker[divisionSign + 1]);
            equationTracker.splice(divisionSign - 1, 3, dividedNum);
            continue;
        } else if (additionSign != -1) {
            let addedNum = operators["+"](equationTracker[additionSign - 1], equationTracker[additionSign + 1]);
            equationTracker.splice(additionSign - 1, 3, addedNum);
        } else if (subtractionSign != -1) {
            let subtractedNum = operators["-"](equationTracker[subtractionSign - 1], equationTracker[subtractionSign + 1]);
            equationTracker.splice(subtractionSign - 1, 3, subtractedNum);
        }
    }
    previousEquation.textContent = `${displayValue.textContent}=`;
    displayValue.textContent = +equationTracker;
    addCommas();
}

const pressedButton = (pressed) => {
    switch(pressed.key) {
        case "0":
            addToDisplay(0);
            break;
        case "1":
            addToDisplay(1);
            break;
        case "2":
            addToDisplay(2);
            break;
        case "3":
            addToDisplay(3);
            break;
        case "4":
            addToDisplay(4);
            break;
        case "5":
            addToDisplay(5);
            break;
        case "6":
            addToDisplay(6);
            break;
        case "7":
            addToDisplay(7);
            break;
        case "8":
            addToDisplay(8);
            break;
        case "9":
            addToDisplay(9);
            break;
        case "c":
            clearDisplay();
            break;
        case "–": // Option-Minus
            posToNegOrNegToPos();
            break;
        case "%":
            convertToPercent();
            break;
        case ".":
            addToDisplay(".");
            break;
        case "+":
            addToDisplay("\53");
            break;
        case "-":
            addToDisplay("\55");
            break;
        case "*":
            addToDisplay("\327");
            break;
        case "/":
            addToDisplay("\367");
            break;
        case "=":
        case "Enter":
            mathEquals();
            break;
        default:
            document.getElementById("container").style.filter = "opacity(50%)";
            setTimeout(() => {
                document.getElementById("container").style.filter = "none";
            }, 500);
            break;
    }
}

// Click events for numbers
zero.addEventListener("click", function () {addToDisplay(0)});
one.addEventListener("click", function () {addToDisplay(1)});
two.addEventListener("click", function () {addToDisplay(2)});
three.addEventListener("click", function () {addToDisplay(3)});
four.addEventListener("click", function () {addToDisplay(4)});
five.addEventListener("click", function () {addToDisplay(5)});
six.addEventListener("click", function () {addToDisplay(6)});
seven.addEventListener("click", function () {addToDisplay(7)});
eight.addEventListener("click", function () {addToDisplay(8)});
nine.addEventListener("click", function () {addToDisplay(9)});

// Click events for other buttons
clear.addEventListener("click", clearDisplay);
backspace.addEventListener("click", removeLastItem); // Add backspace to switch statement
pos_neg.addEventListener("click", posToNegOrNegToPos);
percent.addEventListener("click", convertToPercent);
decimal.addEventListener("click", function () {addToDisplay(".")});
plus.addEventListener("click", function () {addToDisplay("\53")});
minus.addEventListener("click", function () {addToDisplay("\55")});
multiply.addEventListener("click", function () {addToDisplay("\327")});
divide.addEventListener("click", function () {addToDisplay("\367")});
equals.addEventListener("click", mathEquals);

document.addEventListener("keypress", pressedButton);