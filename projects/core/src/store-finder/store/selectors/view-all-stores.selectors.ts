import { createSelector, MemoizedSelector } from '@ngrx/store';
import {
  StoresState,
  StateWithStoreFinder,
  ViewAllStoresState
} from '../store-finder-state';
import { getStoreFinderState } from './feature.selector';
import { LoaderState } from '../../../state/utils/loader/loader-state';
import {
  loaderLoadingSelector,
  loaderValueSelector
} from '../../../state/utils/loader/loader.selectors';

export const getViewAllStoresState: MemoizedSelector<
  StateWithStoreFinder,
  LoaderState<ViewAllStoresState>
> = createSelector(
  getStoreFinderState,
  (storesState: StoresState) => storesState.viewAllStores
);

export const getViewAllStoresEntities: MemoizedSelector<
  StateWithStoreFinder,
  any
> = createSelector(
  getViewAllStoresState,
  state => loaderValueSelector(state)
);

export const getViewAllStoresLoading: MemoizedSelector<
  StateWithStoreFinder,
  boolean
> = createSelector(
  getViewAllStoresState,
  state => loaderLoadingSelector(state)
);
