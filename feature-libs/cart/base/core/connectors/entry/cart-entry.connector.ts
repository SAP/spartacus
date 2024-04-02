/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { CartModification } from '@spartacus/cart/base/root';
import { Observable } from 'rxjs';
import { CartEntryAdapter } from './cart-entry.adapter';

@Injectable({
  providedIn: 'root',
})
export class CartEntryConnector {
  constructor(protected adapter: CartEntryAdapter) {}

  public add(
    userId: string,
    cartId: string,
    productCode: string,
    quantity?: number,
    pickupStore?: string
  ): Observable<CartModification> {
    return this.adapter.add(userId, cartId, productCode, quantity, pickupStore);
  }

  public update(
    userId: string,
    cartId: string,
    entryNumber: string,
    qty?: number,
    pickupStore?: string,
    pickupToDelivery: boolean = false
  ): Observable<CartModification> {
    return this.adapter.update(
      userId,
      cartId,
      entryNumber,
      qty,
      pickupStore,
      pickupToDelivery
    );
  }

  public remove(
    userId: string,
    cartId: string,
    entryNumber: string
  ): Observable<any> {
    return this.adapter.remove(userId, cartId, entryNumber);
  }
}
