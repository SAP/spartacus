/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { InjectionToken } from '@angular/core';
import { CustomerListsPage, CustomerSearchPage } from '@spartacus/asm/root';
import { Converter } from '@spartacus/core';

export const CUSTOMER_SEARCH_PAGE_NORMALIZER = new InjectionToken<
  Converter<any, CustomerSearchPage>
>('CustomerSearchPageNormalizer');

export const CUSTOMER_LISTS_NORMALIZER = new InjectionToken<
  Converter<any, CustomerListsPage>
>('CustomerListsNormalizer');
