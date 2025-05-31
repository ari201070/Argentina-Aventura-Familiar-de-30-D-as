
let lang = localStorage.getItem('lang') || 'es';
let currency = localStorage.getItem('currency') || 'ARS';
// rates[X] almacenará cuántas unidades de la moneda X equivalen a 1 ARS.
const rates = { ARS: 1, USD: 0.001, EUR: 0.0009, ILS: 0.0037 }; // Tasas base

async function loadTranslations(lang) {
  try {
    const response = await fetch(`locales/${lang}.json`);
    if (!response.ok) {
      console.error(`Error cargando traducciones para ${lang}: ${response.status}`);
      return {}; // Retorna objeto vacío para evitar más errores
    }
    return await response.json();
  } catch (error) {
    console.error(`Excepción cargando traducciones para ${lang}:`, error);
    return {};
  }
}

async function updateExchangeRates() {
    try {
        const response = await fetch('https://open.er-api.com/v6/latest/ARS'); // Base ARS
        const data = await response.json();
        if (data && data.rates) {
            rates.USD = data.rates.USD; // cuántos USD son 1 ARS
            rates.EUR = data.rates.EUR; // cuántos EUR son 1 ARS
            rates.ILS = data.rates.ILS; // cuántos ILS son 1 ARS
            rates.ARS = 1; // 1 ARS es 1 ARS
            console.log("Tasas actualizadas:", rates);
        }
    } catch (error) {
        console.warn("Error actualizando tasas de cambio, usando valores por defecto:", error);
    }
}

function setDirection(lang) {
  document.body.dir = (lang === 'he') ? 'rtl' : 'ltr';
}

async function translatePage(lang, translations) {
  document.querySelectorAll('[data-key]').forEach(el => {
    const key = el.getAttribute('data-key');
    if (translations[key]) {
      if (el.tagName === 'INPUT' && (el.type === 'text' || el.type === 'number') && key.toLowerCase().includes('placeholder')) {
        el.placeholder = translations[key];
      } else if (el.tagName === 'TITLE') {
        document.title = translations[key];
      } else {
        el.innerText = translations[key];
      }
    }
  });
  setDirection(lang);
}

async function renderTablaTransporte(lang, currentCurrency, translations) {
  const tbody = document.querySelector('#tabla-transporte tbody');
  if (!tbody || !translations.tablaTransporte) return;

  tbody.innerHTML = ''; // Limpiar tabla existente
  const tablaData = translations.tablaTransporte;

  tablaData.forEach(rowData => {
    const tr = document.createElement('tr');
    rowData.forEach((cellData, index) => {
      const td = document.createElement('td');
      if (index === 4) { // Columna de precio (originalmente en ARS)
        const valorArs = parseFloat(cellData);
        if (!isNaN(valorArs)) {
          const valorConvertido = valorArs * rates[currentCurrency];
          td.textContent = `${currentCurrency} ${valorConvertido.toLocaleString(lang === 'he' ? 'he-IL' : 'es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
        } else {
          td.textContent = cellData; 
        }
      } else {
        td.innerHTML = cellData; // Para permitir HTML en otras celdas (ej. links)
      }
      tr.appendChild(td);
    });
    tbody.appendChild(tr);
  });
}

// --- Lista de Equipaje ---
const packingAddBtn = document.getElementById('packing-add');
const packingInput = document.getElementById('packing-input');
const packingType = document.getElementById('packing-type');
const listEsencialEl = document.getElementById('packing-list-esencial');
const listOpcionalEl = document.getElementById('packing-list-opcional');
let packingList = JSON.parse(localStorage.getItem('packingList')) || { esencial: [], opcional: [] };

function renderPackingList() { // No necesita 'translations' como parámetro directo
  if(!listEsencialEl || !listOpcionalEl) return;
  listEsencialEl.innerHTML = '';
  listOpcionalEl.innerHTML = '';
  ['esencial', 'opcional'].forEach(type => {
    const ul = type === 'esencial' ? listEsencialEl : listOpcionalEl;
    packingList[type].forEach((item) => { // idx no se usa
      const li = document.createElement('li');
      li.textContent = item; 
      ul.appendChild(li);
    });
  });
}

if (packingAddBtn) {
  packingAddBtn.addEventListener('click', () => {
    const type = packingType.value;
    const itemText = packingInput.value.trim();
    if (itemText) {
      packingList[type].push(itemText);
      localStorage.setItem('packingList', JSON.stringify(packingList));
      renderPackingList(); 
      packingInput.value = '';
    }
  });
}

// --- Consulta a IA (Mock) ---
const iaSubmitBtn = document.getElementById('iaSubmit');
const iaQuestionEl = document.getElementById('iaQuestion');
const iaResponseEl = document.getElementById('iaResponse');

if (iaSubmitBtn) {
  iaSubmitBtn.addEventListener('click', async () => {
    const question = iaQuestionEl.value.trim();
    const currentTranslations = await loadTranslations(lang); // Cargar traducciones actuales
    if (question && iaResponseEl) {
      const prefix = currentTranslations.ia_response_prefix || (lang === 'he' ? "תשובה מדומה:" : "Respuesta simulada:");
      iaResponseEl.innerText = `${prefix} ${question}`;
    } else if (iaResponseEl) {
      iaResponseEl.innerText = '';
    }
  });
}

// --- Conversor de Moneda Moderno ---
const currencyForm = document.getElementById('currencyForm');
if (currencyForm) {
  currencyForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const amount = parseFloat(document.getElementById('amount').value);
    const fromCurrency = document.getElementById('fromCurrency').value;
    const toCurrency = document.getElementById('toCurrency').value;
    const resultEl = document.getElementById('result');

    if (isNaN(amount) || !rates[fromCurrency] || !rates[toCurrency]) {
      resultEl.innerText = '';
      return;
    }
    // Convertir amount (en fromCurrency) a ARS, luego de ARS a toCurrency
    const amountInArs = amount / rates[fromCurrency]; 
    const convertedValue = amountInArs * rates[toCurrency];
    
    resultEl.innerText = `${amount.toLocaleString(lang === 'he' ? 'he-IL' : 'es-AR')} ${fromCurrency} ≈ ${convertedValue.toLocaleString(lang === 'he' ? 'he-IL' : 'es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ${toCurrency}`;
  });
}

async function updateAllUI() {
  const translations = await loadTranslations(lang);
  await translatePage(lang, translations);
  await renderTablaTransporte(lang, currency, translations);
  renderPackingList();
}

function setActiveButton(selector, dataAttribute, value) {
    document.querySelectorAll(selector).forEach(btn => {
        btn.classList.toggle('active', btn.dataset[dataAttribute] === value);
    });
}

document.addEventListener('DOMContentLoaded', async () => {
  await updateExchangeRates(); 

  document.querySelectorAll('.btn-lang').forEach(btn => {
    btn.addEventListener('click', e => {
      lang = e.target.dataset.lang;
      localStorage.setItem('lang', lang);
      updateAllUI();
      setActiveButton('.btn-lang', 'lang', lang);
    });
  });

  document.querySelectorAll('.btn-currency').forEach(btn => {
    btn.addEventListener('click', e => {
      currency = e.target.dataset.currency;
      localStorage.setItem('currency', currency);
      updateAllUI(); 
      setActiveButton('.btn-currency', 'currency', currency);
    });
  });

  document.querySelectorAll('.btn-visit').forEach(btn => {
    btn.addEventListener('click', function() {
      window.location.href = this.dataset.page;
    });
  });

  setActiveButton('.btn-lang', 'lang', lang);
  setActiveButton('.btn-currency', 'currency', currency);
  updateAllUI(); 
});
