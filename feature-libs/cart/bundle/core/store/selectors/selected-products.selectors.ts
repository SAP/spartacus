import { createSelector, MemoizedSelector } from '@ngrx/store';
import {
  BundlesState,
  SelectedProductsState,
  StateWithBundle,
} from '../bundle-state';
import { getBundleState } from './feature.selector';

export const getSelectedProductsState: MemoizedSelector<
  StateWithBundle,
  SelectedProductsState
> = createSelector(
  getBundleState,
  (bundleState: BundlesState) => bundleState.selectedProducts
);
