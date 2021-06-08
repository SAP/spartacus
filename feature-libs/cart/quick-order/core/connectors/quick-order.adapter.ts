import { Cart, Product } from '@spartacus/core';
import { Observable } from 'rxjs';

export abstract class QuickOrderAdapter {
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
