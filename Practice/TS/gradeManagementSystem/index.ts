type Student = {
    readonly id: number;
    name: string;
    isEnrolled: boolean;
    grade: number | null;
}
const students: Student[]=new Array<Student>(10);
students[0]={id: 1, name: "Anish Acharya", isEnrolled: true, grade: 80};
students[1]={id: 2, name:"Dipendra Basnet", isEnrolled: false, grade: null};
students[3]={id: 3, name: "Prakash Parajuli", isEnrolled: true, grade: 90};
students[4]={id: 4, name: "Ram Kumar", isEnrolled: false, grade: 20};
console.log(students);

const grades: number[]=[];
students.forEach((student) => {
    if(student.grade!==null) grades.push(student.grade);
});
console.log(grades);

type GradeAnalysis = {
    total: number;
    average: number;
    highest: number;
    lowest: number;
    passing: number;
}
function analyzeGrades(grades:number[]): GradeAnalysis {
    const total: number= grades.reduce((sum, grade)=>sum+grade, 0);
    const average: number=Math.round(total/grades.length)
    const highest: number = Math.max(...grades);
    const lowest: number = Math.min(...grades);
    let passing: number=0;
    grades.forEach(grade => {
        if(grade >= 60) passing++;
    })
    return {
        total, average, highest, lowest, passing
    };
}
console.log(analyzeGrades(grades));

type CourseEnrollment = [courseName: string, credits: number, isComplete: boolean];
const PrakashCourses: CourseEnrollment[] = [
    ["react", 100, false],
    ["dot net", 150, true],
    ["express", 100, true]
]
console.log("Course 1: ", ...(PrakashCourses[0] as CourseEnrollment));

//Type Inference and Explicit Typing
type Schools = "Coding Academy" | "Tech Institute";
let schoolName="Coding Academy";
let schoolName1:Schools = "Tech Institute";
console.log(schoolName, schoolName1);