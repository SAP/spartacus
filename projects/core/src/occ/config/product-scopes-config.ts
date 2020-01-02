import {
  LoadingScopeConfig,
  LoadingScopesConfig,
} from './loading-scopes-config';

declare module './loading-scopes-config' {
  interface LoadingScopes {
    product: ProductScopesConfig;
  }
}

export interface ProductScopesConfig extends LoadingScopesConfig {
  list?: LoadingScopeConfig;
  details?: LoadingScopeConfig;
}
