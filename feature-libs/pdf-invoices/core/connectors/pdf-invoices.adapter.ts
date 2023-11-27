/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  InvoiceQueryParams,
  OrderInvoiceList,
} from '@spartacus/pdf-invoices/root';
import { Observable } from 'rxjs';

export abstract class PDFInvoicesAdapter {
  /**
   * Abstract method used to get the PDF invoices for an order
   * @param userId Logged in user id
   * @param orderId If provided, it will be used, otherwise it will use orderId from router state.
   * @param queryParams Additional query parameters used in the API request
   */
  abstract getInvoicesForOrder(
    userId: string,
    orderId: string,
    queryParams: InvoiceQueryParams
  ): Observable<OrderInvoiceList>;

  /**
   * Returns the document blob for given invoiceId, orderId and externalSystemId
   * @param userId Logged in user id
   * @param orderId If provided, it will be used, otherwise it will use orderId from router state.
   * @param invoiceId The id of the invoice to be downloaded
   * @param externalSystemId External system that provides the invoice PDF
   */
  abstract getInvoicePDF(
    userId: string,
    orderId: string,
    invoiceId: string,
    externalSystemId?: string
  ): Observable<Blob>;
}
