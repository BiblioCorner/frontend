import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './translations/en';
import fr from './translations/fr';
import es from './translations/es';
import de from './translations/de';

// Initialize i18next with our translations
i18n
  .use(initReactI18next) // Pass i18n instance to react-i18next
  .init({
    resources: {
      en: { translation: en },
      fr: { translation: fr },
      es: { translation: es },
      de: { translation: de },
    },
    lng: 'en', // Default language
    fallbackLng: 'en', // Fallback language
    interpolation: {
      escapeValue: false, // React already escapes values
    },
  });

export default i18n;
