import { createSelector, MemoizedSelector } from '@ngrx/store';
import { StateUtils } from 'projects/core/src/state/utils';
import { BundleState, StateWithBundle } from '../bundle-state';
import { getBundleState } from './feature.selector';

export const getBundlesEntities: MemoizedSelector<
  StateWithBundle,
  BundleState
> = createSelector(getBundleState, (state) =>
  StateUtils.loaderValueSelector(state)
);

export const getBundlesLoading: MemoizedSelector<
  StateWithBundle,
  boolean
> = createSelector(getBundleState, (state) =>
  StateUtils.loaderLoadingSelector(state)
);

export const getBundlesSuccess: MemoizedSelector<
  StateWithBundle,
  boolean
> = createSelector(getBundleState, (state) =>
  StateUtils.loaderSuccessSelector(state)
);
