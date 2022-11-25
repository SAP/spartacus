/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { CartEntryGroupAdapter } from './cart-entry-group.adapter';
import { CartModification, OrderEntry } from '@spartacus/cart/base/root';

@Injectable({
  providedIn: 'root',
})
export class CartEntryGroupConnector {
  constructor(protected adapter: CartEntryGroupAdapter) {}

  /**
   * Adds a product to a cart entry group.
   *
   * @param userId
   * User identifier or one of the literals : ‘current’ for currently authenticated user, ‘anonymous’ for anonymous user.
   *
   * @param cartId
   * Cart code for logged in user, cart guid for anonymous user, ‘current’ for the last modified cart
   *
   * @param entryGroupNumber
   * Each entry group in a cart has a specific entry group number. Entry group numbers are integers starting at one. They are defined in ascending order.
   *
   * @param entry
   * Request body parameter that contains details such as the product code (product.code) and the quantity of product (quantity).
   */
  public addToEntryGroup(
    userId: string,
    cartId: string,
    entryGroupNumber: number,
    entry: OrderEntry
  ): Observable<CartModification> {
    return this.adapter.addToEntryGroup(
      userId,
      cartId,
      entryGroupNumber,
      entry
    );
  }

  /**
   * Removes an entry group from an associated cart. The entry group is identified by an entryGroupNumber. The cart is identified by the cartId.
   *
   * @param userId
   * User identifier or one of the literals : ‘current’ for currently authenticated user, ‘anonymous’ for anonymous user.
   *
   * @param cartId
   * Cart code for logged in user, cart guid for anonymous user, ‘current’ for the last modified cart
   *
   * @param entryGroupNumber
   * Each entry group in a cart has a specific entry group number. Entry group numbers are integers starting at one. They are defined in ascending order.
   */
  public removeEntryGroup(
    userId: string,
    cartId: string,
    entryGroupNumber: number
  ): Observable<CartModification> {
    return this.adapter.removeEntryGroup(userId, cartId, entryGroupNumber);
  }
}
