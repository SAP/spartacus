import { ServerConfig } from '../config/server-config';
import { SiteContextModuleConfig } from '../site-context/site-context-module-config';

export abstract class OccModuleConfig extends ServerConfig
  implements SiteContextModuleConfig {
  site?: {
    baseSite?: string;
    language?: string;
    currency?: string;
  };
}
