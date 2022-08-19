/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

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
   * Change Pickup Option to Delivery for item at entryNumber in user cart
   * @param cartId
   * @param entryNumber
   * @param userId
   * @param payload
   */
  abstract setPickupOptionDelivery(
    cartId: string,
    entryNumber: number,
    userId: string,
    name: string,
    productCode: string,
    quantity: number
  ): Observable<any>;
  /**
   * Change Pickup Option to In Store for item at entryNumber in user cart
   * @param cartId
   * @param entryNumber
   * @param userId
   * @param payload
   */
  abstract setPickupOptionInStore(
    cartId: string,
    entryNumber: number,
    userId: string,
    name: string,
    quantity: number
  ): Observable<any>;
}
