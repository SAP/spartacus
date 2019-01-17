import { Action } from '@ngrx/store';

export const VIEW_ALL_STORES = '[StoreFinder] View All Stores';
export const VIEW_ALL_STORES_FAIL = '[StoreFinder] View All Stores Fail';
export const VIEW_ALL_STORES_SUCCESS = '[StoreFinder] View All Stores Success';

export class ViewAllStores implements Action {
  readonly type = VIEW_ALL_STORES;
  constructor() {}
}

export class ViewAllStoresFail implements Action {
  readonly type = VIEW_ALL_STORES_FAIL;
  constructor(public payload: any) {}
}

export class ViewAllStoresSuccess implements Action {
  readonly type = VIEW_ALL_STORES_SUCCESS;
  constructor(public payload: any) {}
}

export type ViewAllStoresAction =
  | ViewAllStores
  | ViewAllStoresFail
  | ViewAllStoresSuccess;
