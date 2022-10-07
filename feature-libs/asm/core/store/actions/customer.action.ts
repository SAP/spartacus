import {
  AsmCustomer360Params,
  AsmCustomer360Query,
  AsmCustomer360Response,
  CustomerSearchOptions,
  CustomerSearchPage,
} from '@spartacus/asm/root';
import { StateUtils } from '@spartacus/core';
import { CUSTOMER_360_DATA, CUSTOMER_SEARCH_DATA } from '../asm-state';

export const CUSTOMER_SEARCH = '[Asm] Customer Search';
export const CUSTOMER_SEARCH_FAIL = '[Asm] Customer Search Fail';
export const CUSTOMER_SEARCH_SUCCESS = '[Asm] Customer Search Success';
export const CUSTOMER_SEARCH_RESET = '[Asm] Customer Search Reset';

export const CUSTOMER_360_GET = '[Asm] Customer 360 Data Get';
export const CUSTOMER_360_GET_FAIL = '[Asm] Customer 360 Data Get Fail';
export const CUSTOMER_360_GET_SUCCESS = '[Asm] Customer 360 Data Get Success';
export const CUSTOMER_360_GET_RESET = '[Asm] Customer 360 Data Get Reset';

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

export class Customer360Get extends StateUtils.LoaderLoadAction {
  readonly type = CUSTOMER_360_GET;
  constructor(
    public payload: [Array<AsmCustomer360Query>, AsmCustomer360Params]
  ) {
    super(CUSTOMER_360_DATA);
  }
}

export class Customer360GetFail extends StateUtils.LoaderFailAction {
  readonly type = CUSTOMER_360_GET_FAIL;
  constructor(public payload: any) {
    super(CUSTOMER_360_DATA);
  }
}

export class Customer360GetSuccess extends StateUtils.LoaderSuccessAction {
  readonly type = CUSTOMER_360_GET_SUCCESS;
  constructor(public payload: AsmCustomer360Response) {
    super(CUSTOMER_360_DATA);
  }
}

export class Customer360GetReset extends StateUtils.LoaderResetAction {
  readonly type = CUSTOMER_360_GET_RESET;
  constructor() {
    super(CUSTOMER_360_DATA);
  }
}

// action types
export type CustomerAction =
  | CustomerSearch
  | CustomerSearchFail
  | CustomerSearchSuccess
  | CustomerSearchReset
  | Customer360Get
  | Customer360GetFail
  | Customer360GetSuccess
  | Customer360GetReset;
