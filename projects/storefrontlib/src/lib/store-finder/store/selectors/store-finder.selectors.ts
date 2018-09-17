import { createSelector, MemoizedSelector } from '@ngrx/store';

import * as fromReducer from '../reducers';
import * as fromStoreFinderReducer from '../reducers/store-finder.reducer';

export const getStoresState: MemoizedSelector<
  fromReducer.StoresState,
  fromStoreFinderReducer.StoreFinderState
> = createSelector(
  fromReducer.getStoresFinderState,
  (state: fromReducer.StoresState) => state.stores
);

export const getAllStores: MemoizedSelector<
  fromReducer.StoresState,
  any
> = createSelector(
  getStoresState,
  fromStoreFinderReducer.getStoreFinderEntities
);
