"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Test {
    className = "TestClass";
    value;
    constructor(value) {
        this.value = value;
        console.log(this.className + " called with value: ", value);
    }
}
function returnObject(object, ...value) {
    const myObject = new object(value);
    console.log("I called an object.");
    return myObject;
}
const testObject = returnObject(Test, "Hello");
//# sourceMappingURL=constructorConstraint.js.map