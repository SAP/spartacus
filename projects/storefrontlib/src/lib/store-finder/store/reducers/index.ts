import {
  ActionReducerMap,
  createFeatureSelector,
  MemoizedSelector
} from '@ngrx/store';

import * as fromFindStores from './find-stores.reducer';
import * as fromViewAllStores from './view-all-stores.reducer';

export interface StoresState {
  findStores: fromFindStores.FindStoresState;
  viewAllStores: fromViewAllStores.ViewAllStoresState;
}

export const reducers: ActionReducerMap<StoresState> = {
  findStores: fromFindStores.reducer,
  viewAllStores: fromViewAllStores.reducer
};

export const getStoreFinderState: MemoizedSelector<
  any,
  StoresState
> = createFeatureSelector<StoresState>('stores');
