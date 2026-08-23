"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const students = new Array(10);
students[0] = { id: 1, name: "Anish Acharya", isEnrolled: true, grade: 80 };
students[1] = { id: 2, name: "Dipendra Basnet", isEnrolled: false, grade: null };
students[3] = { id: 3, name: "Prakash Parajuli", isEnrolled: true, grade: 90 };
students[4] = { id: 4, name: "Ram Kumar", isEnrolled: false, grade: 20 };
console.log(students);
const grades = [];
students.forEach((student) => {
    if (student.grade !== null)
        grades.push(student.grade);
});
console.log(grades);
function analyzeGrades(grades) {
    const total = grades.reduce((sum, grade) => sum + grade, 0);
    const average = Math.round(total / grades.length);
    const highest = Math.max(...grades);
    const lowest = Math.min(...grades);
    let passing = 0;
    grades.forEach(grade => {
        if (grade >= 60)
            passing++;
    });
    return {
        total, average, highest, lowest, passing
    };
}
console.log(analyzeGrades(grades));
const PrakashCourses = [
    ["react", 100, false],
    ["dot net", 150, true],
    ["express", 100, true]
];
console.log("Course 1: ", ...PrakashCourses[0]);
let schoolName = "Coding Academy";
let schoolName1 = "Tech Institute";
console.log(schoolName, schoolName1);
//# sourceMappingURL=index.js.map