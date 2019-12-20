import { SiteContextConfig } from '../../site-context/config/site-context-config';
import { OccEndpoints } from '../occ-models/occ-endpoints.model';

export interface LoadingScopesConfig {
  [scope: string]: {
    /**
     * Specify scopes that should be included with this scope
     */
    include?: string[];
    /**
     * Max age for the scope in seconds
     */
    maxAge?: number;
  };
}

export abstract class OccConfig extends SiteContextConfig {
  backend?: {
    occ?: {
      baseUrl?: string;
      prefix?: string;
      endpoints?: OccEndpoints;
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
    loadingScopes?: {
      product?: LoadingScopesConfig;
      [model: string]: LoadingScopesConfig;
    };
  };
}
