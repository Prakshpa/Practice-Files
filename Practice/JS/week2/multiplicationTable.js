const result=document.getElementById("result");
const button=document.getElementById("testButton");
const tableElement=document.createElement("table");
const thead=document.createElement("thead");
const headerRow=document.createElement("tr");
const headerCell1=document.createElement("th");
const headerCell2=document.createElement("th");
headerCell1.textContent="Multiplication Table";
headerCell2.textContent="Result";
headerRow.appendChild(headerCell1);
headerRow.appendChild(headerCell2);
thead.appendChild(headerRow);
tableElement.appendChild(thead);
const tbody=document.createElement("tbody");
tableElement.appendChild(tbody);
document.body.appendChild(tableElement);
testButton.addEventListener("click", function() {
    const number= parseInt(prompt("Enter a number:"));
    let tableElement="";
    for(let i=1; i<=10; i++) {
        const row=document.createElement("tr");
        const cell1=document.createElement("td");
        const cell2=document.createElement("td");
        cell1.textContent=`${number} x ${i}`;
        cell2.textContent=`${number * i}`;
        row.appendChild(cell1);
        row.appendChild(cell2);
        tbody.appendChild(row);
    }
});
