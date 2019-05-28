import { Observable } from 'rxjs';
import { Order } from '../../../model/order.model';
import { CheckoutDetails } from '../../models/checkout.model';

export abstract class CheckoutAdapter {
  /**
   * Abstract method used to place an order.
   *
   * @param userId The `userId` for given user
   * @param cartId The `cartId` for cart used for placing order
   */
  abstract placeOrder(userId: string, cartId: string): Observable<Order>;

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
}
