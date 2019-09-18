import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CartVoucherAdapter } from '../../../cart/connectors/voucher/cart-voucher.adapter';
import { CART_VOUCHER_NORMALIZER } from '../../../cart/connectors/voucher/converters';
import { OCC_USER_ID_ANONYMOUS } from '../../../occ/utils/occ-constants';
import { ConverterService } from '../../../util/converter.service';
import { OccEndpointsService } from '../../services/occ-endpoints.service';
import {
  InterceptorUtil,
  USE_CLIENT_TOKEN,
} from '../../utils/interceptor-util';

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
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    if (userId === OCC_USER_ID_ANONYMOUS) {
      headers = InterceptorUtil.createHeader(USE_CLIENT_TOKEN, true, headers);
    }

    const params: HttpParams = new HttpParams().set('voucherId', voucherId);

    return this.http.post(url, toAdd, { headers, params }).pipe(
      catchError((error: any) => throwError(error.json())),
      this.converter.pipeable(CART_VOUCHER_NORMALIZER)
    );
  }

  remove(userId: string, cartId: string, voucherId: string): Observable<{}> {
    const url =
      this.getCartVoucherEndpoint(userId, cartId) +
      '/' +
      encodeURIComponent(voucherId);
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    if (userId === OCC_USER_ID_ANONYMOUS) {
      headers = InterceptorUtil.createHeader(USE_CLIENT_TOKEN, true, headers);
    }

    return this.http
      .delete(url, { headers })
      .pipe(catchError((error: any) => throwError(error)));
  }
}
