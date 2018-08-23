import { createSelector, MemoizedSelector } from '@ngrx/store';

import * as fromReducer from './../reducers';
import * as fromStoreFinderReducer from './../reducers/store-finder.reducer';

export const getStoresState: MemoizedSelector<any, any> = createSelector(
  fromReducer.getStoresFinderState,
  (state: fromReducer.StoresState) => state.stores
);

export const getAllStores: MemoizedSelector<any, string[]> = createSelector(
  getStoresState,
  fromStoreFinderReducer.getStoreFinderEntities
);
