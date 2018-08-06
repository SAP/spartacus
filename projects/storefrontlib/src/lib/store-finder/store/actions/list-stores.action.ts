import { Action } from '@ngrx/store';

export const LIST_STORES = '[ListStores] List Stores';
export const LIST_STORES_FAIL = '[ListStores] List Stores Fail';
export const LIST_STORES_SUCCESS = '[ListStores] List Stores Success';

export class ListStores implements Action {
  readonly type = LIST_STORES;
  constructor(public payload: any) {}
}

export class ListStoresFail implements Action {
  readonly type = LIST_STORES_FAIL;
  constructor(public payload: any) {}
}

export class ListStoresSuccess implements Action {
  readonly type = LIST_STORES_SUCCESS;
  constructor(public payload: any) {}
}

export type ListStoresAction = ListStores | ListStoresFail | ListStoresSuccess;
