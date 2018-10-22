import { ServerConfig } from '@spartacus/core';
import { SiteContextModuleConfig } from '../site-context/site-context-module-config';

export abstract class OccModuleConfig extends ServerConfig
  implements SiteContextModuleConfig {
  site?: {
    baseSite?: string;
    language?: string;
    currency?: string;
  };
}
