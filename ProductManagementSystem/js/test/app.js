// Get HTML elements
const productForm = document.getElementById("productForm");
const productIdInput = document.getElementById("productId");
const nameInput = document.getElementById("name");
const categoryInput = document.getElementById("category");
const priceInput = document.getElementById("price");
const quantityInput = document.getElementById("quantity");
const descriptionInput = document.getElementById("description");
const productTableBody = document.getElementById("productTableBody");
const searchInput = document.getElementById("searchInput");
const submitButton = document.getElementById("submitButton");
const cancelButton = document.getElementById("cancelButton");
const totalProducts = document.getElementById("totalProducts");
const totalQuantity = document.getElementById("totalQuantity");
const inventoryValue = document.getElementById("inventoryValue");
// Load products from localStorage
let products = loadProducts();
// Load products
function loadProducts() {
    const storedProducts = localStorage.getItem("products");
    if (!storedProducts) {
        return [];
    }
    return JSON.parse(storedProducts);
}
// Save products
function saveProducts() {
    localStorage.setItem("products", JSON.stringify(products));
}
// Generate ID
function generateId() {
    if (products.length === 0) {
        return 1;
    }
    return Math.max(...products.map(product => product.id)) + 1;
}
// Add or update product
productForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const id = productIdInput.value;
    const product = {
        id: id
            ? Number(id)
            : generateId(),
        name: nameInput.value.trim(),
        category: categoryInput.value.trim(),
        price: Number(priceInput.value),
        quantity: Number(quantityInput.value),
        description: descriptionInput.value.trim()
    };
    if (id) {
        // Update existing product
        const index = products.findIndex(product => product.id === Number(id));
        if (index !== -1) {
            products[index] = product;
        }
    }
    else {
        // Add new product
        products.push(product);
    }
    saveProducts();
    renderProducts();
    resetForm();
});
// Display products
function renderProducts(searchTerm = "") {
    productTableBody.innerHTML = "";
    const filteredProducts = products.filter(product => {
        const search = searchTerm.toLowerCase();
        return (product.name
            .toLowerCase()
            .includes(search) ||
            product.category
                .toLowerCase()
                .includes(search) ||
            product.description
                .toLowerCase()
                .includes(search));
    });
    filteredProducts.forEach((product, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `

                <td>${index + 1}</td>

                <td>${product.name}</td>

                <td>${product.category}</td>

                <td>${product.price.toFixed(2)}</td>

                <td>${product.quantity}</td>

                <td>${product.description}</td>

                <td>

                    <div class="action-buttons">

                        <button
                            class="edit-button"
                            data-id="${product.id}"
                        >
                            Edit
                        </button>

                        <button
                            class="delete-button"
                            data-id="${product.id}"
                        >
                            Delete
                        </button>

                    </div>

                </td>
            `;
        productTableBody.appendChild(row);
    });
    updateDashboard();
}
// Edit product
function editProduct(id) {
    const product = products.find(product => product.id === id);
    if (!product) {
        return;
    }
    productIdInput.value =
        product.id.toString();
    nameInput.value =
        product.name;
    categoryInput.value =
        product.category;
    priceInput.value =
        product.price.toString();
    quantityInput.value =
        product.quantity.toString();
    descriptionInput.value =
        product.description;
    submitButton.textContent =
        "Update Product";
    cancelButton.hidden =
        false;
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}
// Delete product
function deleteProduct(id) {
    const confirmed = confirm("Are you sure you want to delete this product?");
    if (!confirmed) {
        return;
    }
    products =
        products.filter(product => product.id !== id);
    saveProducts();
    renderProducts();
    resetForm();
}
// Reset form
function resetForm() {
    productForm.reset();
    productIdInput.value = "";
    submitButton.textContent =
        "Add Product";
    cancelButton.hidden =
        true;
}
// Cancel editing
cancelButton.addEventListener("click", resetForm);
// Search
searchInput.addEventListener("input", () => {
    renderProducts(searchInput.value);
});
// Handle Edit/Delete buttons
productTableBody.addEventListener("click", (event) => {
    const target = event.target;
    const button = target.closest("button");
    if (!button) {
        return;
    }
    const id = Number(button.dataset.id);
    if (button.classList
        .contains("edit-button")) {
        editProduct(id);
    }
    if (button.classList
        .contains("delete-button")) {
        deleteProduct(id);
    }
});
// Update dashboard
function updateDashboard() {
    const quantity = products.reduce((total, product) => total + product.quantity, 0);
    const value = products.reduce((total, product) => total +
        product.price *
            product.quantity, 0);
    totalProducts.textContent =
        products.length.toString();
    totalQuantity.textContent =
        quantity.toString();
    inventoryValue.textContent =
        value.toFixed(2);
}
// Initial render
renderProducts();
export {};
//# sourceMappingURL=app.js.map