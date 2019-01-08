import { createSelector, MemoizedSelector } from '@ngrx/store';

import * as fromReducer from '../reducers';
import * as fromStoreFinderReducer from '../reducers/find-stores.reducer';
import { FindStoresState, StoresState } from '../store-finder-state';

export const getFindStoresState: MemoizedSelector<
  StoresState,
  FindStoresState
> = createSelector(
  fromReducer.getStoreFinderState,
  (state: StoresState) => state.findStores
);

export const getFindStoresEntities: MemoizedSelector<
  StoresState,
  any
> = createSelector(
  getFindStoresState,
  fromStoreFinderReducer.getFindStoresEntities
);

export const getStoresLoading: MemoizedSelector<
  StoresState,
  boolean
> = createSelector(
  getFindStoresState,
  fromStoreFinderReducer.getLoading
);
