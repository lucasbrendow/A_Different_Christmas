import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import { appConfig } from '../config/appConfig';
import { enUS } from './resources/enUS';
import { ptBR } from './resources/ptBR';

void i18n.use(initReactI18next).init({
  resources: {
    'en-US': enUS,
    'pt-BR': ptBR,
  },
  lng: appConfig.defaultLanguage,
  fallbackLng: 'pt-BR',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
