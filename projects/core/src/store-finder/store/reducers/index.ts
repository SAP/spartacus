import { ActionReducerMap, MetaReducer } from '@ngrx/store';

import { InjectionToken, Provider } from '@angular/core';
import { StoresState } from '../store-finder-state';
import * as fromFindStores from './find-stores.reducer';
import * as fromViewAllStores from './view-all-stores.reducer';
import * as fromEntities from './entities.reducer';

export function getReducers(): ActionReducerMap<StoresState> {
  return {
    findStores: fromFindStores.reducer,
    viewAllStores: fromViewAllStores.reducer,
    value: fromEntities.reducer,
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
