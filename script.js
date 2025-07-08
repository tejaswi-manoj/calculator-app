// Global variables

let a,o,b,ans,expDiv, lenNumAndOp;
let exp = {
    a,o,b,
}

let lenExp;
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
    expDiv.textContent += value;
}

// Events

// document.getElementById("equal").addEventListener("click", displayAns);


document.querySelectorAll(".equal").forEach(button=>{
    button.addEventListener("click", () => {
        displayAns();
        arrSymFun();
    })
})

document.querySelectorAll('.exp').forEach(button => {
    button.addEventListener('click', displayExp);
});


// document.querySelectorAll('.exp').forEach(button => {
//     button.addEventListener('click', () => {
//         displayExp;
//         const indices = loopString();
//         console.log(indices); // Or do something with the result
//     });
// });



document.querySelectorAll('.operation').forEach(button => {
    button.addEventListener('click', firstNumAndOp);
});


// Calculate & Display Answer

function displayAns(){
    expDiv = document.getElementById("exp");
    let totalLength = expDiv.textContent.length;
    exp.b = +(expDiv.textContent.substring(lenNumAndOp,totalLength));
    ans = operator(exp.a, exp.o, exp.b); //Object properties go in as the input for this function
    const ansDiv = document.getElementById("ans");
    ansDiv.textContent = ans;
}

function firstNumAndOp(){
    expDiv = document.getElementById("exp");
    lenNumAndOp = expDiv.textContent.length;
    exp.a = +(expDiv.textContent.substring(0,lenNumAndOp-1));
    exp.o = expDiv.textContent[lenNumAndOp-1];
}

// Logic

// E.g: 1+1*2
// Take the expression, loop through the string for /, *, +,- one by one. 
// If / is encountered, then stop and evaluate that expression first
// How to evaluate? -> loop until another sign or undefined is encountered towards the left. this is your first variable.
// Loop until another sign is encountered or undefined. this is your second variable.
// call operate on these two variables and the sign
// replace that expression with the answer, then do the same again. in this case you get 1+2
// then evaluate and finally once no more signs are remaining, return the answer.

// Function to loop through string and get the array of operators in order of BODMAS

function arrSymFun(){
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


