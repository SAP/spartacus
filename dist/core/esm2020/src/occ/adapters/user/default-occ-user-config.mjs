/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
export const defaultOccUserConfig = {
    backend: {
        occ: {
            endpoints: {
                /* eslint-disable max-len */
                paymentDetailsAll: 'users/${userId}/paymentdetails',
                paymentDetail: 'users/${userId}/paymentdetails/${paymentDetailId}',
                anonymousConsentTemplates: 'users/anonymous/consenttemplates',
                consentTemplates: 'users/${userId}/consenttemplates',
                consents: 'users/${userId}/consents',
                consentDetail: 'users/${userId}/consents/${consentId}',
                addresses: 'users/${userId}/addresses',
                addressDetail: 'users/${userId}/addresses/${addressId}',
                addressVerification: 'users/${userId}/addresses/verification',
                customerCoupons: 'users/${userId}/customercoupons',
                claimCoupon: 'users/${userId}/customercoupons/${couponCode}/claim',
                couponNotification: 'users/${userId}/customercoupons/${couponCode}/notification',
                notificationPreference: 'users/${userId}/notificationpreferences',
                productInterests: 'users/${userId}/productinterests',
                getProductInterests: 'users/${userId}/productinterests?fields=sorts,pagination,results(productInterestEntry,product(code))',
            },
        },
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmYXVsdC1vY2MtdXNlci1jb25maWcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9jb3JlL3NyYy9vY2MvYWRhcHRlcnMvdXNlci9kZWZhdWx0LW9jYy11c2VyLWNvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBSUgsTUFBTSxDQUFDLE1BQU0sb0JBQW9CLEdBQWM7SUFDN0MsT0FBTyxFQUFFO1FBQ1AsR0FBRyxFQUFFO1lBQ0gsU0FBUyxFQUFFO2dCQUNULDRCQUE0QjtnQkFDNUIsaUJBQWlCLEVBQUUsZ0NBQWdDO2dCQUNuRCxhQUFhLEVBQUUsbURBQW1EO2dCQUNsRSx5QkFBeUIsRUFBRSxrQ0FBa0M7Z0JBQzdELGdCQUFnQixFQUFFLGtDQUFrQztnQkFDcEQsUUFBUSxFQUFFLDBCQUEwQjtnQkFDcEMsYUFBYSxFQUFFLHVDQUF1QztnQkFDdEQsU0FBUyxFQUFFLDJCQUEyQjtnQkFDdEMsYUFBYSxFQUFFLHdDQUF3QztnQkFDdkQsbUJBQW1CLEVBQUUsd0NBQXdDO2dCQUM3RCxlQUFlLEVBQUUsaUNBQWlDO2dCQUNsRCxXQUFXLEVBQUUscURBQXFEO2dCQUNsRSxrQkFBa0IsRUFDaEIsNERBQTREO2dCQUM5RCxzQkFBc0IsRUFBRSx5Q0FBeUM7Z0JBQ2pFLGdCQUFnQixFQUFFLGtDQUFrQztnQkFDcEQsbUJBQW1CLEVBQ2pCLHNHQUFzRzthQUN6RztTQUNGO0tBQ0Y7Q0FDRixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgT2NjQ29uZmlnIH0gZnJvbSAnLi4vLi4vY29uZmlnL29jYy1jb25maWcnO1xuXG5leHBvcnQgY29uc3QgZGVmYXVsdE9jY1VzZXJDb25maWc6IE9jY0NvbmZpZyA9IHtcbiAgYmFja2VuZDoge1xuICAgIG9jYzoge1xuICAgICAgZW5kcG9pbnRzOiB7XG4gICAgICAgIC8qIGVzbGludC1kaXNhYmxlIG1heC1sZW4gKi9cbiAgICAgICAgcGF5bWVudERldGFpbHNBbGw6ICd1c2Vycy8ke3VzZXJJZH0vcGF5bWVudGRldGFpbHMnLFxuICAgICAgICBwYXltZW50RGV0YWlsOiAndXNlcnMvJHt1c2VySWR9L3BheW1lbnRkZXRhaWxzLyR7cGF5bWVudERldGFpbElkfScsXG4gICAgICAgIGFub255bW91c0NvbnNlbnRUZW1wbGF0ZXM6ICd1c2Vycy9hbm9ueW1vdXMvY29uc2VudHRlbXBsYXRlcycsXG4gICAgICAgIGNvbnNlbnRUZW1wbGF0ZXM6ICd1c2Vycy8ke3VzZXJJZH0vY29uc2VudHRlbXBsYXRlcycsXG4gICAgICAgIGNvbnNlbnRzOiAndXNlcnMvJHt1c2VySWR9L2NvbnNlbnRzJyxcbiAgICAgICAgY29uc2VudERldGFpbDogJ3VzZXJzLyR7dXNlcklkfS9jb25zZW50cy8ke2NvbnNlbnRJZH0nLFxuICAgICAgICBhZGRyZXNzZXM6ICd1c2Vycy8ke3VzZXJJZH0vYWRkcmVzc2VzJyxcbiAgICAgICAgYWRkcmVzc0RldGFpbDogJ3VzZXJzLyR7dXNlcklkfS9hZGRyZXNzZXMvJHthZGRyZXNzSWR9JyxcbiAgICAgICAgYWRkcmVzc1ZlcmlmaWNhdGlvbjogJ3VzZXJzLyR7dXNlcklkfS9hZGRyZXNzZXMvdmVyaWZpY2F0aW9uJyxcbiAgICAgICAgY3VzdG9tZXJDb3Vwb25zOiAndXNlcnMvJHt1c2VySWR9L2N1c3RvbWVyY291cG9ucycsXG4gICAgICAgIGNsYWltQ291cG9uOiAndXNlcnMvJHt1c2VySWR9L2N1c3RvbWVyY291cG9ucy8ke2NvdXBvbkNvZGV9L2NsYWltJyxcbiAgICAgICAgY291cG9uTm90aWZpY2F0aW9uOlxuICAgICAgICAgICd1c2Vycy8ke3VzZXJJZH0vY3VzdG9tZXJjb3Vwb25zLyR7Y291cG9uQ29kZX0vbm90aWZpY2F0aW9uJyxcbiAgICAgICAgbm90aWZpY2F0aW9uUHJlZmVyZW5jZTogJ3VzZXJzLyR7dXNlcklkfS9ub3RpZmljYXRpb25wcmVmZXJlbmNlcycsXG4gICAgICAgIHByb2R1Y3RJbnRlcmVzdHM6ICd1c2Vycy8ke3VzZXJJZH0vcHJvZHVjdGludGVyZXN0cycsXG4gICAgICAgIGdldFByb2R1Y3RJbnRlcmVzdHM6XG4gICAgICAgICAgJ3VzZXJzLyR7dXNlcklkfS9wcm9kdWN0aW50ZXJlc3RzP2ZpZWxkcz1zb3J0cyxwYWdpbmF0aW9uLHJlc3VsdHMocHJvZHVjdEludGVyZXN0RW50cnkscHJvZHVjdChjb2RlKSknLFxuICAgICAgfSxcbiAgICB9LFxuICB9LFxufTtcbiJdfQ==