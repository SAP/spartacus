/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { facadeFactory } from '@spartacus/core';
import { Observable } from 'rxjs';
import { CART_BASE_CORE_FEATURE } from '../feature-name';
import { CartGuestUser } from '../models';

@Injectable({
  providedIn: 'root',
  useFactory: () =>
    facadeFactory({
      facade: CartGuestUserFacade,
      feature: CART_BASE_CORE_FEATURE,
      methods: ['createCartGuestUser', 'updateCartGuestUser'],
    }),
})
export abstract class CartGuestUserFacade {
  /**
   * Creates guest user and assigns user to the cart.
   */
  abstract createCartGuestUser(
    userId: string,
    cartId: string,
    guestUserDetails?: CartGuestUser
  ): Observable<CartGuestUser>;

  /**
   * Updates guest user details.
   */
  abstract updateCartGuestUser(
    userId: string,
    cartId: string,
    guestUserDetails: CartGuestUser
  ): Observable<CartGuestUser>;
}
