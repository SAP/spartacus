/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Order } from '@spartacus/order/root';
import { Observable } from 'rxjs';

export abstract class OpfOrderAdapter {
  /**
   * Abstract method used to place an order.
   *
   * @param userId The `userId` for given user
   * @param cartId The `cartId` for cart used for placing order
   * @param termsChecked The `boolean value` whether the terms were accepted or not
   */
  abstract placeOpfOrder(
    userId: string,
    cartId: string,
    termsChecked: boolean
  ): Observable<Order>;
}
