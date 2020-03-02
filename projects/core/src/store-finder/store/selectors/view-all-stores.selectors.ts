import { createSelector, MemoizedSelector } from '@ngrx/store';
import { StateLoaderSelectors } from '../../../state/utils/index';
import { LoaderState } from '../../../state/utils/loader/loader-state';
import {
  StateWithStoreFinder,
  StoresState,
  ViewAllStoresState,
} from '../store-finder-state';
import { getStoreFinderState } from './feature.selector';

export const getViewAllStoresState: MemoizedSelector<
  StateWithStoreFinder,
  LoaderState<ViewAllStoresState>
> = createSelector(
  getStoreFinderState,
  (storesState: StoresState) => storesState.viewAllStores
);

export const getViewAllStoresEntities: MemoizedSelector<
  StateWithStoreFinder,
  ViewAllStoresState
> = createSelector(getViewAllStoresState, state =>
  StateLoaderSelectors.loaderValueSelector(state)
);

export const getViewAllStoresLoading: MemoizedSelector<
  StateWithStoreFinder,
  boolean
> = createSelector(getViewAllStoresState, state =>
  StateLoaderSelectors.loaderLoadingSelector(state)
);
