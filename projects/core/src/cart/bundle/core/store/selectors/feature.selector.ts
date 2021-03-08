import { createFeatureSelector, MemoizedSelector } from '@ngrx/store';
import { BundleState, BUNDLE_FEATURE, StateWithBundle } from '../bundle-state';

export const getBundleState: MemoizedSelector<
  StateWithBundle,
  BundleState
> = createFeatureSelector<BundleState>(BUNDLE_FEATURE);
