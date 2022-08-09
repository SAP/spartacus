import { Injectable } from '@angular/core';
import { PointOfService } from '@spartacus/core';
import { PatchDeliveryOptionPayload } from '@spartacus/pickup-in-store/root';
import { Observable } from 'rxjs';
import { PickupLocationAdapter } from './pickup-location.adapter';

@Injectable({ providedIn: 'root' })
export class PickupLocationConnector {
  constructor(protected adapter: PickupLocationAdapter) {}

  getStoreDetails(storeName: string): Observable<PointOfService> {
    return this.adapter.getStoreDetails(storeName);
  }
  patchDeliveryOption(
    patchDeliveryOptionPayload: PatchDeliveryOptionPayload
  ): Observable<any> {
    return this.adapter.patchDeliveryOption(patchDeliveryOptionPayload);
  }
}
