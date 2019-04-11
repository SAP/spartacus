import { ServerConfig } from '../../config';
import { TranslationResources } from '../translation-resources';

export abstract class I18nConfig extends ServerConfig {
  i18n?: {
    fallbackLang?: string | false;
    backend?: {
      loadPath?: string;
      crossDomain?: boolean;
    };
    resources?: TranslationResources;
    debug?: boolean;
    namespaceMapping?: {
      [mainKey: string]: string;
    };
  };
}
