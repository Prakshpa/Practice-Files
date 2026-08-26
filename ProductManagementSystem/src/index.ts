import type {Status, Product, Categories} from "./types/types.js";
import { validateProductForm } from "./functions/functions.js";
import { Storage } from "./storage/storage.js";

let productData: Product = {
    category: "" as Categories,
    description: "",
    name: "",
    price: 0,   
    status: "" as Status,
    stock: 0
}
const productForm: HTMLFormElement = document.querySelector("form.product-form")!;
const pName: HTMLInputElement = document.getElementById("pName") as HTMLInputElement;
const pDescription: HTMLTextAreaElement = document.getElementById("pDescription") as HTMLTextAreaElement;
const pPrice: HTMLInputElement = document.getElementById("pPrice") as HTMLInputElement;
const pCategory: HTMLSelectElement = document.getElementById("pCategory") as HTMLSelectElement;
const pStock: HTMLInputElement = document.getElementById("pStock") as HTMLInputElement;
const pStatus: HTMLSelectElement = document.getElementById("pStatus") as HTMLSelectElement;
const cancelButton: HTMLButtonElement = document.getElementById("cancel") as HTMLButtonElement;
const addProduct = document.getElementById("addProduct") as HTMLButtonElement;
const productSubmit: HTMLButtonElement = document.getElementById("submit") as HTMLButtonElement;

let pID: unknown = undefined;
let products: Record<number, Required<Product>>;
let filteredProducts: Required<Product>[] = [];

const productCountSummary = document.querySelector("#product-count")!;
const productValueSummary = document.querySelector("#product-value")!;
let productCount=0;
let totalValue = 0;

pName.addEventListener("input", (e)=>{
    productData = {...productData, name: (e?.target as HTMLInputElement).value}
})
pDescription.addEventListener("input", (e)=>{
    productData = {...productData, description: (e?.target as HTMLTextAreaElement).value.trim()}
})
pPrice.addEventListener("input", (e)=>{
    productData = {...productData, price: Number((e?.target as HTMLInputElement).value)}
})
pStock.addEventListener("input", (e)=>{
    productData = {...productData, stock: Number((e?.target as HTMLInputElement).value)}
})
pCategory.addEventListener("change", (e)=>{
    productData = { ...productData, category: (e.target as HTMLSelectElement).value as Categories};
    console.log("category: ", productData.category);
})
pStatus.addEventListener("change", (e)=>{
    productData = { ...productData, status: (e.target as HTMLSelectElement).value as Status};
});

const searchBox = document.querySelector(".search-box") as HTMLFormElement;
const sortOption = document.getElementById("sort") as HTMLSelectElement;
const statusOption = document.getElementById("status") as HTMLSelectElement;
const categoryOption = document.getElementById("category") as HTMLSelectElement;
const searchText = document.querySelector('input[type="search"]') as HTMLInputElement;
const searhButton=document.querySelector("input[type=submit]") as HTMLInputElement;

const productSection=document.querySelector(".content")!;
const productTable=document.querySelector("tbody#productTable") as HTMLTableSectionElement;

addProduct.addEventListener("click", ()=>{
    showProductForm();
    productSubmit.textContent = "Create";
})
cancelButton.addEventListener("click", ()=>{
    hideProductForm();
});

const productStorage = new Storage<Product>("products");
productForm.addEventListener("submit", (e)=>{
    e.preventDefault();
    try {
        if(validateProductForm(productData)) {
            if (!productData.id) {
                products = productStorage.create(productData);
                console.log(products);
            } else {
                products = productStorage.update(productData as Required<Product>)
            }
            renderProductData(Object.values(products));            
        }
    } catch (error) {
        console.log(error);
    }
});

