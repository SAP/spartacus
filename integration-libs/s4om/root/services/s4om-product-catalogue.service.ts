/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { Product, ProductCatalogueService } from '@spartacus/core';

@Injectable({
  providedIn: 'root',
})
export class S4omProductCatalogueService extends ProductCatalogueService {
  readonly PRODUCT_NOT_IN_CATALOGUE_STOCK_LEVEL_STATUS = 'notOrderable';

  /**
   * Returns whether product is present in commerce product catalogue.
   * Product will have specific stock level status set if fetched from S4 but not present in sap commerce.
   *
   * @param product product to check
   * @return true if product is present in catalogue, false otherwise
   */
  isProductInCatalogue(product?: Product): boolean {
    if (!product) {
      return false;
    }

    const stockLevelStatus = product?.stock?.stockLevelStatus;

    if (!stockLevelStatus) {
      return true;
    }

    return (
      stockLevelStatus !== this.PRODUCT_NOT_IN_CATALOGUE_STOCK_LEVEL_STATUS
    );
  }
}
