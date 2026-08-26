import { createID } from "../functions/functions.js";
export class Storage<T extends { id?: number }> {
    data: Record<number, Required<T>> = {};
    type: string = "";

    constructor(type: string) {
        this.type += type;
    }

    fetchData(): Record<number, Required<T>> {
        const response = localStorage.getItem(this.type);

        if (response) {
            const data: Required<T>[] = JSON.parse(response);

            this.data = {};

            data.forEach((value) => {
                this.data[value.id as number] = value;
            });
        }

        return this.data;
    }

    delete(id: number): Record<number, Required<T>> {
        delete this.data[id];
        localStorage.setItem(this.type, JSON.stringify(Object.values(this.data)));
        return this.data;
    }

    update(data: Required<T>): Record<number, Required<T>> {
        const id = data.id as number;
        this.data[id] = data;

        localStorage.setItem(this.type, JSON.stringify(Object.values(this.data)));

        return this.data;
    }

    create(data: T) {
        const id = createID(...Object.keys(this.data));
        const added = { ...data, id } as Required<T>;

        this.data[id] = added;
        localStorage.setItem(this.type, JSON.stringify(Object.values(this.data)));
        return this.data;
    }
}