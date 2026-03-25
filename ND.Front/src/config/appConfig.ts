import { supportedLanguages, type AppLanguage } from '../types/app';
import { readBooleanEnv, readStringEnv } from '../utils/env';

export interface AppConfigEnvironment {
  VITE_API_BASE_URL?: string;
  VITE_DEFAULT_LANGUAGE?: string;
  VITE_ENABLE_MOCK_AUTH?: string;
}

export interface AppConfig {
  appName: string;
  apiBaseUrl: string;
  defaultLanguage: AppLanguage;
  supportedLanguages: readonly AppLanguage[];
  enableMockAuth: boolean;
}

function isSupportedLanguage(value: string): value is AppLanguage {
  return supportedLanguages.includes(value as AppLanguage);
}

export function createAppConfig(env: AppConfigEnvironment): AppConfig {
  const apiBaseUrl = readStringEnv(env.VITE_API_BASE_URL, 'https://localhost:7158');
  const rawLanguage = readStringEnv(env.VITE_DEFAULT_LANGUAGE, 'pt-BR');
  const defaultLanguage = isSupportedLanguage(rawLanguage) ? rawLanguage : 'pt-BR';

  return {
    appName: 'A Different Christmas',
    apiBaseUrl,
    defaultLanguage,
    supportedLanguages,
    enableMockAuth: readBooleanEnv(env.VITE_ENABLE_MOCK_AUTH, true),
  };
}

export const appConfig = createAppConfig(import.meta.env);
