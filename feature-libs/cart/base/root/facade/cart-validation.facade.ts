/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { facadeFactory } from '@spartacus/core';
import { Observable } from 'rxjs';
import { CART_BASE_CORE_FEATURE } from '../feature-name';
import { CartModification, CartModificationList } from '../models/cart.model';

@Injectable({
  providedIn: 'root',
  useFactory: () =>
    facadeFactory({
      facade: CartValidationFacade,
      feature: CART_BASE_CORE_FEATURE,
      methods: ['validateCart', 'getValidationResults'],
    }),
})
export abstract class CartValidationFacade {
  /**
   * Validates cart, and returns cart modification list.
   */
  abstract validateCart(): Observable<CartModificationList>;

  /**
   * Returns cart modification results
   */
  abstract getValidationResults(): Observable<CartModification[]>;
}
