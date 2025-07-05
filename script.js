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

