/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import {
  ConverterService,
  LoggerService,
  Occ,
  OccEndpointsService,
  OccUserPaymentAdapter,
  tryNormalizeHttpError,
} from '@spartacus/core';
import { Observable } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';

const CONTENT_TYPE_JSON_HEADER = { 'Content-Type': 'application/json' };

@Injectable()
export class OccOpfTokenisationUserPaymentAdapter extends OccUserPaymentAdapter {
  protected logger = inject(LoggerService);

  constructor(
    protected override http: HttpClient,
    protected override occEndpoints: OccEndpointsService,
    protected override converter: ConverterService
  ) {
    super(http, occEndpoints, converter);
  }

  override setDefault(userId: string, paymentMethodID: string): Observable<{}> {
    const patchUrl = this.occEndpoints.buildUrl('paymentDetail', {
      urlParams: { userId, paymentDetailId: paymentMethodID },
    });

    const headers = new HttpHeaders({ ...CONTENT_TYPE_JSON_HEADER });

    // Fetch the raw (un-normalised) OCC payment detail with FULL field level so
    // that billingAddress and OPF-specific fields (e.g. sapPaymentMethod) are
    // preserved in the PATCH body.
    // TODO: remove this adapter override once core setDefault PATCH payload
    //       supports full payment details.
    return this.http
      .get<Occ.PaymentDetails>(patchUrl + '?fields=FULL', { headers })
      .pipe(
        switchMap((rawPaymentDetail) =>
          this.http.patch(
            patchUrl,
            { ...rawPaymentDetail, id: paymentMethodID, defaultPayment: true },
            { headers }
          )
        ),
        catchError((error: any) => {
          throw tryNormalizeHttpError(error, this.logger);
        })
      );
  }
}
