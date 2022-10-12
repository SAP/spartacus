/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { StateUtils } from '@spartacus/core';
import { AsmCustomer360Response } from '@spartacus/asm/root';

import { AsmUi, CustomerSearchPage } from '../models/asm.models';

export const ASM_FEATURE = 'asm';
export const CUSTOMER_SEARCH_DATA = '[asm] Customer search data';
export const CUSTOMER_360_DATA = '[asm] Customer 360 data';
export const CUSTOMER_LIST_CUSTOMERS_SEARCH_DATA =
  '[asm] Customer list customers search data';

export interface StateWithAsm {
  [ASM_FEATURE]: AsmState;
}

export interface AsmState {
  customerSearchResult: StateUtils.LoaderState<CustomerSearchPage>;
  customer360Response: StateUtils.LoaderState<AsmCustomer360Response>;
  customerListCustomersSearchResult: StateUtils.LoaderState<CustomerSearchPage>;
  asmUi: AsmUi;
}
