/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, inject } from '@angular/core';
import { ProductDetailQuantityService } from '@spartacus/core';
import { Observable } from 'rxjs';

/**
 * Cart-facing facade for the PDP quantity counter on the product detail page.
 *
 * Delegates to {@link ProductDetailQuantityService} in `@spartacus/core`.
 * Prefer {@link ProductDetailQuantityService} for new features that are not
 * cart-specific (for example product configurator or OPF Quick Buy via this
 * service remains valid for backward compatibility).
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
