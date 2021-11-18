import { CheckoutState } from '@spartacus/checkout/base/root';
import { Order } from '@spartacus/core';
import { Observable } from 'rxjs';

export abstract class CheckoutAdapter {
  /**
   * Abstract method used to place an order.
   */
  abstract placeOrder(
    userId: string,
    cartId: string,
    termsChecked: boolean
  ): Observable<Order>;

  /**
   * Abstract method used to get checkout details
   */
  abstract getCheckoutDetails(
    userId: string,
    cartId: string
  ): Observable<CheckoutState>;
}
