import { ServerConfig, SiteContextModuleConfig } from '@spartacus/core';

export abstract class OccModuleConfig extends ServerConfig
  implements SiteContextModuleConfig {
  site?: {
    baseSite?: string;
    language?: string;
    currency?: string;
  };
}
