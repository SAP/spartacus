import { LoaderState } from '../../state';

export const STORE_FINDER_FEATURE = 'stores';
export const STORE_FINDER_DATA = '[StoreFinder] Store Finder Data';

export interface StateWithStoreFinder {
  [STORE_FINDER_FEATURE]: StoresState;
}

export interface StoresState {
  findStores: LoaderState<FindStoresState>;
  viewAllStores: LoaderState<ViewAllStoresState>;
}

export interface FindStoresState {
  findStoresEntities: any;
}

export interface ViewAllStoresState {
  viewAllStoresEntities: any;
}
