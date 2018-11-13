import { ServerConfig } from '../../config';
import { SiteContextConfig } from '../../site-context/config/config';

export abstract class AuthModuleConfig extends ServerConfig
  implements SiteContextConfig {
  site?: {
    baseSite?: string;
    language?: string;
    currency?: string;
  };

  authentication?: {
    client_id?: string;
    client_secret?: string;
  };
}

export const defaultAuthModuleConfig: AuthModuleConfig = {
  authentication: {
    client_id: 'mobile_android',
    client_secret: 'secret'
  }
};
