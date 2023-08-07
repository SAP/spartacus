/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { facadeFactory } from '@spartacus/core';
import { Observable } from 'rxjs';
import { CART_BASE_CORE_FEATURE } from '../../feature-name';
import { Cart } from '../../models/cart.model';

@Injectable({
  providedIn: 'root',
  useFactory: () =>
    facadeFactory({
      facade: CartAdapter,
      feature: CART_BASE_CORE_FEATURE,
      methods: ['loadAll', 'load', 'create', 'delete', 'save', 'addEmail'],
    }),
})
export abstract class CartAdapter {
  /**
   * Abstract method used to load all carts
   *
   * @param userId
   */
  abstract loadAll(userId: string): Observable<Cart[]>;

  /**
   * Abstract method used to load cart
   *
   * @param userId
   * @param cartId
   */
  abstract load(userId: string, cartId: string): Observable<Cart | undefined>;

  /**
   * Abstract method used to create cart. If toMergeCartGuid is specified, cart will be merged with existing one
   *
   * @param userId
   * @param oldCartId
   * @param toMergeCartGuid
   */
  abstract create(
    userId: string,
    oldCartId?: string,
    toMergeCartGuid?: string
  ): Observable<Cart>;

  /**
   * Abstract method used to delete cart
   *
   * @param userId
   * @param cartId
   */
  abstract delete(userId: string, cartId: string): Observable<{}>;

  /**
   *
   * Abstract method used to save a cart or update a saved cart
   */
  abstract save(
    userId: string,
    cartId: string,
    saveCartName?: string,
    saveCartDescription?: string
  ): Observable<Cart>;

  /**
   * Abstract method to assign an email to the cart. This step is required to make a guest checkout
   * @param userId
   * @param cartId
   * @param email
   */
  abstract addEmail(
    userId: string,
    cartId: string,
    email: string
  ): Observable<{}>;
}
