import { CheckoutState } from '@spartacus/checkout/base/root';
import { Order } from '@spartacus/order/root';
import { Observable } from 'rxjs';

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
   * Abstract method used to get checkout details
   *
   * @param userId
   * @param cartId
   */
  abstract getCheckoutDetails(
    userId: string,
    cartId: string
  ): Observable<CheckoutState>;
}
