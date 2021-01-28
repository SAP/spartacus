import { ProductScope } from '../../../product/model/product-scope';
import {
  LoadingScopeConfig,
  LoadingScopesConfig,
} from '../../config/loading-scopes-config';

// Improve type-safety and code completion for product loading scopes
declare module '../../config/loading-scopes-config' {
  interface LoadingScopes {
    product?: ProductScopesConfig;
  }
}

export interface ProductScopesConfig extends LoadingScopesConfig {
  list?: ProductLoadingScopeConfig;
  details?: ProductLoadingScopeConfig;
  attributes?: ProductLoadingScopeConfig;
  variants?: ProductLoadingScopeConfig;
  [scope: string]: ProductLoadingScopeConfig | undefined;
}

export interface ProductLoadingScopeConfig extends LoadingScopeConfig {
  include?: (ProductScope | string)[];
}
