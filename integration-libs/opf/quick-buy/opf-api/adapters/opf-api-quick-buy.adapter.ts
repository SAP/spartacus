/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {
  backOff,
  ConverterService,
  isServerError,
  LoggerService,
  tryNormalizeHttpError,
} from '@spartacus/core';
import { OpfEndpointsService } from '@spartacus/opf/base/core';
import {
  OPF_CC_ACCESS_CODE_HEADER,
  OPF_CC_PUBLIC_KEY_HEADER,
  OpfConfig,
} from '@spartacus/opf/base/root';
import {
  OPF_APPLE_PAY_WEB_SESSION_NORMALIZER,
  OpfQuickBuyAdapter,
} from '@spartacus/opf/quick-buy/core';
import {
  ApplePaySessionVerificationRequest,
  ApplePaySessionVerificationResponse,
} from '@spartacus/opf/quick-buy/root';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class OpfApiQuickBuyAdapter implements OpfQuickBuyAdapter {
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

  protected headerWithContentLanguage: { [name: string]: string } = {
    ...this.headerWithNoLanguage,
    'Content-Language': 'en-us',
  };

  getApplePayWebSession(
    applePayWebSessionRequest: ApplePaySessionVerificationRequest,
    accessCode: string
  ): Observable<ApplePaySessionVerificationResponse> {
    const headers = new HttpHeaders(this.headerWithContentLanguage)
      .set(
        OPF_CC_PUBLIC_KEY_HEADER,
        this.config.opf?.commerceCloudPublicKey || ''
      )
      .set(OPF_CC_ACCESS_CODE_HEADER, accessCode || '');

    const url = this.getApplePayWebSessionEndpoint();

    return this.http
      .post<ApplePaySessionVerificationResponse>(
        url,
        applePayWebSessionRequest,
        { headers }
      )
      .pipe(
        catchError((error) => {
          throw tryNormalizeHttpError(error, this.logger);
        }),
        backOff({
          shouldRetry: isServerError,
          maxTries: 2,
        }),
        this.converter.pipeable(OPF_APPLE_PAY_WEB_SESSION_NORMALIZER)
      );
  }

  protected getApplePayWebSessionEndpoint(): string {
    return this.opfEndpointsService.buildUrl('getApplePayWebSession');
  }
}
