/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  OccEndpointsService,
  Stock,
  StoreFinderStockSearchPage,
} from '@spartacus/core';
import { StockAdapter } from '@spartacus/pickup-in-store/base/core';
import { LocationSearchParams } from '@spartacus/pickup-in-store/base/root';
import { Observable } from 'rxjs';

/**
 * Adapter for finding stock levels of a product in stores from the OCC APIs.
 */
@Injectable()
export class OccStockAdapter implements StockAdapter {
  constructor(
    protected http: HttpClient,
    protected occEndpointsService: OccEndpointsService
  ) {
    // Intentional empty constructor
  }

  loadStockLevels(
    productCode: string,
    location: LocationSearchParams
  ): Observable<StoreFinderStockSearchPage> {
    return this.http.get<StoreFinderStockSearchPage>(
      this.occEndpointsService.buildUrl('stock', {
        urlParams: { productCode },
        queryParams: { ...location, fields: 'FULL' },
      })
    );
  }

  loadStockLevelAtStore(
    productCode: string,
    storeName: string
  ): Observable<Stock> {
    return this.http.get<Stock>(
      this.occEndpointsService.buildUrl('stockAtStore', {
        urlParams: { productCode, storeName },
      })
    );
  }
}
