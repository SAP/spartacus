import { TranslationResources } from '../translation-resources';

export abstract class I18nConfig {
  i18n?: {
    fallbackLang?: string | false;
    backend?: {
      loadPath?: string;
      crossDomain?: boolean;
    };
    resources?: TranslationResources;
    debug?: boolean;
    chunks?: {
      [chunk: string]: string[];
    };
  };
}
