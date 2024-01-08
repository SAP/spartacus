/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { HttpErrorHandler } from '@spartacus/core';
import { PDFInvoicesFacade } from '@spartacus/pdf-invoices/root';
import { PDFInvoicesConnector } from './connectors/pdf-invoices.connector';
import { PDFInvoicesBadRequestHandler } from './http-interceptors/bad-request/pdf-invoices-badrequest.handler';
import { PDFInvoicesService } from './services';

@NgModule({
  imports: [],
  providers: [
    PDFInvoicesService,
    {
      provide: PDFInvoicesFacade,
      useExisting: PDFInvoicesService,
    },
    {
      provide: HttpErrorHandler,
      useExisting: PDFInvoicesBadRequestHandler,
      multi: true,
    },
    PDFInvoicesConnector,
  ],
})
export class PDFInvoicesCoreModule {}
