import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { CartModification } from '../../../model/cart.model';
import { CartBundleAdapter } from './cart-bundle.adapter';
import { Product } from 'projects/core/src/model/product.model';
import { SearchConfig } from 'projects/core/src/product/model/search-config';

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
   * @param productCode
   * Product code.
   *
   * @param quantity
   * Quantity of the product added to cart.
   *
   * @param templateId
   * Id of a template to create a bundle.
   */
  public bundleStart(
    userId: string,
    cartId: string,
    productCode: string,
    quantity: number,
    templateId: string
  ): Observable<CartModification> {
    return this.adapter.bundleStart(
      userId,
      cartId,
      productCode,
      quantity,
      templateId
    );
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
   * @param productCode
   * Product code.
   *
   * @param quantity
   * Quantity of the product added to cart.
   */
  public bundleAddEntry(
    userId: string,
    cartId: string,
    entryGroupNumber: number,
    product: Product,
    quantity: number
  ): Observable<CartModification> {
    return this.adapter.bundleAddEntry(
      userId,
      cartId,
      entryGroupNumber,
      product,
      quantity
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
  public bundleDelete(
    userId: string,
    cartId: string,
    entryGroupNumber: number
  ): Observable<CartModification> {
    return this.adapter.bundleDelete(userId, cartId, entryGroupNumber);
  }
}
