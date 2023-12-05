/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
export const pdfInvoices = {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGRmLWludm9pY2VzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL3BkZi1pbnZvaWNlcy9hc3NldHMvdHJhbnNsYXRpb25zL2VuL3BkZi1pbnZvaWNlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsTUFBTSxDQUFDLE1BQU0sV0FBVyxHQUFHO0lBQ3pCLFdBQVcsRUFBRTtRQUNYLGlCQUFpQixFQUNmLHNGQUFzRjtRQUN4RixvQkFBb0IsRUFDbEIsZ0VBQWdFO1FBQ2xFLGFBQWEsRUFBRTtZQUNiLE1BQU0sRUFBRSxVQUFVO1lBQ2xCLEtBQUssRUFBRSxnQkFBZ0I7WUFDdkIsU0FBUyxFQUFFLFdBQVc7WUFDdEIsU0FBUyxFQUFFLE1BQU07WUFDakIsU0FBUyxFQUFFLFlBQVk7WUFDdkIsV0FBVyxFQUFFLGNBQWM7WUFDM0IsVUFBVSxFQUFFLGtCQUFrQjtZQUM5QixRQUFRLEVBQUUsVUFBVTtZQUNwQixxQkFBcUIsRUFBRSxrQ0FBa0M7WUFDekQsU0FBUyxFQUFFLG1CQUFtQjtTQUMvQjtRQUNELGdCQUFnQixFQUFFLHlEQUF5RDtRQUMzRSxNQUFNLEVBQUUsU0FBUztRQUNqQixZQUFZLEVBQUUsZUFBZTtRQUM3QixLQUFLLEVBQUU7WUFDTCxjQUFjLEVBQUUsZ0JBQWdCO1lBQ2hDLGVBQWUsRUFBRSxpQkFBaUI7WUFDbEMsY0FBYyxFQUFFLDBCQUEwQjtZQUMxQyxlQUFlLEVBQUUsMkJBQTJCO1lBQzVDLGNBQWMsRUFBRSxzQkFBc0I7WUFDdEMsZUFBZSxFQUFFLHVCQUF1QjtZQUN4QyxnQkFBZ0IsRUFBRSx3QkFBd0I7WUFDMUMsaUJBQWlCLEVBQUUseUJBQXlCO1NBQzdDO0tBQ0Y7Q0FDRixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuZXhwb3J0IGNvbnN0IHBkZkludm9pY2VzID0ge1xuICBwZGZJbnZvaWNlczoge1xuICAgIGZlYXR1cmVOb3RFbmFibGVkOlxuICAgICAgJ1VuYWJsZSB0byBvYnRhaW4gaW52b2ljZXMsIGVuc3VyZSB0aGF0IFNBUCBJbnZvaWNlIGFuZCBBUEkgZm9yIEludm9pY2VzIGFyZSBlbmFibGVkLicsXG4gICAgaW52b2ljZXNMb2FkaW5nRXJyb3I6XG4gICAgICAnU29tZXRoaW5nIHdlbnQgd3JvbmcuIFVuYWJsZSB0byBkaXNwbGF5IGludm9pY2VzIGZvciB0aGUgb3JkZXInLFxuICAgIGludm9pY2VzVGFibGU6IHtcbiAgICAgIGhlYWRlcjogJ0ludm9pY2VzJyxcbiAgICAgIGxhYmVsOiAnSW52b2ljZXMgVGFibGUnLFxuICAgICAgaW52b2ljZUlkOiAnSW52b2ljZSAjJyxcbiAgICAgIGNyZWF0ZWRBdDogJ0RhdGUnLFxuICAgICAgbmV0QW1vdW50OiAnTmV0IEFtb3VudCcsXG4gICAgICB0b3RhbEFtb3VudDogJ1RvdGFsIEFtb3VudCcsXG4gICAgICBhdHRhY2htZW50OiAnRG93bmxvYWQgSW52b2ljZScsXG4gICAgICBkb3dubG9hZDogJ0Rvd25sb2FkJyxcbiAgICAgIGF0dGFjaG1lbnREZXNjcmlwdGlvbjogJ0Rvd25sb2FkIFBERiBmb3IgaW52b2ljZSB7e2lkfX0uJyxcbiAgICAgIG5vbmVGb3VuZDogJ05vIEludm9pY2VzIEZvdW5kJyxcbiAgICB9LFxuICAgIGRvd25sb2FkUERGRXJyb3I6ICdTb21ldGhpbmcgd2VudCB3cm9uZy4gVW5hYmxlIHRvIG9idGFpbiB0aGUgaW52b2ljZSBQREYuJyxcbiAgICBzb3J0Qnk6ICdTb3J0IGJ5JyxcbiAgICBzb3J0SW52b2ljZXM6ICdTb3J0IGludm9pY2VzJyxcbiAgICBzb3J0czoge1xuICAgICAgYnlDcmVhdGVkQXRBc2M6ICdEYXRlIEFzY2VuZGluZycsXG4gICAgICBieUNyZWF0ZWRBdERlc2M6ICdEYXRlIERlc2NlbmRpbmcnLFxuICAgICAgYnlJbnZvaWNlSWRBc2M6ICdJbnZvaWNlIE51bWJlciBBc2NlbmRpbmcnLFxuICAgICAgYnlJbnZvaWNlSWREZXNjOiAnSW52b2ljZSBOdW1iZXIgRGVzY2VuZGluZycsXG4gICAgICBieU5ldEFtb3VudEFzYzogJ05ldCBBbW91bnQgQXNjZW5kaW5nJyxcbiAgICAgIGJ5TmV0QW1vdW50RGVzYzogJ05ldCBBbW91bnQgRGVzY2VuZGluZycsXG4gICAgICBieVRvdGFsQW1vdW50QXNjOiAnVG90YWwgQW1vdW50IEFzY2VuZGluZycsXG4gICAgICBieVRvdGFsQW1vdW50RGVzYzogJ1RvdGFsIEFtb3VudCBEZXNjZW5kaW5nJyxcbiAgICB9LFxuICB9LFxufTtcbiJdfQ==