import { InjectionToken, Provider } from '@angular/core';
import { ActionReducer, ActionReducerMap, MetaReducer } from '@ngrx/store';
import * as fromProductsSearch from './product-search.reducer';
import * as fromProductReviews from './product-reviews.reducer';
import { PRODUCT_DETAIL_ENTITY, ProductsState } from '../product-state';
import { CURRENCY_CHANGE, LANGUAGE_CHANGE } from '../../../site-context';
import { Product } from '../../../occ/occ-models/occ.models';
import { entityLoaderReducer } from '../../../state/utils/entity-loader/entity-loader.reducer';

export function getReducers(): ActionReducerMap<ProductsState> {
  return {
    search: fromProductsSearch.reducer,
    details: entityLoaderReducer<Product>(PRODUCT_DETAIL_ENTITY),
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
