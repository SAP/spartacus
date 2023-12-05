/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
export const cart = {
    cartDetails: {
        id: 'ID',
        proceedToCheckout: 'Proceed to Checkout',
        cartName: 'Cart #{{code}}',
    },
    cartItems: {
        id: 'ID',
        description: 'Description',
        item: 'Item',
        itemPrice: 'Item price',
        quantity: 'Qty',
        quantityTitle: 'The quantity represents the total number of this item in your cart.',
        total: 'Total',
        actions: 'Actions',
        cartTotal: 'Cart total ({{count}} item)',
        cartTotal_other: 'Cart total ({{count}} items)',
        itemRemoved: 'Selected item has been removed. Cart total has been updated.',
        caption: 'Shopping cart contents.',
    },
    orderCost: {
        orderSummary: 'Order Summary',
        subtotal: 'Subtotal after discounts:',
        shipping: 'Shipping:',
        estimatedShipping: 'Estimated shipping:',
        discount: 'You saved:',
        salesTax: 'Sales Tax:',
        grossTax: 'The order total does not include tax of',
        grossIncludeTax: 'The order total includes tax of',
        total: 'Total:',
        toBeDetermined: 'TBD',
    },
    voucher: {
        coupon: 'Have a coupon?',
        coupon_other: 'Coupon codes',
        couponLabel: 'Enter a promo code here',
        apply: 'Apply',
        placeholder: 'Promo code',
        applyVoucherSuccess: '{{voucherCode}} has been applied.',
        removeVoucherSuccess: '{{voucherCode}} has been removed.',
        anchorLabel: 'Enter or remove your coupon code',
        vouchersApplied: 'Applied coupons',
        availableCoupons: 'Available coupons',
        availableCouponsLabel: 'You can add these coupons to this order.',
    },
    saveForLaterItems: {
        itemTotal: 'Saved for later ({{count}} item)',
        itemTotal_other: 'Saved for later ({{count}} items)',
        cartTitle: 'Cart',
        saveForLater: 'Save For Later',
        moveToCart: 'Move To Cart',
        stock: 'Stock',
        forceInStock: 'In Stock',
    },
    clearCart: {
        clearCart: 'Clear Cart',
        clearingCart: 'Clearing Cart...',
        cartClearedSuccessfully: 'Active cart cleared successfully.',
        areYouSureToClearCart: 'Are you sure you want to clear this cart?',
        allItemsWillBeRemoved: 'All items in your active cart will be removed.',
    },
    validation: {
        cartEntriesChangeDuringCheckout: 'During checkout we found problems with your entries. Please review your cart.',
        cartEntryRemoved: '{{name}} was removed from the cart due to being out of stock.',
        productOutOfStock: '{{name}} has been removed from the cart due to insufficient stock.',
        lowStock: 'Quantity has reduced to {{quantity}} due to insufficient stock.',
        reviewConfiguration: 'Resolve the issues in the configuration for cart entry first.',
        configurationError: 'Resolve the issues in the configuration for cart entries first.',
        pricingError: 'Configurator pricing is currently not available. Checkout/quote submission is not possible. Please try again later.',
        unresolvableIssues: 'The product configuration requires additional entries in the back end. As a result, you cannot proceed. Please contact support.',
        inProgress: 'Processing',
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FydC5pMThuLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL2NhcnQvYmFzZS9hc3NldHMvdHJhbnNsYXRpb25zL2VuL2NhcnQuaTE4bi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsTUFBTSxDQUFDLE1BQU0sSUFBSSxHQUFHO0lBQ2xCLFdBQVcsRUFBRTtRQUNYLEVBQUUsRUFBRSxJQUFJO1FBQ1IsaUJBQWlCLEVBQUUscUJBQXFCO1FBQ3hDLFFBQVEsRUFBRSxnQkFBZ0I7S0FDM0I7SUFDRCxTQUFTLEVBQUU7UUFDVCxFQUFFLEVBQUUsSUFBSTtRQUNSLFdBQVcsRUFBRSxhQUFhO1FBQzFCLElBQUksRUFBRSxNQUFNO1FBQ1osU0FBUyxFQUFFLFlBQVk7UUFDdkIsUUFBUSxFQUFFLEtBQUs7UUFDZixhQUFhLEVBQ1gscUVBQXFFO1FBQ3ZFLEtBQUssRUFBRSxPQUFPO1FBQ2QsT0FBTyxFQUFFLFNBQVM7UUFDbEIsU0FBUyxFQUFFLDZCQUE2QjtRQUN4QyxlQUFlLEVBQUUsOEJBQThCO1FBQy9DLFdBQVcsRUFBRSw4REFBOEQ7UUFDM0UsT0FBTyxFQUFFLHlCQUF5QjtLQUNuQztJQUNELFNBQVMsRUFBRTtRQUNULFlBQVksRUFBRSxlQUFlO1FBQzdCLFFBQVEsRUFBRSwyQkFBMkI7UUFDckMsUUFBUSxFQUFFLFdBQVc7UUFDckIsaUJBQWlCLEVBQUUscUJBQXFCO1FBQ3hDLFFBQVEsRUFBRSxZQUFZO1FBQ3RCLFFBQVEsRUFBRSxZQUFZO1FBQ3RCLFFBQVEsRUFBRSx5Q0FBeUM7UUFDbkQsZUFBZSxFQUFFLGlDQUFpQztRQUNsRCxLQUFLLEVBQUUsUUFBUTtRQUNmLGNBQWMsRUFBRSxLQUFLO0tBQ3RCO0lBQ0QsT0FBTyxFQUFFO1FBQ1AsTUFBTSxFQUFFLGdCQUFnQjtRQUN4QixZQUFZLEVBQUUsY0FBYztRQUM1QixXQUFXLEVBQUUseUJBQXlCO1FBQ3RDLEtBQUssRUFBRSxPQUFPO1FBQ2QsV0FBVyxFQUFFLFlBQVk7UUFDekIsbUJBQW1CLEVBQUUsbUNBQW1DO1FBQ3hELG9CQUFvQixFQUFFLG1DQUFtQztRQUN6RCxXQUFXLEVBQUUsa0NBQWtDO1FBQy9DLGVBQWUsRUFBRSxpQkFBaUI7UUFDbEMsZ0JBQWdCLEVBQUUsbUJBQW1CO1FBQ3JDLHFCQUFxQixFQUFFLDBDQUEwQztLQUNsRTtJQUNELGlCQUFpQixFQUFFO1FBQ2pCLFNBQVMsRUFBRSxrQ0FBa0M7UUFDN0MsZUFBZSxFQUFFLG1DQUFtQztRQUNwRCxTQUFTLEVBQUUsTUFBTTtRQUNqQixZQUFZLEVBQUUsZ0JBQWdCO1FBQzlCLFVBQVUsRUFBRSxjQUFjO1FBQzFCLEtBQUssRUFBRSxPQUFPO1FBQ2QsWUFBWSxFQUFFLFVBQVU7S0FDekI7SUFDRCxTQUFTLEVBQUU7UUFDVCxTQUFTLEVBQUUsWUFBWTtRQUN2QixZQUFZLEVBQUUsa0JBQWtCO1FBQ2hDLHVCQUF1QixFQUFFLG1DQUFtQztRQUM1RCxxQkFBcUIsRUFBRSwyQ0FBMkM7UUFDbEUscUJBQXFCLEVBQUUsZ0RBQWdEO0tBQ3hFO0lBQ0QsVUFBVSxFQUFFO1FBQ1YsK0JBQStCLEVBQzdCLCtFQUErRTtRQUNqRixnQkFBZ0IsRUFDZCwrREFBK0Q7UUFDakUsaUJBQWlCLEVBQ2Ysb0VBQW9FO1FBQ3RFLFFBQVEsRUFBRSxpRUFBaUU7UUFDM0UsbUJBQW1CLEVBQ2pCLCtEQUErRDtRQUNqRSxrQkFBa0IsRUFDaEIsaUVBQWlFO1FBQ25FLFlBQVksRUFDVixxSEFBcUg7UUFDdkgsa0JBQWtCLEVBQ2hCLGlJQUFpSTtRQUNuSSxVQUFVLEVBQUUsWUFBWTtLQUN6QjtDQUNGLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5leHBvcnQgY29uc3QgY2FydCA9IHtcbiAgY2FydERldGFpbHM6IHtcbiAgICBpZDogJ0lEJyxcbiAgICBwcm9jZWVkVG9DaGVja291dDogJ1Byb2NlZWQgdG8gQ2hlY2tvdXQnLFxuICAgIGNhcnROYW1lOiAnQ2FydCAje3tjb2RlfX0nLFxuICB9LFxuICBjYXJ0SXRlbXM6IHtcbiAgICBpZDogJ0lEJyxcbiAgICBkZXNjcmlwdGlvbjogJ0Rlc2NyaXB0aW9uJyxcbiAgICBpdGVtOiAnSXRlbScsXG4gICAgaXRlbVByaWNlOiAnSXRlbSBwcmljZScsXG4gICAgcXVhbnRpdHk6ICdRdHknLFxuICAgIHF1YW50aXR5VGl0bGU6XG4gICAgICAnVGhlIHF1YW50aXR5IHJlcHJlc2VudHMgdGhlIHRvdGFsIG51bWJlciBvZiB0aGlzIGl0ZW0gaW4geW91ciBjYXJ0LicsXG4gICAgdG90YWw6ICdUb3RhbCcsXG4gICAgYWN0aW9uczogJ0FjdGlvbnMnLFxuICAgIGNhcnRUb3RhbDogJ0NhcnQgdG90YWwgKHt7Y291bnR9fSBpdGVtKScsXG4gICAgY2FydFRvdGFsX290aGVyOiAnQ2FydCB0b3RhbCAoe3tjb3VudH19IGl0ZW1zKScsXG4gICAgaXRlbVJlbW92ZWQ6ICdTZWxlY3RlZCBpdGVtIGhhcyBiZWVuIHJlbW92ZWQuIENhcnQgdG90YWwgaGFzIGJlZW4gdXBkYXRlZC4nLFxuICAgIGNhcHRpb246ICdTaG9wcGluZyBjYXJ0IGNvbnRlbnRzLicsXG4gIH0sXG4gIG9yZGVyQ29zdDoge1xuICAgIG9yZGVyU3VtbWFyeTogJ09yZGVyIFN1bW1hcnknLFxuICAgIHN1YnRvdGFsOiAnU3VidG90YWwgYWZ0ZXIgZGlzY291bnRzOicsXG4gICAgc2hpcHBpbmc6ICdTaGlwcGluZzonLFxuICAgIGVzdGltYXRlZFNoaXBwaW5nOiAnRXN0aW1hdGVkIHNoaXBwaW5nOicsXG4gICAgZGlzY291bnQ6ICdZb3Ugc2F2ZWQ6JyxcbiAgICBzYWxlc1RheDogJ1NhbGVzIFRheDonLFxuICAgIGdyb3NzVGF4OiAnVGhlIG9yZGVyIHRvdGFsIGRvZXMgbm90IGluY2x1ZGUgdGF4IG9mJyxcbiAgICBncm9zc0luY2x1ZGVUYXg6ICdUaGUgb3JkZXIgdG90YWwgaW5jbHVkZXMgdGF4IG9mJyxcbiAgICB0b3RhbDogJ1RvdGFsOicsXG4gICAgdG9CZURldGVybWluZWQ6ICdUQkQnLFxuICB9LFxuICB2b3VjaGVyOiB7XG4gICAgY291cG9uOiAnSGF2ZSBhIGNvdXBvbj8nLFxuICAgIGNvdXBvbl9vdGhlcjogJ0NvdXBvbiBjb2RlcycsXG4gICAgY291cG9uTGFiZWw6ICdFbnRlciBhIHByb21vIGNvZGUgaGVyZScsXG4gICAgYXBwbHk6ICdBcHBseScsXG4gICAgcGxhY2Vob2xkZXI6ICdQcm9tbyBjb2RlJyxcbiAgICBhcHBseVZvdWNoZXJTdWNjZXNzOiAne3t2b3VjaGVyQ29kZX19IGhhcyBiZWVuIGFwcGxpZWQuJyxcbiAgICByZW1vdmVWb3VjaGVyU3VjY2VzczogJ3t7dm91Y2hlckNvZGV9fSBoYXMgYmVlbiByZW1vdmVkLicsXG4gICAgYW5jaG9yTGFiZWw6ICdFbnRlciBvciByZW1vdmUgeW91ciBjb3Vwb24gY29kZScsXG4gICAgdm91Y2hlcnNBcHBsaWVkOiAnQXBwbGllZCBjb3Vwb25zJyxcbiAgICBhdmFpbGFibGVDb3Vwb25zOiAnQXZhaWxhYmxlIGNvdXBvbnMnLFxuICAgIGF2YWlsYWJsZUNvdXBvbnNMYWJlbDogJ1lvdSBjYW4gYWRkIHRoZXNlIGNvdXBvbnMgdG8gdGhpcyBvcmRlci4nLFxuICB9LFxuICBzYXZlRm9yTGF0ZXJJdGVtczoge1xuICAgIGl0ZW1Ub3RhbDogJ1NhdmVkIGZvciBsYXRlciAoe3tjb3VudH19IGl0ZW0pJyxcbiAgICBpdGVtVG90YWxfb3RoZXI6ICdTYXZlZCBmb3IgbGF0ZXIgKHt7Y291bnR9fSBpdGVtcyknLFxuICAgIGNhcnRUaXRsZTogJ0NhcnQnLFxuICAgIHNhdmVGb3JMYXRlcjogJ1NhdmUgRm9yIExhdGVyJyxcbiAgICBtb3ZlVG9DYXJ0OiAnTW92ZSBUbyBDYXJ0JyxcbiAgICBzdG9jazogJ1N0b2NrJyxcbiAgICBmb3JjZUluU3RvY2s6ICdJbiBTdG9jaycsXG4gIH0sXG4gIGNsZWFyQ2FydDoge1xuICAgIGNsZWFyQ2FydDogJ0NsZWFyIENhcnQnLFxuICAgIGNsZWFyaW5nQ2FydDogJ0NsZWFyaW5nIENhcnQuLi4nLFxuICAgIGNhcnRDbGVhcmVkU3VjY2Vzc2Z1bGx5OiAnQWN0aXZlIGNhcnQgY2xlYXJlZCBzdWNjZXNzZnVsbHkuJyxcbiAgICBhcmVZb3VTdXJlVG9DbGVhckNhcnQ6ICdBcmUgeW91IHN1cmUgeW91IHdhbnQgdG8gY2xlYXIgdGhpcyBjYXJ0PycsXG4gICAgYWxsSXRlbXNXaWxsQmVSZW1vdmVkOiAnQWxsIGl0ZW1zIGluIHlvdXIgYWN0aXZlIGNhcnQgd2lsbCBiZSByZW1vdmVkLicsXG4gIH0sXG4gIHZhbGlkYXRpb246IHtcbiAgICBjYXJ0RW50cmllc0NoYW5nZUR1cmluZ0NoZWNrb3V0OlxuICAgICAgJ0R1cmluZyBjaGVja291dCB3ZSBmb3VuZCBwcm9ibGVtcyB3aXRoIHlvdXIgZW50cmllcy4gUGxlYXNlIHJldmlldyB5b3VyIGNhcnQuJyxcbiAgICBjYXJ0RW50cnlSZW1vdmVkOlxuICAgICAgJ3t7bmFtZX19IHdhcyByZW1vdmVkIGZyb20gdGhlIGNhcnQgZHVlIHRvIGJlaW5nIG91dCBvZiBzdG9jay4nLFxuICAgIHByb2R1Y3RPdXRPZlN0b2NrOlxuICAgICAgJ3t7bmFtZX19IGhhcyBiZWVuIHJlbW92ZWQgZnJvbSB0aGUgY2FydCBkdWUgdG8gaW5zdWZmaWNpZW50IHN0b2NrLicsXG4gICAgbG93U3RvY2s6ICdRdWFudGl0eSBoYXMgcmVkdWNlZCB0byB7e3F1YW50aXR5fX0gZHVlIHRvIGluc3VmZmljaWVudCBzdG9jay4nLFxuICAgIHJldmlld0NvbmZpZ3VyYXRpb246XG4gICAgICAnUmVzb2x2ZSB0aGUgaXNzdWVzIGluIHRoZSBjb25maWd1cmF0aW9uIGZvciBjYXJ0IGVudHJ5IGZpcnN0LicsXG4gICAgY29uZmlndXJhdGlvbkVycm9yOlxuICAgICAgJ1Jlc29sdmUgdGhlIGlzc3VlcyBpbiB0aGUgY29uZmlndXJhdGlvbiBmb3IgY2FydCBlbnRyaWVzIGZpcnN0LicsXG4gICAgcHJpY2luZ0Vycm9yOlxuICAgICAgJ0NvbmZpZ3VyYXRvciBwcmljaW5nIGlzIGN1cnJlbnRseSBub3QgYXZhaWxhYmxlLiBDaGVja291dC9xdW90ZSBzdWJtaXNzaW9uIGlzIG5vdCBwb3NzaWJsZS4gUGxlYXNlIHRyeSBhZ2FpbiBsYXRlci4nLFxuICAgIHVucmVzb2x2YWJsZUlzc3VlczpcbiAgICAgICdUaGUgcHJvZHVjdCBjb25maWd1cmF0aW9uIHJlcXVpcmVzIGFkZGl0aW9uYWwgZW50cmllcyBpbiB0aGUgYmFjayBlbmQuIEFzIGEgcmVzdWx0LCB5b3UgY2Fubm90IHByb2NlZWQuIFBsZWFzZSBjb250YWN0IHN1cHBvcnQuJyxcbiAgICBpblByb2dyZXNzOiAnUHJvY2Vzc2luZycsXG4gIH0sXG59O1xuIl19