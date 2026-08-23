const testButton=document.getElementById("testButton");
console.log("Find Largest number in an array");
const result=document.getElementById("result");
testButton.addEventListener("click", ()=>{
    const arrayInput=prompt("Enter all numbers in an array: ");
    const numberArray=arrayInput.split(/[ ,]+/).map(Number);
    numberArray.sort((a,b)=>b-a);
    result.textContent=`Largest number in ${arrayInput} is ${numberArray[0]}`;
})
