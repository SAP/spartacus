import { Observable } from 'rxjs';
import { Cart } from '../../../model/cart.model';

export abstract class CartAdapter {
  /**
   * Abstract method used to load all carts
   *
   * @param userId
   */
  abstract loadAll(userId: string): Observable<Cart[]>;

  /**
   * Abstract method used to load cart
   *
   * @param userId
   * @param cartId
   */
  abstract load(userId: string, cartId: string): Observable<Cart>;

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
