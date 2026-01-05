/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Order } from '@spartacus/order/root';
import { Observable } from 'rxjs';

export abstract class OrderAdapter {
  /**
   * Abstract method used to place an order.
   *
   * @param userId The `userId` for given user
   * @param cartId The `cartId` for cart used for placing order
   * @param termsChecked The `boolean value` whether the terms were accepted or not
   */
  abstract placeOrder(
    userId: string,
    cartId: string,
    termsChecked: boolean
  ): Observable<Order>;

  /**
   * Abstract method used to place an order with previous payment authorization.
   *
   * @param userId The `userId` for given user
   * @param cartId The `cartId` for cart used for placing order
   * @param termsChecked The `boolean value` whether the terms were accepted or not
   */
  abstract placePaymentAuthorizedOrder(
    userId: string,
    cartId: string,
    termsChecked: boolean
  ): Observable<Order>;
}
