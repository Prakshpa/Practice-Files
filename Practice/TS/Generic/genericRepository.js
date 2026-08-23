"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MyRepository {
    data = [];
    async getAll() {
        return this.data;
    }
    async getById(id) {
        return this.data.find(value => value.id === id);
    }
    async create(data) {
        this.data.push(data);
    }
    async delete(id) {
        this.data.splice(this.data.findIndex(value => value.id === id), 1);
    }
}
const userRepository = new MyRepository;
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
console.log("All users: ", userRepository.getAll());
console.log("User by id 2: ", userRepository.getById(2));
console.log("Deleting user with id 2");
userRepository.delete(2);
console.log("All users: ", userRepository.getAll());
//# sourceMappingURL=genericRepository.js.map