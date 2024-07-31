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
  isJaloError,
  normalizeHttpError,
} from '@spartacus/core';
import {
  OPF_ACTIVE_CONFIGURATION_NORMALIZER,
  OPF_AFTER_REDIRECT_SCRIPTS_NORMALIZER,
  OPF_APPLE_PAY_WEB_SESSION_NORMALIZER,
  OPF_CTA_SCRIPTS_NORMALIZER,
  OPF_PAYMENT_SUBMIT_COMPLETE_NORMALIZER,
  OPF_PAYMENT_SUBMIT_NORMALIZER,
  OPF_PAYMENT_VERIFICATION_NORMALIZER,
  OpfEndpointsService,
  OpfPaymentAdapter,
  isHttp500Error,
} from '@spartacus/opf/base/core';
import {
  ActiveConfiguration,
  AfterRedirectScriptResponse,
  ApplePaySessionVerificationRequest,
  ApplePaySessionVerificationResponse,
  CtaScriptsRequest,
  CtaScriptsResponse,
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

@Injectable()
export class OccOpfPaymentAdapter implements OpfPaymentAdapter {
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
        catchError((error) =>
          throwError(normalizeHttpError(error, this.logger))
        ),
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
      catchError((error) => throwError(normalizeHttpError(error, this.logger))),
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
    const headers = new HttpHeaders(this.headerWithContentLanguage)
      .set(OPF_CC_PUBLIC_KEY, this.config.opf?.commerceCloudPublicKey || '')
      .set(OPF_CC_OTP_KEY, otpKey || '');

    const url = this.getSubmitCompletePaymentEndpoint(paymentSessionId);

    return this.http
      .post<SubmitCompleteResponse>(url, submitCompleteRequest, { headers })
      .pipe(
        catchError((error) =>
          throwError(normalizeHttpError(error, this.logger))
        ),
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

  afterRedirectScripts(
    paymentSessionId: string
  ): Observable<AfterRedirectScriptResponse> {
    const headers = new HttpHeaders(this.header).set(
      OPF_CC_PUBLIC_KEY,
      this.config.opf?.commerceCloudPublicKey || ''
    );

    const url = this.getAfterRedirectScriptsEndpoint(paymentSessionId);

    return this.http.get<AfterRedirectScriptResponse>(url, { headers }).pipe(
      catchError((error) => throwError(error)),
      backOff({
        shouldRetry: isJaloError,
      }),
      backOff({
        shouldRetry: isHttp500Error,
        maxTries: 2,
      }),
      this.converter.pipeable(OPF_AFTER_REDIRECT_SCRIPTS_NORMALIZER)
    );
  }

  getActiveConfigurations(): Observable<ActiveConfiguration[]> {
    const headers = new HttpHeaders(this.header).set(
      OPF_CC_PUBLIC_KEY,
      this.config.opf?.commerceCloudPublicKey || ''
    );

    return this.http
      .get<ActiveConfiguration[]>(this.getActiveConfigurationsEndpoint(), {
        headers,
      })
      .pipe(
        catchError((error) =>
          throwError(normalizeHttpError(error, this.logger))
        ),
        backOff({
          shouldRetry: isJaloError,
        }),
        this.converter.pipeable(OPF_ACTIVE_CONFIGURATION_NORMALIZER)
      );
  }

  getCtaScripts(
    ctaScriptsRequest: CtaScriptsRequest
  ): Observable<CtaScriptsResponse> {
    const headers = new HttpHeaders(this.header).set(
      OPF_CC_PUBLIC_KEY,
      this.config.opf?.commerceCloudPublicKey || ''
    );

    const url = this.getCtaScriptsEndpoint();

    return this.http
      .post<SubmitResponse>(url, ctaScriptsRequest, { headers })
      .pipe(
        catchError((error) =>
          throwError(normalizeHttpError(error, this.logger))
        ),
        backOff({
          shouldRetry: isJaloError,
        }),
        backOff({
          shouldRetry: isHttp500Error,
          maxTries: 2,
        }),
        this.converter.pipeable(OPF_CTA_SCRIPTS_NORMALIZER)
      );
  }

  getApplePayWebSession(
    applePayWebSessionRequest: ApplePaySessionVerificationRequest,
    otpKey: string
  ): Observable<ApplePaySessionVerificationResponse> {
    const headers = new HttpHeaders(this.headerWithContentLanguage)
      .set(OPF_CC_PUBLIC_KEY, this.config.opf?.commerceCloudPublicKey || '')
      .set(OPF_CC_OTP_KEY, otpKey || '');

    const url = this.getApplePayWebSessionEndpoint();

    return this.http
      .post<ApplePaySessionVerificationResponse>(
        url,
        applePayWebSessionRequest,
        { headers }
      )
      .pipe(
        catchError((error) =>
          throwError(normalizeHttpError(error, this.logger))
        ),
        backOff({
          shouldRetry: isJaloError,
        }),
        backOff({
          shouldRetry: isHttp500Error,
          maxTries: 2,
        }),
        this.converter.pipeable(OPF_APPLE_PAY_WEB_SESSION_NORMALIZER)
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

  protected getActiveConfigurationsEndpoint(): string {
    return this.opfEndpointsService.buildUrl('getActiveConfigurations');
  }

  protected getCtaScriptsEndpoint(): string {
    return this.opfEndpointsService.buildUrl('getCtaScripts');
  }

  protected getApplePayWebSessionEndpoint(): string {
    return this.opfEndpointsService.buildUrl('getApplePayWebSession');
  }
}
