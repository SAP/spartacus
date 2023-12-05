/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
export const payment = {
    paymentForm: {
        payment: 'Payment',
        choosePaymentMethod: 'Choose a payment method',
        paymentType: 'Payment Type',
        accountHolderName: {
            label: 'Account Holder Name',
            placeholder: 'Account Holder Name',
        },
        cardNumber: 'Card Number',
        expirationDate: 'Expiration Date',
        securityCode: 'Security code (CVV)',
        securityCodeTitle: 'Card Verification Value',
        saveAsDefault: 'Save as default',
        setAsDefault: 'Set as default payment method',
        billingAddress: 'Billing address',
        sameAsDeliveryAddress: 'Same as delivery address',
        billingAddressSameAsShipping: 'Billing address is the same as delivery address',
        selectOne: 'Select One...',
        monthMask: 'MM',
        yearMask: 'YYYY',
        expirationYear: 'Expiration year {{ selected }}',
        expirationMonth: 'Expiration month {{ selected }}',
        useThisPayment: 'Use this payment',
        addNewPayment: 'Add New Payment',
        paymentAddedSuccessfully: 'New payment was added successfully',
        changePayment: 'Change Payment',
    },
    paymentMethods: {
        paymentMethods: 'Payment methods',
        paymentMethodSelected: 'Payment method selected',
        newPaymentMethodsAreAddedDuringCheckout: 'New payment methods are added during checkout.',
        invalidField: 'InvalidField: {{ field }}',
    },
    paymentCard: {
        deleteConfirmation: 'Are you sure you want to delete this payment method?',
        setAsDefault: 'Set as default',
        expires: 'Expires: {{ month }}/{{ year }}',
        defaultPaymentMethod: '✓ DEFAULT',
        defaultPaymentLabel: 'Default payment method',
        additionalPaymentLabel: 'Additional payment method {{ number }}',
        selected: 'Selected',
        deletePaymentSuccess: 'Payment method deleted successfully',
    },
    paymentTypes: {
        title: 'Payment method',
        paymentType_CARD: 'Credit Card',
        paymentType_ACCOUNT: 'Account',
    },
    paymentMessages: {
        setAsDefaultSuccessfully: 'New payment was successfully set as default',
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGF5bWVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2Fzc2V0cy9zcmMvdHJhbnNsYXRpb25zL2VuL3BheW1lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE1BQU0sQ0FBQyxNQUFNLE9BQU8sR0FBRztJQUNyQixXQUFXLEVBQUU7UUFDWCxPQUFPLEVBQUUsU0FBUztRQUNsQixtQkFBbUIsRUFBRSx5QkFBeUI7UUFDOUMsV0FBVyxFQUFFLGNBQWM7UUFDM0IsaUJBQWlCLEVBQUU7WUFDakIsS0FBSyxFQUFFLHFCQUFxQjtZQUM1QixXQUFXLEVBQUUscUJBQXFCO1NBQ25DO1FBQ0QsVUFBVSxFQUFFLGFBQWE7UUFDekIsY0FBYyxFQUFFLGlCQUFpQjtRQUNqQyxZQUFZLEVBQUUscUJBQXFCO1FBQ25DLGlCQUFpQixFQUFFLHlCQUF5QjtRQUM1QyxhQUFhLEVBQUUsaUJBQWlCO1FBQ2hDLFlBQVksRUFBRSwrQkFBK0I7UUFDN0MsY0FBYyxFQUFFLGlCQUFpQjtRQUNqQyxxQkFBcUIsRUFBRSwwQkFBMEI7UUFDakQsNEJBQTRCLEVBQzFCLGlEQUFpRDtRQUNuRCxTQUFTLEVBQUUsZUFBZTtRQUMxQixTQUFTLEVBQUUsSUFBSTtRQUNmLFFBQVEsRUFBRSxNQUFNO1FBQ2hCLGNBQWMsRUFBRSxnQ0FBZ0M7UUFDaEQsZUFBZSxFQUFFLGlDQUFpQztRQUNsRCxjQUFjLEVBQUUsa0JBQWtCO1FBQ2xDLGFBQWEsRUFBRSxpQkFBaUI7UUFDaEMsd0JBQXdCLEVBQUUsb0NBQW9DO1FBQzlELGFBQWEsRUFBRSxnQkFBZ0I7S0FDaEM7SUFDRCxjQUFjLEVBQUU7UUFDZCxjQUFjLEVBQUUsaUJBQWlCO1FBQ2pDLHFCQUFxQixFQUFFLHlCQUF5QjtRQUNoRCx1Q0FBdUMsRUFDckMsZ0RBQWdEO1FBQ2xELFlBQVksRUFBRSwyQkFBMkI7S0FDMUM7SUFDRCxXQUFXLEVBQUU7UUFDWCxrQkFBa0IsRUFBRSxzREFBc0Q7UUFDMUUsWUFBWSxFQUFFLGdCQUFnQjtRQUM5QixPQUFPLEVBQUUsaUNBQWlDO1FBQzFDLG9CQUFvQixFQUFFLFdBQVc7UUFDakMsbUJBQW1CLEVBQUUsd0JBQXdCO1FBQzdDLHNCQUFzQixFQUFFLHdDQUF3QztRQUNoRSxRQUFRLEVBQUUsVUFBVTtRQUNwQixvQkFBb0IsRUFBRSxxQ0FBcUM7S0FDNUQ7SUFDRCxZQUFZLEVBQUU7UUFDWixLQUFLLEVBQUUsZ0JBQWdCO1FBQ3ZCLGdCQUFnQixFQUFFLGFBQWE7UUFDL0IsbUJBQW1CLEVBQUUsU0FBUztLQUMvQjtJQUNELGVBQWUsRUFBRTtRQUNmLHdCQUF3QixFQUFFLDZDQUE2QztLQUN4RTtDQUNGLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5leHBvcnQgY29uc3QgcGF5bWVudCA9IHtcbiAgcGF5bWVudEZvcm06IHtcbiAgICBwYXltZW50OiAnUGF5bWVudCcsXG4gICAgY2hvb3NlUGF5bWVudE1ldGhvZDogJ0Nob29zZSBhIHBheW1lbnQgbWV0aG9kJyxcbiAgICBwYXltZW50VHlwZTogJ1BheW1lbnQgVHlwZScsXG4gICAgYWNjb3VudEhvbGRlck5hbWU6IHtcbiAgICAgIGxhYmVsOiAnQWNjb3VudCBIb2xkZXIgTmFtZScsXG4gICAgICBwbGFjZWhvbGRlcjogJ0FjY291bnQgSG9sZGVyIE5hbWUnLFxuICAgIH0sXG4gICAgY2FyZE51bWJlcjogJ0NhcmQgTnVtYmVyJyxcbiAgICBleHBpcmF0aW9uRGF0ZTogJ0V4cGlyYXRpb24gRGF0ZScsXG4gICAgc2VjdXJpdHlDb2RlOiAnU2VjdXJpdHkgY29kZSAoQ1ZWKScsXG4gICAgc2VjdXJpdHlDb2RlVGl0bGU6ICdDYXJkIFZlcmlmaWNhdGlvbiBWYWx1ZScsXG4gICAgc2F2ZUFzRGVmYXVsdDogJ1NhdmUgYXMgZGVmYXVsdCcsXG4gICAgc2V0QXNEZWZhdWx0OiAnU2V0IGFzIGRlZmF1bHQgcGF5bWVudCBtZXRob2QnLFxuICAgIGJpbGxpbmdBZGRyZXNzOiAnQmlsbGluZyBhZGRyZXNzJyxcbiAgICBzYW1lQXNEZWxpdmVyeUFkZHJlc3M6ICdTYW1lIGFzIGRlbGl2ZXJ5IGFkZHJlc3MnLFxuICAgIGJpbGxpbmdBZGRyZXNzU2FtZUFzU2hpcHBpbmc6XG4gICAgICAnQmlsbGluZyBhZGRyZXNzIGlzIHRoZSBzYW1lIGFzIGRlbGl2ZXJ5IGFkZHJlc3MnLFxuICAgIHNlbGVjdE9uZTogJ1NlbGVjdCBPbmUuLi4nLFxuICAgIG1vbnRoTWFzazogJ01NJyxcbiAgICB5ZWFyTWFzazogJ1lZWVknLFxuICAgIGV4cGlyYXRpb25ZZWFyOiAnRXhwaXJhdGlvbiB5ZWFyIHt7IHNlbGVjdGVkIH19JyxcbiAgICBleHBpcmF0aW9uTW9udGg6ICdFeHBpcmF0aW9uIG1vbnRoIHt7IHNlbGVjdGVkIH19JyxcbiAgICB1c2VUaGlzUGF5bWVudDogJ1VzZSB0aGlzIHBheW1lbnQnLFxuICAgIGFkZE5ld1BheW1lbnQ6ICdBZGQgTmV3IFBheW1lbnQnLFxuICAgIHBheW1lbnRBZGRlZFN1Y2Nlc3NmdWxseTogJ05ldyBwYXltZW50IHdhcyBhZGRlZCBzdWNjZXNzZnVsbHknLFxuICAgIGNoYW5nZVBheW1lbnQ6ICdDaGFuZ2UgUGF5bWVudCcsXG4gIH0sXG4gIHBheW1lbnRNZXRob2RzOiB7XG4gICAgcGF5bWVudE1ldGhvZHM6ICdQYXltZW50IG1ldGhvZHMnLFxuICAgIHBheW1lbnRNZXRob2RTZWxlY3RlZDogJ1BheW1lbnQgbWV0aG9kIHNlbGVjdGVkJyxcbiAgICBuZXdQYXltZW50TWV0aG9kc0FyZUFkZGVkRHVyaW5nQ2hlY2tvdXQ6XG4gICAgICAnTmV3IHBheW1lbnQgbWV0aG9kcyBhcmUgYWRkZWQgZHVyaW5nIGNoZWNrb3V0LicsXG4gICAgaW52YWxpZEZpZWxkOiAnSW52YWxpZEZpZWxkOiB7eyBmaWVsZCB9fScsXG4gIH0sXG4gIHBheW1lbnRDYXJkOiB7XG4gICAgZGVsZXRlQ29uZmlybWF0aW9uOiAnQXJlIHlvdSBzdXJlIHlvdSB3YW50IHRvIGRlbGV0ZSB0aGlzIHBheW1lbnQgbWV0aG9kPycsXG4gICAgc2V0QXNEZWZhdWx0OiAnU2V0IGFzIGRlZmF1bHQnLFxuICAgIGV4cGlyZXM6ICdFeHBpcmVzOiB7eyBtb250aCB9fS97eyB5ZWFyIH19JyxcbiAgICBkZWZhdWx0UGF5bWVudE1ldGhvZDogJ+KckyBERUZBVUxUJyxcbiAgICBkZWZhdWx0UGF5bWVudExhYmVsOiAnRGVmYXVsdCBwYXltZW50IG1ldGhvZCcsXG4gICAgYWRkaXRpb25hbFBheW1lbnRMYWJlbDogJ0FkZGl0aW9uYWwgcGF5bWVudCBtZXRob2Qge3sgbnVtYmVyIH19JyxcbiAgICBzZWxlY3RlZDogJ1NlbGVjdGVkJyxcbiAgICBkZWxldGVQYXltZW50U3VjY2VzczogJ1BheW1lbnQgbWV0aG9kIGRlbGV0ZWQgc3VjY2Vzc2Z1bGx5JyxcbiAgfSxcbiAgcGF5bWVudFR5cGVzOiB7XG4gICAgdGl0bGU6ICdQYXltZW50IG1ldGhvZCcsXG4gICAgcGF5bWVudFR5cGVfQ0FSRDogJ0NyZWRpdCBDYXJkJyxcbiAgICBwYXltZW50VHlwZV9BQ0NPVU5UOiAnQWNjb3VudCcsXG4gIH0sXG4gIHBheW1lbnRNZXNzYWdlczoge1xuICAgIHNldEFzRGVmYXVsdFN1Y2Nlc3NmdWxseTogJ05ldyBwYXltZW50IHdhcyBzdWNjZXNzZnVsbHkgc2V0IGFzIGRlZmF1bHQnLFxuICB9LFxufTtcbiJdfQ==