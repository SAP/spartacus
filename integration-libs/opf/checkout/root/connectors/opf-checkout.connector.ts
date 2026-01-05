/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { CartUserEmailResponse } from '../model';
import { OpfCheckoutAdapter } from './opf-checkout.adapter';

@Injectable()
export class OpfCheckoutConnector {
  protected adapter = inject(OpfCheckoutAdapter);

  /**
   * Retrieves the email associated with a specific cart for a given user.
   * Delegates the request to the underlying adapter.
   *
   * @param {string} userId - The unique identifier of the user.
   * @param {string} cartId - The unique identifier of the cart.
   * @returns {Observable<CartUserEmailResponse>} - An observable containing the cart user email response.
   */
  getCartUserEmail(
    userId: string,
    cartId: string
  ): Observable<CartUserEmailResponse> {
    return this.adapter.getCartUserEmail(userId, cartId);
  }
}
