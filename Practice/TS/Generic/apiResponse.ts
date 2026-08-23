type Status = "Success" | "Failed" | "Loading";
type User = {
    id: number;
    name: {
        firstName: string,
        lastName: string
    };
    username: string;
    phone: number;
    email: string;
}
type Product = {
    id: number;
    title: string;
    price: number;
}
type Order = {
    id: number;
    userId: number;
    products: number[];
}
class APIResponse<T> {
    status:Status = "Loading";
    message: string = "";
    data: T[] = [];
    
    async fetchData(API: string): Promise<T[]>{
        try {
            const response=await fetch(API);
            if(!response.ok) throw new Error("Error fetching the data");
            this.data = await response.json() as T[];
            this.status="Success";
            this.message="Data Fetched Successfully";
        } catch (error) {
            this.status="Failed";
            this.message=(error as Error).message;
        } finally {
            return this.data;
        }
    }
}

const FetchUsers: APIResponse<User>=new APIResponse<User>();
const FetchProduct: APIResponse<Product>=new APIResponse<Product>();
const FetchOrder: APIResponse<Order>=new APIResponse<Order>();

FetchUsers.fetchData("https://fakestoreApi.com/users")
    .then((response: User[])=>{
        response.forEach(user => {
            console.log(user);
        });
    });
FetchProduct.fetchData("https://fakestoreApi.com/products")
    .then((data: Product[])=>{
        data.forEach(product => {
            console.log(product);
        });
    });
FetchOrder.fetchData("https://fakestoreapi.com/carts")
    .then((data:Order[])=>{
        data.forEach(order => {
            console.log(order);
        });
    });