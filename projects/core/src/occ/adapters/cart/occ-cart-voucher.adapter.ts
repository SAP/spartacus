import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CartVoucherAdapter } from '../../../cart/connectors/voucher/cart-voucher.adapter';
import { CART_VOUCHER_NORMALIZER } from '../../../cart/connectors/voucher/converters';
import { ConverterService } from '../../../util/converter.service';
import { OccEndpointsService } from '../../services/occ-endpoints.service';

@Injectable()
export class OccCartVoucherAdapter implements CartVoucherAdapter {
  constructor(
    protected http: HttpClient,
    protected occEndpoints: OccEndpointsService,
    protected converter: ConverterService
  ) {}

  protected getCartVoucherEndpoint(userId: string, cartId): string {
    const cartVoucherEndpoint = `users/${userId}/carts/${cartId}/vouchers`;
    return this.occEndpoints.getEndpoint(cartVoucherEndpoint);
  }

  add(userId: string, cartId: string, voucherId: string): Observable<{}> {
    const url = this.getCartVoucherEndpoint(userId, cartId);

    const toAdd = JSON.stringify({});
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });
    const params = new HttpParams({
      fromString: 'voucherId=' + voucherId,
    });

    return this.http.post(url, toAdd, { headers, params }).pipe(
      catchError((error: any) => throwError(error.json())),
      this.converter.pipeable(CART_VOUCHER_NORMALIZER)
    );
  }

  remove(userId: string, cartId: string, voucherId: string): Observable<{}> {
    const url = this.getCartVoucherEndpoint(userId, cartId) + '/' + voucherId;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http
      .delete(url, { headers })
      .pipe(catchError((error: any) => throwError(error)));
  }
}
