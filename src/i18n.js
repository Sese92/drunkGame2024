import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import { default as en } from './../dictionary/en.json';
import { default as es } from './../dictionary/es.json';

const resources = {
  en,
  es,
};

// eslint-disable-next-line import/no-named-as-default-member
i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  resources,
  lng: 'en',
  supportedLngs: ['en', 'es'],
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
