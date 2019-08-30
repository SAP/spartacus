import { createFeatureSelector, MemoizedSelector } from '@ngrx/store';
import {
  StateWithStoreFinder,
  StoresState,
  STORE_FINDER_FEATURE,
} from '../store-finder-state';

export const getStoreFinderState: MemoizedSelector<
  StateWithStoreFinder,
  StoresState
> = createFeatureSelector<StoresState>(STORE_FINDER_FEATURE);
