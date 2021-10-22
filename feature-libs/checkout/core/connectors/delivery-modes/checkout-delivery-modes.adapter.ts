import { DeliveryMode } from '@spartacus/core';
import { Observable } from 'rxjs';

export abstract class CheckoutDeliveryModesAdapter {
  /**
   * Abstract method used to set delivery mode on cart
   *
   * @param userId
   * @param cartId
   * @param deliveryModeId
   */
  abstract setMode(
    userId: string,
    cartId: string,
    deliveryModeId: string
  ): Observable<unknown>;

  /**
   * Abstract method used to get current delivery mode from cart
   *
   * @param userId
   * @param cartId
   */
  abstract getMode(userId: string, cartId: string): Observable<DeliveryMode>;

  /**
   * Abstract method used to get supported delivery modes for cart
   *
   * @param userId
   * @param cartId
   */
  abstract getSupportedModes(
    userId: string,
    cartId: string
  ): Observable<DeliveryMode[]>;
}
