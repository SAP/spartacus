import { ServerConfig } from '../../config';

export abstract class TranslationConfig extends ServerConfig {
  translation?: {
    debug?: boolean;
    ns?: string[];
    fallbackLng?: string | false;
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
  };
}
