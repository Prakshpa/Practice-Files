const myArray=[10,20,30,45,51];
function conditionTest(value) {
    return value%5===0;
}
if(myArray.some(conditionTest)) {
    console.log("Some elements meet the condition");
    if(myArray.every(conditionTest)) console.log("All elements also meet the condition");
    else console.log("But all elements don't meet the condition");
}else console.log("No elements meet the condition");