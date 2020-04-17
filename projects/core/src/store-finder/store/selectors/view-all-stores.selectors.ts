import { createSelector, MemoizedSelector } from '@ngrx/store';
import { StateUtils } from '../../../state/utils/index';
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
> = createSelector(getViewAllStoresState, (state) =>
  StateUtils.loaderValueSelector(state)
);

export const getViewAllStoresLoading: MemoizedSelector<
  StateWithStoreFinder,
  boolean
> = createSelector(getViewAllStoresState, (state) =>
  StateUtils.loaderLoadingSelector(state)
);
