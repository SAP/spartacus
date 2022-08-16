import { PointOfService } from '@spartacus/core';
import { SetDeliveryOptionPayload } from 'feature-libs/pickup-in-store/root';
import { Observable } from 'rxjs';

export abstract class PickupLocationAdapter {
  /**
   * Get The store details by store name
   * @param storeName;
   */
  abstract getStoreDetails(storeName: string): Observable<PointOfService>;
  abstract setDeliveryOption(
    setDeliveryOptionPayload: SetDeliveryOptionPayload
  ): Observable<any>;
}
