import { Injectable } from '@angular/core';
import { PointOfService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { PickupLocationAdapter } from './pickup-location.adapter';

/**
 * Connector for getting store details.
 */
@Injectable({ providedIn: 'root' })
export class PickupLocationConnector {
  constructor(protected adapter: PickupLocationAdapter) {}

  /**
   * Get the store details by store name.
   * @param storeName The store name to get details for
   */
  getStoreDetails(storeName: string): Observable<PointOfService> {
    return this.adapter.getStoreDetails(storeName);
  }
}
