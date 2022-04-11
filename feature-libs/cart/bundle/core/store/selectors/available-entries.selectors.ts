import { createSelector, MemoizedSelector } from '@ngrx/store';
import { StateUtils } from '@spartacus/core';
import { AvailableEntriesState, BundlesState, StateWithBundle } from '../bundle-state';
import { getBundleState } from './feature.selector';

export const getAvailableEntriesState: MemoizedSelector<
  StateWithBundle,
  StateUtils.LoaderState<AvailableEntriesState>
> = createSelector(
  getBundleState,
  (bundleState: BundlesState) => bundleState.availableEntries
);

export const getAvailableEntriesEntities: MemoizedSelector<
  StateWithBundle,
  AvailableEntriesState
> = createSelector(getAvailableEntriesState, (state) =>
  StateUtils.loaderValueSelector(state)
);

export const getAvailableEntriesLoading: MemoizedSelector<
  StateWithBundle,
  boolean
> = createSelector(getAvailableEntriesState, (state) =>
  StateUtils.loaderLoadingSelector(state)
);

export const getAvailableEntriesSuccess: MemoizedSelector<
  StateWithBundle,
  boolean
> = createSelector(getAvailableEntriesState, (state) =>
  StateUtils.loaderSuccessSelector(state)
);
