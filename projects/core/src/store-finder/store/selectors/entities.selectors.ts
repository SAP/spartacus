import { MemoizedSelector, createSelector } from '@ngrx/store';
import { StateWithStoreFinder, StoresState, StoreEntitiesState } from '../store-finder-state';
import { getStoreFinderState } from './feature.selector';

export const getValueState: MemoizedSelector<StateWithStoreFinder, StoreEntitiesState> = createSelector(getStoreFinderState, (storesState: StoresState) => storesState.value);

export const getEntitiesState: MemoizedSelector<StateWithStoreFinder, any> = createSelector(getValueState, (storeEntitiesState: StoreEntitiesState) => storeEntitiesState.entities);
