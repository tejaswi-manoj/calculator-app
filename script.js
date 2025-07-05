let a,o,b,ans,expDiv, lenNumAndOp;
let exp = {
    a,o,b,
}
let equalToPressed = false;

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

function displayExp(e){
    console.log("displayExp is called")
    expDiv = document.getElementById("exp");
    let value = e.target.textContent;
    expDiv.textContent += value;
}

document.getElementById("equal").addEventListener("click", displayAns);

document.querySelectorAll('.exp').forEach(button => {
    button.addEventListener('click', displayExp);
});

document.querySelectorAll('.operation').forEach(button => {
    button.addEventListener('click', firstNumAndOp);
});



function displayAns(){
    console.log("dispans is called")
    expDiv = document.getElementById("exp");
    let totalLength = expDiv.textContent.length;
    exp.b = +(expDiv.textContent.substring(lenNumAndOp+1,totalLength-1));
    console.log(exp.a);
    console.log(exp.o);
    console.log(exp.b);

    ans = operator(exp.a, exp.o, exp.b); //Object properties go in as the input for this function

    console.log(ans);

    const ansDiv = document.getElementById("ans");
    ansDiv.textContent = ans;
}

function firstNumAndOp(){
    console.log("fnao is called")
    expDiv = document.getElementById("exp");
    lenNumAndOp = expDiv.textContent.length;
    exp.a = +(expDiv.textContent.substring(0,lenNumAndOp-1));
    exp.o = expDiv.textContent[lenNumAndOp-1];
    console.log(exp.a);
    console.log(exp.o);
}


