/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { Product } from '../../model';

@Injectable({
  providedIn: 'root',
})
export class ProductCatalogService {
  /**
   * Returns whether product is present in commerce product catalog.
   *
   * @param product product to check
   * @return true if product is present in catalog, false otherwise
   */
  isProductInCatalog(product?: Product): boolean {
    return !!product;
  }
}
