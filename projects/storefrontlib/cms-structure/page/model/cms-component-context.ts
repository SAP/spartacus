import { Product } from '@spartacus/core';
import { Observable } from 'rxjs';

export interface BaseContext {}
export interface ProductContext extends BaseContext {
  readonly product: Product;
}

export interface AllContext {
  ProductContext: ProductContext;
}

export type Context = AllContext[keyof AllContext];

export abstract class ComponentContextData<T extends BaseContext> {
  /**
   * Provides component context as an observable
   */
  context$: Observable<T>;
}
