import { MemoizedSelector, createFeatureSelector } from '@ngrx/store';
import {
  StoresState,
  STORE_FINDER_FEATURE,
  StateWithStoreFinder
} from '../store-finder-state';

export const getStoreFinderState: MemoizedSelector<
  StateWithStoreFinder,
  StoresState
> = createFeatureSelector<StoresState>(STORE_FINDER_FEATURE);
