import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  ConverterService,
  OccEndpointsService,
  PointOfService,
} from '@spartacus/core';
import { PickupLocationAdapter } from '@spartacus/pickup-in-store/core';
import { SetDeliveryOptionPayload } from '@spartacus/pickup-in-store/root';
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

  setDeliveryOption({
    cartId,
    pickupOption,
    name,
    entryNumber,
    userId,
    productCode,
    quantity,
  }: SetDeliveryOptionPayload): Observable<any> {
    const putPayload = {
      deliveryPointOfService: {
        name: '',
      },
      product: {
        code: productCode,
      },
      quantity: quantity,
    };
    const patchPayload = {
      deliveryPointOfService: {
        name,
      },
      quantity,
    };
    const payload = pickupOption === 'pickup' ? patchPayload : putPayload;
    const verb = pickupOption === 'pickup' ? 'patch' : 'put';

    return this.http[verb]<any>(
      this.occEndpointsService.buildUrl('patchDeliveryOption', {
        urlParams: { userId, cartId, entryNumber },
      }),
      payload
    );
  }
}
