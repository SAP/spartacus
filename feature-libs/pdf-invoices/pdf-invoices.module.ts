/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { PDFInvoicesComponentsModule } from '@spartacus/pdf-invoices/components';
import { PDFInvoicesCoreModule } from '@spartacus/pdf-invoices/core';
import { PDFInvoicesOccModule } from '@spartacus/pdf-invoices/occ';

@NgModule({
  imports: [
    PDFInvoicesComponentsModule,
    PDFInvoicesCoreModule,
    PDFInvoicesOccModule,
  ],
})
export class PDFInvoicesModule {}
