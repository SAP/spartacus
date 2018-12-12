import { InjectionToken, Provider } from '@angular/core';
import { ActionReducerMap, MetaReducer, ActionReducer, combineReducers } from '@ngrx/store';

import * as fromProductsSearch from './product-search.reducer';
import * as fromProduct from './product.reducer';
import * as fromProductReviews from './product-reviews.reducer';
import { ProductsState } from '../product-state';
import { CURRENCY_CHANGE, LANGUAGE_CHANGE } from '../../../site-context';
import { entityReducer } from './load.reducer';
import { LOAD_PRODUCT } from '../actions/product.action';

export function getReducers(): ActionReducerMap<ProductsState> {
  return {
    search: fromProductsSearch.reducer,
    details: entityReducer(fromProduct.reducer, LOAD_PRODUCT),
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

export function clearProductsState(
  reducer: ActionReducer<any>
): ActionReducer<any> {
  return function(state, action) {
    if (action.type === CURRENCY_CHANGE || action.type === LANGUAGE_CHANGE) {
      state = undefined;
    }
    return reducer(state, action);
  };
}

export const metaReducers: MetaReducer<any>[] = [clearProductsState];
