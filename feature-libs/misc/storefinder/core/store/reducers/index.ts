import { ActionReducerMap, MetaReducer } from '@ngrx/store';

import { InjectionToken, Provider } from '@angular/core';
import { StoresState, STORE_FINDER_DATA } from '../store-finder-state';
import { StateUtils } from '@spartacus/core';

export function getReducers(): ActionReducerMap<StoresState> {
  return {
    findStores: StateUtils.loaderReducer(STORE_FINDER_DATA),
    viewAllStores: StateUtils.loaderReducer(STORE_FINDER_DATA),
  };
}

export const reducerToken: InjectionToken<ActionReducerMap<
  StoresState
>> = new InjectionToken<ActionReducerMap<StoresState>>('StoreFinderReducers');

export const reducerProvider: Provider = {
  provide: reducerToken,
  useFactory: getReducers,
};

export const metaReducers: MetaReducer<any>[] = [];
