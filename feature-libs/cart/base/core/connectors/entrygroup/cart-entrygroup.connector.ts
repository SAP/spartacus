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
    entryGroupNumber: string
  ): Observable<any> {
    return this.adapter.remove(userId, cartId, entryGroupNumber);
  }
}
