import { createFeatureSelector, MemoizedSelector } from '@ngrx/store';
import {
  ProductsState,
  PRODUCT_FEATURE,
  StateWithProduct,
} from '../product-state';

export const getProductsState: MemoizedSelector<
  StateWithProduct,
  ProductsState
> = createFeatureSelector<ProductsState>(PRODUCT_FEATURE);
