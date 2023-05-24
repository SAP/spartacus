/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { backOff, ConverterService, isJaloError } from '@spartacus/core';
import {
  OpfEndpointsService,
  OpfPaymentAdapter,
  OPF_PAYMENT_VERIFICATION_NORMALIZER,
} from 'integration-libs/opf/base/core/public_api';
import {
  OpfConfig,
  OpfPaymentVerificationPayload,
  OpfPaymentVerificationResponse,
  OPF_CC_PUBLIC_KEY,
} from 'integration-libs/opf/base/root/public_api';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { isHttp500Error } from '../utils/opf-occ-http-error-handlers';

@Injectable()
export class OccOpfAdapter implements OpfPaymentAdapter {
  constructor(
    protected http: HttpClient,
    protected converter: ConverterService,
    protected opfEndpointsService: OpfEndpointsService,
    protected config: OpfConfig
  ) {}

  verifyPayment(
    paymentSessionId: string,
    payload: OpfPaymentVerificationPayload
  ): Observable<OpfPaymentVerificationResponse> {
    const headers = new HttpHeaders({
      accept: 'application/json',
      'Content-Type': 'application/json',
      'Content-Language': 'en-us',
    }).set(OPF_CC_PUBLIC_KEY, this.config.opf?.commerceCloudPublicKey || '');

    return this.http
      .post<OpfPaymentVerificationResponse>(
        this.verifyPaymentEndpoint(paymentSessionId),
        JSON.stringify(payload),
        {
          headers,
        }
      )
      .pipe(
        catchError((error) => throwError(error)),
        backOff({
          shouldRetry: isJaloError,
        }),
        backOff({
          shouldRetry: isHttp500Error,
          maxTries: 2,
        }),
        this.converter.pipeable(OPF_PAYMENT_VERIFICATION_NORMALIZER)
      );
  }

  protected verifyPaymentEndpoint(paymentSessionId: string): string {
    return this.opfEndpointsService.buildUrl('verifyPayment', {
      urlParams: { paymentSessionId },
    });
  }
}
