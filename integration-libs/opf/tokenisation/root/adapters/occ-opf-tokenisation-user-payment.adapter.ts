/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import {
  Address,
  ConverterService,
  LoggerService,
  Occ,
  OccEndpointsService,
  OccUserPaymentAdapter,
  PAYMENT_DETAILS_NORMALIZER,
  PaymentDetails,
  tryNormalizeHttpError,
} from '@spartacus/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

const CONTENT_TYPE_JSON_HEADER = { 'Content-Type': 'application/json' };
@Injectable()
export class OccOpfTokenisationUserPaymentAdapter extends OccUserPaymentAdapter {
  protected logger = inject(LoggerService);
  protected rawPaymentDetailsById = new Map<string, Occ.PaymentDetails>();

  constructor(
    protected override http: HttpClient,
    protected override occEndpoints: OccEndpointsService,
    protected override converter: ConverterService
  ) {
    super(http, occEndpoints, converter);
  }

  override loadAll(userId: string): Observable<PaymentDetails[]> {
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
      map((payments) => {
        this.rawPaymentDetailsById.clear();
        payments.forEach((payment) => {
          if (payment.id) {
            this.rawPaymentDetailsById.set(payment.id, payment);
          }
        });
        return payments;
      }),
      this.converter.pipeableMany(PAYMENT_DETAILS_NORMALIZER)
    );
  }

  // TO DO: Unify this adapter with Core once Core fixes the paymentDetail PATCH request payload handling.
  override setDefault(userId: string, paymentMethodID: string): Observable<{}> {
    const patchUrl = this.occEndpoints.buildUrl('paymentDetail', {
      urlParams: { userId, paymentDetailId: paymentMethodID },
    });

    const headers = new HttpHeaders({ ...CONTENT_TYPE_JSON_HEADER });
    const paymentDetail = this.rawPaymentDetailsById.get(paymentMethodID);

    const payload: Occ.PaymentDetails = {
      ...(paymentDetail ?? {}),
      id: paymentMethodID,
      accountHolderName: this.getAccountHolderName(paymentDetail),
      billingAddress: this.buildBillingAddress(paymentDetail),
      defaultPayment: true,
    };

    return this.http.patch(patchUrl, payload, { headers }).pipe(
      catchError((error: any) => {
        throw tryNormalizeHttpError(error, this.logger);
      })
    );
  }

  protected getAccountHolderName(paymentDetail?: Occ.PaymentDetails): string {
    const value = paymentDetail?.accountHolderName?.trim();
    if (value) {
      return value;
    }

    const firstName = paymentDetail?.billingAddress?.firstName?.trim() ?? '';
    const lastName = paymentDetail?.billingAddress?.lastName?.trim() ?? '';
    const fullName = `${firstName} ${lastName}`.trim();

    return fullName || 'Account Holder';
  }

  protected buildBillingAddress(paymentDetail?: Occ.PaymentDetails): Address {
    const source = paymentDetail?.billingAddress;
    const accountHolderName = this.getAccountHolderName(paymentDetail);
    const [derivedFirstName, ...derivedLastNameParts] =
      accountHolderName.split(' ');

    return {
      ...source,
      firstName: source?.firstName?.trim() || derivedFirstName || 'N/A',
      lastName:
        source?.lastName?.trim() ||
        derivedLastNameParts.join(' ').trim() ||
        'N/A',
      line1: source?.line1?.trim() || 'N/A',
      town: source?.town?.trim() || 'N/A',
      postalCode: source?.postalCode?.trim() || '00000',
      country: {
        ...source?.country,
        isocode: source?.country?.isocode?.trim() || 'US',
      },
    };
  }
}
