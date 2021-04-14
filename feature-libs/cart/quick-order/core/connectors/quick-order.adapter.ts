import { Cart, Product } from '@spartacus/core';
import { Observable } from 'rxjs';
import { QuickOrderEntry } from '../model/quick-order-entry.model';

export abstract class QuickOrderAdapter {
  /**
   *
   * Abstract method used to add items to active cart
   */
  abstract addToCart(
    userId: string,
    cartId: string,
    entries: QuickOrderEntry[]
  ): Observable<Cart[]>;

  /**
   *
   * Abstract method used to create cart
   *
   */
  abstract createCart(userId: string): Observable<Cart>;

  /**
   *
   * Abstract method used to search a product
   */
  abstract search(productCode: string): Observable<Product>;
}
