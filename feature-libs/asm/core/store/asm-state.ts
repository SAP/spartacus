/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { AsmUi, CustomerSearchPage } from '@spartacus/asm/root';
import { StateUtils } from '@spartacus/core';

export const ASM_FEATURE = 'asm';
export const CUSTOMER_SEARCH_DATA = '[asm] Customer search data';
export const CUSTOMER_LIST_CUSTOMERS_SEARCH_DATA =
  '[asm] Customer list customers search data';

export interface StateWithAsm {
  [ASM_FEATURE]: AsmState;
}

export interface AsmState {
  customerSearchResult: StateUtils.LoaderState<CustomerSearchPage>;
  customerListCustomersSearchResult: StateUtils.LoaderState<CustomerSearchPage>;
  asmUi: AsmUi;
}
