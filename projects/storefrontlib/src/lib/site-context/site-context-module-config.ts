import { ServerConfig } from '../config/server-config';

export interface SiteContextModuleConfig extends ServerConfig {
  site?: {
    baseSite?: string;
    language?: string;
    currency?: string;
  };
}

export const defaultSiteContextModuleConfig: SiteContextModuleConfig = {
  site: {
    baseSite: 'electronics',
    language: 'en',
    currency: 'USD'
  }
};
