import { ActionReducerMap, MetaReducer } from '@ngrx/store';

import * as fromFindStores from './find-stores.reducer';
import * as fromViewAllStores from './view-all-stores.reducer';

import { InjectionToken, Provider } from '@angular/core';
import { StoresState } from '../store-finder-state';

export function getReducers(): ActionReducerMap<StoresState> {
  return {
    findStores: fromFindStores.reducer,
    viewAllStores: fromViewAllStores.reducer
  };
}

export const reducerToken: InjectionToken<
  ActionReducerMap<StoresState>
> = new InjectionToken<ActionReducerMap<StoresState>>('StoreFinderReducers');

export const reducerProvider: Provider = {
  provide: reducerToken,
  useFactory: getReducers
};

export const metaReducers: MetaReducer<any>[] = [];
