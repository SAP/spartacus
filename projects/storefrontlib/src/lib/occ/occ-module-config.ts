import { ServerConfig, SiteContextConfig } from '@spartacus/core';

export abstract class OccModuleConfig extends ServerConfig
  implements SiteContextConfig {
  site?: {
    baseSite?: string;
    language?: string;
    currency?: string;
  };
}
