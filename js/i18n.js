// Script de internacionalización sencillo para el ejemplo

// Idiomas soportados y sus archivos de traducción
const LANGS = {
  es: "locales/es.json",
  he: "locales/he.json"
};

function setLanguage(lang) {
  fetch(LANGS[lang])
    .then(response => response.json())
    .then(data => {
      for (const key in data) {
        const el = document.querySelector(`[data-i18n="${key}"]`);
        if (el) el.innerHTML = data[key];
      }
      document.documentElement.dir = lang === "he" ? "rtl" : "ltr";
      document.documentElement.lang = lang === "he" ? "he" : "es";
    });
}

document.addEventListener("DOMContentLoaded", function() {
  document.getElementById("btn-es").addEventListener("click", function() {
    setLanguage("es");
  });
  document.getElementById("btn-he").addEventListener("click", function() {
    setLanguage("he");
  });
  // Por defecto, español
  setLanguage("es");
});
