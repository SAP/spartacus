/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import '@spartacus/core';

declare module '@spartacus/core' {
  interface FeatureToggles {
    /**
     * Previously sorting was done by the date of creating invoice entry.
     * This feature toggle allows to sort invoices by the date of the invoice itself.
     */
    pdfInvoicesSortByInvoiceDate?: boolean;
  }
}
