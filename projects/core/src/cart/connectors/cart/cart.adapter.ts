import { Observable } from 'rxjs';
import { Cart } from '../../../occ/occ-models/occ.models';
import { UICart } from '../../model/cart';

export abstract class CartAdapter {
  /**
   * Abstract method used to load all carts
   *
   * @param userId
   * @param details Boolean flag indicating if we want to load details
   */
  abstract loadAll(userId: string, details?: boolean): Observable<UICart[]>;

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
  ): Observable<UICart>;

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
