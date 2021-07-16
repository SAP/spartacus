import { Observable } from 'rxjs';
import { SaveCartResult } from '../../../model/cart.model';

/**
 * @deprecated since 4.1 - use cart lib instead
 */
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
