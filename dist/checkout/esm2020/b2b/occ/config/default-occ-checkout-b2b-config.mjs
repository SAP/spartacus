/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const defaultB2bCheckoutDetailsOccEndpoint = {
    getCheckoutDetails: 'users/${userId}/carts/${cartId}?fields=deliveryAddress(FULL),deliveryMode(FULL),paymentInfo(FULL),costCenter(FULL),purchaseOrderNumber,paymentType(FULL)',
};
export const defaultOccCheckoutB2BConfig = {
    backend: {
        occ: {
            endpoints: {
                ...defaultB2bCheckoutDetailsOccEndpoint,
                setDeliveryAddress: 'orgUsers/${userId}/carts/${cartId}/addresses/delivery',
                paymentTypes: 'paymenttypes',
                setCartCostCenter: 'users/${userId}/carts/${cartId}/costcenter',
                setCartPaymentType: 'users/${userId}/carts/${cartId}/paymenttype',
            },
        },
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmYXVsdC1vY2MtY2hlY2tvdXQtYjJiLWNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9jaGVja291dC9iMmIvb2NjL2NvbmZpZy9kZWZhdWx0LW9jYy1jaGVja291dC1iMmItY29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFNSCxNQUFNLG9DQUFvQyxHQUF5QjtJQUNqRSxrQkFBa0IsRUFDaEIsMEpBQTBKO0NBQzdKLENBQUM7QUFFRixNQUFNLENBQUMsTUFBTSwyQkFBMkIsR0FBYztJQUNwRCxPQUFPLEVBQUU7UUFDUCxHQUFHLEVBQUU7WUFDSCxTQUFTLEVBQUU7Z0JBQ1QsR0FBRyxvQ0FBb0M7Z0JBQ3ZDLGtCQUFrQixFQUNoQix1REFBdUQ7Z0JBQ3pELFlBQVksRUFBRSxjQUFjO2dCQUM1QixpQkFBaUIsRUFBRSw0Q0FBNEM7Z0JBQy9ELGtCQUFrQixFQUFFLDZDQUE2QzthQUNsRTtTQUNGO0tBQ0Y7Q0FDRixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuLy8gV2UgbmVlZCB0aGVzZSBpbXBvcnRzIGZvciBhdWdtZW50YXRpb24gb2YgT2NjRW5kcG9pbnRzIHRvIGJlIHBpY2tlZCB1cFxuaW1wb3J0IHsgQ2hlY2tvdXRPY2NFbmRwb2ludHMgfSBmcm9tICdAc3BhcnRhY3VzL2NoZWNrb3V0L2Jhc2Uvb2NjJztcbmltcG9ydCB7IE9jY0NvbmZpZyB9IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5cbmNvbnN0IGRlZmF1bHRCMmJDaGVja291dERldGFpbHNPY2NFbmRwb2ludDogQ2hlY2tvdXRPY2NFbmRwb2ludHMgPSB7XG4gIGdldENoZWNrb3V0RGV0YWlsczpcbiAgICAndXNlcnMvJHt1c2VySWR9L2NhcnRzLyR7Y2FydElkfT9maWVsZHM9ZGVsaXZlcnlBZGRyZXNzKEZVTEwpLGRlbGl2ZXJ5TW9kZShGVUxMKSxwYXltZW50SW5mbyhGVUxMKSxjb3N0Q2VudGVyKEZVTEwpLHB1cmNoYXNlT3JkZXJOdW1iZXIscGF5bWVudFR5cGUoRlVMTCknLFxufTtcblxuZXhwb3J0IGNvbnN0IGRlZmF1bHRPY2NDaGVja291dEIyQkNvbmZpZzogT2NjQ29uZmlnID0ge1xuICBiYWNrZW5kOiB7XG4gICAgb2NjOiB7XG4gICAgICBlbmRwb2ludHM6IHtcbiAgICAgICAgLi4uZGVmYXVsdEIyYkNoZWNrb3V0RGV0YWlsc09jY0VuZHBvaW50LFxuICAgICAgICBzZXREZWxpdmVyeUFkZHJlc3M6XG4gICAgICAgICAgJ29yZ1VzZXJzLyR7dXNlcklkfS9jYXJ0cy8ke2NhcnRJZH0vYWRkcmVzc2VzL2RlbGl2ZXJ5JyxcbiAgICAgICAgcGF5bWVudFR5cGVzOiAncGF5bWVudHR5cGVzJyxcbiAgICAgICAgc2V0Q2FydENvc3RDZW50ZXI6ICd1c2Vycy8ke3VzZXJJZH0vY2FydHMvJHtjYXJ0SWR9L2Nvc3RjZW50ZXInLFxuICAgICAgICBzZXRDYXJ0UGF5bWVudFR5cGU6ICd1c2Vycy8ke3VzZXJJZH0vY2FydHMvJHtjYXJ0SWR9L3BheW1lbnR0eXBlJyxcbiAgICAgIH0sXG4gICAgfSxcbiAgfSxcbn07XG4iXX0=