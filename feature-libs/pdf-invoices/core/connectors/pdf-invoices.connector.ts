/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import {
  InvoiceQueryParams,
  OrderInvoiceList,
} from '@spartacus/pdf-invoices/root';
import { Observable } from 'rxjs';
import { PDFInvoicesAdapter } from './pdf-invoices.adapter';

@Injectable({
  providedIn: 'root',
})
export class PDFInvoicesConnector {
  constructor(protected adapter: PDFInvoicesAdapter) {}

  public getInvoicesForOrder(
    userId: string,
    orderId: string,
    queryParams: InvoiceQueryParams
  ): Observable<OrderInvoiceList> {
    return this.adapter.getInvoicesForOrder(userId, orderId, queryParams);
  }

  public getInvoicePDF(
    userId: string,
    orderId: string,
    invoiceId: string,
    externalSystemId?: string
  ): Observable<Blob> {
    return this.adapter.getInvoicePDF(
      userId,
      orderId,
      invoiceId,
      externalSystemId
    );
  }
}
