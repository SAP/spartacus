import { StateUtils } from '@spartacus/core';
import {
  CustomerListsPage,
  CustomerSearchOptions,
  CustomerSearchPage,
} from '@spartacus/asm/root';
import { CUSTOMER_SEARCH_DATA } from '../asm-state';

export const CUSTOMER_SEARCH = '[Asm] Customer Search';
export const CUSTOMER_SEARCH_FAIL = '[Asm] Customer Search Fail';
export const CUSTOMER_SEARCH_SUCCESS = '[Asm] Customer Search Success';
export const CUSTOMER_SEARCH_RESET = '[Asm] Customer Search Reset';

export const CUSTOMER_LISTS = '[Asm] Customer Lists';
export const CUSTOMER_LISTS_FAIL = '[Asm] Customer Lists Fail';
export const CUSTOMER_LISTS_SUCCESS = '[Asm] Customer Lists Success';

export class CustomerLists extends StateUtils.LoaderResetAction {
  readonly type = CUSTOMER_LISTS;
  constructor() {
    super(CUSTOMER_SEARCH_DATA);
  }
}

export class CustomerListsFail extends StateUtils.LoaderFailAction {
  readonly type = CUSTOMER_LISTS_FAIL;
  constructor(public payload: any) {
    super(CUSTOMER_SEARCH_DATA);
  }
}

export class CustomerListsSuccess extends StateUtils.LoaderSuccessAction {
  readonly type = CUSTOMER_LISTS_SUCCESS;
  constructor(public payload: CustomerListsPage) {
    super(CUSTOMER_SEARCH_DATA);
  }
}

export class CustomerSearch extends StateUtils.LoaderLoadAction {
  readonly type = CUSTOMER_SEARCH;
  constructor(public payload: CustomerSearchOptions) {
    super(CUSTOMER_SEARCH_DATA);
  }
}

export class CustomerSearchFail extends StateUtils.LoaderFailAction {
  readonly type = CUSTOMER_SEARCH_FAIL;
  constructor(public payload: any) {
    super(CUSTOMER_SEARCH_DATA);
  }
}

export class CustomerSearchSuccess extends StateUtils.LoaderSuccessAction {
  readonly type = CUSTOMER_SEARCH_SUCCESS;
  constructor(public payload: CustomerSearchPage) {
    super(CUSTOMER_SEARCH_DATA);
  }
}

export class CustomerSearchReset extends StateUtils.LoaderResetAction {
  readonly type = CUSTOMER_SEARCH_RESET;
  constructor() {
    super(CUSTOMER_SEARCH_DATA);
  }
}

// action types
export type CustomerAction =
  | CustomerSearch
  | CustomerSearchFail
  | CustomerSearchSuccess
  | CustomerSearchReset
  | CustomerLists
  | CustomerListsFail
  | CustomerListsSuccess;
