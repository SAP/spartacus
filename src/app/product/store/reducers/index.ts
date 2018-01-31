import {
  ActionReducerMap,
  createFeatureSelector,
  MetaReducer,
  ActionReducer,
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

export function clearProductsState(
  reducer: ActionReducer<any>
): ActionReducer<any> {
  return function(state, action) {
    if (action.type === '[Site-context] Currency Change') {
      state = undefined;
    }
    return reducer(state, action);
  };
}

export const metaReducers: MetaReducer<any>[] = [clearProductsState];
