import { createFeatureSelector, MemoizedSelector } from '@ngrx/store';

import {
  PRODUCT_FEATURE,
  ProductsState,
  StateWithProduct,
} from '../product-state';

export const getProductsState: MemoizedSelector<
  StateWithProduct,
  ProductsState
> = createFeatureSelector<ProductsState>(PRODUCT_FEATURE);
