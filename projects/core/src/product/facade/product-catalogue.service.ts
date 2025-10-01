/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { Product } from '@spartacus/core';

@Injectable({
  providedIn: 'root',
})
export class ProductCatalogueService {
  /**
   * Returns whether product is present in commerce product catalogue.
   * Method is meant to be overridden by other integration specific implementations.
   *
   * @param product product to check
   * @return true if product is present in catalogue, false otherwise
   */
  isProductInCatalogue(product?: Product): boolean {
    return !!product;
  }
}
