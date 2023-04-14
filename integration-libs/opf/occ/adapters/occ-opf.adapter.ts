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
      'sap-commerce-cloud-otp':
        'eyAiY2FydElkIjogIjAwMDEiLCAiY3JlYXRpb25UaW1lIjoxNjgxMTE1ODQ4OTQ1IH0=.VYx8yokiuCn2-Ik6Jr-i0whMc2InhZaDTY7mb-7bwnI1CEJ5g-AU-lz3up_hudRCf3oORHfZPKgjUWNnQXBOxLmJ3ZqYVJHzs7AojO_6C6qYpxBsMV_99v4XKVy6CCi3dK7N52ZL_TsGPkBnYhnOF4mOskKkCzaxpgJ6KlxV72QPW6FbMC4CYtq8hWTzS25E8e8oq-v73hg7T3KTPwFB1EZvfc31ebQL_oYt3PTLueaA6zPqD3L4e3ZvAcyilmylUTAxzlQwIJvzkzU6kYtR1Ah0SjkKoSw-bJc6BxtbIN6yQDgb4YAO03LrrtJDG7iuMSNGaCREWz6SfMvjjAwMXw==',
    });

    const url = this.getInitiatePaymentEndpoint();

    paymentConfig = this.converter.convert(
      paymentConfig,
      OPF_PAYMENT_CONFIG_SERIALIZER
    );

    return this.http
      .post<PaymentSessionData>(url, paymentConfig, { headers })
      .pipe(catchError((error) => throwError(normalizeHttpError(error))));
  }

  protected getInitiatePaymentEndpoint(): string {
    return this.opfEndpointsService.buildUrl('initiatePayment');
  }
}
