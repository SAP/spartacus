/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { OccConfig } from '@spartacus/core';
import { PDFInvoicesOccEndpoints } from '../model/occ-pdf-invoices.model';

const pdfInvoicesOccEndpoints: PDFInvoicesOccEndpoints = {
  pdfInvoicesListInvoices: 'users/${userId}/orders/${orderId}/invoices',
  pdfInvoicesDownloadInvoicePDF:
    'users/${userId}/orders/${orderId}/invoices/${invoiceId}/download',
};

export const defaultOccPDFInvoicesConfig: OccConfig = {
  backend: {
    occ: {
      endpoints: {
        ...pdfInvoicesOccEndpoints,
      },
    },
  },
};
