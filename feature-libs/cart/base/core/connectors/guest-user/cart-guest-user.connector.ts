/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, inject } from '@angular/core';
import { CartGuestUser } from '@spartacus/cart/base/root';
import { Observable } from 'rxjs';
import { CartGuestUserAdapter } from './cart-guest-user.adapter';

@Injectable()
export class CartGuestUserConnector {
  protected adapter = inject(CartGuestUserAdapter);

  public createCartGuestUser(
    userId: string,
    cartId: string,
    guestUserDetails?: CartGuestUser
  ): Observable<CartGuestUser> {
    return this.adapter.createCartGuestUser(userId, cartId, guestUserDetails);
  }

  public updateCartGuestUser(
    userId: string,
    cartId: string,
    guestUserDetails: CartGuestUser
  ): Observable<CartGuestUser> {
    return this.adapter.updateCartGuestUser(userId, cartId, guestUserDetails);
  }
}
