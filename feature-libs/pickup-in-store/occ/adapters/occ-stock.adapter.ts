/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {
  LoggerService,
  normalizeHttpError,
  OccEndpointsService,
  Stock,
  StoreFinderStockSearchPage,
} from '@spartacus/core';
import { StockAdapter } from '@spartacus/pickup-in-store/core';
import { LocationSearchParams } from '@spartacus/pickup-in-store/root';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

/**
 * Adapter for finding stock levels of a product in stores from the OCC APIs.
 */
@Injectable()
export class OccStockAdapter implements StockAdapter {
  protected logger = inject(LoggerService);

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
    return this.http
      .get<StoreFinderStockSearchPage>(
        this.occEndpointsService.buildUrl('stock', {
          urlParams: { productCode },
          queryParams: { ...location, fields: 'FULL' },
        })
      )
      .pipe(
        catchError((error: any) =>
          throwError(normalizeHttpError(error, this.logger))
        )
      );
  }

  loadStockLevelAtStore(
    productCode: string,
    storeName: string
  ): Observable<Stock> {
    return this.http
      .get<Stock>(
        this.occEndpointsService.buildUrl('stockAtStore', {
          urlParams: { productCode, storeName },
        })
      )
      .pipe(
        catchError((error: any) =>
          throwError(normalizeHttpError(error, this.logger))
        )
      );
  }
}
