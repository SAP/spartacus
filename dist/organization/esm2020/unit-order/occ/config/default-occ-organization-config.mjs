/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
export const defaultOccUnitOrderConfig = {
    backend: {
        occ: {
            endpoints: {
                unitLevelOrderHistory: `/orgUsers/\${userId}/orgUnits/orders`,
                unitLevelOrderDetail: `orgUsers/\${userId}/orgUnits/orders/\${orderId}?fields=FULL`,
            },
        },
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmYXVsdC1vY2Mtb3JnYW5pemF0aW9uLWNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9vcmdhbml6YXRpb24vdW5pdC1vcmRlci9vY2MvY29uZmlnL2RlZmF1bHQtb2NjLW9yZ2FuaXphdGlvbi1jb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUlILE1BQU0sQ0FBQyxNQUFNLHlCQUF5QixHQUFjO0lBQ2xELE9BQU8sRUFBRTtRQUNQLEdBQUcsRUFBRTtZQUNILFNBQVMsRUFBRTtnQkFDVCxxQkFBcUIsRUFBRSxzQ0FBc0M7Z0JBQzdELG9CQUFvQixFQUFFLDZEQUE2RDthQUNwRjtTQUNGO0tBQ0Y7Q0FDRixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgT2NjQ29uZmlnIH0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcblxuZXhwb3J0IGNvbnN0IGRlZmF1bHRPY2NVbml0T3JkZXJDb25maWc6IE9jY0NvbmZpZyA9IHtcbiAgYmFja2VuZDoge1xuICAgIG9jYzoge1xuICAgICAgZW5kcG9pbnRzOiB7XG4gICAgICAgIHVuaXRMZXZlbE9yZGVySGlzdG9yeTogYC9vcmdVc2Vycy9cXCR7dXNlcklkfS9vcmdVbml0cy9vcmRlcnNgLFxuICAgICAgICB1bml0TGV2ZWxPcmRlckRldGFpbDogYG9yZ1VzZXJzL1xcJHt1c2VySWR9L29yZ1VuaXRzL29yZGVycy9cXCR7b3JkZXJJZH0/ZmllbGRzPUZVTExgLFxuICAgICAgfSxcbiAgICB9LFxuICB9LFxufTtcbiJdfQ==