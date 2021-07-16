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
import { DpPaymentRequest } from '../models';

@Injectable()
export class OccDigitalPaymentsAdapter implements DigitalPaymentsAdapter {
  private readonly paramEncoder = new HttpParamsURIEncoder();

  constructor(
    protected http: HttpClient,
    protected occEndpoints: OccEndpointsService
  ) {}

  createPaymentRequest(
    userId = CURRENT_USER,
    cartId = CURRENT_CART
  ): Observable<DpPaymentRequest> {
    const url = this.occEndpoints.buildUrl('paymentRequest', {
      urlParams: { userId, cartId },
    });
    return this.http.post<any>(url, null);
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
    const url = this.occEndpoints.buildUrl('paymentDetails', {
      urlParams: { userId, cartId },
    });
    return this.http.post<any>(url, null, { params: params });
  }
}
