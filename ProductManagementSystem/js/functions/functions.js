class AuthenticationError extends Error {
    constructor(error, element) {
        super(error);
        document.querySelector(`#${element} + .error`).textContent = `${error}`;
        this.name = "Authentication Error: ";
    }
}
export function validateProductForm(productData) {
    const errors = document.getElementsByClassName("error");
    for (let i = 0; i < errors.length; i++) {
        errors.item(i).textContent = "";
    }
    const validName = /([a-z]+ )*[a-z]+/;
    const validDescription = /^(?!.* {2})(?!.*[,.]{2})(?!.*\s[,.])(?![,.])[A-Za-z0-9]+(?:[ ,][A-Za-z0-9]+)*(?:\.)?$/;
    if (!validName.test(productData.name))
        throw new AuthenticationError("Invalid product name format", "pName");
    if (!validDescription.test(productData.description || productData.description.toString()))
        throw new AuthenticationError("Invalid description format", "pDescription");
    if (Number(productData.price) <= 0)
        throw new AuthenticationError("Product price can't be negative or zero", "pPrice");
    if (productData.category === "")
        throw new AuthenticationError("Select a product category", "pCategory");
    if (Number(productData.stock) <= 0)
        throw new AuthenticationError("Product stock can't be negative or zero", "pStock");
    if (productData.status === "")
        throw new AuthenticationError("Select a status of product", "pStatus");
    return true;
}
export function createID(...keys) {
    let id;
    do {
        id = Math.round(Math.random() * 1000);
    } while (keys.find(value => Number(value) === id));
    return id;
}
//# sourceMappingURL=functions.js.map