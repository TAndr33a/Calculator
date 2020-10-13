let runningTotal = 0;//locul unde pastrezi un rezultat pe care il aduni iar cu un nr
let buffer = "0";//buffer=>what's on the screen in any given time
let previousOperator;// where you keep the operator

const screen = document.querySelector('.screen');

function buttonClick(value) {
    if (isNaN(parseInt(value))) {//this is not a number
        handleSymbol(value);
    } else {//this is a number
        handleNumber(value);
    }

    rerender();
    //screen.innerText = buffer; // abia linia asta de cod face sa apara numarul si pe ecran 
 }

function handleSymbol(symbol) {
    // if (symbol === 'C') {
    //     buffer = '0';
    //     runningTotal = 0;
    //   }

    switch (symbol) {
        case 'C':
            buffer = '0';
            runningTotal = 0;
            break;
        case '=':
            if (previousOperator === null) {//need two numbers to do math
                return;
            }
            flushOperation(parseInt(buffer));
            previousOperator = null;
            buffer = +runningTotal;
            runningTotal = 0;
            break; 
        case '←':
            if (buffer.length === 1) {
                buffer = '0';
            } else {
                buffer = buffer.substring(0, buffer.length - 1);
            }
            break;
        case '+':
        case '-':
        case '×':
        case '÷':
            handleMath(symbol);
            break;
    }

}

function handleMath(symbol) {
    if (buffer === '0') {
        return;//if is = 0 then do nothing//nu trb else if pt ca avem return
    }


    const intBuffer = parseInt(buffer);//pt ca din html e string//pot scrie in loc de parse: +buffer

    if (runningTotal === 0) {
        runningTotal = intBuffer;
    } else {
        flushOperation(intBuffer);//slush-where you actually do the math
    }

    previousOperator = symbol;

    buffer = '0';

}

function flushOperation(intBuffer) {
    if (previousOperator === '+') {
        runningTotal += intBuffer;
    } else if (previousOperator === '-') {
        runningTotal -= intBuffer;

    } else if (previousOperator === '×') {
        runningTotal *= intBuffer;
    } else {
        runningTotal /= intBuffer;
    }
}
 
function handleNumber(numberString) {//functia asta face ca apasand un buton sa scrie nr de pe buton sau daaca
    //apas pe mai multe nr sa fie nr insiruite ex: 12345,dar nu afiseaza si pe ecran asta
    if (buffer === "0") {///=== 0 face sa apara 5 daca apesi 5 pe buton
        buffer = numberString;
    } else {
        buffer += numberString;
    }
    
    
}

function rerender() {
    screen.innerText = buffer;
}

function init() {//runs at the beggening of the program
    document.querySelector('.calc-buttons')//select the section from html
        .addEventListener('click',//whenever a cick event heppen
            function (event) {
                buttonClick(event.target.innerText);//run this function
            });
    


}
    init();

