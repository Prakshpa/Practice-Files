class Test {
    private className:string = "TestClass";
    value: string;
    constructor(value: string){
        this.value=value;
        console.log(this.className+" called with value: ", value);
    }
}
function returnObject<T extends new (...args: any[])=>any>(object:T, ...value: ConstructorParameters<T>): InstanceType<T> {
    const myObject = new object(value);
    console.log("I called an object.");
    return myObject;
}

const testObject: Test = returnObject(Test, "Hello");