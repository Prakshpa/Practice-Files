const testButton=document.getElementById("testButton");
const result=document.getElementById("result");
const testArray=[20,30,10,5,1];
testButton.addEventListener("click", ()=>{
    const reversedArray=[...testArray].reverse();
    result.innerHTML=`Original array: ${testArray}<br>
                        Reversed array: ${reversedArray}`;
});