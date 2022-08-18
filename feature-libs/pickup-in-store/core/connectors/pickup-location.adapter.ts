/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { PointOfService } from '@spartacus/core';
import {
  SetPickupOptionDeliveryPayload,
  SetPickupOptionInStorePayload,
} from '@spartacus/pickup-in-store/root';
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
   * Set Pickup Option to Delivery
   * @param cartId
   * @param entryNumber
   * @param userId
   * @param payload
   */
  abstract setPickupOptionDelivery(
    cartId: string,
    entryNumber: number,
    userId: string,
    payload: SetPickupOptionDeliveryPayload
  ): Observable<any>;
  /**
   * Set Pickup Option to Pickup in Store
   * @param cartId
   * @param entryNumber
   * @param userId
   * @param payload
   */
  abstract setPickupOptionInStore(
    cartId: string,
    entryNumber: number,
    userId: string,
    payload: SetPickupOptionInStorePayload
  ): Observable<any>;
}
