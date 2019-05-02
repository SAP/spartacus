import { ServerConfig } from '../../config/server-config/server-config';

export abstract class OccConfig extends ServerConfig {
  site?: {
    baseSite?: string;
    language?: string;
    currency?: string;
  };
  backend?: {
    occ?: {
      baseUrl?: string;
      prefix?: string;
      endpoints?: {
        [endpoint: string]: string;
      };
    };
    media?: {
      /**
       * Media URLs are typically relative, so that the host can be configured.
       * Configurable media baseURLs are useful for SEO, multi-site,
       * switching environments, etc.
       */
      baseUrl?: string;
    };
  };
}
