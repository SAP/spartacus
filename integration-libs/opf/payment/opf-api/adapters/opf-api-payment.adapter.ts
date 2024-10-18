/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import {
  ConverterService,
  LoggerService,
  backOff,
  isServerError,
  tryNormalizeHttpError,
} from '@spartacus/core';
import { OpfEndpointsService } from '@spartacus/opf/base/core';
import {
  OPF_CC_ACCESS_CODE_HEADER,
  OPF_CC_PUBLIC_KEY_HEADER,
  OpfConfig,
} from '@spartacus/opf/base/root';
import {
  OPF_AFTER_REDIRECT_SCRIPTS_NORMALIZER,
  OPF_PAYMENT_CONFIG_SERIALIZER,
  OPF_PAYMENT_SUBMIT_COMPLETE_NORMALIZER,
  OPF_PAYMENT_SUBMIT_NORMALIZER,
  OPF_PAYMENT_VERIFICATION_NORMALIZER,
  OpfPaymentAdapter,
} from '@spartacus/opf/payment/core';
import {
  AfterRedirectScriptResponse,
  OpfPaymentVerificationPayload,
  OpfPaymentVerificationResponse,
  PaymentInitiationConfig,
  PaymentSessionData,
  SubmitCompleteRequest,
  SubmitCompleteResponse,
  SubmitRequest,
  SubmitResponse,
} from '@spartacus/opf/payment/root';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class OpfApiPaymentAdapter implements OpfPaymentAdapter {
  protected logger = inject(LoggerService);

  constructor(
    protected http: HttpClient,
    protected converter: ConverterService,
    protected opfEndpointsService: OpfEndpointsService,
    protected config: OpfConfig
  ) {}

  protected headerWithNoLanguage: { [name: string]: string } = {
    accept: 'application/json',
    'Content-Type': 'application/json',
  };
  protected header: { [name: string]: string } = {
    ...this.headerWithNoLanguage,
    'Accept-Language': 'en-us',
  };

  protected headerWithContentLanguage: { [name: string]: string } = {
    ...this.headerWithNoLanguage,
    'Content-Language': 'en-us',
  };

  verifyPayment(
    paymentSessionId: string,
    payload: OpfPaymentVerificationPayload
  ): Observable<OpfPaymentVerificationResponse> {
    const headers = new HttpHeaders(this.headerWithNoLanguage).set(
      OPF_CC_PUBLIC_KEY_HEADER,
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
        catchError((error) => {
          throw tryNormalizeHttpError(error, this.logger);
        }),
        backOff({
          shouldRetry: isServerError,
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
      .set(
        OPF_CC_PUBLIC_KEY_HEADER,
        this.config.opf?.commerceCloudPublicKey || ''
      )
      .set(OPF_CC_ACCESS_CODE_HEADER, otpKey || '');

    const url = this.getSubmitPaymentEndpoint(paymentSessionId);

    return this.http.post<SubmitResponse>(url, submitRequest, { headers }).pipe(
      catchError((error) => {
        throw tryNormalizeHttpError(error, this.logger);
      }),
      backOff({
        shouldRetry: isServerError,
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
    const headers = new HttpHeaders(this.headerWithContentLanguage)
      .set(
        OPF_CC_PUBLIC_KEY_HEADER,
        this.config.opf?.commerceCloudPublicKey || ''
      )
      .set(OPF_CC_ACCESS_CODE_HEADER, otpKey || '');

    const url = this.getSubmitCompletePaymentEndpoint(paymentSessionId);

    return this.http
      .post<SubmitCompleteResponse>(url, submitCompleteRequest, { headers })
      .pipe(
        catchError((error) => {
          throw tryNormalizeHttpError(error, this.logger);
        }),
        backOff({
          shouldRetry: isServerError,
          maxTries: 2,
        }),
        this.converter.pipeable(OPF_PAYMENT_SUBMIT_COMPLETE_NORMALIZER)
      );
  }

  afterRedirectScripts(
    paymentSessionId: string
  ): Observable<AfterRedirectScriptResponse> {
    const headers = new HttpHeaders(this.header).set(
      OPF_CC_PUBLIC_KEY_HEADER,
      this.config.opf?.commerceCloudPublicKey || ''
    );

    const url = this.getAfterRedirectScriptsEndpoint(paymentSessionId);

    return this.http.get<AfterRedirectScriptResponse>(url, { headers }).pipe(
      catchError((error) => {
        throw tryNormalizeHttpError(error, this.logger);
      }),
      backOff({
        shouldRetry: isServerError,
        maxTries: 2,
      }),
      this.converter.pipeable(OPF_AFTER_REDIRECT_SCRIPTS_NORMALIZER)
    );
  }

  initiatePayment(
    paymentConfig: PaymentInitiationConfig
  ): Observable<PaymentSessionData> {
    const headers = new HttpHeaders({
      'Accept-Language': 'en-us',
    })
      .set(
        OPF_CC_PUBLIC_KEY_HEADER,
        this.config.opf?.commerceCloudPublicKey || ''
      )
      .set(OPF_CC_ACCESS_CODE_HEADER, paymentConfig?.otpKey || '');

    const url = this.getInitiatePaymentEndpoint();

    paymentConfig = this.converter.convert(
      paymentConfig,
      OPF_PAYMENT_CONFIG_SERIALIZER
    );

    return this.http
      .post<PaymentSessionData>(url, paymentConfig?.config, { headers })
      .pipe(
        catchError((error) => {
          throw tryNormalizeHttpError(error, this.logger);
        })
      );
  }

  protected verifyPaymentEndpoint(paymentSessionId: string): string {
    return this.opfEndpointsService.buildUrl('verifyPayment', {
      urlParams: { paymentSessionId },
    });
  }

  protected getSubmitPaymentEndpoint(paymentSessionId: string): string {
    return this.opfEndpointsService
      .buildUrl('submitPayment', {
        urlParams: { paymentSessionId },
      })
      .replace('//submit', '/submit');
  }

  protected getSubmitCompletePaymentEndpoint(paymentSessionId: string): string {
    return this.opfEndpointsService.buildUrl('submitCompletePayment', {
      urlParams: { paymentSessionId },
    });
  }

  protected getAfterRedirectScriptsEndpoint(paymentSessionId: string): string {
    return this.opfEndpointsService.buildUrl('afterRedirectScripts', {
      urlParams: { paymentSessionId },
    });
  }

  protected getInitiatePaymentEndpoint(): string {
    return this.opfEndpointsService.buildUrl('initiatePayment');
  }
}
