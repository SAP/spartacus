import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CartVoucherAdapter } from '../../../cart/connectors/voucher/cart-voucher.adapter';
import { CART_VOUCHER_NORMALIZER } from '../../../cart/connectors/voucher/converters';
import { OCC_USER_ID_ANONYMOUS } from '../../utils/occ-constants';
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
    return this.occEndpoints.buildUrl('cartVoucher', {
      urlParams: { userId, cartId },
    });
  }

  protected getHeaders(userId: string): HttpHeaders {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    if (userId === OCC_USER_ID_ANONYMOUS) {
      headers = InterceptorUtil.createHeader(USE_CLIENT_TOKEN, true, headers);
    }

    return headers;
  }

  add(userId: string, cartId: string, voucherId: string): Observable<{}> {
    const url = this.getCartVoucherEndpoint(userId, cartId);

    const toAdd = JSON.stringify({});

    const params: HttpParams = new HttpParams().set('voucherId', voucherId);

    const headers = this.getHeaders(userId);

    return this.http.post(url, toAdd, { headers, params }).pipe(
      catchError((error: any) => throwError(error)),
      this.converter.pipeable(CART_VOUCHER_NORMALIZER)
    );
  }

  remove(userId: string, cartId: string, voucherId: string): Observable<{}> {
    const url =
      this.getCartVoucherEndpoint(userId, cartId) +
      '/' +
      encodeURIComponent(voucherId);

    const headers = this.getHeaders(userId);

    return this.http
      .delete(url, { headers })
      .pipe(catchError((error: any) => throwError(error)));
  }
}
