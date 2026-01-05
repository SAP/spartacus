/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import {
  Address,
  ConverterService,
  HttpParamsURIEncoder,
  Occ,
  OccEndpointsService,
  PaymentDetails,
} from '@spartacus/core';
import { Observable } from 'rxjs';
import { CURRENT_CART } from '../../utils/dp-constants';
import { DpPaymentRequest } from '../models/dp-checkout.model';
import { DP_DETAILS_NORMALIZER, DP_REQUEST_NORMALIZER } from './converters';
import { DigitalPaymentsAdapter } from './digital-payments.adapter';
import { OccDpPaymentRequest } from './occ.models';
import { DigitalPaymentsConfig } from './config';

@Injectable()
export class OccDigitalPaymentsAdapter implements DigitalPaymentsAdapter {
  private readonly paramEncoder = new HttpParamsURIEncoder();
  protected config = inject(DigitalPaymentsConfig);

  constructor(
    protected http: HttpClient,
    protected occEndpoints: OccEndpointsService,
    protected converter: ConverterService
  ) {}

  createPaymentRequest(
    userId: string,
    cartId = CURRENT_CART
  ): Observable<DpPaymentRequest> {
    const url = this.occEndpoints.buildUrl('paymentRequest', {
      urlParams: { userId, cartId },
    });
    return this.http
      .post<OccDpPaymentRequest>(url, null)
      .pipe(this.converter.pipeable(DP_REQUEST_NORMALIZER));
  }

  createPaymentDetails(
    sessionId: string,
    signature: string,
    userId: string,
    cartId = CURRENT_CART,
    billingAddress?: Address
  ): Observable<PaymentDetails> {
    const params = this.getDpHttpParams(sessionId, signature, billingAddress);
    const url = this.occEndpoints.buildUrl('paymentDetails', {
      urlParams: { userId, cartId },
    });
    return this.http
      .post<Occ.PaymentDetails>(url, null, { params: params })
      .pipe(this.converter.pipeable(DP_DETAILS_NORMALIZER));
  }

  protected getDpHttpParams(
    sessionId: string,
    signature: string,
    billingAddress?: Address
  ): HttpParams {
    let params = new HttpParams({ encoder: this.paramEncoder });
    const paramName = this.config.digitalPayments?.occQueryParams;

    params = this.appendParam(params, paramName?.sessionId, sessionId);
    params = this.appendParam(params, paramName?.signature, signature);

    if (billingAddress && paramName) {
      params = this.appendBillingAddressParams(
        params,
        paramName,
        billingAddress
      );
    }

    return params;
  }

  private appendParam(
    params: HttpParams,
    paramName: string | undefined,
    paramValue: string | undefined
  ): HttpParams {
    if (paramName && paramValue) {
      params = params.append(paramName, paramValue);
    }
    return params;
  }

  private appendBillingAddressParams(
    params: HttpParams,
    paramName: any,
    billingAddress: Address
  ): HttpParams {
    params = this.appendParam(params, paramName.billingAddress, 'true');
    params = this.appendParam(
      params,
      paramName.country,
      billingAddress.country?.isocode
    );
    params = this.appendParam(
      params,
      paramName.firstName,
      billingAddress.firstName
    );
    params = this.appendParam(
      params,
      paramName.lastName,
      billingAddress.lastName
    );
    params = this.appendParam(params, paramName.line1, billingAddress.line1);
    params = this.appendParam(params, paramName.line2, billingAddress.line2);
    params = this.appendParam(params, paramName.town, billingAddress.town);
    params = this.appendParam(
      params,
      paramName.region,
      billingAddress.region?.isocodeShort
    );
    params = this.appendParam(
      params,
      paramName.postalCode,
      billingAddress.postalCode
    );

    return params;
  }
}
