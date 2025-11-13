/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import {
  ProductFutureStock,
  ProductFutureStockList,
} from '../model/future-stock.model';
import { FutureStockAdapter } from './future-stock.adapter';

@Injectable()
export class FutureStockConnector {
  protected adapter = inject(FutureStockAdapter);

  /** Inserted by Angular inject() migration for backwards compatibility */
  constructor(...args: unknown[]);

  constructor() {}

  public getFutureStock(
    userId: string,
    productCode: string
  ): Observable<ProductFutureStock> {
    return this.adapter.getFutureStock(userId, productCode);
  }

  public getFutureStocks(
    userId: string,
    productCodes: string
  ): Observable<ProductFutureStockList> {
    return this.adapter.getFutureStocks(userId, productCodes);
  }
}
