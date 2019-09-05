import { StoreEntities } from '../model';

export const STORE_FINDER_FEATURE = 'stores';
export const STORE_FINDER_DATA = '[StoreFinder] Store Finder Data';

export interface StateWithStoreFinder {
  [STORE_FINDER_FEATURE]: StoresState;
}

export interface LoadingState {
  loading?: boolean;
  error?: boolean;
  success?: boolean;
}

export interface StoresState {
  findStores: LoadingState;
  viewAllStores: LoadingState;
  value: StoreEntitiesState;
}

export interface FindStoresState {
  findStoresEntities: StoreEntities;
}

export interface ViewAllStoresState {
  viewAllStoresEntities: StoreEntities;
}

export interface StoreEntitiesState {
  entities: StoreEntities;
}
