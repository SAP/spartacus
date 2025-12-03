/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CustomerSearchOptions, CustomerSearchPage } from '@spartacus/asm/root';
import { ErrorAction, StateUtils } from '@spartacus/core';
import {
  CUSTOMER_LIST_CUSTOMERS_SEARCH_DATA,
  CUSTOMER_SEARCH_DATA,
} from '../asm-state';

export const CUSTOMER_SEARCH = '[Asm] Customer Search';
export const CUSTOMER_SEARCH_FAIL = '[Asm] Customer Search Fail';
export const CUSTOMER_SEARCH_SUCCESS = '[Asm] Customer Search Success';
export const CUSTOMER_SEARCH_RESET = '[Asm] Customer Search Reset';
export const ASSISTED_SESSION_REGISTRATION_START = '[Asm] Assisted Session Registration Start';
export const ASSISTED_SESSION_REGISTRATION_START_FAIL = '[Asm] Assisted Session Registration Start Fail';
export const ASSISTED_SESSION_REGISTRATION_START_SUCCESS = '[Asm] Assisted Session Registration Start Success';

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

export class CustomerSearchFail
  extends StateUtils.LoaderFailAction
  implements ErrorAction
{
  readonly type = CUSTOMER_SEARCH_FAIL;
  constructor(public payload: any) {
    super(CUSTOMER_SEARCH_DATA, payload);
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

export class CustomerListCustomersSearchFail
  extends StateUtils.LoaderFailAction
  implements ErrorAction
{
  readonly type = CUSTOMER_LIST_CUSTOMERS_SEARCH_FAIL;
  constructor(public payload: any) {
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

export class AssistedSessionRegistrationStart extends StateUtils.LoaderLoadAction {
  readonly type = ASSISTED_SESSION_REGISTRATION_START;
  constructor() {
    super(ASSISTED_SESSION_REGISTRATION_START);
  }
}

export class AssistedSessionRegistrationFail
  extends StateUtils.LoaderFailAction
  implements ErrorAction
{
  readonly type = ASSISTED_SESSION_REGISTRATION_START_FAIL;
  constructor(public payload: any) {
    super(ASSISTED_SESSION_REGISTRATION_START_FAIL, payload);
  }
}

export class AssistedSessionRegistrationSuccess extends StateUtils.LoaderSuccessAction {
  readonly type = ASSISTED_SESSION_REGISTRATION_START_SUCCESS;
  constructor() {
    super(ASSISTED_SESSION_REGISTRATION_START_SUCCESS);
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
  | AssistedSessionRegistrationStart
  | AssistedSessionRegistrationFail
  | AssistedSessionRegistrationSuccess;
