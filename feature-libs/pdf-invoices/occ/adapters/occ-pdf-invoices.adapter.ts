/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {
  ConverterService,
  LoggerService,
  normalizeHttpError,
  OccEndpointsService,
} from '@spartacus/core';
import {
  PDFInvoicesAdapter,
  PDF_INVOICES_LIST_INVOICES_NORMALIZER,
} from '@spartacus/pdf-invoices/core';
import {
  InvoiceQueryParams,
  OrderInvoiceList,
} from '@spartacus/pdf-invoices/root';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class OccPDFInvoicesAdapter implements PDFInvoicesAdapter {
  protected logger = inject(LoggerService);

  constructor(
    protected http: HttpClient,
    protected occEndpoints: OccEndpointsService,
    protected converter: ConverterService
  ) {}

  getInvoicesForOrder(
    userId: string,
    orderId: string,
    queryParams: InvoiceQueryParams
  ): Observable<OrderInvoiceList> {
    return this.http
      .get<OrderInvoiceList>(
        this.buildInvoiceListUrl(userId, orderId, queryParams)
      )
      .pipe(
        catchError((error: HttpErrorResponse) =>
          throwError(normalizeHttpError(error, this.logger))
        ),
        this.converter.pipeable(PDF_INVOICES_LIST_INVOICES_NORMALIZER)
      );
  }

  getInvoicePDF(
    userId: string,
    orderId: string,
    invoiceId: string,
    externalSystemId?: string
  ): Observable<Blob> {
    const options = {
      responseType: 'blob' as 'json',
    };

    return this.http
      .get<Blob>(
        this.buildInvoicePDFUrl(userId, orderId, invoiceId, externalSystemId),
        options
      )
      .pipe(
        catchError((error: HttpErrorResponse) =>
          throwError(normalizeHttpError(error, this.logger))
        )
      );
  }

  private buildInvoiceListUrl(
    userId: string,
    orderId: string,
    queryParams: InvoiceQueryParams
  ): string {
    return this.occEndpoints.buildUrl('pdfInvoicesListInvoices', {
      urlParams: { userId, orderId },
      queryParams,
    });
  }

  private buildInvoicePDFUrl(
    userId: string,
    orderId: string,
    invoiceId: string,
    externalSystemId?: string
  ): string {
    return this.occEndpoints.buildUrl('pdfInvoicesDownloadInvoicePDF', {
      urlParams: { userId, orderId, invoiceId },
      queryParams: externalSystemId ? { externalSystemId } : undefined,
    });
  }
}
