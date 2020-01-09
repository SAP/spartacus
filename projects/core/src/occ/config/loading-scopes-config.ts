export interface LoadingScopeConfig {
  /**
   * Specify scopes that should be included with this scope
   */
  include?: string[];
  /**
   * Max age for the scope in seconds
   */
  maxAge?: number;
}

export interface LoadingScopesConfig {
  [scope: string]: LoadingScopeConfig;
}

export interface LoadingScopes {
  [model: string]: LoadingScopesConfig;
}
