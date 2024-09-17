/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { facadeFactory } from '@spartacus/core';
import { Observable } from 'rxjs';
import { CART_BASE_CORE_FEATURE } from '../feature-name';

@Injectable({
  providedIn: 'root',
  useFactory: () =>
    facadeFactory({
      facade: CartAccessCodeFacade,
      feature: CART_BASE_CORE_FEATURE,
      methods: ['getCartAccessCode'],
    }),
})
export abstract class CartAccessCodeFacade {
  /**
   * Generates an access code for a specified cart.
   */
  abstract getCartAccessCode(
    userId: string,
    cartId: string
  ): Observable<string | undefined | any>;
}
