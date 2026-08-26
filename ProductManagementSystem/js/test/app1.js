const productForm = document.getElementById("productForm");
const formSection = document.getElementById("formSection");
const formTitle = document.getElementById("formTitle");
const toggleFormButton = document.getElementById("toggleFormButton");
const toggleSearchButton = document.getElementById("toggleSearchButton");
const searchContainer = document.getElementById("searchContainer");
const productIdInput = document.getElementById("productId");
const nameInput = document.getElementById("name");
const categoryInput = document.getElementById("category");
const priceInput = document.getElementById("price");
const quantityInput = document.getElementById("quantity");
const statusInput = document.getElementById("status");
const descriptionInput = document.getElementById("description");
const submitButton = document.getElementById("submitButton");
const cancelButton = document.getElementById("cancelButton");
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const statusFilter = document.getElementById("statusFilter");
const priceSort = document.getElementById("priceSort");
const productTableBody = document.getElementById("productTableBody");
const totalProducts = document.getElementById("totalProducts");
const totalQuantity = document.getElementById("totalQuantity");
const inventoryValue = document.getElementById("inventoryValue");
let products = loadProducts();
function loadProducts() {
    const data = localStorage.getItem("products");
    if (!data) {
        return [];
    }
    return JSON.parse(data);
}
function saveProducts() {
    localStorage.setItem("products", JSON.stringify(products));
}
function generateId() {
    if (products.length === 0) {
        return 1;
    }
    return (Math.max(...products.map(product => product.id)) + 1);
}
toggleFormButton.addEventListener("click", () => {
    const isHidden = formSection.hidden;
    formSection.hidden =
        !isHidden;
    if (isHidden) {
        formTitle.textContent =
            "Add Product";
        submitButton.textContent =
            "Add Product";
    }
});
toggleSearchButton.addEventListener("click", () => {
    searchContainer.hidden =
        !searchContainer.hidden;
    if (!searchContainer.hidden) {
        searchInput.focus();
    }
    else {
        searchInput.value = "";
        renderProducts();
    }
});
productForm.addEventListener("submit", event => {
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
        status: statusInput.value,
        description: descriptionInput.value.trim()
    };
    if (id) {
        const index = products.findIndex(product => product.id ===
            Number(id));
        if (index !== -1) {
            products[index] =
                product;
        }
    }
    else {
        products.push(product);
    }
    saveProducts();
    updateCategoryFilter();
    renderProducts();
    resetForm();
    formSection.hidden =
        true;
});
function resetForm() {
    productForm.reset();
    productIdInput.value = "";
    formTitle.textContent =
        "Add Product";
    submitButton.textContent =
        "Add Product";
}
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
    statusInput.value =
        product.status;
    descriptionInput.value =
        product.description;
    formTitle.textContent =
        "Edit Product";
    submitButton.textContent =
        "Update Product";
    formSection.hidden =
        false;
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}
function deleteProduct(id) {
    const confirmed = confirm("Are you sure you want to delete this product?");
    if (!confirmed) {
        return;
    }
    products =
        products.filter(product => product.id !== id);
    saveProducts();
    updateCategoryFilter();
    renderProducts();
}
function updateCategoryFilter() {
    const currentValue = categoryFilter.value;
    const categories = [...new Set(products.map(product => product.category))].sort();
    categoryFilter.innerHTML = `

        <option value="all">
            All Categories
        </option>

    `;
    categories.forEach(category => {
        const option = document.createElement("option");
        option.value =
            category;
        option.textContent =
            category;
        categoryFilter.appendChild(option);
    });
    if (categories.includes(currentValue)) {
        categoryFilter.value =
            currentValue;
    }
}
function getFilteredProducts() {
    const search = searchInput.value
        .trim()
        .toLowerCase();
    const category = categoryFilter.value;
    const status = statusFilter.value;
    const sort = priceSort.value;
    let result = products.filter(product => {
        const matchesSearch = product.name
            .toLowerCase()
            .includes(search) ||
            product.category
                .toLowerCase()
                .includes(search) ||
            product.description
                .toLowerCase()
                .includes(search);
        const matchesCategory = category === "all" ||
            product.category ===
                category;
        const matchesStatus = status === "all" ||
            product.status ===
                status;
        return (matchesSearch &&
            matchesCategory &&
            matchesStatus);
    });
    if (sort === "low-high") {
        result.sort((a, b) => a.price - b.price);
    }
    else if (sort === "high-low") {
        result.sort((a, b) => b.price - a.price);
    }
    return result;
}
function renderProducts() {
    productTableBody.innerHTML = "";
    const filteredProducts = getFilteredProducts();
    filteredProducts.forEach((product, index) => {
        const row = document.createElement("tr");
        const statusText = getStatusText(product.status);
        row.innerHTML = `

                <td>
                    ${index + 1}
                </td>

                <td>
                    ${product.name}
                </td>

                <td>
                    ${product.category}
                </td>

                <td>
                    ${product.price.toFixed(2)}
                </td>

                <td>
                    ${product.quantity}
                </td>

                <td>

                    <span
                        class="status
                        status-${product.status}"
                    >
                        ${statusText}
                    </span>

                </td>

                <td>
                    ${product.description}
                </td>

                <td>

                    <div
                        class="action-buttons"
                    >

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
function getStatusText(status) {
    switch (status) {
        case "active":
            return "Active";
        case "inactive":
            return "Inactive";
        case "out-of-stock":
            return "Out of Stock";
    }
}
function updateDashboard() {
    const quantity = products.reduce((total, product) => total +
        product.quantity, 0);
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
searchInput.addEventListener("input", renderProducts);
categoryFilter.addEventListener("change", renderProducts);
statusFilter.addEventListener("change", renderProducts);
priceSort.addEventListener("change", renderProducts);
cancelButton.addEventListener("click", () => {
    resetForm();
    formSection.hidden =
        true;
});
productTableBody.addEventListener("click", event => {
    const target = event.target;
    const button = target.closest("button");
    if (!button) {
        return;
    }
    const id = Number(button.dataset.id);
    if (button.classList.contains("edit-button")) {
        editProduct(id);
    }
    if (button.classList.contains("delete-button")) {
        deleteProduct(id);
    }
});
export {};
//# sourceMappingURL=app1.js.map