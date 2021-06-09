import { StoreEntities } from '../model/store-entities';
import { StateUtils } from '@spartacus/core';

export const STORE_FINDER_FEATURE = 'stores';
export const STORE_FINDER_DATA = '[StoreFinder] Store Finder Data';

export interface StateWithStoreFinder {
  [STORE_FINDER_FEATURE]: StoresState;
}

export interface StoresState {
  findStores: StateUtils.LoaderState<FindStoresState>;
  viewAllStores: StateUtils.LoaderState<ViewAllStoresState>;
}

export interface FindStoresState {
  findStoresEntities: StoreEntities;
  findStoreEntityById: StoreEntities;
}

export interface ViewAllStoresState {
  viewAllStoresEntities: StoreEntities;
}
