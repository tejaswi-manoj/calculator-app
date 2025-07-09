// Global variables

let a,o,b,ans,expDiv, lenNumAndOp;
let exp = {
    a,o,b,
}

let lenExp;
const symbols = ['/', '*', '+', undefined]
const symbolsNeg = ['/', '*', '+', undefined, '-']
let workingExpression = "";

// Operator functions


function add(a,b){
    return (a+b);
}

function multiply(a,b){
    return (a*b);
}

function divide(a, b) {
    return Math.ceil((a / b) * 100) / 100;
}

function subtract(a,b){
    return (a-b);
}

function operator(a,o,b){
    if (o==='+'){
        return add(a,b);
    }
    else if (o==='-'){
        return subtract(a,b);
    }
    else if (o==='*'){
        return multiply(a,b);
    }
    else if (o==='/'){
        return divide(a,b);
    }
}

// Display Expression

function displayExp(e){
    expDiv = document.getElementById("exp");
    let value = e.target.textContent;
    workingExpression+=value;
    expDiv.textContent = workingExpression;
}

// Event Listeners

document.getElementById('equal').addEventListener('click', displayAns);

document.querySelectorAll('.exp').forEach(button => {
    button.addEventListener('click', displayExp);
});


document.getElementById('clear').addEventListener('click', clearChar);

// Clear last entered char

function clearChar(){
    expDiv.textContent = expDiv.textContent.slice(0,-1);
}

// Calculate & Display Answer

function displayAns(){
    ans = evaluate(); 
    const ansDiv = document.getElementById("ans");
    ansDiv.textContent = ans;
}

// BODMAS function to loop through string and get the array of operators in order of BODMAS

function bodmas(){

    let arrSym = [];
    
    // First find all division/multiplication operators
    for (let i = 0; i < lenExp; i++) {
        if (workingExpression[i] === '/' || workingExpression[i] === '*') {
            arrSym.push(i);
        }
    }

    // Then addition/subtraction operators
    for (let i = 0; i < lenExp; i++) {
        if (workingExpression[i] === '+' || workingExpression[i] === '-' && workingExpression[i-1] != undefined) {
            arrSym.push(i);
        }
    }

    return arrSym;
}


function evaluate(){

    lenExp = workingExpression.length;
    let bodArr = bodmas();
    let partA='', partB = '', partANeg='-';
    let sym = workingExpression[bodArr[0]];
    let indStopA=bodArr[0], indStopB=bodArr[0];

    for (let i = bodArr[0]-1;(((workingExpression[i] === '-') && (workingExpression[i-1] === undefined)) || !(symbolsNeg.includes(workingExpression[i])));i--){
        partA+=workingExpression[i];
        indStopA--;
    }

    partA = +(partA.split('').reverse().join(''));

    for (let i = bodArr[0]+1;!(symbolsNeg.includes(workingExpression[i]));i++){
        partB+=workingExpression[i];
        indStopB++;
    }
    partB = +(partB.split('').join(''));

    let ans = operator(partA, sym, partB);
    let toRemove = workingExpression.slice(indStopA, indStopB+1);

    workingExpression = workingExpression.replace(toRemove, ans);
    
    if (!isNaN(Number(workingExpression))){
        return workingExpression;
    }

    return evaluate();
}


