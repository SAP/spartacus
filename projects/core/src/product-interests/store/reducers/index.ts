import { InjectionToken, Provider } from '@angular/core';

import { ActionReducerMap, MetaReducer } from '@ngrx/store';

import { loaderReducer } from '../../../state/utils/loader/loader.reducer';
import {
  ProductInterestsState,
  PRODUCT_INTERESTS,
} from '../product-interests-state';
import { ProductInterestList } from '../../model/product-interest.model';

import * as fromProductInterestsReducer from './product-interests.reducer';
import * as fromBackInStockReducer from './back-in-stock.reducer';

export function getReducers(): ActionReducerMap<ProductInterestsState> {
  return {
    interests: loaderReducer<ProductInterestList>(
      PRODUCT_INTERESTS,
      fromProductInterestsReducer.reducer
    ),
    backInStock: fromBackInStockReducer.reducer,
  };
}

export const reducerToken: InjectionToken<
  ActionReducerMap<ProductInterestsState>
> = new InjectionToken<ActionReducerMap<ProductInterestsState>>(
  'ProductInterestsReducers'
);

export const reducerProvider: Provider = {
  provide: reducerToken,
  useFactory: getReducers,
};

export const metaReducers: MetaReducer<any>[] = [];
