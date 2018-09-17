import { ServerConfig } from '../config/server-config';
import { SiteContextModuleConfig } from '../site-context/site-context-module-config';

export interface AuthModuleConfig extends ServerConfig, SiteContextModuleConfig {
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
