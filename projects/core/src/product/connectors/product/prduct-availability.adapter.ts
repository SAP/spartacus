/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Observable } from 'rxjs';
import { ProductAvailabilities } from '../../../model/product.model';

export abstract class ProductAvailabilityAdapter {
  /**
   * Abstract method used to load real time stock data
   * for one or more product/unit combinations.
   *
   * @param productUnitPairs Array of { productCode, unitCode } pairs
   * @returns Observable<ProductAvailabilities>
   */
  abstract loadRealTimeStock(
    productUnitPairs: { productCode: string; unitCode: string }[]
  ): Observable<ProductAvailabilities>;
}
