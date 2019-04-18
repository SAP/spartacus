import { InjectionToken, Provider } from '@angular/core';
import { ActionReducer, ActionReducerMap, MetaReducer } from '@ngrx/store';
import { CURRENCY_CHANGE, LANGUAGE_CHANGE } from '../../../site-context';
import { entityLoaderReducer } from '../../../state/utils/entity-loader/entity-loader.reducer';
import { UIProduct } from '../../model/product';
import { ProductsState, PRODUCT_DETAIL_ENTITY } from '../product-state';
import * as fromProductReferences from './product-references.reducer';
import * as fromProductReviews from './product-reviews.reducer';
import * as fromProductsSearch from './product-search.reducer';

export function getReducers(): ActionReducerMap<ProductsState> {
  return {
    search: fromProductsSearch.reducer,
    details: entityLoaderReducer<UIProduct>(PRODUCT_DETAIL_ENTITY),
    reviews: fromProductReviews.reducer,
    productReferences: fromProductReferences.reducer,
  };
}

export const reducerToken: InjectionToken<
  ActionReducerMap<ProductsState>
> = new InjectionToken<ActionReducerMap<ProductsState>>('ProductReducers');

export const reducerProvider: Provider = {
  provide: reducerToken,
  useFactory: getReducers,
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
