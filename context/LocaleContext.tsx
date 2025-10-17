import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

export type Locale = 'en' | 'te';
type Translations = Record<string, string>;

interface LocaleContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  translations: Translations;
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

export const LocaleProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [locale, setLocale] = useState<Locale>('en');
  const [translations, setTranslations] = useState<Translations>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTranslations = async () => {
      setIsLoading(true);
      try {
        // Use fetch to load the JSON file from the public directory
        const response = await fetch(`/locales/${locale}.json`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setTranslations(data);
      } catch (error) {
        console.error("Failed to fetch translations:", error);
        // Fallback to an empty object in case of an error
        setTranslations({}); 
      } finally {
        setIsLoading(false);
      }
    };

    fetchTranslations();
  }, [locale]);
  
  // Render a loading state or nothing until the initial translations are loaded
  if (isLoading) {
    return null; 
  }

  return (
    <LocaleContext.Provider value={{ locale, setLocale, translations }}>
      {children}
    </LocaleContext.Provider>
  );
};

export const useLocale = (): LocaleContextType => {
  const context = useContext(LocaleContext);
  if (context === undefined) {
    throw new Error('useLocale must be used within a LocaleProvider');
  }
  return context;
};
