/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
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
    params = params.append(paramName?.sessionId ?? '', sessionId);
    params = params.append(paramName?.signature ?? '', signature);
    if (billingAddress && paramName) {
      if (paramName.billingAddress) {
        params = params.append(paramName.billingAddress, true);
      }
      if (
        paramName.country &&
        billingAddress.country &&
        billingAddress.country.isocode
      ) {
        params = params.append(
          paramName.country,
          billingAddress.country.isocode
        );
      }
      if (paramName.firstName && billingAddress.firstName) {
        params = params.append(paramName.firstName, billingAddress.firstName);
      }
      if (paramName.lastName && billingAddress.lastName) {
        params = params.append(paramName.lastName, billingAddress.lastName);
      }
      if (paramName.line1 && billingAddress.line1) {
        params = params.append(paramName.line1, billingAddress.line1);
      }
      if (paramName.line2 && billingAddress.line2) {
        params = params.append(paramName.line2, billingAddress.line2);
      }
      if (paramName.town && billingAddress.town) {
        params = params.append(paramName.town, billingAddress.town);
      }
      if (
        paramName.region &&
        billingAddress.region &&
        billingAddress.region.isocodeShort
      ) {
        params = params.append(
          paramName.region,
          billingAddress.region.isocodeShort
        );
      }
      if (paramName.postalCode && billingAddress.postalCode) {
        params = params.append(paramName.postalCode, billingAddress.postalCode);
      }
    }
    return params;
  }
}
