import { createSelector, MemoizedSelector } from '@ngrx/store';
import { BundleState, StateWithBundle } from '../bundle-state';
import { StateUtils } from '@spartacus/core';

export const getBundleState: MemoizedSelector<
  StateWithBundle,
  StateUtils.LoaderState<BundleState>
> = createSelector(getBundleState, (bundleState: BundleState) => bundleState);

export const getFindStoresEntities: MemoizedSelector<
  StateWithBundle,
  BundleState
> = createSelector(getBundleState, (state) =>
  StateUtils.loaderValueSelector(state)
);

export const getStoresLoading: MemoizedSelector<
  StateWithBundle,
  boolean
> = createSelector(getBundleState, (state) =>
  StateUtils.loaderLoadingSelector(state)
);

export const getStoresSuccess: MemoizedSelector<
  StateWithBundle,
  boolean
> = createSelector(getBundleState, (state) =>
  StateUtils.loaderSuccessSelector(state)
);
