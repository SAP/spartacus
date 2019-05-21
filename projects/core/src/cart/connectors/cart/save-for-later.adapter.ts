import { Observable } from 'rxjs';
import { Cart } from '../../../model/cart.model';

export abstract class SaveForLaterAdapter {
  /**
   * Abstract method used to load cart
   *
   * @param userId
   * @param cartId
   */
  abstract load(userId: string, cartId: string): Observable<Cart>;

  /**
   * Abstract method used to create cart.
   *
   * @param userId
   * @param cartId
   */
  abstract create(userId: string, cartId?: string): Observable<Cart>;
}
