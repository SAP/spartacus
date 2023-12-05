/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
export const defaultOccBulkPricingConfig = {
    backend: {
        occ: {
            endpoints: {
                product: {
                    bulkPrices: 'orgProducts/${productCode}?fields=price(DEFAULT),volumePrices(FULL)',
                },
            },
        },
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmYXVsdC1vY2MtYnVsay1wcmljaW5nLWNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9wcm9kdWN0L2J1bGstcHJpY2luZy9vY2MvY29uZmlnL2RlZmF1bHQtb2NjLWJ1bGstcHJpY2luZy1jb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUlILE1BQU0sQ0FBQyxNQUFNLDJCQUEyQixHQUFjO0lBQ3BELE9BQU8sRUFBRTtRQUNQLEdBQUcsRUFBRTtZQUNILFNBQVMsRUFBRTtnQkFDVCxPQUFPLEVBQUU7b0JBQ1AsVUFBVSxFQUNSLHFFQUFxRTtpQkFDeEU7YUFDRjtTQUNGO0tBQ0Y7Q0FDRixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgT2NjQ29uZmlnIH0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcblxuZXhwb3J0IGNvbnN0IGRlZmF1bHRPY2NCdWxrUHJpY2luZ0NvbmZpZzogT2NjQ29uZmlnID0ge1xuICBiYWNrZW5kOiB7XG4gICAgb2NjOiB7XG4gICAgICBlbmRwb2ludHM6IHtcbiAgICAgICAgcHJvZHVjdDoge1xuICAgICAgICAgIGJ1bGtQcmljZXM6XG4gICAgICAgICAgICAnb3JnUHJvZHVjdHMvJHtwcm9kdWN0Q29kZX0/ZmllbGRzPXByaWNlKERFRkFVTFQpLHZvbHVtZVByaWNlcyhGVUxMKScsXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0sXG4gIH0sXG59O1xuIl19