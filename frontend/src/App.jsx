import React from 'react';
import './i18n'; // Importa la configuración de i18next
import { useTranslation } from 'react-i18next';

function App() {
  const { t, i18n } = useTranslation();

  const handleChangeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('lang', lng);
    // Opcional: refrescar para aplicar RTL si lo necesitas
    // window.location.reload();
  };

  return (
    <div dir={i18n.language === 'he' ? 'rtl' : 'ltr'}>
      <header style={{ display: "flex", justifyContent: "flex-end", gap: "1rem", padding: "1rem" }}>
        <button
          onClick={() => handleChangeLanguage('es')}
          style={{ fontWeight: i18n.language === 'es' ? 'bold' : 'normal' }}
        >
          Español
        </button>
        <button
          onClick={() => handleChangeLanguage('he')}
          style={{ fontWeight: i18n.language === 'he' ? 'bold' : 'normal' }}
        >
          עברית
        </button>
      </header>
      <main style={{ padding: "2rem" }}>
        <h1>{t('welcome')}</h1>
        <a href="/">{t('backToItinerary')}</a>
        {/* Aquí tu contenido, usando t('clave') para traducir */}
      </main>
    </div>
  );
}

export default App;
