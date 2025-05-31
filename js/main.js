
let lang = localStorage.getItem('lang') || 'es';
let currency = localStorage.getItem('currency') || 'ARS';
const rates = { ARS: 1, USD: 0.001, EUR: 0.0009, ILS: 0.0037 }; // Tasas base, se intentarán actualizar

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

// Función para actualizar tasas de cambio (ejemplo, se podría llamar al inicio)
async function updateExchangeRates() {
    try {
        // Nota: Debes reemplazar 'YOUR_API_KEY' por tu clave real de exchangerate-api.com u otro proveedor.
        // O usar una API gratuita sin clave si está disponible y es confiable.
        // Ejemplo con una API pública (puede tener limitaciones de uso):
        const response = await fetch('https://open.er-api.com/v6/latest/ARS'); // Base ARS
        const data = await response.json();
        if (data && data.rates) {
            rates.USD = 1 / data.rates.USD; // Convertir a tasa por ARS
            rates.EUR = 1 / data.rates.EUR;
            rates.ILS = 1 / data.rates.ILS;
            rates.ARS = 1; // ARS es la base
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
      if (el.tagName === 'INPUT' && el.type === 'text' && key.toLowerCase().includes('placeholder')) {
        el.placeholder = translations[key];
      } else if (el.tagName === 'TITLE') {
        document.title = translations[key];
      }
      else {
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
      if (index === 4) { // Columna de precio
        const valorArs = parseFloat(cellData);
        if (!isNaN(valorArs)) {
          const valorConvertido = (valorArs * rates[currentCurrency] / rates['ARS']);
          td.textContent = `${currentCurrency} ${valorConvertido.toLocaleString(lang === 'he' ? 'he-IL' : 'es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
        } else {
          td.textContent = cellData; // Si no es un número, mostrar como está
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

function renderPackingList(translations) {
  if(!listEsencialEl || !listOpcionalEl) return;
  listEsencialEl.innerHTML = '';
  listOpcionalEl.innerHTML = '';
  ['esencial', 'opcional'].forEach(type => {
    const ul = type === 'esencial' ? listEsencialEl : listOpcionalEl;
    packingList[type].forEach((item, idx) => {
      const li = document.createElement('li');
      li.textContent = item; // Los ítems son solo texto por ahora
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
      loadTranslations(lang).then(translations => renderPackingList(translations)); // Re-render con traducciones
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
    const currentTranslations = await loadTranslations(lang);
    if (question && iaResponseEl) {
      iaResponseEl.innerText = lang === 'he' ?
        `${currentTranslations.ia_response_prefix || "תשובה מדומה:"} ${question}` :
        `${currentTranslations.ia_response_prefix || "Respuesta simulada:"} ${question}`;
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

    if (isNaN(amount)) {
      resultEl.innerText = '';
      return;
    }
    const convertedValue = (amount * rates[toCurrency] / rates[fromCurrency]);
    resultEl.innerText = `${amount.toLocaleString(lang === 'he' ? 'he-IL' : 'es-AR')} ${fromCurrency} ≈ ${convertedValue.toLocaleString(lang === 'he' ? 'he-IL' : 'es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ${toCurrency}`;
  });
}


async function updateAll() {
  const translations = await loadTranslations(lang);
  await translatePage(lang, translations);
  await renderTablaTransporte(lang, currency, translations);
  renderPackingList(translations); // Asegurar que la lista de equipaje también se actualice/traduzca
  // Aquí podrías llamar a otras funciones de renderizado si fuera necesario
}

function setActiveButton(selector, dataAttribute, value) {
    document.querySelectorAll(selector).forEach(btn => {
        btn.classList.toggle('active', btn.dataset[dataAttribute] === value);
    });
}

document.addEventListener('DOMContentLoaded', async () => {
  await updateExchangeRates(); // Cargar tasas al inicio

  document.querySelectorAll('.btn-lang').forEach(btn => {
    btn.addEventListener('click', e => {
      lang = e.target.dataset.lang;
      localStorage.setItem('lang', lang);
      updateAll();
      setActiveButton('.btn-lang', 'lang', lang);
    });
  });

  document.querySelectorAll('.btn-currency').forEach(btn => {
    btn.addEventListener('click', e => {
      currency = e.target.dataset.currency;
      localStorage.setItem('currency', currency);
      updateAll(); // Actualizar tabla y potencialmente otros elementos con moneda
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
  updateAll(); // Carga inicial
});

