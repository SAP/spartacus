import {
  ActionReducerMap,
  createFeatureSelector,
  MemoizedSelector
} from '@ngrx/store';

import * as fromProductsSearch from './product-search.reducer';
import * as fromProduct from './product.reducer';

export interface ProductsState {
  textSearch: fromProductsSearch.ProductsSearchState;
  details: fromProduct.ProductState;
}

export const reducers: ActionReducerMap<ProductsState> = {
  textSearch: fromProductsSearch.reducer,
  details: fromProduct.reducer
};

export const getProductsState = createFeatureSelector<ProductsState>(
  'products'
);
