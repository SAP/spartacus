import { ServerConfig } from '../config/server-config';
import { SiteContextModuleConfig } from '../site-context/site-context-module-config';

export abstract class AuthModuleConfig extends ServerConfig implements SiteContextModuleConfig {
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
