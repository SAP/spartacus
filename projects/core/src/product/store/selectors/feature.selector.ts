import { MemoizedSelector, createFeatureSelector } from '@ngrx/store';
import { PRODUCT_FEATURE, ProductsState } from '../product-state';

export const getProductsState: MemoizedSelector<
  any,
  any
> = createFeatureSelector<ProductsState>(PRODUCT_FEATURE);
