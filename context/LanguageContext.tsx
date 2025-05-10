import React, { createContext, useState, useEffect, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Available languages
export const LANGUAGES = [
  { code: 'en', name: 'English' },
  { code: 'fr', name: 'Français' },
  { code: 'es', name: 'Español' },
  { code: 'de', name: 'Deutsch' },
];

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

// Language provider component
export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const { i18n } = useTranslation();
  const [language, setLanguageState] = useState<string>(i18n.language);

  // Load saved language on mount
  useEffect(() => {
    const loadSavedLanguage = async () => {
      try {
        const savedLanguage = await AsyncStorage.getItem(LANGUAGE_STORAGE_KEY);
        if (savedLanguage) {
          await i18n.changeLanguage(savedLanguage);
          setLanguageState(savedLanguage);
        }
      } catch (error) {
        console.error('Failed to load language preference:', error);
      }
    };
    
    loadSavedLanguage();
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
