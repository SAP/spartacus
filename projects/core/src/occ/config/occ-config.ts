import { BaseConfig } from '../../config/index';

export abstract class OccConfig extends BaseConfig {
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
      legacy?: boolean;
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
