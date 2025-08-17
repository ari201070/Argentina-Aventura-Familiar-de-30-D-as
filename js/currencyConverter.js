// js/currencyConverter.js

// Configuración de monedas soportadas
const SUPPORTED_CURRENCIES = ['ARS', 'USD', 'EUR', 'ILS'];

// Inicializar selects de moneda
function initCurrencySelectors() {
  const fromSelect = document.getElementById('from-currency');
  const toSelect = document.getElementById('to-currency');
  
  SUPPORTED_CURRENCIES.forEach(currency => {
    const optionFrom = document.createElement('option');
    optionFrom.value = currency;
    optionFrom.textContent = currency;
    fromSelect.appendChild(optionFrom);

    const optionTo = document.createElement('option');
    optionTo.value = currency;
    optionTo.textContent = currency;
    toSelect.appendChild(optionTo);
  });
}

// Función de conversión
async function convertCurrency() {
  const amount = document.getElementById('amount').value;
  const from = document.getElementById('from-currency').value;
  const to = document.getElementById('to-currency').value;
  const resultElement = document.getElementById('result');
  
  if (!amount || isNaN(amount)) {
    resultElement.textContent = "אנא הזן סכום תקין";
    return;
  }

  try {
    const res = await fetch(`https://api.exchangerate.host/latest?base=${from}&symbols=${to}`);
    if (!res.ok) throw new Error("שגיאה בהמרת המטבע");
    
    const data = await res.json();
    const rate = data.rates[to];
    
    if (!rate) {
      resultElement.textContent = "המרה לא זמינה לזוג זה";
      return;
    }

    resultElement.textContent = `${amount} ${from} = ${(amount * rate).toFixed(2)} ${to}`;
  } catch (error) {
    console.error("Conversion error:", error);
    resultElement.textContent = "שגיאה בהמרת המטבע";
  }
}

// Inicializar al cargar
document.addEventListener('DOMContentLoaded', initCurrencySelectors);
