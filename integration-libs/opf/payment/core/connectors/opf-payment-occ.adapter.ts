/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Cart } from '@spartacus/cart/base/root';
import { Observable } from 'rxjs';

export abstract class OpfPaymentOccAdapter {
  /**
   * Abstract method used to set payment option.
   *
   */
  abstract setCartPaymentOption(
    userId: string,
    cartId: string,
    sapPaymentOptionId: string,
    purchaseOrderNumber?: string
  ): Observable<Cart>;
}
