/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
export const quickOrderCartForm = {
    entriesWereAdded: '({{ quantity }}) {{ product }} has been added to the cart',
    entryWasAdded: '{{ product }} has been added to the cart',
    noResults: 'We could not find any products',
    stockLevelReached: 'The maximum stock level has been reached',
    title: 'Quick Order',
    productCodePlaceholder: 'Enter ID',
    entryProductCode: 'Enter Product ID for Quick Order',
    quantity: 'Quantity for Quick Order',
    addToCart: 'Add Product to Quick Order',
    add: 'Add',
    product: 'Product',
    products: 'Products',
    productCodeLabel: 'Product ID',
    quantityLabel: 'Qty',
};
export const quickOrderForm = {
    placeholder: 'Enter Product name or SKU',
    searchBoxLabel: 'Enter Product name or SKU for quick order. You can add up to {{ limit }} products per order.',
    listLimitReached: 'The product limit has been reached.',
    id: 'ID {{ id }}',
    noResults: 'We could not find any results',
    addProduct: 'Add product {{ product }}',
    initialDescription: 'When autocomplete results are available use up and down arrows to review and enter to select.',
    productsResults: '{{ count }} products are available.',
    quickOrderSearch: 'Find product for quick order',
};
export const quickOrderList = {
    addToCart: 'Add to cart',
    emptyList: 'Empty list',
    header: 'Add Products/SKUs',
    subHeader: 'You can add up to {{ limit }} valid SKU at a time.',
    errorProceedingToCart: 'Error proceeding to Cart.',
    warningProceedingToCart: 'Warning proceeding to Cart.',
    successfullyAddedToCart: 'Successfully added to Cart.',
    errors: {
        productIsOutOfStock: '{{ name }} (#{{code}}) is out of stock.',
        reviewErrors: 'Please review these errors.',
        listIsFull: 'The list is full, add these {{ count }} products to Cart in order to continue.',
        nonPurchasableError: 'Product {{ name }} cannot be purchased',
        outOfStockErrorFound: '{{count}} out of stock product was not added.',
        outOfStockErrorFound_other: '{{count}} out of stock products were not added.',
    },
    warnings: {
        productWasReduced: 'Quantity for {{ name }} (#{{code}}) was reduced to {{ quantityAdded}}.',
        reviewWarnings: 'Please review these warnings.',
        reduceWarningFound: '{{count}} product quantity was reduced.',
        reduceWarningFound_other: '{{count}} products quantity were reduced.',
    },
    successes: {
        productAddedToCart: '{{ name }} (#{{code}}) was added to cart.',
        addedToCartFound: '{{ count }} product was added to cart.',
        addedToCartFound_other: '{{ count }} products were added to cart.',
    },
    informations: {
        addProductBeforeAddingToCart: 'Add products to the list before adding to the cart.',
    },
    undo: 'UNDO',
    revokeUndo: 'Revoked product "{{name}}" deletion.',
    productWasDeleted: 'Product "{{ name }}" moved to trash.',
};
export const quickOrderTable = {
    product: 'Product',
    id: 'ID',
    price: 'Price',
    quantity: 'QTY',
    itemPrice: 'Item price',
    qty: 'Qty',
    actions: 'Actions',
    inStock: 'In Stock',
    lowStock: 'Low Stock',
    outOfStock: 'Out of Stock',
    listCleared: 'Quick order list has been cleared',
    addedtoCart: 'Quick order list has been added to the cart',
    caption: 'Quick order contents.',
};
export const quickOrder = {
    quickOrderCartForm,
    quickOrderForm,
    quickOrderList,
    quickOrderTable,
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVpY2stb3JkZXIuaTE4bi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9jYXJ0L3F1aWNrLW9yZGVyL2Fzc2V0cy90cmFuc2xhdGlvbnMvZW4vcXVpY2stb3JkZXIuaTE4bi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsTUFBTSxDQUFDLE1BQU0sa0JBQWtCLEdBQUc7SUFDaEMsZ0JBQWdCLEVBQUUsMkRBQTJEO0lBQzdFLGFBQWEsRUFBRSwwQ0FBMEM7SUFDekQsU0FBUyxFQUFFLGdDQUFnQztJQUMzQyxpQkFBaUIsRUFBRSwwQ0FBMEM7SUFDN0QsS0FBSyxFQUFFLGFBQWE7SUFDcEIsc0JBQXNCLEVBQUUsVUFBVTtJQUNsQyxnQkFBZ0IsRUFBRSxrQ0FBa0M7SUFDcEQsUUFBUSxFQUFFLDBCQUEwQjtJQUNwQyxTQUFTLEVBQUUsNEJBQTRCO0lBQ3ZDLEdBQUcsRUFBRSxLQUFLO0lBQ1YsT0FBTyxFQUFFLFNBQVM7SUFDbEIsUUFBUSxFQUFFLFVBQVU7SUFDcEIsZ0JBQWdCLEVBQUUsWUFBWTtJQUM5QixhQUFhLEVBQUUsS0FBSztDQUNyQixDQUFDO0FBRUYsTUFBTSxDQUFDLE1BQU0sY0FBYyxHQUFHO0lBQzVCLFdBQVcsRUFBRSwyQkFBMkI7SUFDeEMsY0FBYyxFQUNaLDhGQUE4RjtJQUNoRyxnQkFBZ0IsRUFBRSxxQ0FBcUM7SUFDdkQsRUFBRSxFQUFFLGFBQWE7SUFDakIsU0FBUyxFQUFFLCtCQUErQjtJQUMxQyxVQUFVLEVBQUUsMkJBQTJCO0lBQ3ZDLGtCQUFrQixFQUNoQiwrRkFBK0Y7SUFDakcsZUFBZSxFQUFFLHFDQUFxQztJQUN0RCxnQkFBZ0IsRUFBRSw4QkFBOEI7Q0FDakQsQ0FBQztBQUVGLE1BQU0sQ0FBQyxNQUFNLGNBQWMsR0FBRztJQUM1QixTQUFTLEVBQUUsYUFBYTtJQUN4QixTQUFTLEVBQUUsWUFBWTtJQUN2QixNQUFNLEVBQUUsbUJBQW1CO0lBQzNCLFNBQVMsRUFBRSxvREFBb0Q7SUFDL0QscUJBQXFCLEVBQUUsMkJBQTJCO0lBQ2xELHVCQUF1QixFQUFFLDZCQUE2QjtJQUN0RCx1QkFBdUIsRUFBRSw2QkFBNkI7SUFDdEQsTUFBTSxFQUFFO1FBQ04sbUJBQW1CLEVBQUUseUNBQXlDO1FBQzlELFlBQVksRUFBRSw2QkFBNkI7UUFDM0MsVUFBVSxFQUNSLGdGQUFnRjtRQUNsRixtQkFBbUIsRUFBRSx3Q0FBd0M7UUFDN0Qsb0JBQW9CLEVBQUUsK0NBQStDO1FBQ3JFLDBCQUEwQixFQUN4QixpREFBaUQ7S0FDcEQ7SUFDRCxRQUFRLEVBQUU7UUFDUixpQkFBaUIsRUFDZix3RUFBd0U7UUFDMUUsY0FBYyxFQUFFLCtCQUErQjtRQUMvQyxrQkFBa0IsRUFBRSx5Q0FBeUM7UUFDN0Qsd0JBQXdCLEVBQUUsMkNBQTJDO0tBQ3RFO0lBQ0QsU0FBUyxFQUFFO1FBQ1Qsa0JBQWtCLEVBQUUsMkNBQTJDO1FBQy9ELGdCQUFnQixFQUFFLHdDQUF3QztRQUMxRCxzQkFBc0IsRUFBRSwwQ0FBMEM7S0FDbkU7SUFDRCxZQUFZLEVBQUU7UUFDWiw0QkFBNEIsRUFDMUIscURBQXFEO0tBQ3hEO0lBQ0QsSUFBSSxFQUFFLE1BQU07SUFDWixVQUFVLEVBQUUsc0NBQXNDO0lBQ2xELGlCQUFpQixFQUFFLHNDQUFzQztDQUMxRCxDQUFDO0FBRUYsTUFBTSxDQUFDLE1BQU0sZUFBZSxHQUFHO0lBQzdCLE9BQU8sRUFBRSxTQUFTO0lBQ2xCLEVBQUUsRUFBRSxJQUFJO0lBQ1IsS0FBSyxFQUFFLE9BQU87SUFDZCxRQUFRLEVBQUUsS0FBSztJQUNmLFNBQVMsRUFBRSxZQUFZO0lBQ3ZCLEdBQUcsRUFBRSxLQUFLO0lBQ1YsT0FBTyxFQUFFLFNBQVM7SUFDbEIsT0FBTyxFQUFFLFVBQVU7SUFDbkIsUUFBUSxFQUFFLFdBQVc7SUFDckIsVUFBVSxFQUFFLGNBQWM7SUFDMUIsV0FBVyxFQUFFLG1DQUFtQztJQUNoRCxXQUFXLEVBQUUsNkNBQTZDO0lBQzFELE9BQU8sRUFBRSx1QkFBdUI7Q0FDakMsQ0FBQztBQUVGLE1BQU0sQ0FBQyxNQUFNLFVBQVUsR0FBRztJQUN4QixrQkFBa0I7SUFDbEIsY0FBYztJQUNkLGNBQWM7SUFDZCxlQUFlO0NBQ2hCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5leHBvcnQgY29uc3QgcXVpY2tPcmRlckNhcnRGb3JtID0ge1xuICBlbnRyaWVzV2VyZUFkZGVkOiAnKHt7IHF1YW50aXR5IH19KSB7eyBwcm9kdWN0IH19IGhhcyBiZWVuIGFkZGVkIHRvIHRoZSBjYXJ0JyxcbiAgZW50cnlXYXNBZGRlZDogJ3t7IHByb2R1Y3QgfX0gaGFzIGJlZW4gYWRkZWQgdG8gdGhlIGNhcnQnLFxuICBub1Jlc3VsdHM6ICdXZSBjb3VsZCBub3QgZmluZCBhbnkgcHJvZHVjdHMnLFxuICBzdG9ja0xldmVsUmVhY2hlZDogJ1RoZSBtYXhpbXVtIHN0b2NrIGxldmVsIGhhcyBiZWVuIHJlYWNoZWQnLFxuICB0aXRsZTogJ1F1aWNrIE9yZGVyJyxcbiAgcHJvZHVjdENvZGVQbGFjZWhvbGRlcjogJ0VudGVyIElEJyxcbiAgZW50cnlQcm9kdWN0Q29kZTogJ0VudGVyIFByb2R1Y3QgSUQgZm9yIFF1aWNrIE9yZGVyJyxcbiAgcXVhbnRpdHk6ICdRdWFudGl0eSBmb3IgUXVpY2sgT3JkZXInLFxuICBhZGRUb0NhcnQ6ICdBZGQgUHJvZHVjdCB0byBRdWljayBPcmRlcicsXG4gIGFkZDogJ0FkZCcsXG4gIHByb2R1Y3Q6ICdQcm9kdWN0JyxcbiAgcHJvZHVjdHM6ICdQcm9kdWN0cycsXG4gIHByb2R1Y3RDb2RlTGFiZWw6ICdQcm9kdWN0IElEJyxcbiAgcXVhbnRpdHlMYWJlbDogJ1F0eScsXG59O1xuXG5leHBvcnQgY29uc3QgcXVpY2tPcmRlckZvcm0gPSB7XG4gIHBsYWNlaG9sZGVyOiAnRW50ZXIgUHJvZHVjdCBuYW1lIG9yIFNLVScsXG4gIHNlYXJjaEJveExhYmVsOlxuICAgICdFbnRlciBQcm9kdWN0IG5hbWUgb3IgU0tVIGZvciBxdWljayBvcmRlci4gWW91IGNhbiBhZGQgdXAgdG8ge3sgbGltaXQgfX0gcHJvZHVjdHMgcGVyIG9yZGVyLicsXG4gIGxpc3RMaW1pdFJlYWNoZWQ6ICdUaGUgcHJvZHVjdCBsaW1pdCBoYXMgYmVlbiByZWFjaGVkLicsXG4gIGlkOiAnSUQge3sgaWQgfX0nLFxuICBub1Jlc3VsdHM6ICdXZSBjb3VsZCBub3QgZmluZCBhbnkgcmVzdWx0cycsXG4gIGFkZFByb2R1Y3Q6ICdBZGQgcHJvZHVjdCB7eyBwcm9kdWN0IH19JyxcbiAgaW5pdGlhbERlc2NyaXB0aW9uOlxuICAgICdXaGVuIGF1dG9jb21wbGV0ZSByZXN1bHRzIGFyZSBhdmFpbGFibGUgdXNlIHVwIGFuZCBkb3duIGFycm93cyB0byByZXZpZXcgYW5kIGVudGVyIHRvIHNlbGVjdC4nLFxuICBwcm9kdWN0c1Jlc3VsdHM6ICd7eyBjb3VudCB9fSBwcm9kdWN0cyBhcmUgYXZhaWxhYmxlLicsXG4gIHF1aWNrT3JkZXJTZWFyY2g6ICdGaW5kIHByb2R1Y3QgZm9yIHF1aWNrIG9yZGVyJyxcbn07XG5cbmV4cG9ydCBjb25zdCBxdWlja09yZGVyTGlzdCA9IHtcbiAgYWRkVG9DYXJ0OiAnQWRkIHRvIGNhcnQnLFxuICBlbXB0eUxpc3Q6ICdFbXB0eSBsaXN0JyxcbiAgaGVhZGVyOiAnQWRkIFByb2R1Y3RzL1NLVXMnLFxuICBzdWJIZWFkZXI6ICdZb3UgY2FuIGFkZCB1cCB0byB7eyBsaW1pdCB9fSB2YWxpZCBTS1UgYXQgYSB0aW1lLicsXG4gIGVycm9yUHJvY2VlZGluZ1RvQ2FydDogJ0Vycm9yIHByb2NlZWRpbmcgdG8gQ2FydC4nLFxuICB3YXJuaW5nUHJvY2VlZGluZ1RvQ2FydDogJ1dhcm5pbmcgcHJvY2VlZGluZyB0byBDYXJ0LicsXG4gIHN1Y2Nlc3NmdWxseUFkZGVkVG9DYXJ0OiAnU3VjY2Vzc2Z1bGx5IGFkZGVkIHRvIENhcnQuJyxcbiAgZXJyb3JzOiB7XG4gICAgcHJvZHVjdElzT3V0T2ZTdG9jazogJ3t7IG5hbWUgfX0gKCN7e2NvZGV9fSkgaXMgb3V0IG9mIHN0b2NrLicsXG4gICAgcmV2aWV3RXJyb3JzOiAnUGxlYXNlIHJldmlldyB0aGVzZSBlcnJvcnMuJyxcbiAgICBsaXN0SXNGdWxsOlxuICAgICAgJ1RoZSBsaXN0IGlzIGZ1bGwsIGFkZCB0aGVzZSB7eyBjb3VudCB9fSBwcm9kdWN0cyB0byBDYXJ0IGluIG9yZGVyIHRvIGNvbnRpbnVlLicsXG4gICAgbm9uUHVyY2hhc2FibGVFcnJvcjogJ1Byb2R1Y3Qge3sgbmFtZSB9fSBjYW5ub3QgYmUgcHVyY2hhc2VkJyxcbiAgICBvdXRPZlN0b2NrRXJyb3JGb3VuZDogJ3t7Y291bnR9fSBvdXQgb2Ygc3RvY2sgcHJvZHVjdCB3YXMgbm90IGFkZGVkLicsXG4gICAgb3V0T2ZTdG9ja0Vycm9yRm91bmRfb3RoZXI6XG4gICAgICAne3tjb3VudH19IG91dCBvZiBzdG9jayBwcm9kdWN0cyB3ZXJlIG5vdCBhZGRlZC4nLFxuICB9LFxuICB3YXJuaW5nczoge1xuICAgIHByb2R1Y3RXYXNSZWR1Y2VkOlxuICAgICAgJ1F1YW50aXR5IGZvciB7eyBuYW1lIH19ICgje3tjb2RlfX0pIHdhcyByZWR1Y2VkIHRvIHt7IHF1YW50aXR5QWRkZWR9fS4nLFxuICAgIHJldmlld1dhcm5pbmdzOiAnUGxlYXNlIHJldmlldyB0aGVzZSB3YXJuaW5ncy4nLFxuICAgIHJlZHVjZVdhcm5pbmdGb3VuZDogJ3t7Y291bnR9fSBwcm9kdWN0IHF1YW50aXR5IHdhcyByZWR1Y2VkLicsXG4gICAgcmVkdWNlV2FybmluZ0ZvdW5kX290aGVyOiAne3tjb3VudH19IHByb2R1Y3RzIHF1YW50aXR5IHdlcmUgcmVkdWNlZC4nLFxuICB9LFxuICBzdWNjZXNzZXM6IHtcbiAgICBwcm9kdWN0QWRkZWRUb0NhcnQ6ICd7eyBuYW1lIH19ICgje3tjb2RlfX0pIHdhcyBhZGRlZCB0byBjYXJ0LicsXG4gICAgYWRkZWRUb0NhcnRGb3VuZDogJ3t7IGNvdW50IH19IHByb2R1Y3Qgd2FzIGFkZGVkIHRvIGNhcnQuJyxcbiAgICBhZGRlZFRvQ2FydEZvdW5kX290aGVyOiAne3sgY291bnQgfX0gcHJvZHVjdHMgd2VyZSBhZGRlZCB0byBjYXJ0LicsXG4gIH0sXG4gIGluZm9ybWF0aW9uczoge1xuICAgIGFkZFByb2R1Y3RCZWZvcmVBZGRpbmdUb0NhcnQ6XG4gICAgICAnQWRkIHByb2R1Y3RzIHRvIHRoZSBsaXN0IGJlZm9yZSBhZGRpbmcgdG8gdGhlIGNhcnQuJyxcbiAgfSxcbiAgdW5kbzogJ1VORE8nLFxuICByZXZva2VVbmRvOiAnUmV2b2tlZCBwcm9kdWN0IFwie3tuYW1lfX1cIiBkZWxldGlvbi4nLFxuICBwcm9kdWN0V2FzRGVsZXRlZDogJ1Byb2R1Y3QgXCJ7eyBuYW1lIH19XCIgbW92ZWQgdG8gdHJhc2guJyxcbn07XG5cbmV4cG9ydCBjb25zdCBxdWlja09yZGVyVGFibGUgPSB7XG4gIHByb2R1Y3Q6ICdQcm9kdWN0JyxcbiAgaWQ6ICdJRCcsXG4gIHByaWNlOiAnUHJpY2UnLFxuICBxdWFudGl0eTogJ1FUWScsXG4gIGl0ZW1QcmljZTogJ0l0ZW0gcHJpY2UnLFxuICBxdHk6ICdRdHknLFxuICBhY3Rpb25zOiAnQWN0aW9ucycsXG4gIGluU3RvY2s6ICdJbiBTdG9jaycsXG4gIGxvd1N0b2NrOiAnTG93IFN0b2NrJyxcbiAgb3V0T2ZTdG9jazogJ091dCBvZiBTdG9jaycsXG4gIGxpc3RDbGVhcmVkOiAnUXVpY2sgb3JkZXIgbGlzdCBoYXMgYmVlbiBjbGVhcmVkJyxcbiAgYWRkZWR0b0NhcnQ6ICdRdWljayBvcmRlciBsaXN0IGhhcyBiZWVuIGFkZGVkIHRvIHRoZSBjYXJ0JyxcbiAgY2FwdGlvbjogJ1F1aWNrIG9yZGVyIGNvbnRlbnRzLicsXG59O1xuXG5leHBvcnQgY29uc3QgcXVpY2tPcmRlciA9IHtcbiAgcXVpY2tPcmRlckNhcnRGb3JtLFxuICBxdWlja09yZGVyRm9ybSxcbiAgcXVpY2tPcmRlckxpc3QsXG4gIHF1aWNrT3JkZXJUYWJsZSxcbn07XG4iXX0=