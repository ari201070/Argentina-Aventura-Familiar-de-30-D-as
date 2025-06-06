// js/i18n.js - Traducción dinámica y multilenguaje centralizada para todo el proyecto

const LANG_KEY = "idiomaSeleccionado";
const DEFAULT_LANG = "es";
let textos = {};
let idiomaActual = DEFAULT_LANG;

// Obtener idioma guardado o predeterminado
function obtenerIdiomaActual() {
  return localStorage.getItem(LANG_KEY) || DEFAULT_LANG;
}

// Guardar idioma elegido
function guardarIdioma(lang) {
  localStorage.setItem(LANG_KEY, lang);
}

// Cargar archivo de textos y traducir la página
function cargarIdioma(lang, callback) {
  fetch(`../locales/${lang}.json`)
    .then(res => res.json())
    .then(data => {
      textos = data;
      idiomaActual = lang;
      traducirPagina();
      if (callback) callback();
    })
    .catch(() => {
      // Fallback a español si falla la carga
      if (lang !== "es") cargarIdioma("es", callback);
    });
}

// Traducir los textos marcados en la página
function traducirPagina() {
  document.querySelectorAll("[data-key]").forEach(el => {
    const key = el.getAttribute("data-key");
    if (textos[key]) {
      if (el.tagName === "INPUT" || el.tagName === "TEXTAREA") {
        el.placeholder = textos[key];
      } else {
        el.innerText = textos[key];
      }
    }
  });
  // Actualiza el selector visualmente
  document.querySelectorAll(".btn-lang").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.lang === idiomaActual);
  });
  document.body.dir = idiomaActual === "he" ? "rtl" : "ltr";
  document.documentElement.lang = idiomaActual;
}

// Cambiar idioma desde el selector
function translatePage(lang) {
  guardarIdioma(lang);
  cargarIdioma(lang);
}

// Inicialización automática al abrir la página
document.addEventListener("DOMContentLoaded", () => {
  const lang = obtenerIdiomaActual();
  cargarIdioma(lang);

  // Listeners para los botones de idioma
  document.querySelectorAll(".btn-lang").forEach(btn => {
    btn.addEventListener("click", function() {
      translatePage(btn.dataset.lang);
    });
  });
});
