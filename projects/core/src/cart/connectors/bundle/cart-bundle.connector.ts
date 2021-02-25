import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { CartModification } from '../../../model/cart.model';
import { CartBundleAdapter } from './cart-bundle.adapter';
import { SearchConfig } from 'projects/core/src/product/model/search-config';
import { OrderEntry } from 'projects/core/src/model/order.model';
import { BundleStarter } from 'projects/core/src/model/bundle.model';

@Injectable({
  providedIn: 'root',
})
export class CartBundleConnector {
  constructor(protected adapter: CartBundleAdapter) {}

  /**
   * Starts a bundle once the productCode, its quantity, and a bundle templateId is provided. A successful result returns a CartModification response.
   *
   * @param userId
   * User identifier or one of the literals : ‘current’ for currently authenticated user, ‘anonymous’ for anonymous user.
   *
   * @param cartId
   * Cart identifier: cart code for logged in user, cart guid for anonymous user, ‘current’ for the last modified cart.
   *
   * @param bundleStarter
   * Mandatory data required to start a bundle. This includes the templateId of the bundle, the productCode, and the quantity of the product itself.
   */
  public bundleStart(
    userId: string,
    cartId: string,
    bundleStarter: BundleStarter
  ): Observable<CartModification> {
    return this.adapter.bundleStart(userId, cartId, bundleStarter);
  }

  /**
   * Returns products and additional data based on the entry group and search query provided.
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
   * @param searchConfig
   * Options for search.
   */
  public bundleAllowedProductsSearch(
    userId: string,
    cartId: string,
    entryGroupNumber: number,
    searchConfig?: SearchConfig
  ): Observable<CartModification> {
    return this.adapter.bundleAllowedProductsSearch(
      userId,
      cartId,
      entryGroupNumber,
      searchConfig
    );
  }

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
  public bundleAddEntry(
    userId: string,
    cartId: string,
    entryGroupNumber: number,
    entry: OrderEntry
  ): Observable<CartModification> {
    return this.adapter.bundleAddEntry(userId, cartId, entryGroupNumber, entry);
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
  public bundleDelete(
    userId: string,
    cartId: string,
    entryGroupNumber: number
  ): Observable<CartModification> {
    return this.adapter.bundleDelete(userId, cartId, entryGroupNumber);
  }
}
