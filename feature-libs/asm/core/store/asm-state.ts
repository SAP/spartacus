/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { StateUtils } from '@spartacus/core';
import { AsmUi, CustomerSearchPage } from '../models/asm.models';

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
