export type Status = "Ordered" | "Delivered" | "Stock" | "";
export type Categories= "Grocery" | "Cosmetics" | "Clothing" | "Gadgets" | "Medicine" | "";
export interface Product {
    id?: number,
    name: string,
    description: Text | string,
    price: number | "",
    category: Categories,
    stock: number | "",
    status: Status
}