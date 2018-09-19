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

export const getFindStoresEntities: MemoizedSelector<
  fromReducer.StoresState,
  any
> = createSelector(
  getStoresState,
  fromStoreFinderReducer.getFindStoresEntities
);

export const getViewAllStoresEntities: MemoizedSelector<
  any,
  any
> = createSelector(
  getStoresState,
  fromStoreFinderReducer.getViewAllStoresEntities
);
