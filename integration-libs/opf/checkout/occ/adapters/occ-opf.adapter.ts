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
  normalizeHttpError,
} from '@spartacus/core';
import {
  OPF_CC_OTP_KEY,
  OPF_CC_PUBLIC_KEY,
  OpfConfig,
} from '@spartacus/opf/base/root';
import {
  OPF_PAYMENT_CONFIG_SERIALIZER,
  OpfAdapter,
  OpfEndpointsService,
} from '@spartacus/opf/checkout/core';
import {
  PaymentInitiationConfig,
  PaymentSessionData,
} from '@spartacus/opf/checkout/root';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class OccOpfAdapter implements OpfAdapter {
  protected logger = inject(LoggerService);

  constructor(
    protected http: HttpClient,
    protected converter: ConverterService,
    protected opfEndpointsService: OpfEndpointsService,
    protected config: OpfConfig
  ) {}

  /**
   * TODO: Let's consider splitting this code into other files,
   * as having all endpoint declarations in one file could
   * make cooperation and maintenance difficult.
   *
   * TODO: Find a way to not duplicate code for setting configuration
   * header everywhere. Maybe we should implement some interceptor?
   */

  initiatePayment(
    paymentConfig: PaymentInitiationConfig
  ): Observable<PaymentSessionData> {
    const headers = new HttpHeaders({
      'Accept-Language': 'en-us',
    })
      .set(OPF_CC_PUBLIC_KEY, this.config.opf?.commerceCloudPublicKey || '')
      .set(OPF_CC_OTP_KEY, paymentConfig?.otpKey || '');

    const url = this.getInitiatePaymentEndpoint();

    paymentConfig = this.converter.convert(
      paymentConfig,
      OPF_PAYMENT_CONFIG_SERIALIZER
    );

    return this.http
      .post<PaymentSessionData>(url, paymentConfig?.config, { headers })
      .pipe(
        catchError((error) =>
          throwError(normalizeHttpError(error, this.logger))
        )
      );
  }

  protected getInitiatePaymentEndpoint(): string {
    return this.opfEndpointsService.buildUrl('initiatePayment');
  }
}
