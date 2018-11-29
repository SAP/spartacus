import { createSelector, MemoizedSelector } from '@ngrx/store';

import * as fromReducer from '../reducers';
import * as fromStoreFinderReducer from '../reducers/view-all-stores.reducer';

export const getViewAllStoresState: MemoizedSelector<
  fromReducer.StoresState,
  fromStoreFinderReducer.ViewAllStoresState
> = createSelector(
  fromReducer.getStoreFinderState,
  (state: fromReducer.StoresState) => state.viewAllStores
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
