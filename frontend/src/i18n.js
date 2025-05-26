// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import es from '../locales/es.json';
import he from '../locales/he.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      es: { translation: es },
      he: { translation: he }
    },
    lng: localStorage.getItem('lang') || 'es',
    fallbackLng: 'es',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
