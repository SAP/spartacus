import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  ConverterService,
  OccEndpointsService,
  PointOfService,
} from '@spartacus/core';
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
    protected occEndpointsService: OccEndpointsService,
    protected converterService: ConverterService
  ) {}

  getStoreDetails(storeName: string): Observable<PointOfService> {
    return this.http.get<PointOfService>(
      this.occEndpointsService.buildUrl('storeDetails', {
        urlParams: { storeName },
      })
    );
  }

  setPickupOptionDelivery(
    cartId: string,
    entryNumber: number,
    userId: string,
    payload: SetPickupOptionDeliveryPayload
  ): Observable<any> {
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
    payload: SetPickupOptionInStorePayload
  ): Observable<any> {
    return this.http.patch(
      this.occEndpointsService.buildUrl('patchDeliveryOption', {
        urlParams: { userId, cartId, entryNumber },
      }),
      payload
    );
  }
}
