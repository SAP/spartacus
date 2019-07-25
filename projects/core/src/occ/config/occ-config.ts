import { SiteContextConfig } from '../../site-context/config/site-context-config';

export abstract class OccConfig extends SiteContextConfig {
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
