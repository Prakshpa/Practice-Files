class ProductManagementSystem {
    constructor() {
        this.products = [];
    }
    validateProduct(product) {
        if (!product.name.trim())
            throw new Error("Name is required");
        if (product.price < 0)
            throw new Error("Price cannot be negative");
        if (product.stock < 0)
            throw new Error("Stock cannot be negative");
    }
    addProduct(product) {
        this.validateProduct(product);
        if (this.products.find(p => p.id === product.id))
            throw new Error("Duplicate Id not allowed");
        this.products.push(product);
        this.render();
    }
    deleteProduct(id) {
        this.products = this.products.filter(p => p.id !== id);
        this.render();
    }
    search(keyword) {
        return this.products.filter(p => p.name.toLowerCase().includes(keyword.trim().toLowerCase()));
    }
    filter(status, category) {
        return this.products.filter(p => (!status || p.status === status) &&
            (!category || p.category.toLowerCase() === category.toLowerCase()));
    }
    sort(order) {
        return [...this.products].sort((a, b) => order === "asc" ? a.price - b.price : b.price - a.price);
    }
    inventoryValue() {
        return this.products.reduce((sum, p) => sum + p.price * p.stock, 0);
    }
    render(products = this.products) {
        const table = document.getElementById("productTable");
        table.textContent = "";
        products.forEach(p => {
            const row = document.createElement("tr");
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
        document.getElementById("inventoryValue").textContent = `${this.inventoryValue()}`;
    }
}
const system = new ProductManagementSystem();
document.getElementById("productForm").addEventListener("submit", e => {
    e.preventDefault();
    try {
        const product = {
            id: Math.round(Math.random() * 1000),
            name: (document.getElementById("name").value).trim(),
            description: document.getElementById("description").value.trim(),
            price: Number(document.getElementById("price").value),
            category: document.getElementById("category").value.trim(),
            stock: Number(document.getElementById("stock").value),
            status: document.getElementById("status").value
        };
        system.addProduct(product);
    }
    catch (error) {
        alert(error.message);
    }
});
//Search & filter
document.getElementById("search").addEventListener("input", e => {
    const keyword = e.target.value;
    system.render(system.search(keyword));
});
document.getElementById("filterStatus").addEventListener("change", e => {
    const status = e.target.value;
    system.render(system.filter(status));
});
document.getElementById("filterCategory").addEventListener("input", e => {
    const category = e.target.value;
    system.render(system.filter(undefined, category));
});
//sort
document.getElementById("sortAsc").addEventListener("click", () => {
    system.render(system.sort("asc"));
});
document.getElementById("sortDesc").addEventListener("click", () => {
    system.render(system.sort("desc"));
});
function deleteProduct(id) {
    system.deleteProduct(id);
}
export {};
//# sourceMappingURL=app.js.map