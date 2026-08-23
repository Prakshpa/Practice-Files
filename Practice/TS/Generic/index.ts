type Student = {
    readonly id: number;
    name: string;
    class: number;
}
type Course = [string, number, boolean];

const testArray1: string[]= ["abc", "bcd", "cde"];
const testArray2: number[]= [10, 20, 30];
const testArray3: Student[]= new Array<Student>();
testArray3.push({
    id: 1, name: "Prakash", class: 203
});
testArray3.push({
    id: 2, name: "Anish", class: 203
});
testArray3.push({
    id: 3, name: "Sudarsan", class: 103
});
const testArray4: Course[]= new Array<Course>;
testArray4.push(["React", 100, true]);
testArray4.push(["Dot Net", 150, false]);
testArray4.push(["Express", 100, false]);

function getFirst<T>(givenArray:T[]): T {
    return givenArray[0] as T;
}
console.log("FirstElement1: ", getFirst<string>(testArray1));
console.log("FirstElement2: ", getFirst<number>(testArray2));

function getLast<T>(givenArray:T[]): T {
    return givenArray[givenArray.length - 1] as T;
}
const testArray5: number[]=[];
console.log("LastElement4: ", getLast<Course>(testArray4));
console.log("LastElement5: ", getLast<number>(testArray5));

function reverse<T>(givenArray:T[]): T[] {
    return givenArray.reverse();
}
console.log("Element3: ", reverse<Student>(testArray3));

function findById<T extends {id: number}>(id:number, givenArray:T[]): T|void {
    return givenArray.find(value=>value.id===id);
}
console.log("Find Student Element: ", findById<Student>(1, testArray3));
// console.log("Test Course: ", findById<Course>(1, testArray3));