import { InjectionToken, Provider } from '@angular/core';
import * as fromGlobalMessage from './global-message.reducer';
import { GlobalMessageState } from '../global-message-state';
import { ActionReducerMap, MetaReducer, ActionReducer } from '@ngrx/store';

export function getReducers(): ActionReducerMap<GlobalMessageState> {
  return {
     search: fromProductsSearch.reducer,
     details: fromProduct.reducer,
     reviews: fromProductReviews.reducer
   };
 }

export function getReducers(): ActionReducerMap<GlobalMessageState> {
  return fromGlobalMessage.reducer;
}

export const reducerToken: InjectionToken<
  ActionReducerMap<GlobalMessageState>
> = new InjectionToken<ActionReducerMap<GlobalMessageState>>(
  'GlobalMessageReducers'
);

export const reducerProvider: Provider = {
  provide: reducerToken,
  useFactory: getReducers
};

 import * as fromProductsSearch from './product-search.reducer';
import * as fromProduct from './product.reducer';
import * as fromProductReviews from './product-reviews.reducer';
import { ProductsState } from '../product-state';
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
    if (action.type === CURRENCY_CHANGE || action.type === LANGUAGE_CHANGE) {
      state = undefined;
    }
    return reducer(state, action);
   };
 }

 export const metaReducers: MetaReducer<any>[] = [clearProductsState];
