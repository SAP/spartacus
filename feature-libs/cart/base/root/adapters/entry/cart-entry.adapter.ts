/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';

import { facadeFactory } from '@spartacus/core';
import { Observable } from 'rxjs';
import { CART_BASE_CORE_FEATURE } from '../../feature-name';
import { CartModification } from '../../models/cart.model';

@Injectable({
  providedIn: 'root',
  useFactory: () =>
    facadeFactory({
      facade: CartEntryAdapter,
      feature: CART_BASE_CORE_FEATURE,
      methods: ['add', 'update', 'remove'],
    }),
})
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
