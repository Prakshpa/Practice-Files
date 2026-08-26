import { createID } from "../functions/functions.js";
export class Storage {
    constructor(type) {
        this.data = {};
        this.type = "";
        this.type += type;
    }
    fetchData() {
        const response = localStorage.getItem(this.type);
        if (response) {
            const data = JSON.parse(response);
            this.data = {};
            data.forEach((value) => {
                this.data[value.id] = value;
            });
        }
        return this.data;
    }
    delete(id) {
        delete this.data[id];
        localStorage.setItem(this.type, JSON.stringify(Object.values(this.data)));
        return this.data;
    }
    update(data) {
        const id = data.id;
        this.data[id] = data;
        localStorage.setItem(this.type, JSON.stringify(Object.values(this.data)));
        return this.data;
    }
    create(data) {
        const id = createID(...Object.keys(this.data));
        const added = { ...data, id };
        this.data[id] = added;
        localStorage.setItem(this.type, JSON.stringify(Object.values(this.data)));
        return this.data;
    }
}
//# sourceMappingURL=storage.js.map