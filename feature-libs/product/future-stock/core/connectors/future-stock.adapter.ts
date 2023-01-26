/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Observable } from 'rxjs';
import {
  ProductFutureStock,
  ProductFutureStockList,
} from '../model/future-stock.model';

export abstract class FutureStockAdapter {
  /**
   *
   * Abstract method used to get the future product availability for the specified product
   */
  abstract getFutureStock(
    userId: string,
    productCode: string
  ): Observable<ProductFutureStock>;
  /**
   *
   * Abstract method  used to get the future product availability for the list of specified products
   */
  abstract getFutureStocks(
    userId: string,
    productCodes: string
  ): Observable<ProductFutureStockList>;
}
