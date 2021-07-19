import { Type } from '@angular/core';
import { CxEvent } from '../../event/cx-event';

export interface LoadingScopeConfig {
  /**
   * Specify scopes that should be included with this scope
   */
  include?: string[];
  /**
   * Max age for the scope in seconds
   */
  maxAge?: number;
  /**
   * Events for which to reload the product.
   */
  reloadOn?: Type<CxEvent>[];
}

export interface LoadingScopesConfig {
  [scope: string]: LoadingScopeConfig | undefined;
}

export interface LoadingScopes {
  [model: string]: LoadingScopesConfig | undefined;
}
