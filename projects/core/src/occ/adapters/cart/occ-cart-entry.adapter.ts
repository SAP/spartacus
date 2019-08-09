import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CartEntryAdapter } from '../../../cart/connectors/entry/cart-entry.adapter';
import { CART_MODIFICATION_NORMALIZER } from '../../../cart/connectors/entry/converters';
import { CartModification } from '../../../model/cart.model';
import { ConverterService } from '../../../util/converter.service';
import { OccEndpointsService } from '../../services/occ-endpoints.service';

@Injectable()
export class OccCartEntryAdapter implements CartEntryAdapter {
  constructor(
    protected http: HttpClient,
    protected occEndpointsService: OccEndpointsService,
    protected converterService: ConverterService
  ) {}

  /**
   * @deprecated Since 1.1
   * Use configurable endpoints. Will be removed as of 2.0.
   */
  protected getCartEndpoint(_userId: string): string {
    return;
  }

  public add(
    userId: string,
    cartId: string,
    productCode: string,
    quantity: number = 1
  ): Observable<CartModification> {
    const toAdd = JSON.stringify({});

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });

    // TODO 2.0: Remove legacyUrl and all uses
    const legacyUrl = this.getCartEndpoint(userId);

    // TODO 2.0: Remove
    if (legacyUrl) {
      return this.legacyAdd(
        legacyUrl,
        headers,
        toAdd,
        cartId,
        productCode,
        quantity
      );
    }

    const url = this.occEndpointsService.getUrl('addEntries', {
      userId,
      cartId,
      productCode,
      quantity,
    });

    return this.http
      .post<CartModification>(url, toAdd, { headers })
      .pipe(this.converterService.pipeable(CART_MODIFICATION_NORMALIZER));
  }

  public update(
    userId: string,
    cartId: string,
    entryNumber: string,
    qty: number,
    pickupStore?: string
  ): Observable<CartModification> {
    let params = {};
    if (pickupStore) {
      params = { pickupStore };
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });

    // TODO 2.0: Remove legacyUrl and all uses
    const legacyUrl = this.getCartEndpoint(userId);

    // TODO 2.0: Remove
    if (legacyUrl) {
      return this.legacyUpdate(
        legacyUrl,
        headers,
        cartId,
        entryNumber,
        qty,
        pickupStore
      );
    }

    const url = this.occEndpointsService.getUrl(
      'updateEntries',
      { userId, cartId, entryNumber, quantity: qty },
      params
    );

    return this.http
      .patch<CartModification>(url, {}, { headers })
      .pipe(this.converterService.pipeable(CART_MODIFICATION_NORMALIZER));
  }

  public remove(
    userId: string,
    cartId: string,
    entryNumber: string
  ): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });

    // TODO 2.0: Remove legacyUrl and all uses
    const legacyUrl = this.getCartEndpoint(userId);

    // TODO 2.0: Remove
    if (legacyUrl) {
      return this.legacyRemove(legacyUrl, headers, cartId, entryNumber);
    }

    const url = this.occEndpointsService.getUrl('removeEntries', {
      userId,
      cartId,
      entryNumber,
    });

    return this.http.delete(url, { headers });
  }

  /**
   * @deprecated Since 1.1
   * Use configurable endpoints. Will be removed as of 2.0.
   */
  private legacyAdd(
    legacyUrl: string,
    headers: HttpHeaders,
    toAdd: string,
    cartId: string,
    productCode: string,
    quantity: number = 1
  ): Observable<CartModification> {
    const url = legacyUrl + cartId + '/entries';

    const params = new HttpParams({
      fromString: 'code=' + productCode + '&qty=' + quantity,
    });

    return this.http
      .post<CartModification>(url, toAdd, { headers, params })
      .pipe(this.converterService.pipeable(CART_MODIFICATION_NORMALIZER));
  }

  /**
   * @deprecated Since 1.1
   * Use configurable endpoints. Will be removed as of 2.0.
   */
  private legacyUpdate(
    legacyUrl: string,
    headers: HttpHeaders,
    cartId: string,
    entryNumber: string,
    qty: number,
    pickupStore?: string
  ): Observable<CartModification> {
    const url = legacyUrl + cartId + '/entries/' + entryNumber;
    let queryString = 'qty=' + qty;

    if (pickupStore) {
      queryString = queryString + '&pickupStore=' + pickupStore;
    }
    const params = new HttpParams({
      fromString: queryString,
    });
    return this.http
      .patch<CartModification>(url, {}, { headers, params })
      .pipe(this.converterService.pipeable(CART_MODIFICATION_NORMALIZER));
  }

  /**
   * @deprecated Since 1.1
   * Use configurable endpoints. Will be removed as of 2.0.
   */
  private legacyRemove(
    legacyUrl: string,
    headers: HttpHeaders,
    cartId: string,
    entryNumber: string
  ): Observable<any> {
    const url = legacyUrl + cartId + '/entries/' + entryNumber;
    return this.http.delete(url, { headers });
  }
}
