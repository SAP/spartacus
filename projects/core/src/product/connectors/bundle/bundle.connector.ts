/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BundleAdapter } from './bundle.adapter';
import { BundleSearchParams, ProductSearchPage, SearchConfig } from '@spartacus/core';

@Injectable({
  providedIn: 'root',
})
export class BundleConnector {
  constructor(protected adapter: BundleAdapter) {}

  getAllowedProducts(
    urlParams: BundleSearchParams,
    query: string | undefined,
    searchConfig?: SearchConfig
  ): Observable<ProductSearchPage> {
    return this.adapter.getAllowedProducts(urlParams, query, searchConfig);
  }
}
