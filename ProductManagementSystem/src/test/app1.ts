interface Product {

    id: number;

    name: string;

    category: string;

    price: number;

    quantity: number;

    status:
        | "active"
        | "inactive"
        | "out-of-stock";

    description: string;
}


const productForm =
    document.getElementById(
        "productForm"
    ) as HTMLFormElement;

const formSection =
    document.getElementById(
        "formSection"
    ) as HTMLElement;

const formTitle =
    document.getElementById(
        "formTitle"
    ) as HTMLElement;

const toggleFormButton =
    document.getElementById(
        "toggleFormButton"
    ) as HTMLButtonElement;

const toggleSearchButton =
    document.getElementById(
        "toggleSearchButton"
    ) as HTMLButtonElement;

const searchContainer =
    document.getElementById(
        "searchContainer"
    ) as HTMLElement;

const productIdInput =
    document.getElementById(
        "productId"
    ) as HTMLInputElement;

const nameInput =
    document.getElementById(
        "name"
    ) as HTMLInputElement;

const categoryInput =
    document.getElementById(
        "category"
    ) as HTMLInputElement;

const priceInput =
    document.getElementById(
        "price"
    ) as HTMLInputElement;

const quantityInput =
    document.getElementById(
        "quantity"
    ) as HTMLInputElement;

const statusInput =
    document.getElementById(
        "status"
    ) as HTMLSelectElement;

const descriptionInput =
    document.getElementById(
        "description"
    ) as HTMLTextAreaElement;

const submitButton =
    document.getElementById(
        "submitButton"
    ) as HTMLButtonElement;

const cancelButton =
    document.getElementById(
        "cancelButton"
    ) as HTMLButtonElement;

const searchInput =
    document.getElementById(
        "searchInput"
    ) as HTMLInputElement;

const categoryFilter =
    document.getElementById(
        "categoryFilter"
    ) as HTMLSelectElement;

const statusFilter =
    document.getElementById(
        "statusFilter"
    ) as HTMLSelectElement;

const priceSort =
    document.getElementById(
        "priceSort"
    ) as HTMLSelectElement;

const productTableBody =
    document.getElementById(
        "productTableBody"
    ) as HTMLTableSectionElement;

const totalProducts =
    document.getElementById(
        "totalProducts"
    ) as HTMLElement;

const totalQuantity =
    document.getElementById(
        "totalQuantity"
    ) as HTMLElement;

const inventoryValue =
    document.getElementById(
        "inventoryValue"
    ) as HTMLElement;


let products: Product[] =
    loadProducts();


function loadProducts(): Product[] {

    const data =
        localStorage.getItem(
            "products"
        );

    if (!data) {
        return [];
    }

    return JSON.parse(data) as Product[];
}


function saveProducts(): void {

    localStorage.setItem(
        "products",
        JSON.stringify(products)
    );
}


function generateId(): number {

    if (products.length === 0) {
        return 1;
    }

    return (
        Math.max(
            ...products.map(
                product => product.id
            )
        ) + 1
    );
}


toggleFormButton.addEventListener(
    "click",
    () => {

        const isHidden =
            formSection.hidden;

        formSection.hidden =
            !isHidden;

        if (isHidden) {

            formTitle.textContent =
                "Add Product";

            submitButton.textContent =
                "Add Product";

        }
    }
);


toggleSearchButton.addEventListener(
    "click",
    () => {

        searchContainer.hidden =
            !searchContainer.hidden;

        if (!searchContainer.hidden) {

            searchInput.focus();

        } else {

            searchInput.value = "";

            renderProducts();
        }
    }
);

productForm.addEventListener(
    "submit",
    event => {

        event.preventDefault();


        const id =
            productIdInput.value;


        const product: Product = {

            id: id
                ? Number(id)
                : generateId(),

            name:
                nameInput.value.trim(),

            category:
                categoryInput.value.trim(),

            price:
                Number(priceInput.value),

            quantity:
                Number(quantityInput.value),

            status:
                statusInput.value as Product["status"],

            description:
                descriptionInput.value.trim()
        };


        if (id) {

            const index =
                products.findIndex(
                    product =>
                        product.id ===
                        Number(id)
                );


            if (index !== -1) {

                products[index] =
                    product;
            }

        } else {

            products.push(product);
        }


        saveProducts();

        updateCategoryFilter();

        renderProducts();

        resetForm();

        formSection.hidden =
            true;
    }
);

