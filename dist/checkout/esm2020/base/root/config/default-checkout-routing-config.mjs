/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
export const defaultCheckoutRoutingConfig = {
    routing: {
        routes: {
            checkoutLogin: { paths: ['checkout-login'], authFlow: true },
            checkout: { paths: ['checkout'] },
            checkoutDeliveryAddress: { paths: ['checkout/delivery-address'] },
            checkoutDeliveryMode: { paths: ['checkout/delivery-mode'] },
            checkoutPaymentDetails: { paths: ['checkout/payment-details'] },
            checkoutReviewOrder: { paths: ['checkout/review-order'] },
        },
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmYXVsdC1jaGVja291dC1yb3V0aW5nLWNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9jaGVja291dC9iYXNlL3Jvb3QvY29uZmlnL2RlZmF1bHQtY2hlY2tvdXQtcm91dGluZy1jb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUlILE1BQU0sQ0FBQyxNQUFNLDRCQUE0QixHQUFrQjtJQUN6RCxPQUFPLEVBQUU7UUFDUCxNQUFNLEVBQUU7WUFDTixhQUFhLEVBQUUsRUFBRSxLQUFLLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUU7WUFDNUQsUUFBUSxFQUFFLEVBQUUsS0FBSyxFQUFFLENBQUMsVUFBVSxDQUFDLEVBQUU7WUFDakMsdUJBQXVCLEVBQUUsRUFBRSxLQUFLLEVBQUUsQ0FBQywyQkFBMkIsQ0FBQyxFQUFFO1lBQ2pFLG9CQUFvQixFQUFFLEVBQUUsS0FBSyxFQUFFLENBQUMsd0JBQXdCLENBQUMsRUFBRTtZQUMzRCxzQkFBc0IsRUFBRSxFQUFFLEtBQUssRUFBRSxDQUFDLDBCQUEwQixDQUFDLEVBQUU7WUFDL0QsbUJBQW1CLEVBQUUsRUFBRSxLQUFLLEVBQUUsQ0FBQyx1QkFBdUIsQ0FBQyxFQUFFO1NBQzFEO0tBQ0Y7Q0FDRixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgUm91dGluZ0NvbmZpZyB9IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5cbmV4cG9ydCBjb25zdCBkZWZhdWx0Q2hlY2tvdXRSb3V0aW5nQ29uZmlnOiBSb3V0aW5nQ29uZmlnID0ge1xuICByb3V0aW5nOiB7XG4gICAgcm91dGVzOiB7XG4gICAgICBjaGVja291dExvZ2luOiB7IHBhdGhzOiBbJ2NoZWNrb3V0LWxvZ2luJ10sIGF1dGhGbG93OiB0cnVlIH0sXG4gICAgICBjaGVja291dDogeyBwYXRoczogWydjaGVja291dCddIH0sXG4gICAgICBjaGVja291dERlbGl2ZXJ5QWRkcmVzczogeyBwYXRoczogWydjaGVja291dC9kZWxpdmVyeS1hZGRyZXNzJ10gfSxcbiAgICAgIGNoZWNrb3V0RGVsaXZlcnlNb2RlOiB7IHBhdGhzOiBbJ2NoZWNrb3V0L2RlbGl2ZXJ5LW1vZGUnXSB9LFxuICAgICAgY2hlY2tvdXRQYXltZW50RGV0YWlsczogeyBwYXRoczogWydjaGVja291dC9wYXltZW50LWRldGFpbHMnXSB9LFxuICAgICAgY2hlY2tvdXRSZXZpZXdPcmRlcjogeyBwYXRoczogWydjaGVja291dC9yZXZpZXctb3JkZXInXSB9LFxuICAgIH0sXG4gIH0sXG59O1xuIl19