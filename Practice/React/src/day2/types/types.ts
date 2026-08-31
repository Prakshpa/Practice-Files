
export interface RequestType {
    method: "GET" | "POST" | "PUT" | "DELETE"
    headers?: HeadersInit,
    body?: BodyInit | null,
    options?: RequestInit
}
export type User = {
    id: number;
    name: {
        firstname: string,
        lastname: string
    };
    username: string;
    phone: number;
    password?: string
    email: string;
}
export type Product = {
    id: string;
    title: string;
    price: number;
}



export type Column<T> = {
    key: keyof T,
    header: string
}