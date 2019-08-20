import { Action } from '@ngrx/store';

export const CUSTOMER_SEARCH = '[Asm] Customer Search';
export const CUSTOMER_SEARCH_FAIL = '[Asm] Customer Search Fail';
export const CUSTOMER_SEARCH_SUCCESS = '[Asm] Customer Search Success';

export class CustomerSearch implements Action {
  readonly type = CUSTOMER_SEARCH;
  constructor(public payload: { searchTerm: string }) {}
}

export class CustomerSearchFail implements Action {
  readonly type = CUSTOMER_SEARCH_FAIL;
  constructor(public payload: any) {}
}

export class CustomerSearchSuccess implements Action {
  readonly type = CUSTOMER_SEARCH_SUCCESS;
  constructor(public payload: any) {}
}
// action types
export type CustomerAction =
  | CustomerSearch
  | CustomerSearchFail
  | CustomerSearchSuccess;
