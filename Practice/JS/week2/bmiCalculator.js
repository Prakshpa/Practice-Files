const weightInput = document.getElementById('weight');
const heightInput = document.getElementById('height');
const resultParagraph = document.getElementById('result');

function calculateBMI() {
    const weight = parseFloat(weightInput.value);
    const height = parseFloat(heightInput.value);

    if (isNaN(weight) || isNaN(height) || weight <= 0 || height <= 0) {
        resultParagraph.textContent = "Please enter valid positive numbers for both weight and height.";
        return;
    }

    const bmi = weight / (height * height);
    resultParagraph.textContent = `Your BMI is: ${bmi.toFixed(2)}`;
}