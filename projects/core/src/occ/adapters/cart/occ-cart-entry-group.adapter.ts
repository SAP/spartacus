import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CART_MODIFICATION_NORMALIZER } from '../../../cart/connectors/entry/converters';
import { CartModification } from '../../../model/cart.model';
import { ConverterService } from '../../../util/converter.service';
import { OccEndpointsService } from '../../services/occ-endpoints.service';
import { OrderEntry } from '../../../model';
import { CartEntryGroupAdapter } from '../../../cart/connectors/entry-group/cart-entry-group.adapter';

@Injectable()
export class OccCartEntryGroupAdapter implements CartEntryGroupAdapter {
  constructor(
    protected http: HttpClient,
    protected occEndpointsService: OccEndpointsService,
    protected converterService: ConverterService
  ) {}

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
    const toAdd = JSON.stringify({
      entry: entry,
    });

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    const url = this.occEndpointsService.getUrl('addToEntryGroup', {
      userId,
      cartId,
      entryGroupNumber,
    });

    return this.http
      .post<CartModification>(url, toAdd, { headers })
      .pipe(this.converterService.pipeable(CART_MODIFICATION_NORMALIZER));
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
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    const url = this.occEndpointsService.getUrl('deleteEntryGroup', {
      userId,
      cartId,
      entryGroupNumber,
    });

    return this.http
      .delete<CartModification>(url, { headers })
      .pipe(this.converterService.pipeable(CART_MODIFICATION_NORMALIZER));
  }
}
