import { TranslationConfig } from './translation-config';

export const defaultTranslationConfig: TranslationConfig = {
  translation: {
    backend: {
      loadPath: 'assets/i18n/{{lng}}/{{ns}}.{{lng}}.json'
    },
    fallbackLng: false,
    ns: ['common'],
    debug: false
  }
};
