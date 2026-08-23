const testArray=[20,30,40,50,60,55,65];
const spliced=testArray.splice(3,2,45,50);
console.log("Elements deleted by splice: "+spliced); // [50, 60]
console.log("Array after splice: "+testArray); // [20, 30, 40, 45, 50, 55, 65]
const sliced=testArray.slice(2,5);
console.log("Sliced elements: "+sliced);
console.log("Array after slice: "+testArray); // [20, 30, 40, 45, 50, 55, 65]