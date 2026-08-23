const result=document.getElementById("result");
const testButton=document.getElementById("testButton");
testButton.addEventListener("click", ()=>{
    const inputText=prompt("Enter a list of numbers");
    const numberArray=inputText.split(/[, ]+/).map(Number);
    const evenNumberArray=numberArray.filter(value=>value%2===0);
    result.innerText=`Original Array: ${inputText}
                        Only even numbers from the array: ${evenNumberArray}`;
});