import { Observable } from 'rxjs';
import { Order } from '../../../model/order.model';

export abstract class CheckoutAdapter {
  /**
   * Abstract method used to place an order.
   *
   * @param userId The `userId` for given user
   * @param cartId The `cartId` for cart used for placing order
   */
  abstract placeOrder(userId: string, cartId: string): Observable<Order>;
}
