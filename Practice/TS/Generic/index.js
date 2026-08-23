"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testArray1 = ["abc", "bcd", "cde"];
const testArray2 = [10, 20, 30];
const testArray3 = new Array();
testArray3.push({
    id: 1, name: "Prakash", class: 203
});
testArray3.push({
    id: 2, name: "Anish", class: 203
});
testArray3.push({
    id: 3, name: "Sudarsan", class: 103
});
const testArray4 = new Array;
testArray4.push(["React", 100, true]);
testArray4.push(["Dot Net", 150, false]);
testArray4.push(["Express", 100, false]);
function getFirst(givenArray) {
    return givenArray[0];
}
console.log("FirstElement1: ", getFirst(testArray1));
console.log("FirstElement2: ", getFirst(testArray2));
function getLast(givenArray) {
    return givenArray[givenArray.length - 1];
}
const testArray5 = [];
console.log("LastElement4: ", getLast(testArray4));
console.log("LastElement5: ", getLast(testArray5));
function reverse(givenArray) {
    return givenArray.reverse();
}
console.log("Element3: ", reverse(testArray3));
function findById(id, givenArray) {
    return givenArray.find(value => value.id === id);
}
console.log("Find Student Element: ", findById(1, testArray3));
// console.log("Test Course: ", findById<Course>(1, testArray3));
//# sourceMappingURL=index.js.map