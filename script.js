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
    ansDiv = document.getElementById("ans");

    if (ansDiv.textContent===""){
        let value = e.target.textContent;
        workingExpression+=value;
        expDiv.textContent = workingExpression;
    }

    else {
        workingExpression = ansDiv.textContent;
        ansDiv.textContent = "";
        let value = e.target.textContent;
        workingExpression+=value;
        expDiv.textContent = workingExpression;
    }
}

// Event Listeners

document.getElementById('equal').addEventListener('click', displayAns);

document.querySelectorAll('.exp').forEach(button => {
    button.addEventListener('click', displayExp);
});


document.getElementById('clear').addEventListener('click', clearChar);

document.getElementById('allclear').addEventListener('click', allClear);


// Clear last entered char

function clearChar(){
    expDiv.textContent = expDiv.textContent.slice(0,-1);
    workingExpression = expDiv.textContent;
}

// Clear all

function allClear(){
    expDiv.textContent = '';
    workingExpression = expDiv.textContent;
}

// Calculate & Display Answer

function displayAns(){
    ans = brackets(workingExpression); 
    const ansDiv = document.getElementById("ans");
    ansDiv.textContent = ans;
}

// BODMAS function to loop through string and get the array of operators in order of BODMAS


function brackets(brStr){

    lenExp = brStr.length;

    let lBracPos, rBracPos;
    let lBracFound = false, rBracFound = false;

    for (let i = 0; i < lenExp; i++){
        if (brStr[i] === '('){
            lBracPos = i;
            lBracFound = true;
        }
        if (brStr[i] === ')' && lBracFound){
            rBracPos = i;
            rBracFound = true;
            break;
        }
    }

    if (lBracFound === false && rBracFound === false){
        return evaluate(brStr);
    }

    let newStr = brStr.slice(lBracPos+1, rBracPos);
    let eval = evaluate(newStr);

    let toRemoveBrac = brStr.slice(lBracPos, rBracPos+1);

    brStr = brStr.replace(toRemoveBrac, eval);

    if (!isNaN(Number(brStr))){
        return brStr;
    }

    return brackets(brStr);

}

function bodmas(str){

    let arrSym = [];
    
    // First find all division/multiplication operators
    for (let i = 0; i < lenExp; i++) {
        if (str[i] === '/' || str[i] === '*') {
            arrSym.push(i);
        }
    }

    // Then addition/subtraction operators
    for (let i = 0; i < lenExp; i++) {
        if (str[i] === '+' || str[i] === '-' && str[i-1] != undefined) {
            arrSym.push(i);
        }
    }

    return arrSym;
}


function evaluate(string){

    lenExp = string.length;
    let bodArr = bodmas(string);
    let partA='', partB = '', partANeg='-';
    let sym = string[bodArr[0]];
    let indStopA=bodArr[0], indStopB=bodArr[0];

    for (let i = bodArr[0]-1;(((string[i] === '-') && (string[i-1] === undefined)) || !(symbolsNeg.includes(string[i])));i--){
        partA+=string[i];
        indStopA--;
    }

    partA = +(partA.split('').reverse().join(''));

    for (let i = bodArr[0]+1;!(symbolsNeg.includes(string[i]));i++){
        partB+=string[i];
        indStopB++;
    }
    partB = +(partB.split('').join(''));

    let ans = operator(partA, sym, partB);
    let toRemove = string.slice(indStopA, indStopB+1);

    string = string.replace(toRemove, ans);
    
    if (!isNaN(Number(string))){
        return string;
    }

    return evaluate(string);
}
