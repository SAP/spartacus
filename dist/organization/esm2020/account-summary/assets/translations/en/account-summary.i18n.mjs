/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
export const orgAccountSummary = {
    header: 'All Account Summaries ({{count}})',
    name: 'Unit',
    details: {
        header: 'Account Summary Details',
        uid: 'Unit ID',
        name: 'Unit Name',
        address: 'Address',
        creditRep: 'Credit Rep',
        creditLine: 'Credit Line',
        currentBalance: 'Current Balance',
        openBalance: 'Open Balance',
        pastDueBalance: 'Past Due Balance',
        dayRange: '{{minBoundary}}-{{maxBoundary}} Days',
        dayPlus: '{{minBoundary}}+ Days',
        notApplicable: 'n/a',
    },
    document: {
        header: 'Documents',
        id: 'Document Number',
        type: 'Document Type',
        date: 'Created On',
        dueDate: 'Due On',
        originalAmount: 'Original Amount',
        openAmount: 'Open Amount',
        status: 'Status',
        attachment: 'Attachment',
        download: 'Download',
        attachmentDescription: 'Download attachment for {{type}} {{id}}.',
        noneFound: 'No Documents Found',
    },
    sorts: {
        byCreatedAtDateAsc: 'Created On Ascending',
        byCreatedAtDateDesc: 'Created On Descending',
        byDueAtDateAsc: 'Due On Ascending',
        byDueAtDateDesc: 'Due On Descending',
        byOriginalAmountAsc: 'Original Amount Ascending',
        byOriginalAmountDesc: 'Original Amount Descending',
        byOpenAmountAsc: 'Open Amount Ascending',
        byOpenAmountDesc: 'Open Amount Descending',
        byOrgDocumentTypeAsc: 'Document Type Ascending',
        byOrgDocumentTypeDesc: 'Document Type Descending',
        byStatusAsc: 'Status Ascending',
        byStatusDesc: 'Status Descending',
        byOrgDocumentIdAsc: 'Document Number Ascending',
        byOrgDocumentIdDesc: 'Document Number Descending',
    },
    statuses: {
        open: 'Open',
        closed: 'Closed',
        all: 'All',
    },
    filterByOptions: {
        orgDocumentId: 'Document Number',
        orgDocumentIdRange: 'Document Number Range',
        orgDocumentType: 'Document Type',
        createdAtDateRange: 'Created On Range',
        dueAtDateRange: 'Due On Range',
        amountRange: 'Original Amount Range',
        openAmountRange: 'Open Amount Range',
    },
    sortBy: 'Sort By',
    sortDocuments: 'Sort documents',
    filter: {
        status: 'Status',
        filterBy: 'Filter By',
        documentNumber: 'Document Number',
        documentType: 'Document Type',
        startRange: 'From',
        endRange: 'To',
        clear: 'Clear All',
        search: 'Search',
        errors: {
            toDateMustComeAfterFrom: "Choose an end date that's later than the start date.",
            toAmountMustBeLargeThanFrom: "Choose an end range value that's smaller than the start value.",
        },
    },
    hint: 'Account summaries allow you to review general information about a unit, including balances and aging summary of invoices. Here, you can also browse through a list of transaction documents for a unit.',
};
export const orgAccountSummaryList = {
    breadcrumbs: {
        list: 'Account Summaries',
        details: '{{name}}',
    },
};
export const accountSummary = {
    orgAccountSummary,
    orgAccountSummaryList,
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWNjb3VudC1zdW1tYXJ5LmkxOG4uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvb3JnYW5pemF0aW9uL2FjY291bnQtc3VtbWFyeS9hc3NldHMvdHJhbnNsYXRpb25zL2VuL2FjY291bnQtc3VtbWFyeS5pMThuLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxNQUFNLENBQUMsTUFBTSxpQkFBaUIsR0FBRztJQUMvQixNQUFNLEVBQUUsbUNBQW1DO0lBQzNDLElBQUksRUFBRSxNQUFNO0lBQ1osT0FBTyxFQUFFO1FBQ1AsTUFBTSxFQUFFLHlCQUF5QjtRQUNqQyxHQUFHLEVBQUUsU0FBUztRQUNkLElBQUksRUFBRSxXQUFXO1FBQ2pCLE9BQU8sRUFBRSxTQUFTO1FBQ2xCLFNBQVMsRUFBRSxZQUFZO1FBQ3ZCLFVBQVUsRUFBRSxhQUFhO1FBQ3pCLGNBQWMsRUFBRSxpQkFBaUI7UUFDakMsV0FBVyxFQUFFLGNBQWM7UUFDM0IsY0FBYyxFQUFFLGtCQUFrQjtRQUNsQyxRQUFRLEVBQUUsc0NBQXNDO1FBQ2hELE9BQU8sRUFBRSx1QkFBdUI7UUFDaEMsYUFBYSxFQUFFLEtBQUs7S0FDckI7SUFDRCxRQUFRLEVBQUU7UUFDUixNQUFNLEVBQUUsV0FBVztRQUNuQixFQUFFLEVBQUUsaUJBQWlCO1FBQ3JCLElBQUksRUFBRSxlQUFlO1FBQ3JCLElBQUksRUFBRSxZQUFZO1FBQ2xCLE9BQU8sRUFBRSxRQUFRO1FBQ2pCLGNBQWMsRUFBRSxpQkFBaUI7UUFDakMsVUFBVSxFQUFFLGFBQWE7UUFDekIsTUFBTSxFQUFFLFFBQVE7UUFDaEIsVUFBVSxFQUFFLFlBQVk7UUFDeEIsUUFBUSxFQUFFLFVBQVU7UUFDcEIscUJBQXFCLEVBQUUsMENBQTBDO1FBQ2pFLFNBQVMsRUFBRSxvQkFBb0I7S0FDaEM7SUFDRCxLQUFLLEVBQUU7UUFDTCxrQkFBa0IsRUFBRSxzQkFBc0I7UUFDMUMsbUJBQW1CLEVBQUUsdUJBQXVCO1FBQzVDLGNBQWMsRUFBRSxrQkFBa0I7UUFDbEMsZUFBZSxFQUFFLG1CQUFtQjtRQUNwQyxtQkFBbUIsRUFBRSwyQkFBMkI7UUFDaEQsb0JBQW9CLEVBQUUsNEJBQTRCO1FBQ2xELGVBQWUsRUFBRSx1QkFBdUI7UUFDeEMsZ0JBQWdCLEVBQUUsd0JBQXdCO1FBQzFDLG9CQUFvQixFQUFFLHlCQUF5QjtRQUMvQyxxQkFBcUIsRUFBRSwwQkFBMEI7UUFDakQsV0FBVyxFQUFFLGtCQUFrQjtRQUMvQixZQUFZLEVBQUUsbUJBQW1CO1FBQ2pDLGtCQUFrQixFQUFFLDJCQUEyQjtRQUMvQyxtQkFBbUIsRUFBRSw0QkFBNEI7S0FDbEQ7SUFDRCxRQUFRLEVBQUU7UUFDUixJQUFJLEVBQUUsTUFBTTtRQUNaLE1BQU0sRUFBRSxRQUFRO1FBQ2hCLEdBQUcsRUFBRSxLQUFLO0tBQ1g7SUFDRCxlQUFlLEVBQUU7UUFDZixhQUFhLEVBQUUsaUJBQWlCO1FBQ2hDLGtCQUFrQixFQUFFLHVCQUF1QjtRQUMzQyxlQUFlLEVBQUUsZUFBZTtRQUNoQyxrQkFBa0IsRUFBRSxrQkFBa0I7UUFDdEMsY0FBYyxFQUFFLGNBQWM7UUFDOUIsV0FBVyxFQUFFLHVCQUF1QjtRQUNwQyxlQUFlLEVBQUUsbUJBQW1CO0tBQ3JDO0lBQ0QsTUFBTSxFQUFFLFNBQVM7SUFDakIsYUFBYSxFQUFFLGdCQUFnQjtJQUMvQixNQUFNLEVBQUU7UUFDTixNQUFNLEVBQUUsUUFBUTtRQUNoQixRQUFRLEVBQUUsV0FBVztRQUNyQixjQUFjLEVBQUUsaUJBQWlCO1FBQ2pDLFlBQVksRUFBRSxlQUFlO1FBQzdCLFVBQVUsRUFBRSxNQUFNO1FBQ2xCLFFBQVEsRUFBRSxJQUFJO1FBQ2QsS0FBSyxFQUFFLFdBQVc7UUFDbEIsTUFBTSxFQUFFLFFBQVE7UUFDaEIsTUFBTSxFQUFFO1lBQ04sdUJBQXVCLEVBQ3JCLHNEQUFzRDtZQUN4RCwyQkFBMkIsRUFDekIsZ0VBQWdFO1NBQ25FO0tBQ0Y7SUFDRCxJQUFJLEVBQUUseU1BQXlNO0NBQ2hOLENBQUM7QUFFRixNQUFNLENBQUMsTUFBTSxxQkFBcUIsR0FBRztJQUNuQyxXQUFXLEVBQUU7UUFDWCxJQUFJLEVBQUUsbUJBQW1CO1FBQ3pCLE9BQU8sRUFBRSxVQUFVO0tBQ3BCO0NBQ0YsQ0FBQztBQUVGLE1BQU0sQ0FBQyxNQUFNLGNBQWMsR0FBRztJQUM1QixpQkFBaUI7SUFDakIscUJBQXFCO0NBQ3RCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5leHBvcnQgY29uc3Qgb3JnQWNjb3VudFN1bW1hcnkgPSB7XG4gIGhlYWRlcjogJ0FsbCBBY2NvdW50IFN1bW1hcmllcyAoe3tjb3VudH19KScsXG4gIG5hbWU6ICdVbml0JyxcbiAgZGV0YWlsczoge1xuICAgIGhlYWRlcjogJ0FjY291bnQgU3VtbWFyeSBEZXRhaWxzJyxcbiAgICB1aWQ6ICdVbml0IElEJyxcbiAgICBuYW1lOiAnVW5pdCBOYW1lJyxcbiAgICBhZGRyZXNzOiAnQWRkcmVzcycsXG4gICAgY3JlZGl0UmVwOiAnQ3JlZGl0IFJlcCcsXG4gICAgY3JlZGl0TGluZTogJ0NyZWRpdCBMaW5lJyxcbiAgICBjdXJyZW50QmFsYW5jZTogJ0N1cnJlbnQgQmFsYW5jZScsXG4gICAgb3BlbkJhbGFuY2U6ICdPcGVuIEJhbGFuY2UnLFxuICAgIHBhc3REdWVCYWxhbmNlOiAnUGFzdCBEdWUgQmFsYW5jZScsXG4gICAgZGF5UmFuZ2U6ICd7e21pbkJvdW5kYXJ5fX0te3ttYXhCb3VuZGFyeX19IERheXMnLFxuICAgIGRheVBsdXM6ICd7e21pbkJvdW5kYXJ5fX0rIERheXMnLFxuICAgIG5vdEFwcGxpY2FibGU6ICduL2EnLFxuICB9LFxuICBkb2N1bWVudDoge1xuICAgIGhlYWRlcjogJ0RvY3VtZW50cycsXG4gICAgaWQ6ICdEb2N1bWVudCBOdW1iZXInLFxuICAgIHR5cGU6ICdEb2N1bWVudCBUeXBlJyxcbiAgICBkYXRlOiAnQ3JlYXRlZCBPbicsXG4gICAgZHVlRGF0ZTogJ0R1ZSBPbicsXG4gICAgb3JpZ2luYWxBbW91bnQ6ICdPcmlnaW5hbCBBbW91bnQnLFxuICAgIG9wZW5BbW91bnQ6ICdPcGVuIEFtb3VudCcsXG4gICAgc3RhdHVzOiAnU3RhdHVzJyxcbiAgICBhdHRhY2htZW50OiAnQXR0YWNobWVudCcsXG4gICAgZG93bmxvYWQ6ICdEb3dubG9hZCcsXG4gICAgYXR0YWNobWVudERlc2NyaXB0aW9uOiAnRG93bmxvYWQgYXR0YWNobWVudCBmb3Ige3t0eXBlfX0ge3tpZH19LicsXG4gICAgbm9uZUZvdW5kOiAnTm8gRG9jdW1lbnRzIEZvdW5kJyxcbiAgfSxcbiAgc29ydHM6IHtcbiAgICBieUNyZWF0ZWRBdERhdGVBc2M6ICdDcmVhdGVkIE9uIEFzY2VuZGluZycsXG4gICAgYnlDcmVhdGVkQXREYXRlRGVzYzogJ0NyZWF0ZWQgT24gRGVzY2VuZGluZycsXG4gICAgYnlEdWVBdERhdGVBc2M6ICdEdWUgT24gQXNjZW5kaW5nJyxcbiAgICBieUR1ZUF0RGF0ZURlc2M6ICdEdWUgT24gRGVzY2VuZGluZycsXG4gICAgYnlPcmlnaW5hbEFtb3VudEFzYzogJ09yaWdpbmFsIEFtb3VudCBBc2NlbmRpbmcnLFxuICAgIGJ5T3JpZ2luYWxBbW91bnREZXNjOiAnT3JpZ2luYWwgQW1vdW50IERlc2NlbmRpbmcnLFxuICAgIGJ5T3BlbkFtb3VudEFzYzogJ09wZW4gQW1vdW50IEFzY2VuZGluZycsXG4gICAgYnlPcGVuQW1vdW50RGVzYzogJ09wZW4gQW1vdW50IERlc2NlbmRpbmcnLFxuICAgIGJ5T3JnRG9jdW1lbnRUeXBlQXNjOiAnRG9jdW1lbnQgVHlwZSBBc2NlbmRpbmcnLFxuICAgIGJ5T3JnRG9jdW1lbnRUeXBlRGVzYzogJ0RvY3VtZW50IFR5cGUgRGVzY2VuZGluZycsXG4gICAgYnlTdGF0dXNBc2M6ICdTdGF0dXMgQXNjZW5kaW5nJyxcbiAgICBieVN0YXR1c0Rlc2M6ICdTdGF0dXMgRGVzY2VuZGluZycsXG4gICAgYnlPcmdEb2N1bWVudElkQXNjOiAnRG9jdW1lbnQgTnVtYmVyIEFzY2VuZGluZycsXG4gICAgYnlPcmdEb2N1bWVudElkRGVzYzogJ0RvY3VtZW50IE51bWJlciBEZXNjZW5kaW5nJyxcbiAgfSxcbiAgc3RhdHVzZXM6IHtcbiAgICBvcGVuOiAnT3BlbicsXG4gICAgY2xvc2VkOiAnQ2xvc2VkJyxcbiAgICBhbGw6ICdBbGwnLFxuICB9LFxuICBmaWx0ZXJCeU9wdGlvbnM6IHtcbiAgICBvcmdEb2N1bWVudElkOiAnRG9jdW1lbnQgTnVtYmVyJyxcbiAgICBvcmdEb2N1bWVudElkUmFuZ2U6ICdEb2N1bWVudCBOdW1iZXIgUmFuZ2UnLFxuICAgIG9yZ0RvY3VtZW50VHlwZTogJ0RvY3VtZW50IFR5cGUnLFxuICAgIGNyZWF0ZWRBdERhdGVSYW5nZTogJ0NyZWF0ZWQgT24gUmFuZ2UnLFxuICAgIGR1ZUF0RGF0ZVJhbmdlOiAnRHVlIE9uIFJhbmdlJyxcbiAgICBhbW91bnRSYW5nZTogJ09yaWdpbmFsIEFtb3VudCBSYW5nZScsXG4gICAgb3BlbkFtb3VudFJhbmdlOiAnT3BlbiBBbW91bnQgUmFuZ2UnLFxuICB9LFxuICBzb3J0Qnk6ICdTb3J0IEJ5JyxcbiAgc29ydERvY3VtZW50czogJ1NvcnQgZG9jdW1lbnRzJyxcbiAgZmlsdGVyOiB7XG4gICAgc3RhdHVzOiAnU3RhdHVzJyxcbiAgICBmaWx0ZXJCeTogJ0ZpbHRlciBCeScsXG4gICAgZG9jdW1lbnROdW1iZXI6ICdEb2N1bWVudCBOdW1iZXInLFxuICAgIGRvY3VtZW50VHlwZTogJ0RvY3VtZW50IFR5cGUnLFxuICAgIHN0YXJ0UmFuZ2U6ICdGcm9tJyxcbiAgICBlbmRSYW5nZTogJ1RvJyxcbiAgICBjbGVhcjogJ0NsZWFyIEFsbCcsXG4gICAgc2VhcmNoOiAnU2VhcmNoJyxcbiAgICBlcnJvcnM6IHtcbiAgICAgIHRvRGF0ZU11c3RDb21lQWZ0ZXJGcm9tOlxuICAgICAgICBcIkNob29zZSBhbiBlbmQgZGF0ZSB0aGF0J3MgbGF0ZXIgdGhhbiB0aGUgc3RhcnQgZGF0ZS5cIixcbiAgICAgIHRvQW1vdW50TXVzdEJlTGFyZ2VUaGFuRnJvbTpcbiAgICAgICAgXCJDaG9vc2UgYW4gZW5kIHJhbmdlIHZhbHVlIHRoYXQncyBzbWFsbGVyIHRoYW4gdGhlIHN0YXJ0IHZhbHVlLlwiLFxuICAgIH0sXG4gIH0sXG4gIGhpbnQ6ICdBY2NvdW50IHN1bW1hcmllcyBhbGxvdyB5b3UgdG8gcmV2aWV3IGdlbmVyYWwgaW5mb3JtYXRpb24gYWJvdXQgYSB1bml0LCBpbmNsdWRpbmcgYmFsYW5jZXMgYW5kIGFnaW5nIHN1bW1hcnkgb2YgaW52b2ljZXMuIEhlcmUsIHlvdSBjYW4gYWxzbyBicm93c2UgdGhyb3VnaCBhIGxpc3Qgb2YgdHJhbnNhY3Rpb24gZG9jdW1lbnRzIGZvciBhIHVuaXQuJyxcbn07XG5cbmV4cG9ydCBjb25zdCBvcmdBY2NvdW50U3VtbWFyeUxpc3QgPSB7XG4gIGJyZWFkY3J1bWJzOiB7XG4gICAgbGlzdDogJ0FjY291bnQgU3VtbWFyaWVzJyxcbiAgICBkZXRhaWxzOiAne3tuYW1lfX0nLFxuICB9LFxufTtcblxuZXhwb3J0IGNvbnN0IGFjY291bnRTdW1tYXJ5ID0ge1xuICBvcmdBY2NvdW50U3VtbWFyeSxcbiAgb3JnQWNjb3VudFN1bW1hcnlMaXN0LFxufTtcbiJdfQ==