/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  ConverterService,
  backOff,
  isJaloError,
  normalizeHttpError,
} from '@spartacus/core';
import {
  OPF_PAYMENT_VERIFICATION_NORMALIZER,
  OpfEndpointsService,
  OpfPaymentAdapter,
} from '@spartacus/opf/base/core';
import {
  OPF_CC_PUBLIC_KEY,
  OpfConfig,
  OpfPaymentVerificationPayload,
  OpfPaymentVerificationResponse,
  SubmitCompleteRequest,
  SubmitCompleteResponse,
  SubmitRequest,
  SubmitResponse,
} from '@spartacus/opf/base/root';

import { OPF_CC_OTP_KEY } from '@spartacus/opf/base/root';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { isHttp500Error } from '../utils/opf-occ-http-error-handlers';

@Injectable()
export class OccOpfPaymentAdapter implements OpfPaymentAdapter {
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

  submitPayment(submitRequest: SubmitRequest): Observable<SubmitResponse> {
    console.log('flo adapter submitRequest', submitRequest);

    const headers = new HttpHeaders({
      accept: 'application/json',
      'Content-Type': 'application/json',
      'Content-Language': 'en-us',
    })
      .set(OPF_CC_PUBLIC_KEY, this.config.opf?.commerceCloudPublicKey || '')
      .set(OPF_CC_OTP_KEY, submitRequest?.otpKey || '');

    const url = this.getSubmitPaymentEndpoint(
      submitRequest.paymentSessionId as string
    );
    delete submitRequest.otpKey;
    delete submitRequest.paymentSessionId;
    return this.http
      .post<SubmitResponse>(url, submitRequest, { headers })
      .pipe(catchError((error) => throwError(normalizeHttpError(error))));
  }

  submitCompletePayment(
    submitCompleteRequest: SubmitCompleteRequest
  ): Observable<SubmitCompleteResponse> {
    console.log('flo adapter submitCompleteRequest', submitCompleteRequest);

    const headers = new HttpHeaders({
      accept: 'application/json',
      'Content-Type': 'application/json',
      'Content-Language': 'en-us',
    })
      .set(OPF_CC_PUBLIC_KEY, this.config.opf?.commerceCloudPublicKey || '')
      .set(OPF_CC_OTP_KEY, submitCompleteRequest?.otpKey || '');

    const url = this.getSubmitCompletePaymentEndpoint(
      submitCompleteRequest.paymentSessionId as string
    );
    delete submitCompleteRequest.otpKey;
    delete submitCompleteRequest.paymentSessionId;
    return this.http
      .post<SubmitCompleteResponse>(url, submitCompleteRequest, { headers })
      .pipe(catchError((error) => throwError(normalizeHttpError(error))));
  }

  protected verifyPaymentEndpoint(paymentSessionId: string): string {
    return this.opfEndpointsService.buildUrl('verifyPayment', {
      urlParams: { paymentSessionId },
    });
  }

  protected getSubmitPaymentEndpoint(paymentSessionId: string): string {
    return this.opfEndpointsService.buildUrl('submitPayment', {
      urlParams: { paymentSessionId },
    });
  }

  protected getSubmitCompletePaymentEndpoint(paymentSessionId: string): string {
    return this.opfEndpointsService.buildUrl('submitCompletePayment', {
      urlParams: { paymentSessionId },
    });
  }
}
