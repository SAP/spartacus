import { createFeatureSelector, MemoizedSelector } from '@ngrx/store';
import { BundlesState, BUNDLE_FEATURE, StateWithBundle } from '../bundle-state';

export const getBundleState: MemoizedSelector<
  StateWithBundle,
  BundlesState
> = createFeatureSelector<BundlesState>(BUNDLE_FEATURE);
