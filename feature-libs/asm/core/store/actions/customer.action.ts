/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  AsmCustomer360Request,
  AsmCustomer360Response,
} from '@spartacus/asm/root';
import { StateUtils } from '@spartacus/core';
import {
  CustomerSearchOptions,
  CustomerSearchPage,
} from '../../models/asm.models';
import {
  CUSTOMER_360_DATA,
  CUSTOMER_LIST_CUSTOMERS_SEARCH_DATA,
  CUSTOMER_SEARCH_DATA,
} from '../asm-state';

export const CUSTOMER_SEARCH = '[Asm] Customer Search';
export const CUSTOMER_SEARCH_FAIL = '[Asm] Customer Search Fail';
export const CUSTOMER_SEARCH_SUCCESS = '[Asm] Customer Search Success';
export const CUSTOMER_SEARCH_RESET = '[Asm] Customer Search Reset';

export const CUSTOMER_LIST_CUSTOMERS_SEARCH =
  '[Asm] Customer List Customers Search';
export const CUSTOMER_LIST_CUSTOMERS_SEARCH_FAIL =
  '[Asm] Customer List Customers Search Fail';
export const CUSTOMER_LIST_CUSTOMERS_SEARCH_SUCCESS =
  '[Asm] Customer List Customers Search Success';
export const CUSTOMER_LIST_CUSTOMERS_SEARCH_RESET =
  '[Asm] Customer List Customers Search Reset';

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

export class CustomerListCustomersSearch extends StateUtils.LoaderLoadAction {
  readonly type = CUSTOMER_LIST_CUSTOMERS_SEARCH;
  constructor(public payload: CustomerSearchOptions) {
    super(CUSTOMER_LIST_CUSTOMERS_SEARCH_DATA);
  }
}

export class CustomerListCustomersSearchFail extends StateUtils.LoaderFailAction {
  readonly type = CUSTOMER_LIST_CUSTOMERS_SEARCH_FAIL;
  constructor(public payload: any) {
    super(CUSTOMER_LIST_CUSTOMERS_SEARCH_DATA);
  }
}

export class CustomerListCustomersSearchSuccess extends StateUtils.LoaderSuccessAction {
  readonly type = CUSTOMER_LIST_CUSTOMERS_SEARCH_SUCCESS;
  constructor(public payload: CustomerSearchPage) {
    super(CUSTOMER_LIST_CUSTOMERS_SEARCH_DATA);
  }
}

export class CustomerListCustomersSearchReset extends StateUtils.LoaderResetAction {
  readonly type = CUSTOMER_LIST_CUSTOMERS_SEARCH_RESET;
  constructor() {
    super(CUSTOMER_LIST_CUSTOMERS_SEARCH_DATA);
  }
}

export class Customer360Get extends StateUtils.LoaderLoadAction {
  readonly type = CUSTOMER_360_GET;
  constructor(public payload: AsmCustomer360Request) {
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
  | CustomerListCustomersSearch
  | CustomerListCustomersSearchFail
  | CustomerListCustomersSearchSuccess
  | CustomerListCustomersSearchReset
  | Customer360Get
  | Customer360GetFail
  | Customer360GetSuccess
  | Customer360GetReset;
