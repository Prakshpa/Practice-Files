const calculateSubmit=document.getElementById("calculate");
const productTable=document.getElementById("products");
const productName=document.getElementById('productName');
const productExpense=document.getElementById("expense");
const add=document.getElementById("addProduct");
const productExpenses=[];
const result=document.getElementById("result");

const caption=document.createElement("caption");
caption.textContent="Product Expenses";
productTable.appendChild(caption);
productTable.innerHTML+=`<tr>
    <th>Product Name</th>
    <th>Product Category</th>
</tr>`;

add.addEventListener("click", ()=>{
    const name=productName.value;
    const expense=Number.parseInt(productExpense.value);
    productExpenses.push({name, expense});
    productTable.innerHTML+=`<tr>
        <td>${name}</td>
        <td>${expense}</td>
    </tr>`;
    productName.value="";
    productExpense.value="";
});

calculateSubmit.addEventListener("click", (e)=>{
    e.preventDefault();
    const expenses = productExpenses.reduce((expense, value, index)=>{
        expense.total+=value.expense;
        if(expense.highestExpense < value.expense){
            expense.highestExpense = value.expense;
            expense.highestExpenseIndex = index;
        }
        return expense;
    }, {total: 0, highestExpense: 0, highestExpenseIndex: -1})

    result.innerText=`Total Expenses: ${expenses.total}
        Highest Expenses: ${expenses.highestExpense} in ${productExpenses[expenses.highestExpenseIndex].name}
        Average Expenses: ${expenses.total / productExpenses.length}`;
});