/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CartModification } from '@spartacus/cart/base/root';
import { OccEndpointsService, PointOfService } from '@spartacus/core';
import { PickupLocationAdapter } from '@spartacus/pickup-in-store/base/core';
import {
  SetPickupOptionToDeliveryPayload,
  SetPickupOptionToPickupInStorePayload,
} from '@spartacus/pickup-in-store/base/root';
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

  setPickupOptionToDelivery(
    cartId: string,
    entryNumber: number,
    userId: string,
    code: string,
    quantity: number
  ): Observable<CartModification> {
    const payload: SetPickupOptionToDeliveryPayload = {
      deliveryPointOfService: {
        name: '',
      },
      product: {
        code,
      },
      quantity,
    };
    return this.http.put<CartModification>(
      this.occEndpointsService.buildUrl('updateDeliveryOption', {
        urlParams: { userId, cartId, entryNumber },
      }),
      payload
    );
  }

  setPickupOptionToPickupInStore(
    cartId: string,
    entryNumber: number,
    userId: string,
    name: string,
    quantity: number
  ): Observable<CartModification> {
    const payload: SetPickupOptionToPickupInStorePayload = {
      deliveryPointOfService: {
        name,
      },
      quantity,
    };
    return this.http.patch<CartModification>(
      this.occEndpointsService.buildUrl('updateDeliveryOption', {
        urlParams: { userId, cartId, entryNumber },
      }),
      payload
    );
  }
}
