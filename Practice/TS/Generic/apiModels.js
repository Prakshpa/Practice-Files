"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
async function fetchData(API) {
    let data = [];
    try {
        const response = await fetch(API);
        if (!response.ok)
            throw new Error("Error fetching the data");
        data = await response.json();
    }
    catch (error) { }
    finally {
        return data;
    }
}
const FetchUsers = {
    status: 200,
    accessedAt: (new Date(Date.now())).toString(),
    data: [
        { id: "abc", name: { firstName: "abc", lastName: "xyz" }, username: "abcd", phone: 1233223, email: "abc@gmail.com" },
        { id: "abcdef", name: { firstName: "abcdef", lastName: "uvwxyz" }, username: "abcdefgh", phone: 1233223567, email: "ab@mail.co" },
        { id: "abcd123", name: { firstName: "abcd", lastName: "" }, username: "abc123", phone: 12345678, email: "a1@gmail.com" },
    ]
};
const FetchProduct = {
    status: 200,
    accessedAt: new Date(Date.now()).toString(),
    data: [
        { id: "abc", title: "Product1", price: 1230 },
        { id: "abcdef", title: "Product2", price: 3567 },
        { id: "abcd123", title: "Product 3", price: 678 },
    ]
};
const FetchOrder = {
    status: 200,
    accessedAt: new Date(Date.now()).toString(),
    data: [
        { id: "abc", userId: "abc", products: ["abc", "abcdef", "abcd123"] },
        { id: "abcdef", userId: "abcdef", products: ["abc", "abcdef"] },
        { id: "abcd123", userId: "abcd123", products: ["abc", "abcdef"] },
    ]
};
//# sourceMappingURL=apiModels.js.map