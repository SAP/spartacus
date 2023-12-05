/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
export const exportEntries = {
    exportToCsv: 'Export to CSV',
    exportMessage: 'CSV file will download automatically to your device, if it does not please check your browser settings',
    columnNames: {
        code: 'Code',
        quantity: 'Quantity',
        name: 'Name',
        price: 'Price',
    },
    exportProductToCsv: 'Export Product to CSV',
};
export const importEntries = {
    importProducts: 'Import Products',
};
export const importEntriesDialog = {
    importProducts: 'Import Products',
    importProductsSubtitle: 'Add products by importing a .CSV file.',
    importProductsNewSavedCartSubtitle: 'Add products by importing a .CSV file and creating a new saved cart.',
    importProductFileDetails: 'Text file should contain list of products with required columns separated by comma: SKU and quantity.',
    selectFile: 'Select File',
    savedCartName: 'Saved Cart Name',
    savedCartDescription: 'Saved Cart Description',
    optional: 'optional',
    charactersLeft: 'characters left: {{count}}',
    cancel: 'Cancel',
    upload: 'Upload',
    close: 'Close',
    summary: {
        info: 'Do not close or refresh this window while products are being imported.',
        loadedToCart: 'Products has been loaded to cart {{ cartName }}',
        loaded: 'Products has been loaded',
        loading: 'Products are being processed... ({{ count }}/{{ total }})',
        successes: '{{ successesCount }} out of {{ total }} products have been imported successfully.',
        warning: '{{ count }} product was not imported totally.',
        warning_other: '{{ count }} products were not imported totally.',
        error: '{{ count }} product was not imported.',
        error_other: '{{ count }} products were not imported.',
        messages: {
            unknownIdentifier: 'Product SKU "{{ productCode}}" does not exist.',
            lowStock: 'Quantity for {{ productName }}: {{ quantity }} has been reduced to {{ quantityAdded }}.',
            noStock: '{{ productName }} is currently out of stock.',
            unknownError: 'Unrecognized problem with "{{ productCode }}".',
            limitExceeded: 'Can not add "{{ productCode }}". Limit exceeded.',
        },
        show: 'Show',
        hide: 'Hide',
    },
};
export const importExport = {
    exportEntries,
    importEntries,
    importEntriesDialog,
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1wb3J0LWV4cG9ydC5pMThuLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL2NhcnQvaW1wb3J0LWV4cG9ydC9hc3NldHMvdHJhbnNsYXRpb25zL2VuL2ltcG9ydC1leHBvcnQuaTE4bi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsTUFBTSxDQUFDLE1BQU0sYUFBYSxHQUFHO0lBQzNCLFdBQVcsRUFBRSxlQUFlO0lBQzVCLGFBQWEsRUFDWCx3R0FBd0c7SUFDMUcsV0FBVyxFQUFFO1FBQ1gsSUFBSSxFQUFFLE1BQU07UUFDWixRQUFRLEVBQUUsVUFBVTtRQUNwQixJQUFJLEVBQUUsTUFBTTtRQUNaLEtBQUssRUFBRSxPQUFPO0tBQ2Y7SUFDRCxrQkFBa0IsRUFBRSx1QkFBdUI7Q0FDNUMsQ0FBQztBQUVGLE1BQU0sQ0FBQyxNQUFNLGFBQWEsR0FBRztJQUMzQixjQUFjLEVBQUUsaUJBQWlCO0NBQ2xDLENBQUM7QUFFRixNQUFNLENBQUMsTUFBTSxtQkFBbUIsR0FBRztJQUNqQyxjQUFjLEVBQUUsaUJBQWlCO0lBQ2pDLHNCQUFzQixFQUFFLHdDQUF3QztJQUNoRSxrQ0FBa0MsRUFDaEMsc0VBQXNFO0lBQ3hFLHdCQUF3QixFQUN0Qix1R0FBdUc7SUFDekcsVUFBVSxFQUFFLGFBQWE7SUFDekIsYUFBYSxFQUFFLGlCQUFpQjtJQUNoQyxvQkFBb0IsRUFBRSx3QkFBd0I7SUFDOUMsUUFBUSxFQUFFLFVBQVU7SUFDcEIsY0FBYyxFQUFFLDRCQUE0QjtJQUM1QyxNQUFNLEVBQUUsUUFBUTtJQUNoQixNQUFNLEVBQUUsUUFBUTtJQUNoQixLQUFLLEVBQUUsT0FBTztJQUNkLE9BQU8sRUFBRTtRQUNQLElBQUksRUFBRSx3RUFBd0U7UUFDOUUsWUFBWSxFQUFFLGlEQUFpRDtRQUMvRCxNQUFNLEVBQUUsMEJBQTBCO1FBQ2xDLE9BQU8sRUFBRSwyREFBMkQ7UUFDcEUsU0FBUyxFQUNQLG1GQUFtRjtRQUNyRixPQUFPLEVBQUUsK0NBQStDO1FBQ3hELGFBQWEsRUFBRSxpREFBaUQ7UUFDaEUsS0FBSyxFQUFFLHVDQUF1QztRQUM5QyxXQUFXLEVBQUUseUNBQXlDO1FBQ3RELFFBQVEsRUFBRTtZQUNSLGlCQUFpQixFQUFFLGdEQUFnRDtZQUNuRSxRQUFRLEVBQ04seUZBQXlGO1lBQzNGLE9BQU8sRUFBRSw4Q0FBOEM7WUFDdkQsWUFBWSxFQUFFLGdEQUFnRDtZQUM5RCxhQUFhLEVBQUUsa0RBQWtEO1NBQ2xFO1FBQ0QsSUFBSSxFQUFFLE1BQU07UUFDWixJQUFJLEVBQUUsTUFBTTtLQUNiO0NBQ0YsQ0FBQztBQUVGLE1BQU0sQ0FBQyxNQUFNLFlBQVksR0FBRztJQUMxQixhQUFhO0lBQ2IsYUFBYTtJQUNiLG1CQUFtQjtDQUNwQixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuZXhwb3J0IGNvbnN0IGV4cG9ydEVudHJpZXMgPSB7XG4gIGV4cG9ydFRvQ3N2OiAnRXhwb3J0IHRvIENTVicsXG4gIGV4cG9ydE1lc3NhZ2U6XG4gICAgJ0NTViBmaWxlIHdpbGwgZG93bmxvYWQgYXV0b21hdGljYWxseSB0byB5b3VyIGRldmljZSwgaWYgaXQgZG9lcyBub3QgcGxlYXNlIGNoZWNrIHlvdXIgYnJvd3NlciBzZXR0aW5ncycsXG4gIGNvbHVtbk5hbWVzOiB7XG4gICAgY29kZTogJ0NvZGUnLFxuICAgIHF1YW50aXR5OiAnUXVhbnRpdHknLFxuICAgIG5hbWU6ICdOYW1lJyxcbiAgICBwcmljZTogJ1ByaWNlJyxcbiAgfSxcbiAgZXhwb3J0UHJvZHVjdFRvQ3N2OiAnRXhwb3J0IFByb2R1Y3QgdG8gQ1NWJyxcbn07XG5cbmV4cG9ydCBjb25zdCBpbXBvcnRFbnRyaWVzID0ge1xuICBpbXBvcnRQcm9kdWN0czogJ0ltcG9ydCBQcm9kdWN0cycsXG59O1xuXG5leHBvcnQgY29uc3QgaW1wb3J0RW50cmllc0RpYWxvZyA9IHtcbiAgaW1wb3J0UHJvZHVjdHM6ICdJbXBvcnQgUHJvZHVjdHMnLFxuICBpbXBvcnRQcm9kdWN0c1N1YnRpdGxlOiAnQWRkIHByb2R1Y3RzIGJ5IGltcG9ydGluZyBhIC5DU1YgZmlsZS4nLFxuICBpbXBvcnRQcm9kdWN0c05ld1NhdmVkQ2FydFN1YnRpdGxlOlxuICAgICdBZGQgcHJvZHVjdHMgYnkgaW1wb3J0aW5nIGEgLkNTViBmaWxlIGFuZCBjcmVhdGluZyBhIG5ldyBzYXZlZCBjYXJ0LicsXG4gIGltcG9ydFByb2R1Y3RGaWxlRGV0YWlsczpcbiAgICAnVGV4dCBmaWxlIHNob3VsZCBjb250YWluIGxpc3Qgb2YgcHJvZHVjdHMgd2l0aCByZXF1aXJlZCBjb2x1bW5zIHNlcGFyYXRlZCBieSBjb21tYTogU0tVIGFuZCBxdWFudGl0eS4nLFxuICBzZWxlY3RGaWxlOiAnU2VsZWN0IEZpbGUnLFxuICBzYXZlZENhcnROYW1lOiAnU2F2ZWQgQ2FydCBOYW1lJyxcbiAgc2F2ZWRDYXJ0RGVzY3JpcHRpb246ICdTYXZlZCBDYXJ0IERlc2NyaXB0aW9uJyxcbiAgb3B0aW9uYWw6ICdvcHRpb25hbCcsXG4gIGNoYXJhY3RlcnNMZWZ0OiAnY2hhcmFjdGVycyBsZWZ0OiB7e2NvdW50fX0nLFxuICBjYW5jZWw6ICdDYW5jZWwnLFxuICB1cGxvYWQ6ICdVcGxvYWQnLFxuICBjbG9zZTogJ0Nsb3NlJyxcbiAgc3VtbWFyeToge1xuICAgIGluZm86ICdEbyBub3QgY2xvc2Ugb3IgcmVmcmVzaCB0aGlzIHdpbmRvdyB3aGlsZSBwcm9kdWN0cyBhcmUgYmVpbmcgaW1wb3J0ZWQuJyxcbiAgICBsb2FkZWRUb0NhcnQ6ICdQcm9kdWN0cyBoYXMgYmVlbiBsb2FkZWQgdG8gY2FydCB7eyBjYXJ0TmFtZSB9fScsXG4gICAgbG9hZGVkOiAnUHJvZHVjdHMgaGFzIGJlZW4gbG9hZGVkJyxcbiAgICBsb2FkaW5nOiAnUHJvZHVjdHMgYXJlIGJlaW5nIHByb2Nlc3NlZC4uLiAoe3sgY291bnQgfX0ve3sgdG90YWwgfX0pJyxcbiAgICBzdWNjZXNzZXM6XG4gICAgICAne3sgc3VjY2Vzc2VzQ291bnQgfX0gb3V0IG9mIHt7IHRvdGFsIH19IHByb2R1Y3RzIGhhdmUgYmVlbiBpbXBvcnRlZCBzdWNjZXNzZnVsbHkuJyxcbiAgICB3YXJuaW5nOiAne3sgY291bnQgfX0gcHJvZHVjdCB3YXMgbm90IGltcG9ydGVkIHRvdGFsbHkuJyxcbiAgICB3YXJuaW5nX290aGVyOiAne3sgY291bnQgfX0gcHJvZHVjdHMgd2VyZSBub3QgaW1wb3J0ZWQgdG90YWxseS4nLFxuICAgIGVycm9yOiAne3sgY291bnQgfX0gcHJvZHVjdCB3YXMgbm90IGltcG9ydGVkLicsXG4gICAgZXJyb3Jfb3RoZXI6ICd7eyBjb3VudCB9fSBwcm9kdWN0cyB3ZXJlIG5vdCBpbXBvcnRlZC4nLFxuICAgIG1lc3NhZ2VzOiB7XG4gICAgICB1bmtub3duSWRlbnRpZmllcjogJ1Byb2R1Y3QgU0tVIFwie3sgcHJvZHVjdENvZGV9fVwiIGRvZXMgbm90IGV4aXN0LicsXG4gICAgICBsb3dTdG9jazpcbiAgICAgICAgJ1F1YW50aXR5IGZvciB7eyBwcm9kdWN0TmFtZSB9fToge3sgcXVhbnRpdHkgfX0gaGFzIGJlZW4gcmVkdWNlZCB0byB7eyBxdWFudGl0eUFkZGVkIH19LicsXG4gICAgICBub1N0b2NrOiAne3sgcHJvZHVjdE5hbWUgfX0gaXMgY3VycmVudGx5IG91dCBvZiBzdG9jay4nLFxuICAgICAgdW5rbm93bkVycm9yOiAnVW5yZWNvZ25pemVkIHByb2JsZW0gd2l0aCBcInt7IHByb2R1Y3RDb2RlIH19XCIuJyxcbiAgICAgIGxpbWl0RXhjZWVkZWQ6ICdDYW4gbm90IGFkZCBcInt7IHByb2R1Y3RDb2RlIH19XCIuIExpbWl0IGV4Y2VlZGVkLicsXG4gICAgfSxcbiAgICBzaG93OiAnU2hvdycsXG4gICAgaGlkZTogJ0hpZGUnLFxuICB9LFxufTtcblxuZXhwb3J0IGNvbnN0IGltcG9ydEV4cG9ydCA9IHtcbiAgZXhwb3J0RW50cmllcyxcbiAgaW1wb3J0RW50cmllcyxcbiAgaW1wb3J0RW50cmllc0RpYWxvZyxcbn07XG4iXX0=