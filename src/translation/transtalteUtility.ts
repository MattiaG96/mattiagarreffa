import { en } from './en';
import { es } from './es';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

export const setUpTexts = () => {
  const resources = {
    en: {
      translation: en,
    },
    es: {
      translation: es,
    },
  };

  i18n
    .use(initReactI18next)
    .init({
      resources,
      lng: getDeviceLanguage(),
      interpolation: {
        escapeValue: false,
      },
    })
    .catch((error) => console.error('I18_ERROR:', error));
};

export const getDeviceLanguage = () => {
  const lang = navigator.language;
  let formattedLang = 'es';
  if (lang.includes('-')) {
    formattedLang = lang.split('-')[0];
  } else {
    formattedLang = lang.split('_')[0];
  }
  if (formattedLang !== 'en' && formattedLang !== 'es') {
    return 'en';
  }
  return formattedLang;
};
