import { Product } from 'projects/core/src/model/product.model';
import { Observable } from 'rxjs';
import { CartModification } from '../../../model/cart.model';

export abstract class CartBundleAdapter {
  /**
   * Starts a bundle once the productCode, its quantity, and a bundle templateId is provided. A successful result returns a CartModification response.
   *
   * @param userId
   * User identifier or one of the literals : ‘current’ for currently authenticated user, ‘anonymous’ for anonymous user.
   *
   * @param cartId
   * Cart identifier: cart code for logged in user, cart guid for anonymous user, ‘current’ for the last modified cart.
   *
   * @param productCode
   * Product code.
   *
   * @param quantity
   * Quantity of the product added to cart.
   *
   * @param templateId
   * Id of a template to create a bundle.
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
   * @param entryGroupNumber
   * @param product
   * @param quantity
   */
  abstract update(
    userId: string,
    cartId: string,
    entryGroupNumber: number,
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
    entryGroupNumber: number
  ): Observable<any>;

  /**
   * Abstract method used to get allowed products in entryGroup
   *
   * @param userId
   * @param cartId
   * @param entryGroupId
   */
  abstract getBundleAllowedProducts(
    userId: string,
    cartId: string,
    entryGroupId: number
  ): Observable<any>;
}
