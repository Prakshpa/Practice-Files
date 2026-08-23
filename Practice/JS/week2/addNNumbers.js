function addNNumbers (...numbers) {
    let result=0;
    for( let number of numbers ) {
        result+=number;
    }
    console.log(`Sum of ${numbers.length} numbers is ${result}`);
}
addNNumbers(1,2,10,20);
addNNumbers(33,43);