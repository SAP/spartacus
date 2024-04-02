/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { Cart } from '@spartacus/cart/base/root';
import { Observable } from 'rxjs';
import { SavedCartAdapter } from './saved-cart.adapter';

@Injectable()
export class SavedCartConnector {
  constructor(protected adapter: SavedCartAdapter) {}

  get(userId: string, cartId: string): Observable<Cart> {
    return this.adapter.load(userId, cartId);
  }

  getList(userId: string): Observable<Cart[]> {
    return this.adapter.loadList(userId);
  }

  restoreSavedCart(userId: string, cartId: string): Observable<Cart> {
    return this.adapter.restoreSavedCart(userId, cartId);
  }

  cloneSavedCart(
    userId: string,
    cartId: string,
    saveCartName?: string
  ): Observable<Cart> {
    return this.adapter.cloneSavedCart(userId, cartId, saveCartName);
  }
}
