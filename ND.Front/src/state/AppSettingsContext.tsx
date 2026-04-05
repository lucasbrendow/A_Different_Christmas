import type { PropsWithChildren } from 'react';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';

import i18n from '../i18n';
import { appConfig } from '../config/appConfig';
import type { AppLanguage } from '../types/app';

interface AppSettingsContextValue {
  language: AppLanguage;
  supportedLanguages: readonly AppLanguage[];
  isAuthenticated: boolean;
  signIn: (rememberSession: boolean) => void;
  signOut: () => void;
  setLanguage: (language: AppLanguage) => void;
}

const languageStorageKey = 'nd.front.language';
const persistentAuthStorageKey = 'nd.front.auth.persistent';
const sessionAuthStorageKey = 'nd.front.auth.session';

const AppSettingsContext = createContext<AppSettingsContextValue | undefined>(undefined);

function getInitialLanguage() {
  const storedLanguage = window.localStorage.getItem(languageStorageKey);

  if (storedLanguage === 'pt-BR' || storedLanguage === 'en-US') {
    return storedLanguage;
  }

  return appConfig.defaultLanguage;
}

function getInitialAuthenticationState() {
  return (
    window.localStorage.getItem(persistentAuthStorageKey) === 'true' ||
    window.sessionStorage.getItem(sessionAuthStorageKey) === 'true'
  );
}

export function AppSettingsProvider({ children }: PropsWithChildren) {
  const [language, setLanguageState] = useState<AppLanguage>(getInitialLanguage);
  const [isAuthenticated, setIsAuthenticated] = useState(getInitialAuthenticationState);

  useEffect(() => {
    window.localStorage.setItem(languageStorageKey, language);
    void i18n.changeLanguage(language);
  }, [language]);

  function signIn(rememberSession: boolean) {
    setIsAuthenticated(true);

    if (rememberSession) {
      window.localStorage.setItem(persistentAuthStorageKey, 'true');
      window.sessionStorage.removeItem(sessionAuthStorageKey);
      return;
    }

    window.sessionStorage.setItem(sessionAuthStorageKey, 'true');
    window.localStorage.removeItem(persistentAuthStorageKey);
  }

  function signOut() {
    setIsAuthenticated(false);
    window.localStorage.removeItem(persistentAuthStorageKey);
    window.sessionStorage.removeItem(sessionAuthStorageKey);
  }

  const value = useMemo<AppSettingsContextValue>(
    () => ({
      language,
      supportedLanguages: appConfig.supportedLanguages,
      isAuthenticated,
      signIn,
      signOut,
      setLanguage: setLanguageState,
    }),
    [isAuthenticated, language],
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
