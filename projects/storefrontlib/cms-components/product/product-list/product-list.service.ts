/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProductListService {
  shouldHideAddToCartButton(product: any): boolean {
    return !product.price || product.purchasable === false;
  }
}
