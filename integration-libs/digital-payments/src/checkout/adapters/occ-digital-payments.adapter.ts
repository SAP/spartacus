import { CURRENT_USER, CURRENT_CART } from '../../utils/dp-constants';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  OccEndpointsService,
  Occ,
  HttpParamsURIEncoder,
} from '@spartacus/core';
import { Observable } from 'rxjs';
import { DigitalPaymentsAdapter } from './digital-payments.adapter';

@Injectable()
export class OccDigitalPaymentsAdapter implements DigitalPaymentsAdapter {
  private readonly paramEncoder = new HttpParamsURIEncoder();

  constructor(
    private http: HttpClient,
    private occEndpoints: OccEndpointsService
  ) {}

  createPaymentRequest(
    userId = CURRENT_USER,
    cartId = CURRENT_CART
  ): Observable<any> {
    return this.http.post<any>(
      `${this.occEndpoints.getBaseEndpoint()}/users/${userId}/carts/${cartId}/payment/digitalPayments/request`,
      null
    );
  }

  createPaymentDetails(
    sessionId: string,
    signature: string,
    userId = CURRENT_USER,
    cartId = CURRENT_CART
  ): Observable<Occ.PaymentDetails> {
    let params = new HttpParams({ encoder: this.paramEncoder });
    params = params.append('sid', sessionId);
    params = params.append('sign', signature);

    return this.http.post<any>(
      `${this.occEndpoints.getBaseEndpoint()}/users/${userId}/carts/${cartId}/payment/digitalPayments/response`,
      null,
      { params: params }
    );
  }
}
