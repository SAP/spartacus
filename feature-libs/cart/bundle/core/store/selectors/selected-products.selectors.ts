import { createSelector, MemoizedSelector } from '@ngrx/store';
import { StateUtils } from '@spartacus/core';
import {
  BundlesState,
  SelectedProductsState,
  StateWithBundle,
} from '../bundle-state';
import { getBundleState } from './feature.selector';

export const getSelectedProductsState: MemoizedSelector<
  StateWithBundle,
  StateUtils.LoaderState<SelectedProductsState>
> = createSelector(
  getBundleState,
  (bundleState: BundlesState) => bundleState.selectedProducts
);
