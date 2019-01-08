import { createSelector, MemoizedSelector } from '@ngrx/store';

import * as fromReducer from '../reducers';
import * as fromStoreFinderReducer from '../reducers/view-all-stores.reducer';
import { StoresState, ViewAllStoresState } from '../store-finder-state';

export const getViewAllStoresState: MemoizedSelector<
  StoresState,
  ViewAllStoresState
> = createSelector(
  fromReducer.getStoreFinderState,
  (state: StoresState) => state.viewAllStores
);

export const getViewAllStoresEntities: MemoizedSelector<
  any,
  any
> = createSelector(
  getViewAllStoresState,
  fromStoreFinderReducer.getViewAllStoresEntities
);

export const getViewAllStoresLoading: MemoizedSelector<
  any,
  any
> = createSelector(
  getViewAllStoresState,
  fromStoreFinderReducer.getViewAllStoresLoading
);
