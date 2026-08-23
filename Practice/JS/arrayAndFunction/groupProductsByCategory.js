const products=[
    {name: "Smart Phone", price: 20000, category: "Smart Gadget"},
    {name: "Laptop", price: 50000, category: "Smart Gadget"},
    {name: "Aquerium", price: 10000, category: "Luxury"},
    {name: 'Cooking Oil', price: 500, category: "Everyday"},
    {name: "Ear ring", price: 55000, category: "Jewellery"},
    {name: "Rice", price: 2400, category: "Everyday"},
    {name: "Gold Elephant", price: 200000, category: 'Jewellery'}
];
const table=document.getElementById("products");
const category=document.getElementById("category");
const caption=document.createElement("caption");
caption.textContent="Products of all categories"
table.appendChild(caption);
table.innerHTML+=`<tr>
    <th>S.No.</th>
    <th>Product Name</th>
    <th>Product Price</th>
    <th>Category</th>
    </tr>`;
const tableBody=document.createElement("tbody");
table.appendChild(tableBody);
products.forEach((product, index) => {
    if(index==0) tableBody.innerHTML="";
    tableBody.innerHTML+=`<tr>
        <td>${index+1}</td>
        <td>${product.name}</td>
        <td>${product.price}</td>
        <td>${product.category}</td>
    </tr>`
});

category.addEventListener("change", ()=>{
    const tableCaption=document.querySelector("caption");
    tableBody.innerHTML="";
    const categoryName=category.value;
    if(categoryName==""){
        tableCaption.textContent="Products of all categories";
        products.forEach((product, index) => {
            if(index==0) tableBody.innerHTML="";
            tableBody.innerHTML+=`<tr>
                <td>${index+1}</td>
                <td>${product.name}</td>
                <td>${product.price}</td>
                <td>${product.category}</td>
            </tr>`
        });
    }else{
        tableCaption.textContent=`${categoryName} category products`;
        const filteredProducts=products.filter((value)=>value.category===categoryName);
        filteredProducts.forEach((product, index)=>{
            tableBody.innerHTML+=`<tr>
                <td>${index+1}</td>
                <td>${product.name}</td>
                <td>${product.price}</td>
                <td>${product.category}</td>
            </tr>`
        })
    }
})