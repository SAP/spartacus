import { SaveCartResult } from '@spartacus/cart/main/root';
import { Observable } from 'rxjs';

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
