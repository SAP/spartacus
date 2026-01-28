/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { OpfCheckoutConnector } from '../connectors';

@Injectable()
/**
 * Service responsible for checking whether a cart user has a valid email.
 */
export class OpfCartUserEmailCheckerService {
  protected opfCheckoutConnector = inject(OpfCheckoutConnector);

  /**
   * Checks if the user associated with a cart has an email.
   *
   * @param {string} userId - The unique identifier of the user.
   * @param {string} cartId - The unique identifier of the cart.
   * @returns {Observable<boolean>} - An observable that emits `true` if the user has an email assigned, otherwise `false`.
   */
  isCartUserHasEmail(userId: string, cartId: string): Observable<boolean> {
    return this.opfCheckoutConnector
      .getCartUserEmail(userId, cartId)
      .pipe(map((value) => !!value.sapCustomerEmail));
  }
}
