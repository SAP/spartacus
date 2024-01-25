/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { facadeFactory, StateUtils } from '@spartacus/core';
import { Observable } from 'rxjs';
import { CART_BASE_CORE_FEATURE } from '../feature-name';
import { Cart, CartType, OrderEntry } from '../models/cart.model';

@Injectable({
  providedIn: 'root',
  useFactory: () =>
    facadeFactory({
      facade: MultiCartFacade,
      feature: CART_BASE_CORE_FEATURE,
      methods: [
        'getCart',
        'getCarts',
        'getCartEntity',
        'isStable',
        'createCart',
        'mergeToCurrentCart',
        'loadCart',
        'getEntries',
        'getLastEntry',
        'addEntry',
        'addEntries',
        'removeEntry',
        'updateEntry',
        'getEntry',
        'assignEmail',
        'removeCart',
        'deleteCart',
        'reloadCart',
        'getCartIdByType',
      ],
      async: true,
    }),
})
export abstract class MultiCartFacade {
  /**
   * Returns cart from store as an observable
   *
   * @param cartId
   */
  abstract getCart(cartId: string): Observable<Cart>;

  /**
   * Returns a list of carts from store as an observable
   *
   */
  abstract getCarts(): Observable<Cart[]>;

  /**
   * Returns cart entity from store (cart with loading, error, success flags) as an observable
   *
   * @param cartId
   */
  abstract getCartEntity(
    cartId: string
  ): Observable<StateUtils.ProcessesLoaderState<Cart | undefined>>;

  /**
   * Returns true when there are no operations on that in progress and it is not currently loading
   *
   * @param cartId
   */
  abstract isStable(cartId: string): Observable<boolean>;

  /**
   * Create or merge cart
   *
   * @param params Object with userId, oldCartId, toMergeCartGuid and extraData
   */
  abstract createCart({
    userId,
    oldCartId,
    toMergeCartGuid,
    extraData,
  }: {
    userId: string;
    oldCartId?: string;
    toMergeCartGuid?: string;
    extraData?: {
      active?: boolean;
    };
  }): Observable<Cart>;

  /**
   * Merge provided cart to current user cart
   *
   * @param params Object with userId, cartId and extraData
   */
  abstract mergeToCurrentCart({
    userId,
    cartId,
    extraData,
  }: {
    userId: string;
    cartId: string;
    extraData?: {
      active?: boolean;
    };
  }): void;

  /**
   * Load cart
   *
   * @param params Object with userId, cartId and extraData
   */
  abstract loadCart({
    cartId,
    userId,
    extraData,
  }: {
    cartId: string;
    userId: string;
    extraData?: any;
  }): void;

  /**
   * Get cart entries as an observable
   * @param cartId
   */
  abstract getEntries(cartId: string): Observable<OrderEntry[]>;

  /**
   * Get last entry for specific product code from cart.
   * Needed to cover processes where multiple entries can share the same product code
   * (e.g. promotions or configurable products)
   *
   * @param cartId
   * @param productCode
   */
  abstract getLastEntry(
    cartId: string,
    productCode: string
  ): Observable<OrderEntry | undefined>;

  /**
   * Add entry to cart
   *
   * @param userId
   * @param cartId
   * @param productCode
   * @param quantity
   * @param pickupStore
   */
  abstract addEntry(
    userId: string,
    cartId: string,
    productCode: string,
    quantity: number,
    pickupStore?: string
  ): void;

  /**
   * Add multiple entries to cart
   *
   * @param userId
   * @param cartId
   * @param products Array with items (productCode and quantity)
   */
  abstract addEntries(
    userId: string,
    cartId: string,
    products: Array<{ productCode: string; quantity: number }>
  ): void;

  /**
   * Remove entry from cart
   *
   * @param userId
   * @param cartId
   * @param entryNumber
   */
  abstract removeEntry(
    userId: string,
    cartId: string,
    entryNumber: number
  ): void;

  /**
   * Update entry in cart. For quantity = 0 it removes entry
   *
   * @param userId
   * @param cartId
   * @param entryNumber
   * @param quantity
   */
  abstract updateEntry(
    userId: string,
    cartId: string,
    entryNumber: number,
    quantity?: number,
    pickupStore?: string,
    pickupToDelivery?: boolean
  ): void;

  /**
   * Get first entry from cart matching the specified product code
   *
   * @param cartId
   * @param productCode
   */
  abstract getEntry(
    cartId: string,
    productCode: string
  ): Observable<OrderEntry | undefined>;

  /**
   * Assign email to the cart
   *
   * @param cartId
   * @param userId
   * @param email
   */
  abstract assignEmail(cartId: string, userId: string, email: string): void;

  /**
   * Remove cart
   *
   * Removes the cart from the state.
   * To remove a cart from the state and back-end, please use `DeleteCart` action.
   *
   * @param cartId
   */
  abstract removeCart(cartId: string): void;

  /**
   * Delete cart
   *
   * @param cartId
   * @param userId
   */
  abstract deleteCart(cartId: string, userId: string): void;

  /**
   * Reloads the cart with specified id.
   *
   * @param cartId
   * @param extraData
   */
  abstract reloadCart(cartId: string, extraData?: { active: boolean }): void;

  /**
   * Get the cart id based on cart type
   *
   * @param cartType
   */
  abstract getCartIdByType(cartType: CartType): Observable<string>;
}
