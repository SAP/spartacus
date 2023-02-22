/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CartModification } from '@spartacus/cart/base/root';
import { PointOfService } from '@spartacus/core';
import { Observable } from 'rxjs';

/**
 * Adapter for getting store details.
 */
export abstract class PickupLocationAdapter {
  /**
   * Get the store details by store name.
   * @param storeName The store name to get details for
   */
  abstract getStoreDetails(storeName: string): Observable<PointOfService>;

  /**
   * For a cart entry, change the pickup option to delivery
   * @param cartId
   * @param entryNumber
   * @param userId
   * @param productCode
   * @param quantity
   */
  abstract setPickupOptionToDelivery(
    cartId: string,
    entryNumber: number,
    userId: string,
    productCode: string,
    quantity: number
  ): Observable<CartModification>;

  /**
   * For a cart entry, change the pickup option to pickup in store
   * @param cartId
   * @param entryNumber
   * @param userId
   * @param storeName
   * @param quantity
   */
  abstract setPickupOptionToPickupInStore(
    cartId: string,
    entryNumber: number,
    userId: string,
    storeName: string,
    quantity: number
  ): Observable<CartModification>;
}
