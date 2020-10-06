import { Product } from 'projects/core/src/model/product.model';
import { Observable } from 'rxjs';
import { CartModification } from '../../../model/cart.model';

export abstract class CartBundleAdapter {
  /**
   * Abstract method used to add entry to cart
   *
   * @param userId
   * @param cartId
   * @param productCode
   * @param quantity
   * @param templateId
   */
  abstract start(
    userId: string,
    cartId: string,
    productCode: string,
    quantity: number,
    templateId: string
  ): Observable<CartModification>;

  /**
   * Abstract method used to add entry to cart
   *
   * @param userId
   * @param cartId
   */
  abstract getAll(userId: string, cartId: string): Observable<CartModification>;

  /**
   * Abstract method used to update entry in cart
   * @param userId
   * @param cartId
   * @param entryGroupId
   * @param product
   * @param quantity
   */
  abstract update(
    userId: string,
    cartId: string,
    entryGroupId: string,
    product: Product,
    quantity: number
  ): Observable<CartModification>;

  /**
   * Abstract method used to remove entry from cart
   *
   * @param userId
   * @param cartId
   * @param entryGroupId
   */
  abstract remove(
    userId: string,
    cartId: string,
    entryGroupId: string
  ): Observable<any>;
}
