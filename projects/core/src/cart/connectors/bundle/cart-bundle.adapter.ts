import { Observable } from 'rxjs';
import { CartModification } from '../../../model/cart.model';

export abstract class CartBundleAdapter {
  /**
   * Abstract method used to add entry to cart
   *
   * @param userId
   * @param cartId
   */
  abstract create(userId: string, cartId: string): Observable<CartModification>;
}
