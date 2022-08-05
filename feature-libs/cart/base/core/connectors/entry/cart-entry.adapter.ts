import {
  AddEntryOptions,
  BaseCartOptions,
  CartModification,
} from '@spartacus/cart/base/root';
import { Observable } from 'rxjs';

export abstract class CartEntryAdapter {
  /**
   * Abstract method used to add entry to cart
   *
   * @deprecated since 5.1.0, and will be removed in the future major version.
   * Instead, use `add(options: BaseCartOptions<AddEntryOptions>)`.
   *
   * @param userId
   * @param cartId
   * @param productCode
   * @param quantity
   */
  // TODO:#object-extensibility-deprecation - remove
  abstract add(
    userId: string,
    cartId: string,
    productCode: string,
    quantity?: number
  ): Observable<CartModification>;
  /**
   * Abstract method used to add entry to cart
   */
  abstract add(
    options: BaseCartOptions<AddEntryOptions>
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
