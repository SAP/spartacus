/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OccEndpointsService, PointOfService } from '@spartacus/core';
import { PickupLocationAdapter } from '@spartacus/pickup-in-store/core';
import {
  SetPickupOptionInStorePayload,
  SetPickupOptionDeliveryPayload,
} from '@spartacus/pickup-in-store/root';
import { Observable } from 'rxjs';

@Injectable()
export class OccPickupLocationAdapter implements PickupLocationAdapter {
  constructor(
    protected http: HttpClient,
    protected occEndpointsService: OccEndpointsService
  ) {
    // Intentional empty constructor
  }

  getStoreDetails(storeName: string): Observable<PointOfService> {
    return this.http.get<PointOfService>(
      this.occEndpointsService.buildUrl('storeDetails', {
        urlParams: { storeName },
        queryParams: { fields: 'FULL' },
      })
    );
  }

  setPickupOptionDelivery(
    cartId: string,
    entryNumber: number,
    userId: string,
    name: string,
    code: string,
    quantity: number
  ): Observable<any> {
    const payload: SetPickupOptionDeliveryPayload = {
      deliveryPointOfService: {
        name,
      },
      product: {
        code: code,
      },
      quantity: quantity,
    };
    return this.http.put(
      this.occEndpointsService.buildUrl('patchDeliveryOption', {
        urlParams: { userId, cartId, entryNumber },
      }),
      payload
    );
  }

  setPickupOptionInStore(
    cartId: string,
    entryNumber: number,
    userId: string,
    name: string,
    quantity: number
  ): Observable<any> {
    const payload: SetPickupOptionInStorePayload = {
      deliveryPointOfService: {
        name,
      },
      quantity,
    };
    return this.http.patch(
      this.occEndpointsService.buildUrl('patchDeliveryOption', {
        urlParams: { userId, cartId, entryNumber },
      }),
      payload
    );
  }
}
