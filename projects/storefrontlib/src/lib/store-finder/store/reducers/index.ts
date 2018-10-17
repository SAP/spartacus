import {
  ActionReducerMap,
  createFeatureSelector,
  MemoizedSelector
} from '@ngrx/store';

import * as fromStoreFinder from './find-stores.reducer';

export interface StoresState {
  stores: fromStoreFinder.StoreFinderState;
}

export const reducers: ActionReducerMap<StoresState> = {
  stores: fromStoreFinder.reducer
};

export const getStoresFinderState: MemoizedSelector<
  any,
  StoresState
> = createFeatureSelector<StoresState>('stores');