function resetForm(): void {

    productForm.reset();

    productIdInput.value = "";

    formTitle.textContent =
        "Add Product";

    submitButton.textContent =
        "Add Product";
}


function editProduct(
    id: number
): void {

    const product =
        products.find(
            product =>
                product.id === id
        );


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


function deleteProduct(
    id: number
): void {

    const confirmed =
        confirm(
            "Are you sure you want to delete this product?"
        );


    if (!confirmed) {
        return;
    }


    products =
        products.filter(
            product =>
                product.id !== id
        );


    saveProducts();

    updateCategoryFilter();

    renderProducts();
}


function updateCategoryFilter(): void {

    const currentValue =
        categoryFilter.value;


    const categories =
        [...new Set(
            products.map(
                product =>
                    product.category
            )
        )].sort();


    categoryFilter.innerHTML = `

        <option value="all">
            All Categories
        </option>

    `;


    categories.forEach(
        category => {

            const option =
                document.createElement(
                    "option"
                );

            option.value =
                category;

            option.textContent =
                category;

            categoryFilter.appendChild(
                option
            );
        }
    );


    if (
        categories.includes(
            currentValue
        )
    ) {

        categoryFilter.value =
            currentValue;
    }
}


function getFilteredProducts():
    Product[] {

    const search =
        searchInput.value
            .trim()
            .toLowerCase();


    const category =
        categoryFilter.value;


    const status =
        statusFilter.value;


    const sort =
        priceSort.value;


    let result =
        products.filter(
            product => {

                const matchesSearch =
                    product.name
                        .toLowerCase()
                        .includes(search) ||

                    product.category
                        .toLowerCase()
                        .includes(search) ||

                    product.description
                        .toLowerCase()
                        .includes(search);


                const matchesCategory =
                    category === "all" ||
                    product.category ===
                        category;


                const matchesStatus =
                    status === "all" ||
                    product.status ===
                        status;


                return (
                    matchesSearch &&
                    matchesCategory &&
                    matchesStatus
                );
            }
        );


    if (sort === "low-high") {

        result.sort(
            (a, b) =>
                a.price - b.price
        );

    } else if (
        sort === "high-low"
    ) {

        result.sort(
            (a, b) =>
                b.price - a.price
        );
    }


    return result;
}


function renderProducts(): void {

    productTableBody.innerHTML = "";


    const filteredProducts =
        getFilteredProducts();


    filteredProducts.forEach(
        (product, index) => {

            const row =
                document.createElement(
                    "tr"
                );


            const statusText =
                getStatusText(
                    product.status
                );


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


            productTableBody.appendChild(
                row
            );
        }
    );


    updateDashboard();
}


function getStatusText(
    status: Product["status"]
): string {

    switch (status) {

        case "active":
            return "Active";

        case "inactive":
            return "Inactive";

        case "out-of-stock":
            return "Out of Stock";
    }
}


function updateDashboard(): void {

    const quantity =
        products.reduce(
            (total, product) =>
                total +
                product.quantity,
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


searchInput.addEventListener(
    "input",
    renderProducts
);


categoryFilter.addEventListener(
    "change",
    renderProducts
);


statusFilter.addEventListener(
    "change",
    renderProducts
);


priceSort.addEventListener(
    "change",
    renderProducts
);


cancelButton.addEventListener(
    "click",
    () => {

        resetForm();

        formSection.hidden =
            true;
    }
);


productTableBody.addEventListener(
    "click",
    event => {

        const target =
            event.target as HTMLElement;


        const button =
            target.closest(
                "button"
            );


        if (!button) {
            return;
        }


        const id =
            Number(
                button.dataset.id
            );


        if (
            button.classList.contains(
                "edit-button"
            )
        ) {

            editProduct(id);
        }


        if (
            button.classList.contains(
                "delete-button"
            )
        ) {

            deleteProduct(id);
        }
    }
);
