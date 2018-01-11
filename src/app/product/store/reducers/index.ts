import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

import * as fromProductSearch from './product-search.reducer';

export interface ProductsState {
  search: fromProductSearch.ProductSearchState;
}

export const reducers: ActionReducerMap<ProductsState> = {
  search: fromProductSearch.reducer
};

export const getProductsState = createFeatureSelector<ProductsState>(
  'products'
);
