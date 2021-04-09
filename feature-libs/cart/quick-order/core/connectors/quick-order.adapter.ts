import { OrderEntry, Product } from '@spartacus/core';
import { Observable } from 'rxjs';

export abstract class QuickOrderAdapter {
  /**
   *
   * Abstract method used to add items to active cart
   */
  abstract addToCart(
    userId: string,
    cartId: string,
    entries: OrderEntry[]
  ): Observable<void>;

  /**
   *
   * Abstract method used to search a product
   */
  abstract search(productCode: string): Observable<Product>;
}
