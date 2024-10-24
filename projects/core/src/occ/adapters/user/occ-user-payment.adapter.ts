/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { PAYMENT_DETAILS_NORMALIZER } from '../../../checkout/connectors/payment/converters';
import { LoggerService } from '../../../logger';
import { PaymentDetails } from '../../../model/payment.model';
import { UserPaymentAdapter } from '../../../user/connectors/payment/user-payment.adapter';
import { ConverterService } from '../../../util/converter.service';
import { tryNormalizeHttpError } from '../../../util/try-normalize-http-error';
import { Occ } from '../../occ-models/occ.models';
import { OccEndpointsService } from '../../services/occ-endpoints.service';

const CONTENT_TYPE_JSON_HEADER = { 'Content-Type': 'application/json' };

@Injectable()
export class OccUserPaymentAdapter implements UserPaymentAdapter {
  protected logger = inject(LoggerService);

  constructor(
    protected http: HttpClient,
    protected occEndpoints: OccEndpointsService,
    protected converter: ConverterService
  ) {}

  loadAll(userId: string): Observable<PaymentDetails[]> {
    const url =
      this.occEndpoints.buildUrl('paymentDetailsAll', {
        urlParams: { userId },
      }) + '?saved=true';
    const headers = new HttpHeaders({
      ...CONTENT_TYPE_JSON_HEADER,
    });

    return this.http.get<Occ.PaymentDetailsList>(url, { headers }).pipe(
      catchError((error: any) => {
        throw tryNormalizeHttpError(error, this.logger);
      }),
      map((methodList) => methodList.payments ?? []),
      this.converter.pipeableMany(PAYMENT_DETAILS_NORMALIZER)
    );
  }

  delete(userId: string, paymentMethodID: string): Observable<{}> {
    const url = this.occEndpoints.buildUrl('paymentDetail', {
      urlParams: { userId, paymentDetailId: paymentMethodID },
    });
    const headers = new HttpHeaders({
      ...CONTENT_TYPE_JSON_HEADER,
    });

    return this.http.delete(url, { headers }).pipe(
      catchError((error: any) => {
        throw tryNormalizeHttpError(error, this.logger);
      })
    );
  }

  setDefault(userId: string, paymentMethodID: string): Observable<{}> {
    const url = this.occEndpoints.buildUrl('paymentDetail', {
      urlParams: { userId, paymentDetailId: paymentMethodID },
    });

    const headers = new HttpHeaders({
      ...CONTENT_TYPE_JSON_HEADER,
    });

    return this.http
      .patch(
        url,
        // TODO: Remove billingAddress property
        { billingAddress: { titleCode: 'mr' }, defaultPayment: true },
        { headers }
      )
      .pipe(
        catchError((error: any) => {
          throw tryNormalizeHttpError(error, this.logger);
        })
      );
  }
}
