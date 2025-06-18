/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Observable } from 'rxjs';
import { CartUserEmailResponse } from '../model';

export abstract class OpfCheckoutAdapter {
  /**
   * Abstract method to retrieve the email associated with a specific cart for a given user.
   * Implementations of this method should handle fetching the cart user's email from an API or service.
   *
   * @abstract
   * @param {string} userId - The unique identifier of the user.
   * @param {string} cartId - The unique identifier of the cart.
   * @returns {Observable<CartUserEmailResponse>} - An observable containing the cart user email response.
   */
  abstract getCartUserEmail(
    userId: string,
    cartId: string
  ): Observable<CartUserEmailResponse>;
}
