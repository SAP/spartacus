import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  CART_MODIFICATION_NORMALIZER,
  ConverterService,
  OccEndpointsService,
  PRODUCT_SEARCH_PAGE_NORMALIZER,
  SearchConfig,
} from '@spartacus/core';
import { Observable } from 'rxjs';
import { BundleAdapter } from '../../core/connectors/bundle.adapter';
import { BundleStarter } from '../../core/model/bundle.model';

@Injectable()
export class OccBundleAdapter implements BundleAdapter {
  constructor(
    protected http: HttpClient,
    protected occEndpointsService: OccEndpointsService,
    protected converterService: ConverterService
  ) {}

  /**
   * Starts a bundle once the productCode, its quantity, and a bundle templateId is provided. A successful result returns a CartModification response.
   *
   * @param userId
   * User identifier or one of the literals : ‘current’ for currently authenticated user, ‘anonymous’ for anonymous user.
   *
   * @param cartId
   * Cart code for logged in user, cart guid for anonymous user, ‘current’ for the last modified cart.
   *
   * @param bundleStarter
   * Mandatory data required to start a bundle. This includes the templateId of the bundle, the productCode, and the quantity of the product itself.
   */
  public bundleStart(
    userId: string,
    cartId: string,
    bundleStarter: BundleStarter
  ): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    const url = this.occEndpointsService.getUrl('bundleStart', {
      userId,
      cartId,
    });

    return this.http
      .post<any>(url, <HttpParams>bundleStarter, { headers })
      .pipe(this.converterService.pipeable(CART_MODIFICATION_NORMALIZER));
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
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    const url = this.occEndpointsService.getUrl('bundleAllowedProductsSearch', {
      userId,
      cartId,
      entryGroupNumber,
    });

    return this.http
      .get<any>(url, {
        headers,
        params: <HttpParams>searchConfig,
      })
      .pipe(this.converterService.pipeable(PRODUCT_SEARCH_PAGE_NORMALIZER));
  }
}
