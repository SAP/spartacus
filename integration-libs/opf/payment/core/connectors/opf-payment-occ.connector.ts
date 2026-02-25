/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Cart } from '@spartacus/cart/base/root';
import { OpfPaymentOccAdapter } from './opf-payment-occ.adapter';

/**
 * This connector communicates with the OCC layer
 * to perform payment-related operations for a cart in SAP Commerce.
 * It acts as a bridge between Spartacus frontend and the backend OCC API
 * specifically for setting payment options on a cart.
 */
@Injectable()
export class OpfPaymentOccConnector {
  protected adapter = inject(OpfPaymentOccAdapter);

  public setCartPaymentOption(
    userId: string,
    cartId: string,
    sapPaymentOptionId: string,
    purchaseOrderNumber?: string
  ): Observable<Cart> {
    return this.adapter.setCartPaymentOption(
      userId,
      cartId,
      sapPaymentOptionId,
      purchaseOrderNumber
    );
  }
}
