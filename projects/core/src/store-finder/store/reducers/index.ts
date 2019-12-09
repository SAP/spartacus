import { InjectionToken, Provider } from '@angular/core';
import { ActionReducerMap, MetaReducer } from '@ngrx/store';

import { loaderReducer } from '../../../state/utils/loader/loader.reducer';
import { STORE_FINDER_DATA, StoresState } from '../store-finder-state';

export function getReducers(): ActionReducerMap<StoresState> {
  return {
    findStores: loaderReducer(STORE_FINDER_DATA),
    viewAllStores: loaderReducer(STORE_FINDER_DATA),
  };
}

export const reducerToken: InjectionToken<
  ActionReducerMap<StoresState>
> = new InjectionToken<ActionReducerMap<StoresState>>('StoreFinderReducers');

export const reducerProvider: Provider = {
  provide: reducerToken,
  useFactory: getReducers,
};

export const metaReducers: MetaReducer<any>[] = [];
