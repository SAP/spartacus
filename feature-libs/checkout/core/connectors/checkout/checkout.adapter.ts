import { Order } from '@spartacus/core';
import { Observable } from 'rxjs';
import { CheckoutDetails } from '../../models/checkout.model';

export abstract class CheckoutAdapter {
  /**
   * Abstract method used to place an order.
   *
   * @param userId The `userId` for given user
   * @param cartId The `cartId` for cart used for placing order
   * @param termsChecked The `boolean value` whether the terms were accepted or not
   */
  abstract placeOrder(
    userId: string,
    cartId: string,
    termsChecked: boolean
  ): Observable<Order>;

  /**
   * Abstract method used to load checkout details
   *
   * @param userId
   * @param cartId
   */
  abstract loadCheckoutDetails(
    userId: string,
    cartId: string
  ): Observable<CheckoutDetails>;

  /**
   * Abstract method used to clear checkout delivery address
   *
   * @param userId
   * @param cartId
   */
  abstract clearCheckoutDeliveryAddress(
    userId: string,
    cartId: string
  ): Observable<any>;

  /**
   * Abstract method used to clear checkout delivery mode
   *
   * @param userId
   * @param cartId
   */
  abstract clearCheckoutDeliveryMode(
    userId: string,
    cartId: string
  ): Observable<any>;
}
