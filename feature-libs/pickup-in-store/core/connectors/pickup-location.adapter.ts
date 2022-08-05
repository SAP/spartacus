import { PointOfService } from '@spartacus/core';
import { Observable } from 'rxjs';

export abstract class PickupLocationAdapter {
  /**
   * Get The store details by store name
   * @param storeName;
   */
  abstract getStoreDetails(storeName: string): Observable<PointOfService>;
}
