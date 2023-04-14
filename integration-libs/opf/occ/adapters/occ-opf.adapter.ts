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
  OPF_ACTIVE_CONFIGURATION_NORMALIZER,
  OPF_PAYMENT_CONFIG_SERIALIZER,
  OpfAdapter,
  OpfEndpointsService,
} from '@spartacus/opf/core';
import {
  ActiveConfiguration,
  OpfConfig,
  PaymentInitiationConfig,
  PaymentSessionData,
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

  /**
   * TODO: Let's consider splitting this code into other files,
   * as having all endpoint declarations in one file could
   * make cooperation and maintenance difficult.
   */

  initiatePayment(
    paymentConfig: PaymentInitiationConfig
  ): Observable<PaymentSessionData> {
    const headers = new HttpHeaders({
      'sap-commerce-cloud-public-key':
        this.config.opf?.commerceCloudPublicKey || '',
      'sap-commerce-cloud-otp': paymentConfig?.otpKey || '',
    });

    const url = this.getInitiatePaymentEndpoint();

    paymentConfig = this.converter.convert(
      paymentConfig,
      OPF_PAYMENT_CONFIG_SERIALIZER
    );

    return this.http
      .post<PaymentSessionData>(url, paymentConfig?.config, { headers })
      .pipe(catchError((error) => throwError(normalizeHttpError(error))));
  }

  protected getInitiatePaymentEndpoint(): string {
    return this.opfEndpointsService.buildUrl('initiatePayment');
  }
}
