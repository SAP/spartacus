import { MemoizedSelector, createFeatureSelector } from '@ngrx/store';
import { StoresState, STORE_FINDER_FEATURE } from '../store-finder-state';

export const getStoreFinderState: MemoizedSelector<
  any,
  StoresState
> = createFeatureSelector<StoresState>(STORE_FINDER_FEATURE);
