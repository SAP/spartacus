/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { Cart } from '@spartacus/cart/base/root';
import { Observable } from 'rxjs';
import { CartAdapter } from './cart.adapter';

@Injectable({
  providedIn: 'root',
})
export class CartConnector {
  constructor(protected adapter: CartAdapter) {}

  public loadAll(userId: string): Observable<Cart[]> {
    return this.adapter.loadAll(userId);
  }

  public load(userId: string, cartId: string): Observable<Cart | undefined> {
    return this.adapter.load(userId, cartId);
  }

  public create(
    userId: string,
    oldCartId?: string,
    toMergeCartGuid?: string
  ): Observable<Cart> {
    return this.adapter.create(userId, oldCartId, toMergeCartGuid);
  }

  public delete(userId: string, cartId: string): Observable<{}> {
    return this.adapter.delete(userId, cartId);
  }

  public save(
    userId: string,
    cartId: string,
    saveCartName?: string,
    saveCartDescription?: string
  ): Observable<Cart> {
    return this.adapter.save(userId, cartId, saveCartName, saveCartDescription);
  }

  public addEmail(
    userId: string,
    cartId: string,
    email: string
  ): Observable<{}> {
    return this.adapter.addEmail(userId, cartId, email);
  }
}
