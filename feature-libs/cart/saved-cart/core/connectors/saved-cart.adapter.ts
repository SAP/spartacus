import { Cart } from '@spartacus/core';
import { Observable } from 'rxjs';

export abstract class SavedCartAdapter {
  /**
   *
   * Abstract method used to load a single saved cart
   */
  abstract load(userId: String, cartId: String): Observable<Cart>;
  /**
   *
   * Abstract method used to load a list of saved carts
   */
  abstract loadList(userId: string): Observable<Cart[]>;
  /**
   *
   * Abstract method used to restore a saved cart to an active cart
   */
  abstract restoreSavedCart(userId: string, cartId: string): Observable<Cart>;
}
