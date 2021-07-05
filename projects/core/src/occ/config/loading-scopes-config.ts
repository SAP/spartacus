import { QueryNotifier } from '../../util/command-query/query.service';

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
   * Triggers for which to reload the product.
   */
  reloadOn?: QueryNotifier[];
}

export interface LoadingScopesConfig {
  [scope: string]: LoadingScopeConfig | undefined;
}

export interface LoadingScopes {
  [model: string]: LoadingScopesConfig | undefined;
}
