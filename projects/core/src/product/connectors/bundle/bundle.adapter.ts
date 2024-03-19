/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Observable } from 'rxjs';
import { BundleSearchParams, ProductSearchPage, SearchConfig } from '@spartacus/core';

export abstract class BundleAdapter {
  abstract getAllowedProducts(
    urlParams: BundleSearchParams,
    query: string | undefined,
    searchConfig?: SearchConfig
  ): Observable<ProductSearchPage>;
}
