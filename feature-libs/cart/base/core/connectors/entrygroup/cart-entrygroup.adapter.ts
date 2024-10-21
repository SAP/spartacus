/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Observable } from 'rxjs';
import { CartModification } from '@spartacus/cart/base/root';

export abstract class CartEntryGroupAdapter {
  /**
   * Abstract method used to remove entry group from cart
   *
   * @param userId
   * @param cartId
   * @param entryGroupNumber
   */
  abstract remove(
    userId: string,
    cartId: string,
    entryGroupNumber: number
  ): Observable<any>;

  /**
   * Abstract method used to add product to cart entry group
   *
   * @param userId
   * @param cartId
   * @param entryGroupNumber
   * @param productCode
   * @param quantity
   */
  abstract addTo(
    userId: string,
    cartId: string,
    entryGroupNumber: number,
    productCode: string,
    quantity?: number
  ): Observable<CartModification>;
}
