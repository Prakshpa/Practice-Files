const cyberScore=document.getElementById("cyberLawScore");
const eGovernanceScore=document.getElementById("eGovernanceScore");
const cloudComputingScore=document.getElementById("cloudComputingScore");
const spmScore=document.getElementById("spmScore");
const totalScore=document.getElementById("totalScore");
const grade=document.getElementById("gradeResult");
function calculatePercentage() {
    const cyber = parseFloat(cyberScore.value) || 0;
    const eGovernance = parseFloat(eGovernanceScore.value) || 0;
    const cloudComputing = parseFloat(cloudComputingScore.value) || 0;
    const spm = parseFloat(spmScore.value) || 0;

    const total = cyber + eGovernance + cloudComputing + spm;
    totalScore.textContent = "Total: " + total;

    const percentage = (total / 400) * 100;
    document.getElementById("percentageResult").textContent = "Percentage: " + percentage.toFixed(2) + "%";
    if(percentage >= 90) {
        grade.textContent = "Grade: A+";
    } else if(percentage >= 80) {
        grade.textContent = "Grade: A";
    } else if(percentage >= 70) {
        grade.textContent = "Grade: B";
    } else if(percentage>=60) {
        grade.textContent = "Grade: C";
    } else if(percentage>=50) {
        grade.textContent = "Grade: D";
    } else {
        grade.textContent = "Grade: F";
    }
}