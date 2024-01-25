/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { facadeFactory } from '@spartacus/core';
import { Observable } from 'rxjs';
import { PDF_INVOICES_FEATURE } from '../feature-name';
import {
  InvoiceQueryParams,
  OrderInvoiceList,
} from '../model/pdf-invoices.model';

export function pdfInvoicesFacadeFactory() {
  return facadeFactory({
    facade: PDFInvoicesFacade,
    feature: PDF_INVOICES_FEATURE,
    methods: ['getInvoicesForOrder', 'getInvoicePDF'],
  });
}

@Injectable({
  providedIn: 'root',
  useFactory: pdfInvoicesFacadeFactory,
})
export abstract class PDFInvoicesFacade {
  /**
   * Abstract method used to get the PDF invoices for an order
   * @param userId Logged in user id
   * @param orderId If provided, it will be used, otherwise it will use orderId from router state.
   * @param queryParams Additional query parameters used in the API request
   */
  abstract getInvoicesForOrder(
    queryParams: InvoiceQueryParams,
    userId?: string,
    orderId?: string
  ): Observable<OrderInvoiceList>;

  /**
   * Returns the document blob for given invoiceId, orderId and externalSystemId
   * @param userId Logged in user id
   * @param orderId If provided, it will be used, otherwise it will use orderId from router state.
   * @param invoiceId The id of the invoice to be downloaded
   * @param externalSystemId External system that provides the invoice PDF
   */
  abstract getInvoicePDF(
    invoiceId: string,
    externalSystemId?: string,
    userId?: string,
    orderId?: string
  ): Observable<Blob>;
}
