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
  /**
   *
   * Abstract method used to save a cart or update a saved cart
   */
  abstract saveCart(
    userId: string,
    cartId: string | undefined,
    saveCartName?: string,
    saveCartDescription?: string
  ): Observable<Cart>;
}
