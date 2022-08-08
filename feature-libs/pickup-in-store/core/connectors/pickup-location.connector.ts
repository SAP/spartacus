import { Injectable } from '@angular/core';
import { PointOfService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { PickupLocationAdapter } from './pickup-location.adapter';

@Injectable({ providedIn: 'root' })
export class PickupLocationConnector {
  constructor(protected adapter: PickupLocationAdapter) {}

  getStoreDetails(storeName: string): Observable<PointOfService> {
    return this.adapter.getStoreDetails(storeName);
  }
}
