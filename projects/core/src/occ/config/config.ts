import { ServerConfig } from '../../config';
import { SiteContextConfig } from '../../site-context';

export abstract class OccModuleConfig extends ServerConfig
  implements SiteContextConfig {
  site?: {
    baseSite?: string;
    language?: string;
    currency?: string;
  };
}
