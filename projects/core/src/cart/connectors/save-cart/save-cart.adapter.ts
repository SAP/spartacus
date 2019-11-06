import { Observable } from 'rxjs';
import { SaveCartResult } from '../../../model/cart.model';

export abstract class SaveCartAdapter {
  /**
   * Abstract method used to save a cart
   *
   * @param userId: string
   * @param cartId: string
   * @param fields?: {saveCartName?: string; saveCartDescription?: string}
   */
  abstract saveCart(
    userId: string,
    cartId: string,
    fields?: { saveCartName?: string; saveCartDescription?: string }
  ): Observable<SaveCartResult>;
}
