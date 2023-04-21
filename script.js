const display1El = document.querySelector(".display-1");
const display2El = document.querySelector(".display-2");
const tempResultEl = document.querySelector(".temp-result");
const numbersEl = document.querySelectorAll(".number");
const operationEl = document.querySelectorAll(".operation");
const equalEl = document.querySelector(".equal");
const clearAllEl = document.querySelector(".all-clear");
const clearLastEl = document.querySelector(".last-entity-clear");
let dis1Num = "";
let dis2Num = "";
let result = null;
let lastOperation = "";
let haveDot = false;

numbersEl.forEach(number =>{
    number.addEventListener('click',(e) =>{
        if(e.target.innerText === '.' && !haveDot){
            haveDot = true;
        }
        else if(e.target.innerText === '.' && haveDot){
            return;
        }
        dis2Num += e.target.innerText;
        display2El.innerText = dis2Num;
    })
});

operationEl.forEach(operation =>{
    operation.addEventListener('click',(e)=>{
        //if there is no number in dis2num
        if(!dis2Num){
            return;
        }
        //made false because, after typing number one dot enough, but after operation for that number you may need dot again
        haveDot = false;
        const operationName = e.target.innerText;
        //if we had both numbers and operation we clicked, do operation
        if(dis1Num && dis2Num && lastOperation){
            mathOPeration();
            console.log(dis1Num, dis2Num,lastOperation)
        }
        else{
            result = parseFloat(dis2Num);
        }
        //it clears dis2, and shows result in temp and dis1
        clearVar(operationName);
        lastOperation = operationName;
        console.log(result)
    })
});

//for clearing dis2num
function clearVar(name = ''){
    dis1Num += dis2Num +''+ name + '';
    display1El.innerText = dis1Num;
    display2El.innerText = ' ';
    dis2Num = '';
    tempResultEl.innerText = result;
};

function mathOPeration(){
    if(lastOperation === 'x'){
        result = parseFloat(result) * parseFloat(dis2Num);
    }
    else if(lastOperation === '+'){
        result = parseFloat(result) + parseFloat(dis2Num);
    }
    else if(lastOperation === '-'){
        result = parseFloat(result) - parseFloat(dis2Num);
    }
    else if(lastOperation === '/'){
        result = parseFloat(result) / parseFloat(dis2Num);
    }
    else if(lastOperation === '%'){
        result = parseFloat(result) % parseFloat(dis2Num);
    }
};

// Equal Button
equalEl.addEventListener('click',(e) =>{
    let res = 0;
    if(!dis1Num || !dis2Num){
        return;
    }
    haveDot=false;
    mathOPeration();
    clearVar();

    // checking decimals
    if(Number.isInteger(result)) {
      res = result;
    }else {
      res = result.toFixed(2);
    }
    display2El.innerText = res;
    tempResultEl.innerText = '';
    dis2Num = result;
    dis1Num = '';
});

// All Clear
clearAllEl.addEventListener('click',(e) =>{
    display1El.innerText = '0';
    display2El.innerText = '0';
    tempResultEl.innerText = '0';
    dis1Num = '';
    dis2Num = '';
    result = ''
});
// Clear Last Entity
clearLastEl.addEventListener("click", () => {
        display2El.innerText = '0';
        dis2Num = "";
  });
  
//  Key Board Operations
window.addEventListener("keydown", (e) => {
    if (
      e.key === "0" ||
      e.key === "1" ||
      e.key === "2" ||
      e.key === "3" ||
      e.key === "4" ||
      e.key === "5" ||
      e.key === "6" ||
      e.key === "7" ||
      e.key === "8" ||
      e.key === "9" ||
      e.key === "."
    ) {
      clickButtonEl(e.key);
      // console.log(e.key)
    } else if (e.key === "+" || e.key === "-" || e.key === "/" || e.key === "%") {
      clickOperation(e.key);
    } else if (e.key === "*") {
      clickOperation("x");
      // console.log(e.key)
    } else if (e.key == "Enter" || e.key === "=") {
      clickEqual();
    }
    // console.log(e.key)
  });
  function clickButtonEl(key) {
    numbersEl.forEach((button) => {
      if (button.innerText === key) {
        button.click();
      }
    });
  }
  function clickOperation(key) {
    operationEl.forEach((operation) => {
      if (operation.innerText === key) {
        operation.click();
      }
    });
  }
  function clickEqual() {
    equalEl.click();
  } 