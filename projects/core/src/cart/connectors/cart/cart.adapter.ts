import { Observable } from 'rxjs';
import { CheckoutDetails } from '../../../checkout/models/checkout.model';
import { Cart } from '../../../model/cart.model';

export abstract class CartAdapter {
  /**
   * Abstract method used to load all carts
   *
   * @param userId
   * @param details Boolean flag indicating if we want to load details
   */
  abstract loadAll(userId: string, details?: boolean): Observable<Cart[]>;

  /**
   * Abstract method used to load cart
   *
   * @param userId
   * @param cartId
   * @param details Boolean flag indicating if we want to load details
   */
  abstract load(
    userId: string,
    cartId: string,
    details?: boolean
  ): Observable<Cart>;

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
   * Abstract method used to create cart. If toMergeCartGuid is specified, cart will be merged with existing one
   *
   * @param userId
   * @param oldCartId
   * @param toMergeCartGuid
   */
  abstract create(
    userId: string,
    oldCartId?: string,
    toMergeCartGuid?: string
  ): Observable<Cart>;
}
