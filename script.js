let a,o,b;

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
    const expDiv = document.getElementById("exp");
    let value = e.target.textContent;
    expDiv.textContent += value;
}

document.querySelectorAll('.operation').forEach(button => {
    button.addEventListener('click', displayExp);
});

// document.getElementById("equal").addEventListener("click", displayAns);