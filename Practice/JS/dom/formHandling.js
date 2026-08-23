const form =document.forms["form1"];
const input1=document.getElementById("input1");
const check=document.getElementById('check');
form.addEventListener("submit", (e)=>{
    e.preventDefault();
    console.log("Hello");
});
check.addEventListener("change", changeListener);
input1.addEventListener("input", changeListener);
input1.addEventListener("keydown", keyDownListener);
input1.addEventListener("keyup", keyUpListener);

function keyDownListener(e){
    if(/^[a-z0-9_ ]$/i.test(e.key)) e.preventDefault();
}
function keyUpListener(e){
    if(/^[a-z0-9_ ]$/i.test(e.key)) e.target.value+=e.key;
}
function changeListener(e){
    console.log(e.target.value);
}