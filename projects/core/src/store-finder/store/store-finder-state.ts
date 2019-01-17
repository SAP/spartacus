export const STORE_FINDER_FEATURE = 'stores';

export interface StoresState {
  findStores: FindStoresState;
  viewAllStores: ViewAllStoresState;
}

export interface FindStoresState {
  findStoresEntities: any;
  isLoading: boolean;
}

export interface ViewAllStoresState {
  viewAllStoresEntities: any;
  isLoading: boolean;
}
