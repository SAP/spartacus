/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { facadeFactory, User } from '@spartacus/core';
import { Observable } from 'rxjs';
import { CART_BASE_CORE_FEATURE } from '../feature-name';
import { Cart, OrderEntry } from '../models/cart.model';

@Injectable({
  providedIn: 'root',
  useFactory: () =>
    facadeFactory({
      facade: ActiveCartFacade,
      feature: CART_BASE_CORE_FEATURE,
      methods: [
        'getActive',
        'takeActive',
        'getActiveCartId',
        'takeActiveCartId',
        'getEntries',
        'getLastEntry',
        'getLoading',
        'isStable',
        'addEntry',
        'removeEntry',
        'updateEntry',
        'getEntry',
        'addEmail',
        'getAssignedUser',
        'isGuestCart',
        'addEntries',
        'requireLoadedCart',
        'reloadActiveCart',
        'hasPickupItems',
        'hasDeliveryItems',
        'getPickupEntries',
        'getDeliveryEntries',
      ],
      async: true,
    }),
})
export abstract class ActiveCartFacade {
  /**
   * Returns active cart
   */
  abstract getActive(): Observable<Cart>;

  /**
   * Waits for the cart to be stable before returning the active cart.
   */
  abstract takeActive(): Observable<Cart>;

  /**
   * Returns active cart id
   */
  abstract getActiveCartId(): Observable<string>;

  /**
   * Waits for the cart to be stable before returning the active cart's ID.
   */
  abstract takeActiveCartId(): Observable<string>;

  /**
   * Returns cart entries
   */
  abstract getEntries(): Observable<OrderEntry[]>;

  /**
   * Returns last cart entry for provided product code.
   * Needed to cover processes where multiple entries can share the same product code
   * (e.g. promotions or configurable products)
   *
   * @param productCode
   */
  abstract getLastEntry(
    productCode: string
  ): Observable<OrderEntry | undefined>;

  /**
   * Returns cart loading state
   */
  abstract getLoading(): Observable<boolean>;

  /**
   * Returns true when cart is stable (not loading and not pending processes on cart)
   */
  abstract isStable(): Observable<boolean>;

  /**
   * Add entry to active cart
   *
   * @param productCode
   * @param quantity
   * @param pickupStore
   */
  abstract addEntry(
    productCode: string,
    quantity: number,
    pickupStore?: string
  ): void;

  /**
   * Remove entry
   *
   * @param entry
   */
  abstract removeEntry(entry: OrderEntry): void;

  /**
   * Update entry
   *
   * @param entryNumber
   * @param quantity
   * @param pickupStore
   * @param pickupToDelivery
   */
  abstract updateEntry(
    entryNumber: number,
    quantity: number,
    pickupStore?: string,
    pickupToDelivery?: boolean
  ): void;

  /**
   * Returns cart entry
   *
   * @param productCode
   */
  abstract getEntry(productCode: string): Observable<OrderEntry | undefined>;

  /**
   * Assign email to cart
   *
   * @param email
   */
  abstract addEmail(email: string): void;

  /**
   * Get assigned user to cart
   */
  abstract getAssignedUser(): Observable<User>;

  /**
   * Returns observable of true for guest cart
   */
  abstract isGuestCart(cart?: Cart): Observable<boolean>;

  /**
   * Add multiple entries to a cart
   *
   * @param cartEntries : list of entries to add (OrderEntry[])
   */
  abstract addEntries(cartEntries: OrderEntry[]): void;

  abstract requireLoadedCart(forGuestMerge?: boolean): Observable<Cart>;

  abstract reloadActiveCart(): void;

  /**
   * Return whether cart has pickup items
   */
  abstract hasPickupItems(): Observable<boolean>;

  /**
   * Return whether cart has delivery items
   */
  abstract hasDeliveryItems(): Observable<boolean>;

  /**
   * Return cart's pickup entries
   */
  abstract getPickupEntries(): Observable<OrderEntry[]>;

  /**
   * Return cart's delivery entries
   */
  abstract getDeliveryEntries(): Observable<OrderEntry[]>;
}