function fetchData () {
    productForm.style.display="none";
    searchBox.style.display="block";
    (productSection as HTMLElement).style.display = "block";
    products = productStorage.fetchData();

    filteredProducts = Object.values(products)
    renderProductData(filteredProducts);
}
function deleteProduct(id: number) {
    products = productStorage.delete(id);
    filteredProducts = Object.values(products);
    renderProductData(filteredProducts);
}
function editProduct(id:number) {
    showProductForm();
    productData = {...(products[id] as Product)};

    pName.value = productData.name;
    pCategory.value = productData.category;
    pPrice.value = `${productData.price}`;
    pDescription.value = productData.description as string;
    pStatus.value=productData.status;
    pStock.value=`${productData.stock}`;
    productData.id=id;

    productSubmit.textContent="Edit Product";
    productForm.style.display = "block";
}
fetchData();

function renderProductData(productData: Required<Product>[]) {
    hideProductForm();
    totalValue = 0;
    productCount = 0;
    productTable.textContent="";
    productData.forEach((value, index)=>{
        productCount++;
        totalValue += value.price * value.stock;
        const tr = document.createElement("tr");
        tr.innerHTML=`
            <td> ${value.id} </td>
            <td> ${value.name} </td>
            <td> ${value.price} </td>
            <td> ${value.category} </td>
            <td> ${value.stock} </td>
            <td> ${value.status} </td>
        `;
        const td = document.createElement("td");
        const editButton = document.createElement("button");
        editButton.setAttribute("class", "edit");
        editButton.textContent="Edit";
        editButton.addEventListener("click", (e)=> {
            editProduct(value.id as number);
        })
        const deleteButton = document.createElement("button");
        deleteButton.setAttribute("class", "delete");
        deleteButton.textContent="Delete";
        deleteButton.addEventListener("click", ()=>{
            deleteProduct(value.id as number);
        });

        const element = tr.children[1] as HTMLTableCellElement;
        element.style.textDecoration = "underline";
        element.style.background="lightblue";
        element.addEventListener("click", ()=>{
            element.innerText=(element.innerText === `${value.name}`)? `Name: ${value.name}\nProduct Description: ${value.description}` : `${value.name}`;
        });
        td.appendChild(editButton);
        td.appendChild(deleteButton);
        tr.appendChild(td);
        productTable.appendChild(tr);
    });
    productCountSummary.textContent = "Total Products: "+productCount;
    productValueSummary.textContent = "Total Inventory Value: "+totalValue;
}

searhButton.addEventListener("click", (e)=>{
    e.preventDefault();
    searchProducts();
});

function searchProducts() {
    const sortType= sortOption.value;
    const searchWith = searchText.value.trim().toLowerCase();
    const status = statusOption.value;
    const category = categoryOption.value;
    
    filteredProducts = Object.values(products);

    filteredProducts = (searchWith!== " ")? Object.values(products).filter(value => {
        return value.name.toLowerCase().indexOf(searchWith) >= 0 || 
               value.description.toString().toLowerCase().indexOf(searchWith) >=0 || 
               value.id === Number(searchWith);
    }) : Object.values(products);

    filteredProducts = filteredProducts.filter(value => {
        if(status!=="" && category!=="") return value.status===status && value.category===category;
        else if (status !=="") return value.status ===status;
        else if (category !=="") return value.category===category;
        else return true;
    });
    if(sortType!=='') {
        if(sortType === "asc") filteredProducts.sort((a, b)=> a.price-b.price)
        else if (sortType === "desc") filteredProducts.sort((a,b)=>b.price-a.price);
    }
    renderProductData(filteredProducts);
}
function showProductForm() {
    delete productData.id;
    productForm.reset();
    productForm.style.display="block";
    searchBox.style.display="none";
    (productSection as HTMLElement).style.display = 'none';
    productData = {
        name: "",
        category: "",
        description: "",
        price: 0,
        status: "",
        stock: 0
    }
    const errors = document.getElementsByClassName(".error");
    for (let i= 0; i<errors.length; i++){
        (errors.item(i) as Element).textContent="";
    }
}
function hideProductForm() {
    productForm.reset();
    productForm.style.display="none";
    searchBox.style.display="block";
    (productSection as HTMLElement).style.display = 'block';
}