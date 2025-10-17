import { useLocale } from '../context/LocaleContext';

export const useTranslation = () => {
  const { locale, setLocale, translations } = useLocale();

  const t = (key: string, replacements?: Record<string, string>) => {
    let translation = translations[key] || key;

    if (replacements) {
        Object.keys(replacements).forEach(placeholder => {
            translation = translation.replace(`{${placeholder}}`, replacements[placeholder]);
        });
    }

    return translation;
  };

  return { t, locale, setLocale };
};
