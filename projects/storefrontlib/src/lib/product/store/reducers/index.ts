import { InjectionToken, Provider } from '@angular/core';
import {
  ActionReducerMap,
  createFeatureSelector,
  MetaReducer,
  ActionReducer,
  MemoizedSelector
} from '@ngrx/store';

import * as fromProductsSearch from './product-search.reducer';
import * as fromProduct from './product.reducer';
import * as fromProductReviews from './product-reviews.reducer';

export interface ProductsState {
  search: fromProductsSearch.ProductsSearchState;
  details: fromProduct.ProductState;
  reviews: fromProductReviews.ProductReviewsState;
}

export function getReducers(): ActionReducerMap<ProductsState> {
  return {
    search: fromProductsSearch.reducer,
    details: fromProduct.reducer,
    reviews: fromProductReviews.reducer
  };
}

export const reducerToken: InjectionToken<
  ActionReducerMap<ProductsState>
> = new InjectionToken<ActionReducerMap<ProductsState>>('ProductReducers');

export const reducerProvider: Provider = {
  provide: reducerToken,
  useFactory: getReducers
};

export const getProductsState: MemoizedSelector<
  any,
  any
> = createFeatureSelector<ProductsState>('products');

export function clearProductsState(
  reducer: ActionReducer<any>
): ActionReducer<any> {
  return function(state, action) {
    if (
      action.type === '[Site-context] Currency Change' ||
      action.type === '[Site-context] Language Change'
    ) {
      state = undefined;
    }
    return reducer(state, action);
  };
}

export const metaReducers: MetaReducer<any>[] = [clearProductsState];
