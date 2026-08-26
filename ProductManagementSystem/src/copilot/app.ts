interface Product {
    id: number,
    name: string,
    description?: string,
    price: number,
    category: string,
    stock: number,
    status: "active" | "inactive"
}

class ProductManagementSystem {
    private products: Product[]=[];
    
    private validateProduct(product: Product): void {
        if(!product.name.trim()) throw new Error("Name is required");
        if(product.price < 0) throw new Error("Price cannot be negative");
        if(product.stock < 0) throw new Error("Stock cannot be negative");
    }

    addProduct(product: Product): void {
        this.validateProduct(product);
        if(this.products.find(p=>p.id === product.id)) throw new Error("Duplicate Id not allowed");
        this.products.push(product);
        this.render();
    }

    deleteProduct(id: number): void {
        this.products = this.products.filter(p=>p.id!==id);
        this.render();
    }

    search(keyword: string): Product[] {
        return this.products.filter(p=>p.name.toLowerCase().includes(keyword.trim().toLowerCase()))
    }

    filter(status?:string, category?:string):Product[] {
        return this.products.filter(p=>
            (!status || p.status===status) &&
            (!category || p.category.toLowerCase() === category.toLowerCase())
        );
    }

    sort(order: "asc" | "desc"): Product[] {
        return [...this.products].sort((a,b)=>
            order === "asc"? a.price-b.price : b.price-a.price
        );
    }

    inventoryValue(): number {
        return this.products.reduce((sum, p) => sum + p.price * p.stock, 0);
    }

    render(products: Product[] = this.products): void {
        const table = document.getElementById("productTable")!;
        table.textContent="";
        products.forEach(p => {
            const row=document.createElement("tr");
            row.innerHTML = `
                <td>${p.id}</td>
                <td>${p.name}</td>
                <td>${p.description || ""}</td>
                <td>${p.price}</td>
                <td>${p.category}</td>
                <td>${p.stock}</td>
                <td>${p.status}</td>
                <td><button onclick="deleteProduct(${p.id})">Delete</button>
            `;
            table.appendChild(row);
        });
        document.getElementById("inventoryValue")!.textContent=`${this.inventoryValue()}`;
    }
}
const system=new ProductManagementSystem();

document.getElementById("productForm")!.addEventListener("submit", e=>{
    e.preventDefault();
    try {
        const product: Product = {
            id: Math.round(Math.random() * 1000),
            name: ((document.getElementById("name") as HTMLInputElement).value).trim(),
            description: (document.getElementById("description") as HTMLInputElement).value.trim(),
            price: Number((document.getElementById("price") as HTMLInputElement).value),
            category: (document.getElementById("category") as HTMLInputElement).value.trim(),
            stock: Number((document.getElementById("stock") as HTMLInputElement).value),
            status: (document.getElementById("status") as HTMLSelectElement).value as "active" | "inactive"
        };
        system.addProduct(product);
    } catch (error) {
        alert((error as Error).message);
    }
});

//Search & filter
document.getElementById("search")!.addEventListener("input", e => {
    const keyword = (e.target as HTMLInputElement).value;
    system.render(system.search(keyword));
});
document.getElementById("filterStatus")!.addEventListener("change", e=>{
    const status=(e.target as HTMLSelectElement).value;
    system.render(system.filter(status));
});
document.getElementById("filterCategory")!.addEventListener("input", e =>{
    const category = (e.target as HTMLInputElement).value;
    system.render(system.filter(undefined, category));
});

//sort
document.getElementById("sortAsc")!.addEventListener("click", ()=> {
    system.render(system.sort("asc"));
});
document.getElementById("sortDesc")!.addEventListener("click", ()=> {
    system.render(system.sort("desc"));
});
function deleteProduct(id:number){
    system.deleteProduct(id);
}