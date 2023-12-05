/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { AsmCustomer360ActiveCartComponent } from '../sections/asm-customer-360-active-cart/asm-customer-360-active-cart.component';
import { AsmCustomer360ActivityComponent } from '../sections/asm-customer-360-activity/asm-customer-360-activity.component';
import { AsmCustomer360CouponComponent } from '../sections/asm-customer-360-coupon/asm-customer-360-coupon.component';
import { AsmCustomer360CustomerCouponComponent } from '../sections/asm-customer-360-customer-coupon/asm-customer-360-customer-coupon.component';
import { AsmCustomer360MapComponent } from '../sections/asm-customer-360-map/asm-customer-360-map.component';
import { AsmCustomer360ProductInterestsComponent } from '../sections/asm-customer-360-product-interests/asm-customer-360-product-interests.component';
import { AsmCustomer360ProductReviewsComponent } from '../sections/asm-customer-360-product-reviews/asm-customer-360-product-reviews.component';
import { AsmCustomer360ProfileComponent } from '../sections/asm-customer-360-profile/asm-customer-360-profile.component';
import { AsmCustomer360PromotionComponent } from '../sections/asm-customer-360-promotion/asm-customer-360-promotion.component';
import { AsmCustomer360SavedCartComponent } from '../sections/asm-customer-360-saved-cart/asm-customer-360-saved-cart.component';
import { AsmCustomer360SupportTicketsComponent } from '../sections/asm-customer-360-support-tickets/asm-customer-360-support-tickets.component';
import { AsmCustomer360Type } from '@spartacus/asm/customer-360/root';
export const defaultAsmCustomer360Config = {
    asmCustomer360: {
        dateFormat: 'MM-dd-yyyy',
        dateTimeFormat: 'dd-MM-yy hh:mm a',
        tabs: [
            {
                i18nNameKey: 'asmCustomer360.overviewTab',
                components: [
                    {
                        component: AsmCustomer360ActiveCartComponent,
                        requestData: {
                            type: AsmCustomer360Type.ACTIVE_CART,
                        },
                    },
                    {
                        component: AsmCustomer360SavedCartComponent,
                        requestData: {
                            type: AsmCustomer360Type.SAVED_CART,
                        },
                    },
                    {
                        component: AsmCustomer360ProductInterestsComponent,
                        requestData: {
                            type: AsmCustomer360Type.PRODUCT_INTEREST_LIST,
                        },
                    },
                ],
            },
            {
                i18nNameKey: 'asmCustomer360.profileTab',
                components: [
                    {
                        component: AsmCustomer360ProfileComponent,
                        requestData: {
                            type: AsmCustomer360Type.CUSTOMER_PROFILE,
                        },
                    },
                ],
            },
            {
                i18nNameKey: 'asmCustomer360.activityTab',
                components: [
                    {
                        component: AsmCustomer360ActivityComponent,
                        requestData: {
                            type: AsmCustomer360Type.ACTIVITY_LIST,
                            additionalRequestParameters: {
                                listSize: 10,
                            },
                        },
                        config: { pageSize: 5 },
                    },
                ],
            },
            {
                i18nNameKey: 'asmCustomer360.feedbackTab',
                components: [
                    {
                        component: AsmCustomer360SupportTicketsComponent,
                        requestData: {
                            type: AsmCustomer360Type.SUPPORT_TICKET_LIST,
                            additionalRequestParameters: {
                                listSize: 10,
                            },
                        },
                        config: { pageSize: 5 },
                    },
                    {
                        component: AsmCustomer360ProductReviewsComponent,
                        requestData: {
                            type: AsmCustomer360Type.REVIEW_LIST,
                            additionalRequestParameters: {
                                listSize: 10,
                            },
                        },
                        config: { pageSize: 5 },
                    },
                ],
            },
            {
                i18nNameKey: 'asmCustomer360.promotionsTab',
                components: [
                    {
                        component: AsmCustomer360CouponComponent,
                        requestData: {
                            type: AsmCustomer360Type.COUPON_LIST,
                        },
                    },
                    {
                        component: AsmCustomer360PromotionComponent,
                        requestData: {
                            type: AsmCustomer360Type.PROMOTION_LIST,
                        },
                    },
                    {
                        component: AsmCustomer360CustomerCouponComponent,
                        requestData: {
                            type: AsmCustomer360Type.CUSTOMER_COUPON_LIST,
                            additionalRequestParameters: {
                                assignable: true,
                            },
                        },
                    },
                ],
            },
            {
                i18nNameKey: 'asmCustomer360.storeLocationsTab',
                components: [
                    {
                        component: AsmCustomer360MapComponent,
                        requestData: {
                            type: AsmCustomer360Type.STORE_LOCATION,
                        },
                        config: {
                            pageSize: 10,
                        },
                    },
                ],
            },
        ],
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmYXVsdC1hc20tY3VzdG9tZXItMzYwLWNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9hc20vY3VzdG9tZXItMzYwL2NvbXBvbmVudHMvY29uZmlnL2RlZmF1bHQtYXNtLWN1c3RvbWVyLTM2MC1jb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxpQ0FBaUMsRUFBRSxNQUFNLGlGQUFpRixDQUFDO0FBQ3BJLE9BQU8sRUFBRSwrQkFBK0IsRUFBRSxNQUFNLDJFQUEyRSxDQUFDO0FBQzVILE9BQU8sRUFBRSw2QkFBNkIsRUFBRSxNQUFNLHVFQUF1RSxDQUFDO0FBQ3RILE9BQU8sRUFBRSxxQ0FBcUMsRUFBRSxNQUFNLHlGQUF5RixDQUFDO0FBQ2hKLE9BQU8sRUFBRSwwQkFBMEIsRUFBRSxNQUFNLGlFQUFpRSxDQUFDO0FBQzdHLE9BQU8sRUFBRSx1Q0FBdUMsRUFBRSxNQUFNLDZGQUE2RixDQUFDO0FBQ3RKLE9BQU8sRUFBRSxxQ0FBcUMsRUFBRSxNQUFNLHlGQUF5RixDQUFDO0FBQ2hKLE9BQU8sRUFBRSw4QkFBOEIsRUFBRSxNQUFNLHlFQUF5RSxDQUFDO0FBQ3pILE9BQU8sRUFBRSxnQ0FBZ0MsRUFBRSxNQUFNLDZFQUE2RSxDQUFDO0FBQy9ILE9BQU8sRUFBRSxnQ0FBZ0MsRUFBRSxNQUFNLCtFQUErRSxDQUFDO0FBQ2pJLE9BQU8sRUFBRSxxQ0FBcUMsRUFBRSxNQUFNLHlGQUF5RixDQUFDO0FBRWhKLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBRXRFLE1BQU0sQ0FBQyxNQUFNLDJCQUEyQixHQUF5QjtJQUMvRCxjQUFjLEVBQUU7UUFDZCxVQUFVLEVBQUUsWUFBWTtRQUN4QixjQUFjLEVBQUUsa0JBQWtCO1FBQ2xDLElBQUksRUFBRTtZQUNKO2dCQUNFLFdBQVcsRUFBRSw0QkFBNEI7Z0JBQ3pDLFVBQVUsRUFBRTtvQkFDVjt3QkFDRSxTQUFTLEVBQUUsaUNBQWlDO3dCQUM1QyxXQUFXLEVBQUU7NEJBQ1gsSUFBSSxFQUFFLGtCQUFrQixDQUFDLFdBQVc7eUJBQ3JDO3FCQUNGO29CQUNEO3dCQUNFLFNBQVMsRUFBRSxnQ0FBZ0M7d0JBQzNDLFdBQVcsRUFBRTs0QkFDWCxJQUFJLEVBQUUsa0JBQWtCLENBQUMsVUFBVTt5QkFDcEM7cUJBQ0Y7b0JBQ0Q7d0JBQ0UsU0FBUyxFQUFFLHVDQUF1Qzt3QkFDbEQsV0FBVyxFQUFFOzRCQUNYLElBQUksRUFBRSxrQkFBa0IsQ0FBQyxxQkFBcUI7eUJBQy9DO3FCQUNGO2lCQUNGO2FBQ0Y7WUFDRDtnQkFDRSxXQUFXLEVBQUUsMkJBQTJCO2dCQUN4QyxVQUFVLEVBQUU7b0JBQ1Y7d0JBQ0UsU0FBUyxFQUFFLDhCQUE4Qjt3QkFDekMsV0FBVyxFQUFFOzRCQUNYLElBQUksRUFBRSxrQkFBa0IsQ0FBQyxnQkFBZ0I7eUJBQzFDO3FCQUNGO2lCQUNGO2FBQ0Y7WUFDRDtnQkFDRSxXQUFXLEVBQUUsNEJBQTRCO2dCQUN6QyxVQUFVLEVBQUU7b0JBQ1Y7d0JBQ0UsU0FBUyxFQUFFLCtCQUErQjt3QkFDMUMsV0FBVyxFQUFFOzRCQUNYLElBQUksRUFBRSxrQkFBa0IsQ0FBQyxhQUFhOzRCQUN0QywyQkFBMkIsRUFBRTtnQ0FDM0IsUUFBUSxFQUFFLEVBQUU7NkJBQ2I7eUJBQ0Y7d0JBQ0QsTUFBTSxFQUFFLEVBQUUsUUFBUSxFQUFFLENBQUMsRUFBRTtxQkFDeEI7aUJBQ0Y7YUFDRjtZQUNEO2dCQUNFLFdBQVcsRUFBRSw0QkFBNEI7Z0JBQ3pDLFVBQVUsRUFBRTtvQkFDVjt3QkFDRSxTQUFTLEVBQUUscUNBQXFDO3dCQUNoRCxXQUFXLEVBQUU7NEJBQ1gsSUFBSSxFQUFFLGtCQUFrQixDQUFDLG1CQUFtQjs0QkFDNUMsMkJBQTJCLEVBQUU7Z0NBQzNCLFFBQVEsRUFBRSxFQUFFOzZCQUNiO3lCQUNGO3dCQUNELE1BQU0sRUFBRSxFQUFFLFFBQVEsRUFBRSxDQUFDLEVBQUU7cUJBQ3hCO29CQUNEO3dCQUNFLFNBQVMsRUFBRSxxQ0FBcUM7d0JBQ2hELFdBQVcsRUFBRTs0QkFDWCxJQUFJLEVBQUUsa0JBQWtCLENBQUMsV0FBVzs0QkFDcEMsMkJBQTJCLEVBQUU7Z0NBQzNCLFFBQVEsRUFBRSxFQUFFOzZCQUNiO3lCQUNGO3dCQUNELE1BQU0sRUFBRSxFQUFFLFFBQVEsRUFBRSxDQUFDLEVBQUU7cUJBQ3hCO2lCQUNGO2FBQ0Y7WUFDRDtnQkFDRSxXQUFXLEVBQUUsOEJBQThCO2dCQUMzQyxVQUFVLEVBQUU7b0JBQ1Y7d0JBQ0UsU0FBUyxFQUFFLDZCQUE2Qjt3QkFDeEMsV0FBVyxFQUFFOzRCQUNYLElBQUksRUFBRSxrQkFBa0IsQ0FBQyxXQUFXO3lCQUNyQztxQkFDRjtvQkFDRDt3QkFDRSxTQUFTLEVBQUUsZ0NBQWdDO3dCQUMzQyxXQUFXLEVBQUU7NEJBQ1gsSUFBSSxFQUFFLGtCQUFrQixDQUFDLGNBQWM7eUJBQ3hDO3FCQUNGO29CQUNEO3dCQUNFLFNBQVMsRUFBRSxxQ0FBcUM7d0JBQ2hELFdBQVcsRUFBRTs0QkFDWCxJQUFJLEVBQUUsa0JBQWtCLENBQUMsb0JBQW9COzRCQUM3QywyQkFBMkIsRUFBRTtnQ0FDM0IsVUFBVSxFQUFFLElBQUk7NkJBQ2pCO3lCQUNGO3FCQUNGO2lCQUNGO2FBQ0Y7WUFDRDtnQkFDRSxXQUFXLEVBQUUsa0NBQWtDO2dCQUMvQyxVQUFVLEVBQUU7b0JBQ1Y7d0JBQ0UsU0FBUyxFQUFFLDBCQUEwQjt3QkFDckMsV0FBVyxFQUFFOzRCQUNYLElBQUksRUFBRSxrQkFBa0IsQ0FBQyxjQUFjO3lCQUN4Qzt3QkFDRCxNQUFNLEVBQUU7NEJBQ04sUUFBUSxFQUFFLEVBQUU7eUJBQ2I7cUJBQ0Y7aUJBQ0Y7YUFDRjtTQUNGO0tBQ0Y7Q0FDRixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgQXNtQ3VzdG9tZXIzNjBBY3RpdmVDYXJ0Q29tcG9uZW50IH0gZnJvbSAnLi4vc2VjdGlvbnMvYXNtLWN1c3RvbWVyLTM2MC1hY3RpdmUtY2FydC9hc20tY3VzdG9tZXItMzYwLWFjdGl2ZS1jYXJ0LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBBc21DdXN0b21lcjM2MEFjdGl2aXR5Q29tcG9uZW50IH0gZnJvbSAnLi4vc2VjdGlvbnMvYXNtLWN1c3RvbWVyLTM2MC1hY3Rpdml0eS9hc20tY3VzdG9tZXItMzYwLWFjdGl2aXR5LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBBc21DdXN0b21lcjM2MENvdXBvbkNvbXBvbmVudCB9IGZyb20gJy4uL3NlY3Rpb25zL2FzbS1jdXN0b21lci0zNjAtY291cG9uL2FzbS1jdXN0b21lci0zNjAtY291cG9uLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBBc21DdXN0b21lcjM2MEN1c3RvbWVyQ291cG9uQ29tcG9uZW50IH0gZnJvbSAnLi4vc2VjdGlvbnMvYXNtLWN1c3RvbWVyLTM2MC1jdXN0b21lci1jb3Vwb24vYXNtLWN1c3RvbWVyLTM2MC1jdXN0b21lci1jb3Vwb24uY29tcG9uZW50JztcbmltcG9ydCB7IEFzbUN1c3RvbWVyMzYwTWFwQ29tcG9uZW50IH0gZnJvbSAnLi4vc2VjdGlvbnMvYXNtLWN1c3RvbWVyLTM2MC1tYXAvYXNtLWN1c3RvbWVyLTM2MC1tYXAuY29tcG9uZW50JztcbmltcG9ydCB7IEFzbUN1c3RvbWVyMzYwUHJvZHVjdEludGVyZXN0c0NvbXBvbmVudCB9IGZyb20gJy4uL3NlY3Rpb25zL2FzbS1jdXN0b21lci0zNjAtcHJvZHVjdC1pbnRlcmVzdHMvYXNtLWN1c3RvbWVyLTM2MC1wcm9kdWN0LWludGVyZXN0cy5jb21wb25lbnQnO1xuaW1wb3J0IHsgQXNtQ3VzdG9tZXIzNjBQcm9kdWN0UmV2aWV3c0NvbXBvbmVudCB9IGZyb20gJy4uL3NlY3Rpb25zL2FzbS1jdXN0b21lci0zNjAtcHJvZHVjdC1yZXZpZXdzL2FzbS1jdXN0b21lci0zNjAtcHJvZHVjdC1yZXZpZXdzLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBBc21DdXN0b21lcjM2MFByb2ZpbGVDb21wb25lbnQgfSBmcm9tICcuLi9zZWN0aW9ucy9hc20tY3VzdG9tZXItMzYwLXByb2ZpbGUvYXNtLWN1c3RvbWVyLTM2MC1wcm9maWxlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBBc21DdXN0b21lcjM2MFByb21vdGlvbkNvbXBvbmVudCB9IGZyb20gJy4uL3NlY3Rpb25zL2FzbS1jdXN0b21lci0zNjAtcHJvbW90aW9uL2FzbS1jdXN0b21lci0zNjAtcHJvbW90aW9uLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBBc21DdXN0b21lcjM2MFNhdmVkQ2FydENvbXBvbmVudCB9IGZyb20gJy4uL3NlY3Rpb25zL2FzbS1jdXN0b21lci0zNjAtc2F2ZWQtY2FydC9hc20tY3VzdG9tZXItMzYwLXNhdmVkLWNhcnQuY29tcG9uZW50JztcbmltcG9ydCB7IEFzbUN1c3RvbWVyMzYwU3VwcG9ydFRpY2tldHNDb21wb25lbnQgfSBmcm9tICcuLi9zZWN0aW9ucy9hc20tY3VzdG9tZXItMzYwLXN1cHBvcnQtdGlja2V0cy9hc20tY3VzdG9tZXItMzYwLXN1cHBvcnQtdGlja2V0cy5jb21wb25lbnQnO1xuaW1wb3J0IHsgQXNtQ3VzdG9tZXIzNjBDb25maWcgfSBmcm9tICcuL2FzbS1jdXN0b21lci0zNjAtY29uZmlnJztcbmltcG9ydCB7IEFzbUN1c3RvbWVyMzYwVHlwZSB9IGZyb20gJ0BzcGFydGFjdXMvYXNtL2N1c3RvbWVyLTM2MC9yb290JztcblxuZXhwb3J0IGNvbnN0IGRlZmF1bHRBc21DdXN0b21lcjM2MENvbmZpZzogQXNtQ3VzdG9tZXIzNjBDb25maWcgPSB7XG4gIGFzbUN1c3RvbWVyMzYwOiB7XG4gICAgZGF0ZUZvcm1hdDogJ01NLWRkLXl5eXknLFxuICAgIGRhdGVUaW1lRm9ybWF0OiAnZGQtTU0teXkgaGg6bW0gYScsXG4gICAgdGFiczogW1xuICAgICAge1xuICAgICAgICBpMThuTmFtZUtleTogJ2FzbUN1c3RvbWVyMzYwLm92ZXJ2aWV3VGFiJyxcbiAgICAgICAgY29tcG9uZW50czogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIGNvbXBvbmVudDogQXNtQ3VzdG9tZXIzNjBBY3RpdmVDYXJ0Q29tcG9uZW50LFxuICAgICAgICAgICAgcmVxdWVzdERhdGE6IHtcbiAgICAgICAgICAgICAgdHlwZTogQXNtQ3VzdG9tZXIzNjBUeXBlLkFDVElWRV9DQVJULFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIGNvbXBvbmVudDogQXNtQ3VzdG9tZXIzNjBTYXZlZENhcnRDb21wb25lbnQsXG4gICAgICAgICAgICByZXF1ZXN0RGF0YToge1xuICAgICAgICAgICAgICB0eXBlOiBBc21DdXN0b21lcjM2MFR5cGUuU0FWRURfQ0FSVCxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBjb21wb25lbnQ6IEFzbUN1c3RvbWVyMzYwUHJvZHVjdEludGVyZXN0c0NvbXBvbmVudCxcbiAgICAgICAgICAgIHJlcXVlc3REYXRhOiB7XG4gICAgICAgICAgICAgIHR5cGU6IEFzbUN1c3RvbWVyMzYwVHlwZS5QUk9EVUNUX0lOVEVSRVNUX0xJU1QsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIH0sXG4gICAgICAgIF0sXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBpMThuTmFtZUtleTogJ2FzbUN1c3RvbWVyMzYwLnByb2ZpbGVUYWInLFxuICAgICAgICBjb21wb25lbnRzOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgY29tcG9uZW50OiBBc21DdXN0b21lcjM2MFByb2ZpbGVDb21wb25lbnQsXG4gICAgICAgICAgICByZXF1ZXN0RGF0YToge1xuICAgICAgICAgICAgICB0eXBlOiBBc21DdXN0b21lcjM2MFR5cGUuQ1VTVE9NRVJfUFJPRklMRSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfSxcbiAgICAgICAgXSxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGkxOG5OYW1lS2V5OiAnYXNtQ3VzdG9tZXIzNjAuYWN0aXZpdHlUYWInLFxuICAgICAgICBjb21wb25lbnRzOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgY29tcG9uZW50OiBBc21DdXN0b21lcjM2MEFjdGl2aXR5Q29tcG9uZW50LFxuICAgICAgICAgICAgcmVxdWVzdERhdGE6IHtcbiAgICAgICAgICAgICAgdHlwZTogQXNtQ3VzdG9tZXIzNjBUeXBlLkFDVElWSVRZX0xJU1QsXG4gICAgICAgICAgICAgIGFkZGl0aW9uYWxSZXF1ZXN0UGFyYW1ldGVyczoge1xuICAgICAgICAgICAgICAgIGxpc3RTaXplOiAxMCxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjb25maWc6IHsgcGFnZVNpemU6IDUgfSxcbiAgICAgICAgICB9LFxuICAgICAgICBdLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgaTE4bk5hbWVLZXk6ICdhc21DdXN0b21lcjM2MC5mZWVkYmFja1RhYicsXG4gICAgICAgIGNvbXBvbmVudHM6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICBjb21wb25lbnQ6IEFzbUN1c3RvbWVyMzYwU3VwcG9ydFRpY2tldHNDb21wb25lbnQsXG4gICAgICAgICAgICByZXF1ZXN0RGF0YToge1xuICAgICAgICAgICAgICB0eXBlOiBBc21DdXN0b21lcjM2MFR5cGUuU1VQUE9SVF9USUNLRVRfTElTVCxcbiAgICAgICAgICAgICAgYWRkaXRpb25hbFJlcXVlc3RQYXJhbWV0ZXJzOiB7XG4gICAgICAgICAgICAgICAgbGlzdFNpemU6IDEwLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGNvbmZpZzogeyBwYWdlU2l6ZTogNSB9LFxuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgY29tcG9uZW50OiBBc21DdXN0b21lcjM2MFByb2R1Y3RSZXZpZXdzQ29tcG9uZW50LFxuICAgICAgICAgICAgcmVxdWVzdERhdGE6IHtcbiAgICAgICAgICAgICAgdHlwZTogQXNtQ3VzdG9tZXIzNjBUeXBlLlJFVklFV19MSVNULFxuICAgICAgICAgICAgICBhZGRpdGlvbmFsUmVxdWVzdFBhcmFtZXRlcnM6IHtcbiAgICAgICAgICAgICAgICBsaXN0U2l6ZTogMTAsXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgY29uZmlnOiB7IHBhZ2VTaXplOiA1IH0sXG4gICAgICAgICAgfSxcbiAgICAgICAgXSxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGkxOG5OYW1lS2V5OiAnYXNtQ3VzdG9tZXIzNjAucHJvbW90aW9uc1RhYicsXG4gICAgICAgIGNvbXBvbmVudHM6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICBjb21wb25lbnQ6IEFzbUN1c3RvbWVyMzYwQ291cG9uQ29tcG9uZW50LFxuICAgICAgICAgICAgcmVxdWVzdERhdGE6IHtcbiAgICAgICAgICAgICAgdHlwZTogQXNtQ3VzdG9tZXIzNjBUeXBlLkNPVVBPTl9MSVNULFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIGNvbXBvbmVudDogQXNtQ3VzdG9tZXIzNjBQcm9tb3Rpb25Db21wb25lbnQsXG4gICAgICAgICAgICByZXF1ZXN0RGF0YToge1xuICAgICAgICAgICAgICB0eXBlOiBBc21DdXN0b21lcjM2MFR5cGUuUFJPTU9USU9OX0xJU1QsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgY29tcG9uZW50OiBBc21DdXN0b21lcjM2MEN1c3RvbWVyQ291cG9uQ29tcG9uZW50LFxuICAgICAgICAgICAgcmVxdWVzdERhdGE6IHtcbiAgICAgICAgICAgICAgdHlwZTogQXNtQ3VzdG9tZXIzNjBUeXBlLkNVU1RPTUVSX0NPVVBPTl9MSVNULFxuICAgICAgICAgICAgICBhZGRpdGlvbmFsUmVxdWVzdFBhcmFtZXRlcnM6IHtcbiAgICAgICAgICAgICAgICBhc3NpZ25hYmxlOiB0cnVlLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICB9LFxuICAgICAgICBdLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgaTE4bk5hbWVLZXk6ICdhc21DdXN0b21lcjM2MC5zdG9yZUxvY2F0aW9uc1RhYicsXG4gICAgICAgIGNvbXBvbmVudHM6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICBjb21wb25lbnQ6IEFzbUN1c3RvbWVyMzYwTWFwQ29tcG9uZW50LFxuICAgICAgICAgICAgcmVxdWVzdERhdGE6IHtcbiAgICAgICAgICAgICAgdHlwZTogQXNtQ3VzdG9tZXIzNjBUeXBlLlNUT1JFX0xPQ0FUSU9OLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGNvbmZpZzoge1xuICAgICAgICAgICAgICBwYWdlU2l6ZTogMTAsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIH0sXG4gICAgICAgIF0sXG4gICAgICB9LFxuICAgIF0sXG4gIH0sXG59O1xuIl19