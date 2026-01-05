/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CartGuestUser } from '@spartacus/cart/base/root';
import { Observable } from 'rxjs';

export abstract class CartGuestUserAdapter {
  /**
   * Abstract method used to create a guest user, and assigns the user to the cart.
   *
   * @param {string} userId
   * @param {string} cartId
   * @param {CartGuestUser} guestUserDetails
   *
   */
  abstract createCartGuestUser(
    userId: string,
    cartId: string,
    guestUserDetails?: CartGuestUser
  ): Observable<CartGuestUser>;

  /**
   * Abstract method used to update a guest user, and assigns the user to the cart.
   *
   * @param {string} userId
   * @param {string} cartId
   * @param {CartGuestUser} guestUserDetails
   *
   */
  abstract updateCartGuestUser(
    userId: string,
    cartId: string,
    guestUserDetails: CartGuestUser
  ): Observable<CartGuestUser>;
}
