let lang = localStorage.getItem('lang') || 'es';
let currency = localStorage.getItem('currency') || 'ARS';
// rates[X] almacenará cuántas unidades de la moneda X equivalen a 1 ARS.
const rates = { ARS: 1, USD: 0.001, EUR: 0.0009, ILS: 0.0037 }; // Tasas base iniciales

async function loadTranslations(lang) {
  try {
    const response = await fetch(`locales/${lang}.json`);
    if (!response.ok) {
      console.error(`Error cargando traducciones para ${lang}: ${response.status} ${response.statusText}`);
      // Retorna un objeto con claves básicas para evitar que la UI se rompa completamente.
      return {
        "idioma": "Idioma (Error)",
        "moneda": "Moneda (Error)",
        "explore_btn": "Detalles (Error)",
        "tablaTransporte": [] // Array vacío para que la tabla no de error, pero muestre que no hay datos
      };
    }
    return await response.json();
  } catch (error) {
    console.error(`Excepción cargando traducciones para ${lang}:`, error);
    return {
        "idioma": "Idioma (Excepción)",
        "moneda": "Moneda (Excepción)",
        "explore_btn": "Detalles (Excepción)",
        "tablaTransporte": []
      };
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
            console.log("Tasas de cambio actualizadas desde API:", rates);
        } else {
            console.warn("Respuesta de API de tasas no válida, usando valores por defecto.");
        }
    } catch (error) {
        console.warn("Error actualizando tasas de cambio desde API, usando valores por defecto:", error);
    }
}

function setDirection(lang) {
  document.body.dir = (lang === 'he') ? 'rtl' : 'ltr';
}

async function translatePage(lang, translations) {
  // Traducir título de la página
  const titleElement = document.querySelector('title[data-key]');
  if (titleElement && translations[titleElement.getAttribute('data-key')]) {
    document.title = translations[titleElement.getAttribute('data-key')];
  }

  document.querySelectorAll('[data-key]').forEach(el => {
    const key = el.getAttribute('data-key');
    if (translations[key] !== undefined) { // Verificar que la clave exista
      if (el.tagName === 'INPUT' && (el.type === 'text' || el.type === 'number') && key.toLowerCase().includes('placeholder')) {
        el.placeholder = translations[key];
      } else {
        // Para elementos como span, button, h1, h3, p, th, etc.
        el.innerText = translations[key];
      }
    } else {
      // console.warn(`Clave de traducción no encontrada: ${key} en idioma ${lang}`);
    }
  });
  setDirection(lang);
}

