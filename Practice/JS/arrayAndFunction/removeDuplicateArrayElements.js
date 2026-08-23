const testButton=document.getElementById("testButton");
const result=document.getElementById("result");
testButton.addEventListener("click", ()=>{
    const arrayInput=prompt("Enter name of some birds seperated by , ");
    const inputArray=arrayInput.split(/[,]+[ ]*/);
    const filteredArray=inputArray.filter((value,index,array)=>array.indexOf(value)===index);
    result.innerText=`Original array: ${inputArray.join(", ")}\n
                        FilteredArray: ${filteredArray.join(", ")}`;
});