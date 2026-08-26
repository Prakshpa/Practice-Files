export declare class Storage<T extends {
    id?: number;
}> {
    data: Record<number, Required<T>>;
    type: string;
    constructor(type: string);
    fetchData(): Record<number, Required<T>>;
    delete(id: number): Record<number, Required<T>>;
    update(data: Required<T>): Record<number, Required<T>>;
    create(data: T): Record<number, Required<T>>;
}
//# sourceMappingURL=storage.d.ts.map