async function renderTablaTransporte(lang, currentCurrency, translations) {
  const tbody = document.querySelector('#tabla-transporte tbody');
  if (!tbody) {
    console.error("Elemento tbody de #tabla-transporte no encontrado.");
    return;
  }
  
  tbody.innerHTML = ''; // Limpiar tabla existente

  if (!translations || !translations.tablaTransporte || !Array.isArray(translations.tablaTransporte)) {
    console.error("Datos de tablaTransporte no válidos o no encontrados en las traducciones.");
    const trError = document.createElement('tr');
    const tdError = document.createElement('td');
    tdError.colSpan = 6; // Asumiendo 6 columnas
    tdError.textContent = translations.error_loading_transport_data || "Error cargando datos de transporte.";
    if (translations.error_loading_transport_data && lang === 'he') { // Ejemplo de traducción de mensaje de error
        tdError.textContent = "שגיאה בטעינת נתוני התחבורה.";
    }
    tdError.style.textAlign = 'center';
    trError.appendChild(tdError);
    tbody.appendChild(trError);
    return;
  }

  const tablaData = translations.tablaTransporte;

  tablaData.forEach(rowData => {
    const tr = document.createElement('tr');
    rowData.forEach((cellData, index) => {
      const td = document.createElement('td');
      if (index === 4) { // Columna de precio (originalmente en ARS)
        const valorArs = parseFloat(cellData);
        if (!isNaN(valorArs) && rates[currentCurrency] !== undefined) {
          const valorConvertido = valorArs * rates[currentCurrency];
          const locale = lang === 'he' ? 'he-IL' : 'es-AR';
          td.textContent = `${currentCurrency} ${valorConvertido.toLocaleString(locale, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
        } else {
          td.textContent = `${currentCurrency} --`; // Mostrar si hay error o tasa no disponible
        }
      } else {
        td.innerHTML = cellData; // Para permitir HTML en otras celdas (ej. links de compañías)
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

function renderPackingList() { 
  if(!listEsencialEl || !listOpcionalEl) return;
  listEsencialEl.innerHTML = '';
  listOpcionalEl.innerHTML = '';
  ['esencial', 'opcional'].forEach(type => {
    const ul = type === 'esencial' ? listEsencialEl : listOpcionalEl;
    packingList[type].forEach((itemText) => { 
      const li = document.createElement('li');
      li.textContent = itemText; 
      ul.appendChild(li);
    });
  });
}

if (packingAddBtn && packingInput && packingType) {
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

if (iaSubmitBtn && iaQuestionEl && iaResponseEl) {
  iaSubmitBtn.addEventListener('click', async () => {
    const question = iaQuestionEl.value.trim();
    const currentTranslations = await loadTranslations(lang); 
    if (question) {
      const prefix = currentTranslations.ia_response_prefix || (lang === 'he' ? "תשובה מדומה מבינה מלאכותית:" : "Respuesta simulada de IA:");
      iaResponseEl.innerText = `${prefix} ${question}`;
    } else {
      iaResponseEl.innerText = '';
    }
  });
}

// --- Conversor de Moneda Moderno ---
const currencyForm = document.getElementById('currencyForm');
if (currencyForm) {
  currencyForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const amountEl = document.getElementById('amount');
    const fromCurrencyEl = document.getElementById('fromCurrency');
    const toCurrencyEl = document.getElementById('toCurrency');
    const resultEl = document.getElementById('result');

    if (!amountEl || !fromCurrencyEl || !toCurrencyEl || !resultEl) return;

    const amount = parseFloat(amountEl.value);
    const fromCurrency = fromCurrencyEl.value;
    const toCurrency = toCurrencyEl.value;
    
    if (isNaN(amount) || rates[fromCurrency] === undefined || rates[toCurrency] === undefined) {
      resultEl.innerText = ''; // O un mensaje de error
      return;
    }
    // Convertir amount (en fromCurrency) a ARS, luego de ARS a toCurrency
    const amountInArs = amount / rates[fromCurrency]; 
    const convertedValue = amountInArs * rates[toCurrency];
    
    const locale = lang === 'he' ? 'he-IL' : 'es-AR';
    resultEl.innerText = `${amount.toLocaleString(locale)} ${fromCurrency} ≈ ${convertedValue.toLocaleString(locale, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ${toCurrency}`;
  });
}

async function updateAllUI() {
  const translations = await loadTranslations(lang);
  await translatePage(lang, translations); // Traduce elementos generales primero
  await renderTablaTransporte(lang, currency, translations); // Luego renderiza la tabla con datos traducidos/formateados
  renderPackingList(); // Renderiza lista de equipaje (si sus textos internos fueran dinámicos, pasar translations)
  // Cualquier otra actualización de UI que dependa del idioma o moneda
}

function setActiveButton(selector, dataAttribute, value) {
    document.querySelectorAll(selector).forEach(btn => {
        if(btn.dataset[dataAttribute] === value) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
}

document.addEventListener('DOMContentLoaded', async () => {
  await updateExchangeRates(); 

  document.querySelectorAll('.btn-lang').forEach(btn => {
    btn.addEventListener('click', async e => { // Hacer async para el await dentro
      lang = e.target.dataset.lang;
      localStorage.setItem('lang', lang);
      await updateAllUI(); // Esperar a que toda la UI se actualice
      setActiveButton('.btn-lang', 'lang', lang);
    });
  });

  document.querySelectorAll('.btn-currency').forEach(btn => {
    btn.addEventListener('click', async e => { // Hacer async
      currency = e.target.dataset.currency;
      localStorage.setItem('currency', currency);
      await updateAllUI(); // Esperar
      setActiveButton('.btn-currency', 'currency', currency);
    });
  });

  document.querySelectorAll('.btn-visit').forEach(btn => {
    btn.addEventListener('click', function() {
      window.location.href = this.dataset.page;
    });
  });
  
  // Establecer estado inicial de los botones y cargar UI
  setActiveButton('.btn-lang', 'lang', lang);
  setActiveButton('.btn-currency', 'currency', currency);
  await updateAllUI(); // Carga inicial de la UI
});
