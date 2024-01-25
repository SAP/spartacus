/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CheckoutState } from '@spartacus/checkout/base/root';
import { Observable } from 'rxjs';

export abstract class CheckoutAdapter {
  /**
   * Abstract method used to get checkout details
   *
   * @param userId
   * @param cartId
   */
  abstract getCheckoutDetails(
    userId: string,
    cartId: string
  ): Observable<CheckoutState>;
}
