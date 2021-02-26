import { Observable } from 'rxjs';

export abstract class SavedCartAdapter {
  /**
   * Abstract method used to save a cart or update a saved cart
   */
  abstract saveCart(
    userId: string,
    cartId: string,
    cartDescription: string,
    cartName: string
  ): Observable<any>;
}
