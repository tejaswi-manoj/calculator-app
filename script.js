// Global variables

let a,o,b,ans,expDiv, lenNumAndOp;
let exp = {
    a,o,b,
}

let lenExp;
const symbols = ['/', '*', '+', '-', undefined]
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

// Events

// document.getElementById("equal").addEventListener("click", displayAns);


document.querySelectorAll(".equal").forEach(button=>{
    button.addEventListener("click", () => {
        displayAns();
        bodmas();
    })
})

document.querySelectorAll('.exp').forEach(button => {
    button.addEventListener('click', displayExp);
});

// Calculate & Display Answer

function displayAns(){
    ans = evaluate(); 
    const ansDiv = document.getElementById("ans");
    ansDiv.textContent = ans;
}

// BODMAS function to loop through string and get the array of operators in order of BODMAS

function bodmas(){
    expDiv = document.getElementById("exp");
    lenExp = expDiv.textContent.length;

    let arrSym = [];
    
    // First find all division/multiplication operators
    for (let i = 0; i < lenExp; i++) {
        if (expDiv.textContent[i] == '/' || expDiv.textContent[i] == '*') {
            arrSym.push(i);
        }
    }

    // Then addition/subtraction operators
    for (let i = 0; i < lenExp; i++) {
        if (expDiv.textContent[i] == '+' || expDiv.textContent[i] == '-') {
            arrSym.push(i);
        }
    }
    
    return arrSym;
}

// 7-3*2+3 -> arrSym = [3,1,5]

// Evaluate 3*2, replace that expression with the answer, and then call bodmas on the new expression again.

// 4+33/3-1

function evaluate(){

    lenExp = workingExpression.length;
    let bodArr = bodmas();
    let partA='', partB = '';
    let sym = workingExpression[bodArr[0]];
    let indStopA=bodArr[0], indStopB=bodArr[0];

    for (let i = bodArr[0]-1;!(symbols.includes(workingExpression[i]));i--){
        partA+=workingExpression[i];
        indStopA--;
    }

    partA = +(partA.split('').reverse().join(''));

    for (let i = bodArr[0]+1;!(symbols.includes(workingExpression[i]));i++){
        partB+=workingExpression[i];
        indStopB++;
    }
    partB = +(partB.split('').reverse().join(''));

    let ans = operator(partA, sym, partB);

    let toRemove = workingExpression.slice(indStopA, indStopB+1);
    workingExpression = workingExpression.replace(toRemove, ans);
    
    if (!(symbols.some(sym=>workingExpression.includes(sym)))){
        return workingExpression;
    }
    console.log(workingExpression);
    return evaluate();
}


