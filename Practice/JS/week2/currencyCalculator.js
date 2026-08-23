const currency=document.getElementById('currency');
const amount=document.getElementById('amount');
const result=document.getElementById('result');
const rate={"EUR": 150, "USD": 130, "GBP": 180, "JPY": 0.95};

function convertCurrency() {
    const selectedCurrency = currency.value;
    const inputAmount = parseFloat(amount.value) || 0;
    const convertedAmount = (inputAmount * rate[selectedCurrency]) || 0;
    result.textContent = "Converted Amount: " + convertedAmount.toFixed(2) + " " + selectedCurrency;
}