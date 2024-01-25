/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Observable } from 'rxjs';

export abstract class CartVoucherAdapter {
  /**
   * Abstract method used to apply voucher to cart
   *
   * @param userId
   * @param cartId
   * @param voucherId
   */
  abstract add(
    userId: string,
    cartId: string,
    voucherId: string
  ): Observable<{}>;

  /**
   * Abstract method used to remove voucher from cart
   *
   * @param userId
   * @param cartId
   * @param voucherId
   */
  abstract remove(
    userId: string,
    cartId: string,
    voucherId: string
  ): Observable<{}>;
}
