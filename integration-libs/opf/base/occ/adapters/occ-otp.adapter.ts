/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import {
  ConverterService,
  LoggerService,
  OccEndpointsService,
  backOff,
  isServerError,
  normalizeHttpError,
} from '@spartacus/core';
import { OTP_NORMALIZER, OtpAdapter } from '@spartacus/opf/base/core';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable()
export class OccOtpAdapter implements OtpAdapter {
  protected logger = inject(LoggerService);

  constructor(
    protected http: HttpClient,
    protected occEndpointsService: OccEndpointsService,
    protected converterService: ConverterService
  ) {}

  generateOtpKey(
    userId: string,
    cartId: string
  ): Observable<string | undefined> {
    return this.http
      .post<
        string | undefined
      >(this.getGenerateOtpKeyEndpoint(userId, cartId), null)
      .pipe(
        catchError((error) =>
          throwError(normalizeHttpError(error, this.logger))
        ),
        backOff({
          shouldRetry: isServerError,
          maxTries: 2,
        }),
        this.converterService.pipeable(OTP_NORMALIZER)
      );
  }

  protected getGenerateOtpKeyEndpoint(userId: string, cartId: string): string {
    return this.occEndpointsService.buildUrl('generateOtpKey', {
      urlParams: {
        userId,
        cartId,
      },
    });
  }
}
