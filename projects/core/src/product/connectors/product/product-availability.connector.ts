/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductAvailabilities } from '../../../model/product.model';
import { ProductAvailabilityAdapter } from './prduct-availability.adapter';

@Injectable({
  providedIn: 'root',
})
export class ProductAvailabilityConnector {
  constructor(protected adapter: ProductAvailabilityAdapter) {}

  /**
   * Gets real-time stock for one or more product-unit pairs.
   * @param productUnitPairs Array of { productCode, unitCode }
   */
  getRealTimeStock(
    productUnitPairs: { productCode: string; unitCode: string }[]
  ): Observable<ProductAvailabilities> {
    return this.adapter.loadRealTimeStock(productUnitPairs);
  }
}
