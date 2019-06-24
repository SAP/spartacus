import { BaseConfig } from '../../config/index';
import { TranslationResources } from '../translation-resources';

export abstract class I18nConfig extends BaseConfig {
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
