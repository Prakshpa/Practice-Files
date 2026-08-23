type Status = "Success" | "Failed" | "Loading";
type User = {
    id: string;
    name: {
        firstName: string,
        lastName: string
    };
    username: string;
    phone: number;
    email: string;
}
type Product = {
    id: string;
    title: string;
    price: number;
}
type Order = {
    id: string;
    userId: string;
    products: string[];
}
interface APIResponse<T> {
    status: number,
    accessedAt: string,
    data: T[]
}
async function fetchData<T>(API: string): Promise<T[]>{
    let data:T[]=[];
    try {
        const response=await fetch(API);
        if(!response.ok) throw new Error("Error fetching the data");
        data = await response.json() as T[];
    } catch (error) {} finally {
        return data;
    }
}

const FetchUsers: APIResponse<User> = {
    status: 200,
    accessedAt: (new Date(Date.now())).toString(),
    data: [
        {id: "abc", name: {firstName: "abc", lastName: "xyz"}, username: "abcd", phone:1233223, email: "abc@gmail.com"},
        {id: "abcdef", name: {firstName: "abcdef", lastName: "uvwxyz"}, username: "abcdefgh", phone:1233223567, email: "ab@mail.co"},
        {id: "abcd123", name: {firstName: "abcd", lastName: ""}, username: "abc123", phone:12345678, email: "a1@gmail.com"},
    ]
};
const FetchProduct: APIResponse<Product> = {
    status: 200,
    accessedAt: new Date(Date.now()).toString(),
    data: [
        {id: "abc", title: "Product1", price:1230},
        {id: "abcdef", title: "Product2", price:3567},
        {id: "abcd123", title: "Product 3", price:678},
    ]
};
const FetchOrder: APIResponse<Order>={
    status: 200,
    accessedAt: new Date(Date.now()).toString(),
    data: [
        {id: "abc", userId: "abc", products:["abc","abcdef","abcd123"]},
        {id: "abcdef", userId: "abcdef", products:["abc","abcdef"]},
        {id: "abcd123", userId: "abcd123", products:["abc","abcdef"]},
    ]
};
