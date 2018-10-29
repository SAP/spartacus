import { ServerConfig } from '../../config/index';

export abstract class SiteContextModuleConfig extends ServerConfig {
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
