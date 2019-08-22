import { Action } from '@ngrx/store';
import { CustomerSearchPage, CustomerSearchOptions } from '../../models/asm.models';

export const CUSTOMER_SEARCH = '[Asm] Customer Search';
export const CUSTOMER_SEARCH_FAIL = '[Asm] Customer Search Fail';
export const CUSTOMER_SEARCH_SUCCESS = '[Asm] Customer Search Success';
export const CUSTOMER_SEARCH_RESET = '[Asm] Customer Search Reset';

export class CustomerSearch implements Action {
  readonly type = CUSTOMER_SEARCH;
  constructor(public payload: CustomerSearchOptions) {}
}

export class CustomerSearchFail implements Action {
  readonly type = CUSTOMER_SEARCH_FAIL;
  constructor(public payload: any) {}
}

export class CustomerSearchSuccess implements Action {
  readonly type = CUSTOMER_SEARCH_SUCCESS;
  constructor(public payload: CustomerSearchPage) {}
}

export class CustomerSearchReset implements Action {
  readonly type = CUSTOMER_SEARCH_RESET;
  constructor() {}
}

// action types
export type CustomerAction =
  | CustomerSearch
  | CustomerSearchFail
  | CustomerSearchSuccess
  | CustomerSearchReset;
