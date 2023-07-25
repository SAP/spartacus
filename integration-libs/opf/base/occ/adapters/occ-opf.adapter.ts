/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConverterService, backOff, isJaloError } from '@spartacus/core';
import {
  OPF_PAYMENT_SUBMIT_COMPLETE_NORMALIZER,
  OPF_PAYMENT_SUBMIT_NORMALIZER,
  OPF_PAYMENT_VERIFICATION_NORMALIZER,
  OpfEndpointsService,
  OpfPaymentAdapter,
} from '@spartacus/opf/base/core';
import {
  OPF_CC_OTP_KEY,
  OPF_CC_PUBLIC_KEY,
  OpfConfig,
  OpfPaymentVerificationPayload,
  OpfPaymentVerificationResponse,
  SubmitCompleteRequest,
  SubmitCompleteResponse,
  SubmitRequest,
  SubmitResponse,
} from '@spartacus/opf/base/root';
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

  header: { [name: string]: string } = {
    accept: 'application/json',
    'Content-Type': 'application/json',
    'Content-Language': 'en-us',
  };

  verifyPayment(
    paymentSessionId: string,
    payload: OpfPaymentVerificationPayload
  ): Observable<OpfPaymentVerificationResponse> {
    const headers = new HttpHeaders(this.header).set(
      OPF_CC_PUBLIC_KEY,
      this.config.opf?.commerceCloudPublicKey || ''
    );

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

  submitPayment(
    submitRequest: SubmitRequest,
    otpKey: string,
    paymentSessionId: string
  ): Observable<SubmitResponse> {
    const headers = new HttpHeaders(this.header)
      .set(OPF_CC_PUBLIC_KEY, this.config.opf?.commerceCloudPublicKey || '')
      .set(OPF_CC_OTP_KEY, otpKey || '');

    const url = this.getSubmitPaymentEndpoint(paymentSessionId);

    return this.http.post<SubmitResponse>(url, submitRequest, { headers }).pipe(
      catchError((error) => throwError(error)),
      backOff({
        shouldRetry: isJaloError,
      }),
      backOff({
        shouldRetry: isHttp500Error,
        maxTries: 2,
      }),
      this.converter.pipeable(OPF_PAYMENT_SUBMIT_NORMALIZER)
    );
  }

  submitCompletePayment(
    submitCompleteRequest: SubmitCompleteRequest,
    otpKey: string,
    paymentSessionId: string
  ): Observable<SubmitCompleteResponse> {
    const headers = new HttpHeaders(this.header)
      .set(OPF_CC_PUBLIC_KEY, this.config.opf?.commerceCloudPublicKey || '')
      .set(OPF_CC_OTP_KEY, otpKey || '');

    const url = this.getSubmitCompletePaymentEndpoint(paymentSessionId);

    return this.http
      .post<SubmitCompleteResponse>(url, submitCompleteRequest, { headers })
      .pipe(
        catchError((error) => throwError(error)),
        backOff({
          shouldRetry: isJaloError,
        }),
        backOff({
          shouldRetry: isHttp500Error,
          maxTries: 2,
        }),
        this.converter.pipeable(OPF_PAYMENT_SUBMIT_COMPLETE_NORMALIZER)
      );
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
