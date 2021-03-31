import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { CartModification } from '../../../model/cart.model';
import { OrderEntry } from '../../../model/order.model';
import { CartEntryGroupAdapter } from './cart-entry-group.adapter';

@Injectable({
  providedIn: 'root',
})
export class CartEntryGroupConnector {
  constructor(protected adapter: CartEntryGroupAdapter) { }

  /**
   * Adds a product to a cart entry group.
   *
   * @param userId
   * User identifier or one of the literals : ‘current’ for currently authenticated user, ‘anonymous’ for anonymous user.
   *
   * @param cartId
   * Cart code for logged in user, cart guid for anonymous user, ‘current’ for the last modified cart
   *
   * @param entryGroupNumber
   * Each entry group in a cart has a specific entry group number. Entry group numbers are integers starting at one. They are defined in ascending order.
   *
   * @param entry
   * Request body parameter that contains details such as the product code (product.code) and the quantity of product (quantity).
   */
  public addToEntryGroup(
    userId: string,
    cartId: string,
    entryGroupNumber: number,
    entry: OrderEntry
  ): Observable<CartModification> {
    return this.adapter.addToEntryGroup(
      userId,
      cartId,
      entryGroupNumber,
      entry
    );
  }

  /**
   * Removes an entry group from an associated cart. The entry group is identified by an entryGroupNumber. The cart is identified by the cartId.
   *
   * @param userId
   * User identifier or one of the literals : ‘current’ for currently authenticated user, ‘anonymous’ for anonymous user.
   *
   * @param cartId
   * Cart code for logged in user, cart guid for anonymous user, ‘current’ for the last modified cart
   *
   * @param entryGroupNumber
   * Each entry group in a cart has a specific entry group number. Entry group numbers are integers starting at one. They are defined in ascending order.
   */
  public deleteEntryGroup(
    userId: string,
    cartId: string,
    entryGroupNumber: number
  ): Observable<CartModification> {
    return this.adapter.deleteEntryGroup(userId, cartId, entryGroupNumber);
  }
}
