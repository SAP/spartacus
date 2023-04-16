/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  backOff,
  ConverterService,
  isJaloError,
  normalizeHttpError,
} from '@spartacus/core';
import {
  OpfAdapter,
  OpfEndpointsService,
  OPF_ACTIVE_CONFIGURATION_NORMALIZER,
  OPF_VERIFY_PAYMENT_NORMALIZER,
} from '@spartacus/opf/core';
import {
  ActiveConfiguration,
  OpfConfig,
  OpfVerifyPaymentPayload,
  OpfVerifyPaymentResponse,
} from '@spartacus/opf/root';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class OccOpfAdapter implements OpfAdapter {
  constructor(
    protected http: HttpClient,
    protected converter: ConverterService,
    protected opfEndpointsService: OpfEndpointsService,
    protected config: OpfConfig
  ) {}

  getActiveConfigurations(): Observable<ActiveConfiguration[]> {
    const headers = new HttpHeaders({
      'sap-commerce-cloud-public-key':
        this.config.opf?.commerceCloudPublicKey || '',
    });

    return this.http
      .get<ActiveConfiguration[]>(this.getActiveConfigurationsEndpoint(), {
        headers,
      })
      .pipe(
        catchError((error) => throwError(normalizeHttpError(error))),
        backOff({
          shouldRetry: isJaloError,
        }),
        this.converter.pipeable(OPF_ACTIVE_CONFIGURATION_NORMALIZER)
      );
  }

  protected getActiveConfigurationsEndpoint(): string {
    return this.opfEndpointsService.buildUrl('getActiveConfigurations');
  }

  getVerifyPayment(
    paymentSessionId: string,
    payload: OpfVerifyPaymentPayload
  ): Observable<OpfVerifyPaymentResponse> {
    const headers = new HttpHeaders({
      accept: 'application/json',
      'Content-Type': 'application/json',
      'Content-Language': 'en-us',
      'sap-commerce-cloud-public-key':
        this.config.opf?.commerceCloudPublicKey || '',
    });

    return this.http
      .post<OpfVerifyPaymentResponse>(
        this.getVerifyPaymentEndpoint(paymentSessionId),
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
        this.converter.pipeable(OPF_VERIFY_PAYMENT_NORMALIZER)
      );
  }

  protected getVerifyPaymentEndpoint(paymentSessionId: string): string {
    return this.opfEndpointsService.buildUrl('getVerifyPayment', {
      urlParams: { paymentSessionId },
    });
  }
}
