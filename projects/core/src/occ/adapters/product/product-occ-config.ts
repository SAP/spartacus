import {
  LoadingScopeConfig,
  LoadingScopesConfig,
} from '../../config/loading-scopes-config';
import { ProductScope } from '../../../product/model/product-scope';

// Improve type-safety and code completion for product loading scopes
declare module '../../config/loading-scopes-config' {
  interface LoadingScopes {
    product?: ProductScopesConfig;
  }
}

export interface ProductScopesConfig extends LoadingScopesConfig {
  list?: ProductLoadingScopeConfig;
  details?: ProductLoadingScopeConfig;
  [scope: string]: ProductLoadingScopeConfig;
}

export interface ProductLoadingScopeConfig extends LoadingScopeConfig {
  include?: (ProductScope | string)[];
}
