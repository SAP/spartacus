/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { InjectionToken } from '@angular/core';
import { Converter } from '@spartacus/core';
import { OrderInvoiceList } from '@spartacus/pdf-invoices/root';

export const PDF_INVOICES_LIST_INVOICES_NORMALIZER = new InjectionToken<
  Converter<any, OrderInvoiceList>
>('PDFInvoicesListInvoices');
