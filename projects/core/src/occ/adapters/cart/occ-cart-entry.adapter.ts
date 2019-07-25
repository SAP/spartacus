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
    protected occEndpoints: OccEndpointsService,
    protected converter: ConverterService
  ) {}

  protected getCartEndpoint(userId: string): string {
    const cartEndpoint = 'users/' + userId + '/carts/';
    return this.occEndpoints.getEndpoint(cartEndpoint);
  }

  public add(
    userId: string,
    cartId: string,
    productCode: string,
    quantity: number = 1
  ): Observable<CartModification> {
    const toAdd = JSON.stringify({});

    const url = this.getCartEndpoint(userId) + cartId + '/entries';

    const params = new HttpParams({
      fromString: 'code=' + productCode + '&qty=' + quantity,
    });

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });

    return this.http
      .post<CartModification>(url, toAdd, { headers, params })
      .pipe(this.converter.pipeable(CART_MODIFICATION_NORMALIZER));
  }

  public update(
    userId: string,
    cartId: string,
    entryNumber: string,
    qty: number,
    pickupStore?: string
  ): Observable<CartModification> {
    const url =
      this.getCartEndpoint(userId) + cartId + '/entries/' + entryNumber;

    let queryString = 'qty=' + qty;
    if (pickupStore) {
      queryString = queryString + '&pickupStore=' + pickupStore;
    }
    const params = new HttpParams({
      fromString: queryString,
    });

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });

    return this.http
      .patch<CartModification>(url, {}, { headers, params })
      .pipe(this.converter.pipeable(CART_MODIFICATION_NORMALIZER));
  }

  public remove(
    userId: string,
    cartId: string,
    entryNumber: string
  ): Observable<any> {
    const url =
      this.getCartEndpoint(userId) + cartId + '/entries/' + entryNumber;

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });

    return this.http.delete(url, { headers });
  }
}
