import { Action } from '@ngrx/store';
import { SearchConfig } from '../../models/search-config';

export const FIND_STORES = '[FindStores] Find Stores';
export const FIND_STORES_FAIL = '[FindStores] Find Stores Fail';
export const FIND_STORES_SUCCESS = '[FindStores] Find Stores Success';

export const FIND_ALL_STORES = '[FindStores] Find All Stores';
export const FIND_ALL_STORES_FAIL = '[FindStores] Find All Stores Fail';
export const FIND_ALL_STORES_SUCCESS = '[FindStores] Find All Stores Success';

export class FindStores implements Action {
  readonly type = FIND_STORES;
  constructor(
    public payload: { queryText: string; longitudeLatitude?: number[]; searchConfig?: SearchConfig }
  ) {}
}

export class FindStoresFail implements Action {
  readonly type = FIND_STORES_FAIL;
  constructor(public payload: any) {}
}

export class FindStoresSuccess implements Action {
  readonly type = FIND_STORES_SUCCESS;
  constructor(public payload: any) {}
}

export class FindAllStores implements Action {
  readonly type = FIND_ALL_STORES;
  constructor() {}
}

export class FindAllStoresFail implements Action {
  readonly type = FIND_ALL_STORES_FAIL;
  constructor(public payload: any) {}
}

export class FindAllStoresSuccess implements Action {
  readonly type = FIND_ALL_STORES_SUCCESS;
  constructor(public payload: any) {}
}

export type FindStoresAction =
  | FindStores
  | FindStoresFail
  | FindStoresSuccess
  | FindAllStores
  | FindAllStoresFail
  | FindAllStoresSuccess;
