/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CartModification } from '@spartacus/cart/base/root';
import { Observable } from 'rxjs';

export abstract class CartEntryAdapter {
  /**
   * Abstract method used to add entry to cart
   *
   * @param userId
   * @param cartId
   * @param productCode
   * @param quantity
   * @param pickupStore
   */
  abstract add(
    userId: string,
    cartId: string,
    productCode: string,
    quantity?: number,
    pickupStore?: string
  ): Observable<CartModification>;

  /**
   * Abstract method used to update entry in cart
   * @param userId
   * @param cartId
   * @param entryNumber
   * @param qty
   * @param pickupStore
   */
  abstract update(
    userId: string,
    cartId: string,
    entryNumber: string,
    qty?: number,
    pickupStore?: string,
    pickupToDelivery?: boolean
  ): Observable<CartModification>;

  /**
   * Abstract method used to remove entry from cart
   *
   * @param userId
   * @param cartId
   * @param entryNumber
   */
  abstract remove(
    userId: string,
    cartId: string,
    entryNumber: string
  ): Observable<any>;
}
