const smallBirds=["Sparrow", "Myna", "Dove"];
const bigBirds=["Eagle", "Turkey", "Hen"];
const beautifulBirds=["Lophophorus", "Peacock", "Parrot"];
const allBirds=smallBirds.concat(bigBirds,beautifulBirds);
console.log("Small, big and beautiful birds are: "+allBirds);
const includingCrow=allBirds.concat("Crow");
console.log("Including Crow: "+includingCrow);