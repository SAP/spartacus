/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CartModificationList } from '@spartacus/cart/base/root';
import { Observable } from 'rxjs';

export abstract class ReorderOrderAdapter {
  /**
   * Abstract method used to reorder an order.
   *
   * @param orderId The `orderId` of an existing order to update the cart
   * @param userId The `userId` for given user
   */
  abstract reorder(
    orderId: string,
    userId: string
  ): Observable<CartModificationList>;
}
