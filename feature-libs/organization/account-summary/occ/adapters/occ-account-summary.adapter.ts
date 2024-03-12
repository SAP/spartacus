/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import {
  ConverterService,
  LoggerService,
  OccEndpointsService,
  normalizeHttpError,
} from '@spartacus/core';
import {
  ACCOUNT_SUMMARY_DOCUMENT_NORMALIZER,
  ACCOUNT_SUMMARY_NORMALIZER,
  AccountSummaryAdapter,
} from '@spartacus/organization/account-summary/core';
import {
  AccountSummaryDetails,
  AccountSummaryList,
  DocumentQueryParams,
} from '@spartacus/organization/account-summary/root';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class OccAccountSummaryAdapter implements AccountSummaryAdapter {
  protected logger = inject(LoggerService);

  constructor(
    protected http: HttpClient,
    protected occEndpoints: OccEndpointsService,
    protected converter: ConverterService
  ) {}

  getAccountSummary(
    userId: string,
    orgUnitId: string
  ): Observable<AccountSummaryDetails> {
    return this.http
      .get<AccountSummaryDetails>(
        this.buildAccountSummaryUrl(userId, orgUnitId)
      )
      .pipe(
        catchError((error: HttpErrorResponse) => {
          throw normalizeHttpError(error, this.logger);
        }),
        this.converter.pipeable(ACCOUNT_SUMMARY_NORMALIZER)
      );
  }

  getDocumentList(
    userId: string,
    orgUnitId: string,
    params: DocumentQueryParams
  ): Observable<AccountSummaryList> {
    return this.http
      .get<AccountSummaryList>(
        this.buildDocumentListUrl(userId, orgUnitId, params)
      )
      .pipe(
        catchError((error: HttpErrorResponse) => {
          throw normalizeHttpError(error, this.logger);
        }),
        this.converter.pipeable(ACCOUNT_SUMMARY_DOCUMENT_NORMALIZER)
      );
  }

  getDocumentAttachment(
    userId: string,
    orgUnitId: string,
    orgDocumentId: string,
    orgDocumentAttachmentId: string
  ): Observable<Blob> {
    const options = {
      responseType: 'blob' as 'json',
    };

    return this.http
      .get<Blob>(
        this.buildDocumentAttachmentUrl(
          userId,
          orgUnitId,
          orgDocumentId,
          orgDocumentAttachmentId
        ),
        options
      )
      .pipe(
        catchError((error: HttpErrorResponse) => {
          throw normalizeHttpError(error, this.logger);
        })
      );
  }

  private buildAccountSummaryUrl(userId: string, orgUnitId: string): string {
    return this.occEndpoints.buildUrl('accountSummary', {
      urlParams: { userId, orgUnitId },
    });
  }

  private buildDocumentListUrl(
    userId: string,
    orgUnitId: string,
    queryParams: DocumentQueryParams
  ): string {
    return this.occEndpoints.buildUrl('accountSummaryDocument', {
      urlParams: { userId, orgUnitId },
      queryParams,
    });
  }

  private buildDocumentAttachmentUrl(
    userId: string,
    orgUnitId: string,
    orgDocumentId: string,
    orgDocumentAttachmentId: string
  ): string {
    return this.occEndpoints.buildUrl('accountSummaryDocumentAttachment', {
      urlParams: { userId, orgUnitId, orgDocumentId, orgDocumentAttachmentId },
    });
  }
}
