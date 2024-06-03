/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Cart } from '@spartacus/cart/base/root';
import { Observable } from 'rxjs';

export abstract class CheckoutCostCenterAdapter {
  /**
   * Abstract method used to set cost center to cart
   *
   * @param userId: user id
   * @param cartId: cart id
   * @param costCenterId: cost center id
   */
  abstract setCostCenter(
    userId: string,
    cartId: string,
    costCenterId: string
  ): Observable<Cart>;
}
