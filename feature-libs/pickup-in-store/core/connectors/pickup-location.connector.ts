/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { PointOfService } from '@spartacus/core';
import {
  SetPickupOptionDeliveryPayload,
  SetPickupOptionInStorePayload,
} from '@spartacus/pickup-in-store/root';
import { Observable } from 'rxjs';
import { PickupLocationAdapter } from './pickup-location.adapter';

/**
 * Connector for getting store details.
 */
@Injectable({ providedIn: 'root' })
export class PickupLocationConnector {
  constructor(protected adapter: PickupLocationAdapter) {
    // Intentional empty constructor
  }

  /**
   * Get the store details by store name.
   * @param storeName The store name to get details for
   */
  getStoreDetails(storeName: string): Observable<PointOfService> {
    return this.adapter.getStoreDetails(storeName);
  }
  setPickupOptionDelivery(
    cartId: string,
    entryNumber: number,
    userId: string,
    payload: SetPickupOptionDeliveryPayload
  ): Observable<any> {
    return this.adapter.setPickupOptionDelivery(
      cartId,
      entryNumber,
      userId,
      payload
    );
  }

  setPickupOptionInStore(
    cartId: string,
    entryNumber: number,
    userId: string,
    payload: SetPickupOptionInStorePayload
  ): Observable<any> {
    return this.adapter.setPickupOptionInStore(
      cartId,
      entryNumber,
      userId,
      payload
    );
  }
}
