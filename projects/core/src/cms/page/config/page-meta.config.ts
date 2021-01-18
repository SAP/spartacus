import { Injectable } from '@angular/core';
import { Config } from '../../../config/config-tokens';

@Injectable({
  providedIn: 'root',
  useExisting: Config,
})
export abstract class PageMetaConfig {
  pageMeta?: PageMetaResolversConfig;
}

export interface PageMetaResolversConfig {
  resolvers?: PageMetaResolverConfig[];

  /**
   * Enables resolvers in dev mode regardless of the CSR configuration. This
   * flag will override the disabling in CSR, which can be useful during development
   * and debugging.
   */
  enableInDevMode?: boolean;
}

export interface PageMetaResolverConfig {
  /**
   * PageMeta property
   */
  property: string;

  /**
   * The resolver method that must be provided on the resolver class.
   */
  method: string;

  /**
   * Disables specific resolvers in CSR mode. Some of the resolvers are
   * not needed in CSR app, as they're only used for crawlers who will
   * be served from SSR rendered pages.
   */
  disabledInCsr?: boolean;
}
