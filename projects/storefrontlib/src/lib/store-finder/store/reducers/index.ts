import {
  ActionReducerMap,
  createFeatureSelector,
  MemoizedSelector
} from '@ngrx/store';

import * as fromStoreFinder from './store-finder.reducer';

export interface StoresState {
  stores: fromStoreFinder.StoreFinderState;
}

export const reducers: ActionReducerMap<StoresState> = {
  stores: fromStoreFinder.reducer
};

export const getStoresFinderState: MemoizedSelector<
  any,
  any
> = createFeatureSelector<StoresState>('stores');