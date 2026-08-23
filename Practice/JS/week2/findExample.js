const result=document.getElementById("result");
const myArray=[10,2,3,40,1];
document.getElementById("testButton").addEventListener("click", ()=>{
    const number=Number.parseInt(prompt("Enter a number to check"));
    const match=myArray.find(value=>value==number)
    if(match==number) result.textContent="The number is found";
    else result.textContent="No match found";
})