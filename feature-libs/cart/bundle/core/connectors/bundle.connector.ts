import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { BundleStarter } from '../model/bundle.model';
import { BundleAdapter } from './bundle.adapter';
import { SearchConfig } from '@spartacus/core';

@Injectable({
  providedIn: 'root',
})
export class BundleConnector {
  constructor(protected adapter: BundleAdapter) {}

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
  ): Observable<any> {
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
  ): Observable<any> {
    return this.adapter.bundleAllowedProductsSearch(
      userId,
      cartId,
      entryGroupNumber,
      searchConfig
    );
  }
}
