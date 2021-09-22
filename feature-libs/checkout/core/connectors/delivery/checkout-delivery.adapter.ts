import { Address, DeliveryMode } from '@spartacus/core';
import { Observable } from 'rxjs';

export abstract class CheckoutDeliveryAdapter {
  /**
   * Abstract method used to create address in cart
   *
   * @param userId
   * @param cartId
   * @param address
   */
  abstract createAddress(
    userId: string,
    cartId: string,
    address: Address
  ): Observable<Address>;

  // TODO: Change return type to Observable<unknown> in 5.0
  /**
   * Abstract method used to set address for delivery
   *
   * @param userId
   * @param cartId
   * @param addressId
   */
  abstract setAddress(
    userId: string,
    cartId: string,
    addressId: string
  ): Observable<any>;

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
  ): Observable<any>;

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
