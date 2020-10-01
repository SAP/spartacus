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
}
