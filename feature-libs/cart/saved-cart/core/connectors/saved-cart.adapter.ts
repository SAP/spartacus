import { Cart } from '@spartacus/core';
import { Observable } from 'rxjs';

export abstract class SavedCartAdapter {
  /**
   *
   * Abstract method used to save a cart or update a saved cart
   */
  abstract saveCart(
    userId: string,
    cartId: string,
    saveCartName?: string,
    saveCartDescription?: string
  ): Observable<Cart>;
}
