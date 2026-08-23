const values=[10, 2, 3, 40, 1];
values.forEach((value, index, values)=>{
    values[index]=value*value;
});
console.log("myArray after forEach: "+values);