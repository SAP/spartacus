import {
  ActionReducerMap,
  createFeatureSelector,
  MemoizedSelector,
  MetaReducer
} from '@ngrx/store';

import * as fromFindStores from './find-stores.reducer';
import * as fromViewAllStores from './view-all-stores.reducer';
import { StoresState, STORE_FINDER_FEATURE } from '../store-finder-state';
import { InjectionToken, Provider } from '@angular/core';

export function getStoreFinderReducers(): ActionReducerMap<StoresState> {
  return {
    findStores: fromFindStores.reducer,
    viewAllStores: fromViewAllStores.reducer
  };
}

export const storeFinderReducerToken: InjectionToken<
  ActionReducerMap<StoresState>
> = new InjectionToken<ActionReducerMap<StoresState>>('StoreFinderReducers');

export const storeFinderReducerProvider: Provider = {
  provide: storeFinderReducerToken,
  useFactory: getStoreFinderReducers
};

export const getStoreFinderState: MemoizedSelector<
  any,
  StoresState
> = createFeatureSelector<StoresState>(STORE_FINDER_FEATURE);

export const storeFinderMetaReducers: MetaReducer<any>[] = [];
