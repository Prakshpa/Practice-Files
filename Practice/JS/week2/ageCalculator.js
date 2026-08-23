const birthDate = prompt("Please enter your birth date (YYYY-MM-DD):");
const today = new Date();
const age = today - new Date(birthDate);
const ageInYears = Math.floor(age / (1000 * 60 * 60 * 24 * 365.25));
alert(`You are ${ageInYears} years old.`);