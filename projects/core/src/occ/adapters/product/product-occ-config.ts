import {
  LoadingScopeConfig,
  LoadingScopesConfig,
} from '../../config/loading-scopes-config';

// Improve type-safety and code completion for product loading scopes
declare module '../../config/loading-scopes-config' {
  interface LoadingScopes {
    product: ProductScopesConfig;
  }
}

export interface ProductScopesConfig extends LoadingScopesConfig {
  list?: LoadingScopeConfig;
  details?: LoadingScopeConfig;
}
