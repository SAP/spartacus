/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CartEntryGroupAdapter } from './cart-entrygroup.adapter';

@Injectable({
  providedIn: 'root',
})
export class CartEntryGroupConnector {
  constructor(protected adapter: CartEntryGroupAdapter) {}

  public remove(
    userId: string,
    cartId: string,
    entryGroupNumber: number
  ): Observable<any> {
    return this.adapter.remove(userId, cartId, entryGroupNumber);
  }

  public addTo(
    userId: string,
    cartId: string,
    entryGroupNumber: number,
    productCode: string,
    quantity: number = 1
  ): Observable<any> {
    return this.adapter.addTo(userId, cartId, entryGroupNumber, productCode, quantity);
  }
}
