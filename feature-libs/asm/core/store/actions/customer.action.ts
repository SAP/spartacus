/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CustomerSearchOptions, CustomerSearchPage } from '@spartacus/asm/root';
import { ErrorActionType, StateUtils } from '@spartacus/core';
import {
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

export class CustomerSearch extends StateUtils.LoaderLoadAction {
  readonly type = CUSTOMER_SEARCH;
  constructor(public payload: CustomerSearchOptions) {
    super(CUSTOMER_SEARCH_DATA);
  }
}

// possible ways of handling breaking changes in ALL actions:
// - introduce CustomerSearchFailV2 and deprecate old class
// - overload the constructor of CustomerSearchFail and handle the change there together with deprecating he old one

export class CustomerSearchFail extends StateUtils.LoaderFailAction {
  readonly type = CUSTOMER_SEARCH_FAIL;
  constructor(error: ErrorActionType);
  /**
   * @deprecated please use constructor(error: ErrorActionType) instead
   */
  //eslint-disable-next-line @typescript-eslint/unified-signatures
  constructor(error: any);
  constructor(public error: ErrorActionType) {
    //do we consider changes in NgRx as breaking? if so, we  should handle it (somehow)
    super(CUSTOMER_SEARCH_DATA, error);
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
  constructor(payload: ErrorActionType);
  /**
   * @deprecated please use constructor(payload: ErrorActionType) instead
   */
  //eslint-disable-next-line @typescript-eslint/unified-signatures
  constructor(payload: any);
  constructor(public payload: ErrorActionType) {
    super(CUSTOMER_LIST_CUSTOMERS_SEARCH_DATA, payload);
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

// action types
export type CustomerAction =
  | CustomerSearch
  | CustomerSearchFail
  | CustomerSearchSuccess
  | CustomerSearchReset
  | CustomerListCustomersSearch
  | CustomerListCustomersSearchFail
  | CustomerListCustomersSearchSuccess
  | CustomerListCustomersSearchReset;
