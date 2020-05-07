import { Observable } from 'rxjs';
import { SaveCartResult } from '../../../model/cart.model';

export abstract class SaveCartAdapter {
  /**
   * Abstract method used to save a cart
   *
   * @param userId: string
   * @param cartId: string
   * @param saveCartName?: string
   * @param saveCartDescription?: string
   */
  abstract saveCart(
    userId: string,
    cartId: string,
    saveCartName?: string,
    saveCartDescription?: string
  ): Observable<SaveCartResult>;
}
