interface Product {
    id: number;
    name: string;
    category: string;
    price: number;
    quantity: number;
    description: string;
}


// Get HTML elements
const productForm =
    document.getElementById("productForm") as HTMLFormElement;

const productIdInput =
    document.getElementById("productId") as HTMLInputElement;

const nameInput =
    document.getElementById("name") as HTMLInputElement;

const categoryInput =
    document.getElementById("category") as HTMLInputElement;

const priceInput =
    document.getElementById("price") as HTMLInputElement;

const quantityInput =
    document.getElementById("quantity") as HTMLInputElement;

const descriptionInput =
    document.getElementById("description") as HTMLTextAreaElement;

const productTableBody =
    document.getElementById("productTableBody") as HTMLTableSectionElement;

const searchInput =
    document.getElementById("searchInput") as HTMLInputElement;

const submitButton =
    document.getElementById("submitButton") as HTMLButtonElement;

const cancelButton =
    document.getElementById("cancelButton") as HTMLButtonElement;

const totalProducts =
    document.getElementById("totalProducts") as HTMLElement;

const totalQuantity =
    document.getElementById("totalQuantity") as HTMLElement;

const inventoryValue =
    document.getElementById("inventoryValue") as HTMLElement;


// Load products from localStorage
let products: Product[] = loadProducts();


// Load products
function loadProducts(): Product[] {

    const storedProducts = localStorage.getItem("products");

    if (!storedProducts) {
        return [];
    }

    return JSON.parse(storedProducts) as Product[];
}


// Save products
function saveProducts(): void {

    localStorage.setItem(
        "products",
        JSON.stringify(products)
    );
}


// Generate ID
function generateId(): number {

    if (products.length === 0) {
        return 1;
    }

    return Math.max(
        ...products.map(product => product.id)
    ) + 1;
}


// Add or update product
productForm.addEventListener("submit", (event) => {

    event.preventDefault();

    const id = productIdInput.value;

    const product: Product = {

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

        const index = products.findIndex(
            product => product.id === Number(id)
        );

        if (index !== -1) {
            products[index] = product;
        }

    } else {

        // Add new product

        products.push(product);
    }


    saveProducts();

    renderProducts();

    resetForm();
});


// Display products
function renderProducts(
    searchTerm: string = ""
): void {

    productTableBody.innerHTML = "";


    const filteredProducts = products.filter(product => {

        const search =
            searchTerm.toLowerCase();

        return (
            product.name
                .toLowerCase()
                .includes(search) ||

            product.category
                .toLowerCase()
                .includes(search) ||

            product.description
                .toLowerCase()
                .includes(search)
        );
    });


    filteredProducts.forEach(
        (product, index) => {

            const row =
                document.createElement("tr");


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
        }
    );


    updateDashboard();
}


// Edit product
function editProduct(id: number): void {

    const product =
        products.find(product => product.id === id);


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
function deleteProduct(id: number): void {

    const confirmed =
        confirm(
            "Are you sure you want to delete this product?"
        );


    if (!confirmed) {
        return;
    }


    products =
        products.filter(
            product => product.id !== id
        );


    saveProducts();

    renderProducts();

    resetForm();
}


// Reset form
function resetForm(): void {

    productForm.reset();

    productIdInput.value = "";

    submitButton.textContent =
        "Add Product";

    cancelButton.hidden =
        true;
}


// Cancel editing
cancelButton.addEventListener(
    "click",
    resetForm
);


// Search
searchInput.addEventListener(
    "input",
    () => {

        renderProducts(
            searchInput.value
        );
    }
);


// Handle Edit/Delete buttons
productTableBody.addEventListener(
    "click",
    (event) => {

        const target =
            event.target as HTMLElement;


        const button =
            target.closest("button");


        if (!button) {
            return;
        }


        const id =
            Number(button.dataset.id);


        if (
            button.classList
                .contains("edit-button")
        ) {

            editProduct(id);
        }


        if (
            button.classList
                .contains("delete-button")
        ) {

            deleteProduct(id);
        }
    }
);


// Update dashboard
function updateDashboard(): void {

    const quantity =
        products.reduce(
            (total, product) =>
                total + product.quantity,
            0
        );


    const value =
        products.reduce(
            (total, product) =>
                total +
                product.price *
                product.quantity,
            0
        );


    totalProducts.textContent =
        products.length.toString();

    totalQuantity.textContent =
        quantity.toString();

    inventoryValue.textContent =
        value.toFixed(2);
}


// Initial render
renderProducts();
