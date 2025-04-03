
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { translations } from '../translations';

export type Language = 'de' | 'en' | 'tr' | 'es';

type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

type LanguageProviderProps = {
  children: ReactNode;
  defaultLanguage?: Language;
};

export function LanguageProvider({ 
  children, 
  defaultLanguage = 'de' 
}: LanguageProviderProps) {
  const [language, setLanguage] = useState<Language>(() => {
    const stored = localStorage.getItem('ask-transport-language');
    return (stored as Language) || defaultLanguage;
  });

  // Translation function
  const t = (key: string): string => {
    return translations[language]?.[key] || key;
  };

  useEffect(() => {
    document.documentElement.lang = language;
    localStorage.setItem('ask-transport-language', language);
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  
  return context;
};
