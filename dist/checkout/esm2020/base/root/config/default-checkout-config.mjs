/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { DeliveryModePreferences } from './checkout-config';
export const defaultCheckoutConfig = {
    checkout: {
        steps: [
            {
                id: 'deliveryAddress',
                name: 'checkoutProgress.deliveryAddress',
                routeName: 'checkoutDeliveryAddress',
                type: ["deliveryAddress" /* CheckoutStepType.DELIVERY_ADDRESS */],
            },
            {
                id: 'deliveryMode',
                name: 'checkoutProgress.deliveryMode',
                routeName: 'checkoutDeliveryMode',
                type: ["deliveryMode" /* CheckoutStepType.DELIVERY_MODE */],
            },
            {
                id: 'paymentDetails',
                name: 'checkoutProgress.paymentDetails',
                routeName: 'checkoutPaymentDetails',
                type: ["paymentDetails" /* CheckoutStepType.PAYMENT_DETAILS */],
            },
            {
                id: 'reviewOrder',
                name: 'checkoutProgress.reviewOrder',
                routeName: 'checkoutReviewOrder',
                type: ["reviewOrder" /* CheckoutStepType.REVIEW_ORDER */],
            },
        ],
        express: false,
        defaultDeliveryMode: [DeliveryModePreferences.FREE],
        guest: false,
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmYXVsdC1jaGVja291dC1jb25maWcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvY2hlY2tvdXQvYmFzZS9yb290L2NvbmZpZy9kZWZhdWx0LWNoZWNrb3V0LWNvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBR0gsT0FBTyxFQUFrQix1QkFBdUIsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBRTVFLE1BQU0sQ0FBQyxNQUFNLHFCQUFxQixHQUFtQjtJQUNuRCxRQUFRLEVBQUU7UUFDUixLQUFLLEVBQUU7WUFDTDtnQkFDRSxFQUFFLEVBQUUsaUJBQWlCO2dCQUNyQixJQUFJLEVBQUUsa0NBQWtDO2dCQUN4QyxTQUFTLEVBQUUseUJBQXlCO2dCQUNwQyxJQUFJLEVBQUUsMkRBQW1DO2FBQzFDO1lBQ0Q7Z0JBQ0UsRUFBRSxFQUFFLGNBQWM7Z0JBQ2xCLElBQUksRUFBRSwrQkFBK0I7Z0JBQ3JDLFNBQVMsRUFBRSxzQkFBc0I7Z0JBQ2pDLElBQUksRUFBRSxxREFBZ0M7YUFDdkM7WUFDRDtnQkFDRSxFQUFFLEVBQUUsZ0JBQWdCO2dCQUNwQixJQUFJLEVBQUUsaUNBQWlDO2dCQUN2QyxTQUFTLEVBQUUsd0JBQXdCO2dCQUNuQyxJQUFJLEVBQUUseURBQWtDO2FBQ3pDO1lBQ0Q7Z0JBQ0UsRUFBRSxFQUFFLGFBQWE7Z0JBQ2pCLElBQUksRUFBRSw4QkFBOEI7Z0JBQ3BDLFNBQVMsRUFBRSxxQkFBcUI7Z0JBQ2hDLElBQUksRUFBRSxtREFBK0I7YUFDdEM7U0FDRjtRQUNELE9BQU8sRUFBRSxLQUFLO1FBQ2QsbUJBQW1CLEVBQUUsQ0FBQyx1QkFBdUIsQ0FBQyxJQUFJLENBQUM7UUFDbkQsS0FBSyxFQUFFLEtBQUs7S0FDYjtDQUNGLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBDaGVja291dFN0ZXBUeXBlIH0gZnJvbSAnLi4vbW9kZWwvY2hlY2tvdXQtc3RlcC5tb2RlbCc7XG5pbXBvcnQgeyBDaGVja291dENvbmZpZywgRGVsaXZlcnlNb2RlUHJlZmVyZW5jZXMgfSBmcm9tICcuL2NoZWNrb3V0LWNvbmZpZyc7XG5cbmV4cG9ydCBjb25zdCBkZWZhdWx0Q2hlY2tvdXRDb25maWc6IENoZWNrb3V0Q29uZmlnID0ge1xuICBjaGVja291dDoge1xuICAgIHN0ZXBzOiBbXG4gICAgICB7XG4gICAgICAgIGlkOiAnZGVsaXZlcnlBZGRyZXNzJyxcbiAgICAgICAgbmFtZTogJ2NoZWNrb3V0UHJvZ3Jlc3MuZGVsaXZlcnlBZGRyZXNzJyxcbiAgICAgICAgcm91dGVOYW1lOiAnY2hlY2tvdXREZWxpdmVyeUFkZHJlc3MnLFxuICAgICAgICB0eXBlOiBbQ2hlY2tvdXRTdGVwVHlwZS5ERUxJVkVSWV9BRERSRVNTXSxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGlkOiAnZGVsaXZlcnlNb2RlJyxcbiAgICAgICAgbmFtZTogJ2NoZWNrb3V0UHJvZ3Jlc3MuZGVsaXZlcnlNb2RlJyxcbiAgICAgICAgcm91dGVOYW1lOiAnY2hlY2tvdXREZWxpdmVyeU1vZGUnLFxuICAgICAgICB0eXBlOiBbQ2hlY2tvdXRTdGVwVHlwZS5ERUxJVkVSWV9NT0RFXSxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGlkOiAncGF5bWVudERldGFpbHMnLFxuICAgICAgICBuYW1lOiAnY2hlY2tvdXRQcm9ncmVzcy5wYXltZW50RGV0YWlscycsXG4gICAgICAgIHJvdXRlTmFtZTogJ2NoZWNrb3V0UGF5bWVudERldGFpbHMnLFxuICAgICAgICB0eXBlOiBbQ2hlY2tvdXRTdGVwVHlwZS5QQVlNRU5UX0RFVEFJTFNdLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgaWQ6ICdyZXZpZXdPcmRlcicsXG4gICAgICAgIG5hbWU6ICdjaGVja291dFByb2dyZXNzLnJldmlld09yZGVyJyxcbiAgICAgICAgcm91dGVOYW1lOiAnY2hlY2tvdXRSZXZpZXdPcmRlcicsXG4gICAgICAgIHR5cGU6IFtDaGVja291dFN0ZXBUeXBlLlJFVklFV19PUkRFUl0sXG4gICAgICB9LFxuICAgIF0sXG4gICAgZXhwcmVzczogZmFsc2UsXG4gICAgZGVmYXVsdERlbGl2ZXJ5TW9kZTogW0RlbGl2ZXJ5TW9kZVByZWZlcmVuY2VzLkZSRUVdLFxuICAgIGd1ZXN0OiBmYWxzZSxcbiAgfSxcbn07XG4iXX0=