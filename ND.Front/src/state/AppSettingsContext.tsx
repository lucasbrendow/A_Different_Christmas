import type { PropsWithChildren } from 'react';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';

import i18n from '../i18n';
import { appConfig } from '../config/appConfig';
import type { AppLanguage } from '../types/app';

interface AppSettingsContextValue {
  language: AppLanguage;
  supportedLanguages: readonly AppLanguage[];
  isAuthenticated: boolean;
  setLanguage: (language: AppLanguage) => void;
}

const storageKey = 'nd.front.language';

const AppSettingsContext = createContext<AppSettingsContextValue | undefined>(undefined);

function getInitialLanguage() {
  const storedLanguage = window.localStorage.getItem(storageKey);

  if (storedLanguage === 'pt-BR' || storedLanguage === 'en-US') {
    return storedLanguage;
  }

  return appConfig.defaultLanguage;
}

export function AppSettingsProvider({ children }: PropsWithChildren) {
  const [language, setLanguageState] = useState<AppLanguage>(getInitialLanguage);

  useEffect(() => {
    window.localStorage.setItem(storageKey, language);
    void i18n.changeLanguage(language);
  }, [language]);

  const value = useMemo<AppSettingsContextValue>(
    () => ({
      language,
      supportedLanguages: appConfig.supportedLanguages,
      isAuthenticated: appConfig.enableMockAuth,
      setLanguage: setLanguageState,
    }),
    [language],
  );

  return <AppSettingsContext.Provider value={value}>{children}</AppSettingsContext.Provider>;
}

export function useAppSettings() {
  const context = useContext(AppSettingsContext);

  if (!context) {
    throw new Error('useAppSettings must be used within AppSettingsProvider.');
  }

  return context;
}
