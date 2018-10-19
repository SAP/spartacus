import { createSelector, MemoizedSelector } from '@ngrx/store';

import * as fromReducer from '../reducers';
import * as fromStoreFinderReducer from '../reducers/find-stores.reducer';

export const getFindStoresState: MemoizedSelector<
  fromReducer.StoresState,
  fromStoreFinderReducer.FindStoresState
> = createSelector(
  fromReducer.getStoreFinderState,
  (state: fromReducer.StoresState) => state.findStores
);

export const getFindStoresEntities: MemoizedSelector<
  fromReducer.StoresState,
  any
> = createSelector(
  getFindStoresState,
  fromStoreFinderReducer.getFindStoresEntities
);

export const getStoresLoading: MemoizedSelector<
  fromReducer.StoresState,
  boolean
> = createSelector(getFindStoresState, fromStoreFinderReducer.getLoading);
