/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { OccConfig } from '@spartacus/core';

export const defaultOccPDFInvoicesConfig: OccConfig = {
  backend: {
    occ: {
      endpoints: {
        pdfInvoicesListInvoices: 'users/${userId}/orders/${orderId}/invoices',
        pdfInvoicesDownloadInvoicePDF:
          'users/${userId}/orders/${orderId}/invoices/${invoiceId}/download',
      },
    },
  },
};
