const array1=[1,2,10,20,1,2,"10","20", "10"/"1a"];
console.log("Checking if the array includes NaN: "+array1.includes(NaN)); // Output: true
console.log("Index of 1: "+array1.indexOf(1)); // Output: 0
console.log("Index of 10 starting from index 3: "+array1.indexOf(10, 3)); // Output: 2
