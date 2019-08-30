import { Observable } from 'rxjs';
import { CartModification } from '../../../model/cart.model';

export abstract class CartEntryAdapter {
  /**
   * Abstract method used to add entry to cart
   *
   * @param userId
   * @param cartId
   * @param productCode
   * @param quantity
   */
  abstract add(
    userId: string,
    cartId: string,
    productCode: string,
    quantity?: number
  ): Observable<CartModification>;

  /**
   * Abstract method used to update entry in cart
   * @param userId
   * @param cartId
   * @param entryNumber
   * @param qty
   * @param pickupStore
   */
  abstract update(
    userId: string,
    cartId: string,
    entryNumber: string,
    qty: number,
    pickupStore?: string
  ): Observable<CartModification>;

  /**
   * Abstract method used to remove entry from cart
   *
   * @param userId
   * @param cartId
   * @param entryNumber
   */
  abstract remove(
    userId: string,
    cartId: string,
    entryNumber: string
  ): Observable<any>;
}
