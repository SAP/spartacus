import { ServerConfig } from '../../config';

export abstract class I18NConfig extends ServerConfig {
  i18n?: {
    preloadNamespaces?: string[];
    fallbackLang?: string | false;
    backend?: {
      loadPath?: string;
      crossDomain?: boolean;
    };
    resources?: {
      [lang: string]: {
        [namespace: string]: {
          [key: string]: any;
        };
      };
    };
    debug?: boolean;
  };
}
