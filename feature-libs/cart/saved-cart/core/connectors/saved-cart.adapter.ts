import { Observable } from 'rxjs';

export abstract class SavedCartAdapter {
  /**
   * Abstract method used to saved cart
   */
  abstract create(
    userId: string,
    cartId: string,
    cartDescription: string,
    cartName: string
  ): Observable<any>;
}
