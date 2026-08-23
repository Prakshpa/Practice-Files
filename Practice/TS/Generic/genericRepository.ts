interface Repository<T> {
    getAll(): Promise<T[]>,
    getById(id: number): Promise<T>,
    create(data:T): Promise<void>,
    delete(id:number): Promise<void>
}
type User = {
    id: number;
    name: string;
    email: string;
}
class MyRepository<T extends {id: number}> implements Repository<T> {
    data: T[]= [];
    async getAll(): Promise<T[]> {
        return this.data;
    }
    async getById(id: any): Promise<T> {
        return this.data.find(value=>value.id===id) as T;
    }
    async create(data: T): Promise<void> {
        this.data.push(data);
    }
    async delete(id:number): Promise<void> {
        this.data.splice(this.data.findIndex(value=>value.id === id), 1);
    }
}

const userRepository = new MyRepository<User>
userRepository.create({
    id: 1,
    name: "Ram",
    email: "ram@gmail.com"
});
userRepository.create({
    id: 2,
    name: "Shyam",
    email: "shyam@gmail.com"
});
userRepository.create({
    id: 3,
    name: "Hari",
    email: "hari@gmail.com"
});
console.log("All users: ", userRepository.getAll())
console.log("User by id 2: ", userRepository.getById(2));
console.log("Deleting user with id 2");
userRepository.delete(2);
console.log("All users: ", userRepository.getAll());