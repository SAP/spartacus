import { createSelector, MemoizedSelector } from '@ngrx/store';
import {
  FindStoresState,
  StoresState,
  StateWithStoreFinder
} from '../store-finder-state';
import { getStoreFinderState } from './feature.selector';
import { LoaderState } from '../../../state/utils/loader/loader-state';
import {
  loaderLoadingSelector,
  loaderValueSelector
} from '../../../state/utils/loader/loader.selectors';

export const getFindStoresState: MemoizedSelector<
  StateWithStoreFinder,
  LoaderState<FindStoresState>
> = createSelector(
  getStoreFinderState,
  (storesState: StoresState) => storesState.findStores
);

export const getFindStoresEntities: MemoizedSelector<
  StateWithStoreFinder,
  any
> = createSelector(
  getFindStoresState,
  state => loaderValueSelector(state)
);

export const getStoresLoading: MemoizedSelector<
  StateWithStoreFinder,
  boolean
> = createSelector(
  getFindStoresState,
  state => loaderLoadingSelector(state)
);
