/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { provideDefaultConfig } from '@spartacus/core';
import { PDFInvoicesAdapter } from '@spartacus/pdf-invoices/core';
import { OccPDFInvoicesAdapter } from './adapters/occ-pdf-invoices.adapter';
import { defaultOccPDFInvoicesConfig } from './config/default-occ-pdf-invoices-config';

@NgModule({
  imports: [CommonModule],
  providers: [
    provideDefaultConfig(defaultOccPDFInvoicesConfig),
    {
      provide: PDFInvoicesAdapter,
      useClass: OccPDFInvoicesAdapter,
    },
  ],
})
export class PDFInvoicesOccModule {}
