"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class APIResponse {
    status = "Loading";
    message = "";
    data = [];
    async fetchData(API) {
        try {
            const response = await fetch(API);
            if (!response.ok)
                throw new Error("Error fetching the data");
            this.data = await response.json();
            this.status = "Success";
            this.message = "Data Fetched Successfully";
        }
        catch (error) {
            this.status = "Failed";
            this.message = error.message;
        }
        finally {
            return this.data;
        }
    }
}
const FetchUsers = new APIResponse();
const FetchProduct = new APIResponse();
const FetchOrder = new APIResponse();
FetchUsers.fetchData("https://fakestoreApi.com/users")
    .then((response) => {
    response.forEach(user => {
        console.log(user);
    });
});
FetchProduct.fetchData("https://fakestoreApi.com/products")
    .then((data) => {
    data.forEach(product => {
        console.log(product);
    });
});
FetchOrder.fetchData("https://fakestoreapi.com/carts")
    .then((data) => {
    data.forEach(order => {
        console.log(order);
    });
});
//# sourceMappingURL=apiResponse.js.map