const employeeSalaryData={
    basic_salary: 50000,
    allowences: [], 
    taxes: []
}
const calculateButton=document.getElementById("calculate");
const addAllowence=document.getElementById("addAllowence");
const addTax=document.getElementById("addTax");
const taxTitle=document.getElementById("taxes");
const taxAmount=document.getElementById('taxAmount');
const allTaxes=document.getElementById('allTaxes');
const allowenceTitle=document.getElementById("allowences");
const allowenceAmount=document.getElementById("allowenceAmount");
const allAllowences=document.getElementById("allAllowences");
const basicSalary=document.getElementById("basic");
const result=document.getElementById("result");
calculateButton.addEventListener("click", (e)=>{
    e.preventDefault();
    const basic_salary=Number.parseInt(basicSalary.value);
    const totalAllowences=employeeSalaryData.allowences.reduce((total, value)=>total+value.amount, 0);
    const totalTaxes=employeeSalaryData.taxes.reduce((total, value)=>total+value.amount, 0);
    const netSalary=basic_salary +totalAllowences - totalTaxes/100*basic_salary;
    result.textContent="Net Salary: "+netSalary;
});
addAllowence.addEventListener("click", ()=>{
    const allowenceName = allowenceTitle.value;
    const amount=Number.parseInt(allowenceAmount.value);
    allAllowences.innerHTML+=`<li>${allowenceName}: Rs ${amount}`
    employeeSalaryData.allowences=[...employeeSalaryData.allowences, {name: allowenceName, amount}];
    allowenceTitle.value="";
    allowenceAmount.value="";
})
addTax.addEventListener("click", ()=>{
    const taxName=taxTitle.value;
    const amount=Number.parseFloat(taxAmount.value);
    allTaxes.innerHTML+=`<li>${taxName}: ${amount}%`
    employeeSalaryData.taxes=[...employeeSalaryData.taxes, {name: taxName, amount}];
    taxTitle.value="";
    taxAmount.value="";
})