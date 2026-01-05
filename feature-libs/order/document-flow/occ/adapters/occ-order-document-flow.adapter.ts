/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import {
  ConverterService,
  LoggerService,
  OccEndpointsService,
  tryNormalizeHttpError,
} from '@spartacus/core';
import { Observable } from 'rxjs';
import { OrderDocumentFlowAdapter } from '@spartacus/order/document-flow/core';
import { catchError } from 'rxjs/operators';
import {
  OrderSubsequentDocument,
  OrderSubsequentDocumentEntry,
} from '@spartacus/order/document-flow/root';

@Injectable()
export class OccOrderDocumentFlowAdapter implements OrderDocumentFlowAdapter {
  protected logger = inject(LoggerService);
  protected http = inject(HttpClient);
  protected occEndpoints = inject(OccEndpointsService);
  protected converter = inject(ConverterService);

  getOrderSubsequentDocuments(
    userId: string,
    orderId: string
  ): Observable<OrderSubsequentDocument[]> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this.http
      .get<
        OrderSubsequentDocument[]
      >(this.getSubsequentDocumentsUrl(orderId, userId), { headers })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          throw tryNormalizeHttpError(error, this.logger);
        })
      );
  }

  getOrderSubsequentDocumentEntries(
    userId: string,
    orderId: string,
    documentCategory: string,
    documentId: string
  ): Observable<OrderSubsequentDocumentEntry[]> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this.http
      .get<
        OrderSubsequentDocumentEntry[]
      >(this.getSubsequentDocumentsEntriesUrl(orderId, userId, documentCategory, documentId), { headers })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          throw tryNormalizeHttpError(error, this.logger);
        })
      );
  }

  protected getSubsequentDocumentsUrl(orderId: string, userId: string): string {
    return this.occEndpoints.buildUrl('subsequentDocuments', {
      urlParams: {
        userId,
        orderId,
      },
    });
  }

  protected getSubsequentDocumentsEntriesUrl(
    orderId: string,
    userId: string,
    documentCategory: string,
    documentId: string
  ): string {
    return this.occEndpoints.buildUrl('subsequentDocumentsEntries', {
      urlParams: {
        userId,
        orderId,
        documentCategory,
        documentId,
      },
    });
  }
}
