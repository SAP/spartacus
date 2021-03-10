import { createSelector, MemoizedSelector } from '@ngrx/store';
import {
  StateWithStoreFinder,
  StoresState,
  ViewAllStoresState,
} from '../store-finder-state';
import { getStoreFinderState } from './feature.selector';
import { StateUtils } from '@spartacus/core';

export const getViewAllStoresState: MemoizedSelector<
  StateWithStoreFinder,
  StateUtils.LoaderState<ViewAllStoresState>
> = createSelector(
  getStoreFinderState,
  (storesState: StoresState) => storesState.viewAllStores
);

export const getViewAllStoresEntities: MemoizedSelector<
  StateWithStoreFinder,
  ViewAllStoresState
> = createSelector(getViewAllStoresState, (state) =>
  StateUtils.loaderValueSelector(state)
);

export const getViewAllStoresLoading: MemoizedSelector<
  StateWithStoreFinder,
  boolean
> = createSelector(getViewAllStoresState, (state) =>
  StateUtils.loaderLoadingSelector(state)
);
