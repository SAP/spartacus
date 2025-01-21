/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
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
  OpfMetadataStatePersistanceService,
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
  OpfPaymentAfterRedirectScriptResponse,
  OpfPaymentInitiationConfig,
  OpfPaymentSessionData,
  OpfPaymentSubmitCompleteRequest,
  OpfPaymentSubmitCompleteResponse,
  OpfPaymentSubmitRequest,
  OpfPaymentSubmitResponse,
  OpfPaymentVerificationPayload,
  OpfPaymentVerificationResponse,
} from '@spartacus/opf/payment/root';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class OpfApiPaymentAdapter implements OpfPaymentAdapter {
  protected http = inject(HttpClient);
  protected converter = inject(ConverterService);
  protected opfEndpointsService = inject(OpfEndpointsService);
  protected config = inject(OpfConfig);
  protected opfMetadataStatePersistanceService = inject(
    OpfMetadataStatePersistanceService
  );
  protected logger = inject(LoggerService);

  protected headerWithNoLanguage: { [name: string]: string } = {
    accept: 'application/json',
    'Content-Type': 'application/json',
  };
  protected header: { [name: string]: string } = {
    ...this.headerWithNoLanguage,
    'Accept-Language':
      this.opfMetadataStatePersistanceService.getActiveLanguage(),
  };

  protected headerWithContentLanguage: { [name: string]: string } = {
    ...this.headerWithNoLanguage,
    'Content-Language':
      this.opfMetadataStatePersistanceService.getActiveLanguage(),
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
    submitRequest: OpfPaymentSubmitRequest,
    otpKey: string,
    paymentSessionId: string
  ): Observable<OpfPaymentSubmitResponse> {
    const headers = new HttpHeaders(this.header)
      .set(
        OPF_CC_PUBLIC_KEY_HEADER,
        this.config.opf?.commerceCloudPublicKey || ''
      )
      .set(OPF_CC_ACCESS_CODE_HEADER, otpKey || '');

    const url = this.getSubmitPaymentEndpoint(paymentSessionId);

    return this.http
      .post<OpfPaymentSubmitResponse>(url, submitRequest, { headers })
      .pipe(
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
    submitCompleteRequest: OpfPaymentSubmitCompleteRequest,
    otpKey: string,
    paymentSessionId: string
  ): Observable<OpfPaymentSubmitCompleteResponse> {
    const headers = new HttpHeaders(this.headerWithContentLanguage)
      .set(
        OPF_CC_PUBLIC_KEY_HEADER,
        this.config.opf?.commerceCloudPublicKey || ''
      )
      .set(OPF_CC_ACCESS_CODE_HEADER, otpKey || '');

    const url = this.getSubmitCompletePaymentEndpoint(paymentSessionId);

    return this.http
      .post<OpfPaymentSubmitCompleteResponse>(url, submitCompleteRequest, {
        headers,
      })
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

  getAfterRedirectScripts(
    paymentSessionId: string
  ): Observable<OpfPaymentAfterRedirectScriptResponse> {
    const headers = new HttpHeaders(this.header).set(
      OPF_CC_PUBLIC_KEY_HEADER,
      this.config.opf?.commerceCloudPublicKey || ''
    );

    const url = this.getAfterRedirectScriptsEndpoint(paymentSessionId);

    return this.http
      .get<OpfPaymentAfterRedirectScriptResponse>(url, { headers })
      .pipe(
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
    paymentConfig: OpfPaymentInitiationConfig
  ): Observable<OpfPaymentSessionData> {
    const headers = new HttpHeaders({
      'Accept-Language':
        this.opfMetadataStatePersistanceService.getActiveLanguage(),
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
      .post<OpfPaymentSessionData>(url, paymentConfig?.config, { headers })
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
    return this.opfEndpointsService.buildUrl('getAfterRedirectScripts', {
      urlParams: { paymentSessionId },
    });
  }

  protected getInitiatePaymentEndpoint(): string {
    return this.opfEndpointsService.buildUrl('initiatePayment');
  }
}
