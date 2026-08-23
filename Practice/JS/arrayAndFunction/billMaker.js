const testButton=document.getElementById("testButton");
const resultTable=document.createElement("table");
document.body.appendChild(resultTable);
resultTable.innerHTML=`<caption>Purchase Bill</caption>
    <tr>
        <th>SN</th>
        <th>Goods</th>
        <th>Quantity</th>
        <th>Unit Price</th>
    </tr> `;
const items=[
    {name: "Rice", price: 2000, quantity: 5},
    {name: "Beatenrice", price: 3000, quantity: 2},
    {name: "Detergent", price: 100, quantity: 20},
    {name: "Wheat Floor", price: 2000, quantity: 2}
];
testButton.addEventListener("click", ()=>{

    const totalPrice=items.reduce((total, value, index)=>{
        const newRow=document.createElement("tr");
        newRow.innerHTML=`<td>${index}</td>
            <td>${value.name}</td>
            <td>${value.quantity}</td>
            <td>${value.price}</td>`;
        resultTable.appendChild(newRow);
        return total + value.price * value.quantity;
    },0)
    const result=document.createElement("tr");
    result.innerHTML=`<th colspan="3" style="text-align: right">Total Price: </th>
        <td> ${totalPrice}</td>`;
    resultTable.appendChild(result);
});