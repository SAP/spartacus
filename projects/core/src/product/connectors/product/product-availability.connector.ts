/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductAvailabilities } from '../../../model/product.model';
import { ProductAvailabilityAdapter } from './prduct-availability.adapter';

@Injectable({
  providedIn: 'root',
})
export class ProductAvailabilityConnector {
  protected adapter = inject(ProductAvailabilityAdapter);

  /** Inserted by Angular inject() migration for backwards compatibility */
  constructor(...args: unknown[]);

  constructor() {}

  getRealTimeStock(
    productCode: string,
    unitSapCode: string
  ): Observable<ProductAvailabilities> {
    return this.adapter.loadRealTimeStock(productCode, unitSapCode);
  }
}
