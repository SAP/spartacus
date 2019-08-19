import { Action } from '@ngrx/store';

export const CUSTOMER_SEARCH = '[Auth] Load User Token';
export const CUSTOMER_SEARCH_FAIL = '[Auth] Load User Token Fail';
export const CUSTOMER_SEARCH_SUCCESS = '[Auth] Load User Token Success';

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
