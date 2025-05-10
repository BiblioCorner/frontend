import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';
import en from './translations/en';
import fr from './translations/fr';
import es from './translations/es';
import de from './translations/de';

// Get the device language
const getDeviceLanguage = (): string => {
  const locale = Localization.locale;
  const languageCode = locale.split('-')[0];
  
  // Check if device language is one of our supported languages
  const supportedLanguages = ['en', 'fr', 'es', 'de'];
  return supportedLanguages.includes(languageCode) ? languageCode : 'en';
};

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
    lng: getDeviceLanguage(), // Use device language as default
    fallbackLng: 'en', // Fallback language
    interpolation: {
      escapeValue: false, // React already escapes values
    },
  });

export default i18n;
