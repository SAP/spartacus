/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const pdfInvoices = {
    pdfInvoices: {
        featureNotEnabled: 'Unable to obtain invoices, ensure that SAP Invoice and API for Invoices are enabled.',
        invoicesLoadingError: 'Something went wrong. Unable to display invoices for the order',
        invoicesTable: {
            header: 'Invoices',
            label: 'Invoices Table',
            invoiceId: 'Invoice #',
            createdAt: 'Date',
            netAmount: 'Net Amount',
            totalAmount: 'Total Amount',
            attachment: 'Download Invoice',
            download: 'Download',
            attachmentDescription: 'Download PDF for invoice {{id}}.',
            noneFound: 'No Invoices Found',
        },
        downloadPDFError: 'Something went wrong. Unable to obtain the invoice PDF.',
        sortBy: 'Sort by',
        sortInvoices: 'Sort invoices',
        sorts: {
            byCreatedAtAsc: 'Date Ascending',
            byCreatedAtDesc: 'Date Descending',
            byInvoiceIdAsc: 'Invoice Number Ascending',
            byInvoiceIdDesc: 'Invoice Number Descending',
            byNetAmountAsc: 'Net Amount Ascending',
            byNetAmountDesc: 'Net Amount Descending',
            byTotalAmountAsc: 'Total Amount Ascending',
            byTotalAmountDesc: 'Total Amount Descending',
        },
    },
};

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const en = {
    pdfInvoices,
};

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const pdfInvoicesTranslations = {
    en,
};
const pdfInvoicesTranslationChunksConfig = {
    pdfInvoices: ['pdfInvoices'],
};

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Generated bundle index. Do not edit.
 */

export { pdfInvoicesTranslationChunksConfig, pdfInvoicesTranslations };
//# sourceMappingURL=spartacus-pdf-invoices-assets.mjs.map
