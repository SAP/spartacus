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

  protected headerWithContentLanguage: { [name: string]: string } = {
    ...this.headerWithNoLanguage,
    'Content-Language':
      this.opfMetadataStatePersistanceService.getActiveLanguage(),
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
