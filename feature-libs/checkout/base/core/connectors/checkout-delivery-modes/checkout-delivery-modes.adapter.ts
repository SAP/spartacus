import { DeliveryMode } from '@spartacus/core';
import { Observable } from 'rxjs';

export abstract class CheckoutDeliveryModesAdapter {
  /**
   * Abstract method used to set delivery mode on cart
   */
  abstract setMode(
    userId: string,
    cartId: string,
    deliveryModeId: string
  ): Observable<unknown>;

  /**
   * Abstract method used to get supported delivery modes for cart
   */
  abstract getSupportedModes(
    userId: string,
    cartId: string
  ): Observable<DeliveryMode[]>;

  /**
   * Abstract method used to clear checkout delivery mode
   */
  abstract clearCheckoutDeliveryMode(
    userId: string,
    cartId: string
  ): Observable<unknown>;
}
