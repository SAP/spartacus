/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { DeliveryModePreferences, } from '@spartacus/checkout/base/root';
export const defaultB2BCheckoutConfig = {
    checkout: {
        steps: [
            {
                id: 'paymentType',
                name: 'checkoutB2B.progress.methodOfPayment',
                routeName: 'checkoutPaymentType',
                type: ["paymentType" /* CheckoutStepType.PAYMENT_TYPE */],
            },
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmYXVsdC1iMmItY2hlY2tvdXQtY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL2NoZWNrb3V0L2IyYi9yb290L2NvbmZpZy9kZWZhdWx0LWIyYi1jaGVja291dC1jb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFHTCx1QkFBdUIsR0FDeEIsTUFBTSwrQkFBK0IsQ0FBQztBQUV2QyxNQUFNLENBQUMsTUFBTSx3QkFBd0IsR0FBbUI7SUFDdEQsUUFBUSxFQUFFO1FBQ1IsS0FBSyxFQUFFO1lBQ0w7Z0JBQ0UsRUFBRSxFQUFFLGFBQWE7Z0JBQ2pCLElBQUksRUFBRSxzQ0FBc0M7Z0JBQzVDLFNBQVMsRUFBRSxxQkFBcUI7Z0JBQ2hDLElBQUksRUFBRSxtREFBK0I7YUFDdEM7WUFDRDtnQkFDRSxFQUFFLEVBQUUsaUJBQWlCO2dCQUNyQixJQUFJLEVBQUUsa0NBQWtDO2dCQUN4QyxTQUFTLEVBQUUseUJBQXlCO2dCQUNwQyxJQUFJLEVBQUUsMkRBQW1DO2FBQzFDO1lBQ0Q7Z0JBQ0UsRUFBRSxFQUFFLGNBQWM7Z0JBQ2xCLElBQUksRUFBRSwrQkFBK0I7Z0JBQ3JDLFNBQVMsRUFBRSxzQkFBc0I7Z0JBQ2pDLElBQUksRUFBRSxxREFBZ0M7YUFDdkM7WUFDRDtnQkFDRSxFQUFFLEVBQUUsZ0JBQWdCO2dCQUNwQixJQUFJLEVBQUUsaUNBQWlDO2dCQUN2QyxTQUFTLEVBQUUsd0JBQXdCO2dCQUNuQyxJQUFJLEVBQUUseURBQWtDO2FBQ3pDO1lBQ0Q7Z0JBQ0UsRUFBRSxFQUFFLGFBQWE7Z0JBQ2pCLElBQUksRUFBRSw4QkFBOEI7Z0JBQ3BDLFNBQVMsRUFBRSxxQkFBcUI7Z0JBQ2hDLElBQUksRUFBRSxtREFBK0I7YUFDdEM7U0FDRjtRQUNELE9BQU8sRUFBRSxLQUFLO1FBQ2QsbUJBQW1CLEVBQUUsQ0FBQyx1QkFBdUIsQ0FBQyxJQUFJLENBQUM7UUFDbkQsS0FBSyxFQUFFLEtBQUs7S0FDYjtDQUNGLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQge1xuICBDaGVja291dENvbmZpZyxcbiAgQ2hlY2tvdXRTdGVwVHlwZSxcbiAgRGVsaXZlcnlNb2RlUHJlZmVyZW5jZXMsXG59IGZyb20gJ0BzcGFydGFjdXMvY2hlY2tvdXQvYmFzZS9yb290JztcblxuZXhwb3J0IGNvbnN0IGRlZmF1bHRCMkJDaGVja291dENvbmZpZzogQ2hlY2tvdXRDb25maWcgPSB7XG4gIGNoZWNrb3V0OiB7XG4gICAgc3RlcHM6IFtcbiAgICAgIHtcbiAgICAgICAgaWQ6ICdwYXltZW50VHlwZScsXG4gICAgICAgIG5hbWU6ICdjaGVja291dEIyQi5wcm9ncmVzcy5tZXRob2RPZlBheW1lbnQnLFxuICAgICAgICByb3V0ZU5hbWU6ICdjaGVja291dFBheW1lbnRUeXBlJyxcbiAgICAgICAgdHlwZTogW0NoZWNrb3V0U3RlcFR5cGUuUEFZTUVOVF9UWVBFXSxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGlkOiAnZGVsaXZlcnlBZGRyZXNzJyxcbiAgICAgICAgbmFtZTogJ2NoZWNrb3V0UHJvZ3Jlc3MuZGVsaXZlcnlBZGRyZXNzJyxcbiAgICAgICAgcm91dGVOYW1lOiAnY2hlY2tvdXREZWxpdmVyeUFkZHJlc3MnLFxuICAgICAgICB0eXBlOiBbQ2hlY2tvdXRTdGVwVHlwZS5ERUxJVkVSWV9BRERSRVNTXSxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGlkOiAnZGVsaXZlcnlNb2RlJyxcbiAgICAgICAgbmFtZTogJ2NoZWNrb3V0UHJvZ3Jlc3MuZGVsaXZlcnlNb2RlJyxcbiAgICAgICAgcm91dGVOYW1lOiAnY2hlY2tvdXREZWxpdmVyeU1vZGUnLFxuICAgICAgICB0eXBlOiBbQ2hlY2tvdXRTdGVwVHlwZS5ERUxJVkVSWV9NT0RFXSxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGlkOiAncGF5bWVudERldGFpbHMnLFxuICAgICAgICBuYW1lOiAnY2hlY2tvdXRQcm9ncmVzcy5wYXltZW50RGV0YWlscycsXG4gICAgICAgIHJvdXRlTmFtZTogJ2NoZWNrb3V0UGF5bWVudERldGFpbHMnLFxuICAgICAgICB0eXBlOiBbQ2hlY2tvdXRTdGVwVHlwZS5QQVlNRU5UX0RFVEFJTFNdLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgaWQ6ICdyZXZpZXdPcmRlcicsXG4gICAgICAgIG5hbWU6ICdjaGVja291dFByb2dyZXNzLnJldmlld09yZGVyJyxcbiAgICAgICAgcm91dGVOYW1lOiAnY2hlY2tvdXRSZXZpZXdPcmRlcicsXG4gICAgICAgIHR5cGU6IFtDaGVja291dFN0ZXBUeXBlLlJFVklFV19PUkRFUl0sXG4gICAgICB9LFxuICAgIF0sXG4gICAgZXhwcmVzczogZmFsc2UsXG4gICAgZGVmYXVsdERlbGl2ZXJ5TW9kZTogW0RlbGl2ZXJ5TW9kZVByZWZlcmVuY2VzLkZSRUVdLFxuICAgIGd1ZXN0OiBmYWxzZSxcbiAgfSxcbn07XG4iXX0=