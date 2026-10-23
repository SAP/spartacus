/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, inject } from '@angular/core';
import { ProductDetailQuantityService } from '@spartacus/core';
import { Observable } from 'rxjs';

/**
 * Holds the quantity currently selected by the user in the add-to-cart
 * quantity counter on the Product Detail Page.
 *
 * Delegates to {@link ProductDetailQuantityService} so other features can reuse
 * the same quantity without depending on the cart library.
 */
@Injectable({
  providedIn: 'root',
})
export class CartItemQuantityService {
  protected productDetailQuantityService = inject(ProductDetailQuantityService);

  /**
   * Sets the currently selected quantity.
   */
  setQuantity(quantity: number): void {
    this.productDetailQuantityService.setQuantity(quantity);
  }

  /**
   * Emits the currently selected quantity.
   */
  getQuantity(): Observable<number> {
    return this.productDetailQuantityService.getQuantity();
  }

  /**
   * Resets the selected quantity to the default value of 1.
   */
  reset(): void {
    this.productDetailQuantityService.reset();
  }
}
