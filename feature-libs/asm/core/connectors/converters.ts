/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { InjectionToken } from '@angular/core';
import { CustomerListsPage } from '@spartacus/asm/root';
import { Converter } from '@spartacus/core';
import { CustomerSearchPage } from '../models/asm.models';

export const CUSTOMER_SEARCH_PAGE_NORMALIZER = new InjectionToken<
  Converter<any, CustomerSearchPage>
>('CustomerSearchPageNormalizer');

export const CUSTOMER_LISTS_NORMALIZER = new InjectionToken<
  Converter<any, CustomerListsPage>
>('CustomerListsNormalizer');
