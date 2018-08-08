import { Action } from '@ngrx/store';
import { SearchConfig } from '../../search-config';

export const FIND_STORES = '[FindStores] Find Stores';
export const FIND_STORES_FAIL = '[FindStores] Find Stores Fail';
export const FIND_STORES_SUCCESS = '[FindStores] Find Stores Success';

export class FindStores implements Action {
  readonly type = FIND_STORES;
  constructor(
    public payload: { queryText: string; searchConfig?: SearchConfig }
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

export type FindStoresAction = FindStores | FindStoresFail | FindStoresSuccess;
