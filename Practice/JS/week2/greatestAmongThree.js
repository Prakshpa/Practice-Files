const test=document.getElementById("testButton");
const result=document.getElementById("result");
test.addEventListener("click", function() {
    const num1= parseFloat(prompt("Enter the first number:"));
    const num2= parseFloat(prompt("Enter the second number:"));
    const num3= parseFloat(prompt("Enter the third number:"));
    let greatest=num1;
    if(num2 > greatest) {
        greatest = num2;
    }
    if(num3 > greatest) {
        greatest = num3;
    }
    result.textContent = `The greatest number among ${num1}, ${num2}, and ${num3} is: ${greatest}`;
});