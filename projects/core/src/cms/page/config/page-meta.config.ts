import { Injectable } from '@angular/core';
import { Config } from '../../../config';

@Injectable({
  providedIn: 'root',
  useExisting: Config,
})
export abstract class PageMetaConfig {
  pageResolvers?: PageResolverConfig;
}

export interface PageResolverConfig {
  resolvers?: PageResolver[];

  /**
   * Enables resolvers in dev mode regardless of the CSR configuration. This
   * flag will override the disabling in CSR, which can be useful during development
   * and debugging.
   */
  enableInDevMode?: boolean;
}

export interface PageResolver {
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
