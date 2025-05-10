import React, { createContext, useState, useEffect, useContext } from 'react';
import { Platform } from 'react-native';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Localization from 'expo-localization';

// Available languages
export const LANGUAGES = [
  { code: 'en', name: 'English' },
  { code: 'fr', name: 'Français' },
  { code: 'es', name: 'Español' },
  { code: 'de', name: 'Deutsch' },
];

// Language codes array for easy checking
const LANGUAGE_CODES = LANGUAGES.map(lang => lang.code);

// Language context interface
interface LanguageContextType {
  language: string;
  setLanguage: (lang: string) => Promise<void>;
  languages: typeof LANGUAGES;
}

// Create language context with default values
const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: async () => {},
  languages: LANGUAGES,
});

const LANGUAGE_STORAGE_KEY = '@bibliocorner:language';
// Get device language
const getDeviceLanguage = (): string => {
  // Get device locale (e.g., 'en-US', 'fr-FR')
  const locale = Localization.getLocales()[0].languageTag;
  // Extract the language code (e.g., 'en', 'fr')
  const deviceLanguage = locale.split('-')[0];
  // Check if device language is supported, otherwise default to English
  return LANGUAGE_CODES.includes(deviceLanguage) ? deviceLanguage : 'en';
};

// Language provider component
export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const { i18n } = useTranslation();
  const [language, setLanguageState] = useState<string>(i18n.language);

  // Load saved language or use device language on mount
  useEffect(() => {
    const initializeLanguage = async () => {
      try {
        // Try to get saved language from storage
        const savedLanguage = await AsyncStorage.getItem(LANGUAGE_STORAGE_KEY);

        if (savedLanguage && LANGUAGE_CODES.includes(savedLanguage)) {
          // Use saved language if available
          await i18n.changeLanguage(savedLanguage);
          setLanguageState(savedLanguage);
        } else {
          // Otherwise use device language or default to English
          const deviceLang = getDeviceLanguage();
          await i18n.changeLanguage(deviceLang);
          setLanguageState(deviceLang);
          await AsyncStorage.setItem(LANGUAGE_STORAGE_KEY, deviceLang);
        }
      } catch (error) {
        console.error('Failed to initialize language:', error);
        // Fallback to English in case of error
        await i18n.changeLanguage('en');
        setLanguageState('en');
      }
    };
    
    initializeLanguage();
  }, [i18n]);

  // Function to change language
  const setLanguage = async (lang: string) => {
    try {
      await i18n.changeLanguage(lang);
      setLanguageState(lang);
      await AsyncStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
    } catch (error) {
      console.error('Failed to set language:', error);
    }
  };

  return (
    <LanguageContext.Provider 
      value={{ 
        language, 
        setLanguage,
        languages: LANGUAGES
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

// Custom hook to use the language context
export const useLanguage = () => useContext(LanguageContext);
