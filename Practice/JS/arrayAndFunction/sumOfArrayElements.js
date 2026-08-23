const testButton=document.getElementById("testButton");
const result=document.getElementById("result");
testButton.addEventListener("click", ()=>{
    const arrayInput=prompt("Enter all numbers of an array:");
    const numberArray=arrayInput.split(/[ ,]+/).map(Number);
    const sum=numberArray.reduce((total, value)=>{
        return total+value;
    },0);
    result.textContent=`Sum of all elements in: ${numberArray}\n is ${sum}`;
});
