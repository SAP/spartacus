/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Cart } from '@spartacus/cart/base/root';
import { OpfPaymentOccAdapter } from './opf-payment-occ.adapter';

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
