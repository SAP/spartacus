/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthGuard, provideDefaultConfig, provideDefaultConfigFactory, } from '@spartacus/core';
import { CmsPageGuard, PageLayoutComponent } from '@spartacus/storefront';
import { defaultCustomerTicketingConfig } from './config';
import { defaultCustomerTicketingRoutingConfig } from './config/default-customer-ticketing-routing-config';
import { CUSTOMER_TICKETING_CORE_FEATURE, CUSTOMER_TICKETING_FEATURE, } from './feature-name';
import { CustomerTicketingEventModule } from './events/customer-ticketing-event.module';
import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
export function defaultCustomerTicketingComponentsConfig() {
    const config = {
        featureModules: {
            [CUSTOMER_TICKETING_FEATURE]: {
                cmsComponents: [
                    'SupportTicketHistoryComponent',
                    'SupportTicketUpdateComponent',
                    'SupportTicketDetailsComponent',
                    'SupportTicketReopenComponent',
                    'SupportTicketCloseComponent',
                    'MyAccountViewRequestsComponent',
                ],
            },
            // by default core is bundled together with components
            [CUSTOMER_TICKETING_CORE_FEATURE]: CUSTOMER_TICKETING_FEATURE,
        },
    };
    return config;
}
export class CustomerTicketingRootModule {
}
CustomerTicketingRootModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CustomerTicketingRootModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
CustomerTicketingRootModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: CustomerTicketingRootModule, imports: [CustomerTicketingEventModule, i1.RouterModule] });
CustomerTicketingRootModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CustomerTicketingRootModule, providers: [
        provideDefaultConfigFactory(defaultCustomerTicketingComponentsConfig),
        provideDefaultConfig(defaultCustomerTicketingRoutingConfig),
        provideDefaultConfig(defaultCustomerTicketingConfig),
    ], imports: [CustomerTicketingEventModule,
        RouterModule.forChild([
            {
                // @ts-ignore
                path: null,
                canActivate: [AuthGuard, CmsPageGuard],
                component: PageLayoutComponent,
                data: {
                    cxRoute: 'supportTicketDetails',
                },
            },
            {
                // @ts-ignore
                path: null,
                canActivate: [AuthGuard, CmsPageGuard],
                component: PageLayoutComponent,
                data: {
                    cxRoute: 'supportTickets',
                },
            },
        ])] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CustomerTicketingRootModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CustomerTicketingEventModule,
                        RouterModule.forChild([
                            {
                                // @ts-ignore
                                path: null,
                                canActivate: [AuthGuard, CmsPageGuard],
                                component: PageLayoutComponent,
                                data: {
                                    cxRoute: 'supportTicketDetails',
                                },
                            },
                            {
                                // @ts-ignore
                                path: null,
                                canActivate: [AuthGuard, CmsPageGuard],
                                component: PageLayoutComponent,
                                data: {
                                    cxRoute: 'supportTickets',
                                },
                            },
                        ]),
                    ],
                    providers: [
                        provideDefaultConfigFactory(defaultCustomerTicketingComponentsConfig),
                        provideDefaultConfig(defaultCustomerTicketingRoutingConfig),
                        provideDefaultConfig(defaultCustomerTicketingConfig),
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VzdG9tZXItdGlja2V0aW5nLXJvb3QubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL2N1c3RvbWVyLXRpY2tldGluZy9yb290L2N1c3RvbWVyLXRpY2tldGluZy1yb290Lm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUNMLFNBQVMsRUFFVCxvQkFBb0IsRUFDcEIsMkJBQTJCLEdBQzVCLE1BQU0saUJBQWlCLENBQUM7QUFDekIsT0FBTyxFQUFFLFlBQVksRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzFFLE9BQU8sRUFBRSw4QkFBOEIsRUFBRSxNQUFNLFVBQVUsQ0FBQztBQUMxRCxPQUFPLEVBQUUscUNBQXFDLEVBQUUsTUFBTSxvREFBb0QsQ0FBQztBQUMzRyxPQUFPLEVBQ0wsK0JBQStCLEVBQy9CLDBCQUEwQixHQUMzQixNQUFNLGdCQUFnQixDQUFDO0FBQ3hCLE9BQU8sRUFBRSw0QkFBNEIsRUFBRSxNQUFNLDBDQUEwQyxDQUFDOzs7QUFFeEYsTUFBTSxVQUFVLHdDQUF3QztJQUN0RCxNQUFNLE1BQU0sR0FBYztRQUN4QixjQUFjLEVBQUU7WUFDZCxDQUFDLDBCQUEwQixDQUFDLEVBQUU7Z0JBQzVCLGFBQWEsRUFBRTtvQkFDYiwrQkFBK0I7b0JBQy9CLDhCQUE4QjtvQkFDOUIsK0JBQStCO29CQUMvQiw4QkFBOEI7b0JBQzlCLDZCQUE2QjtvQkFDN0IsZ0NBQWdDO2lCQUNqQzthQUNGO1lBRUQsc0RBQXNEO1lBQ3RELENBQUMsK0JBQStCLENBQUMsRUFBRSwwQkFBMEI7U0FDOUQ7S0FDRixDQUFDO0lBQ0YsT0FBTyxNQUFNLENBQUM7QUFDaEIsQ0FBQztBQStCRCxNQUFNLE9BQU8sMkJBQTJCOzt3SEFBM0IsMkJBQTJCO3lIQUEzQiwyQkFBMkIsWUE1QnBDLDRCQUE0Qjt5SEE0Qm5CLDJCQUEyQixhQU4zQjtRQUNULDJCQUEyQixDQUFDLHdDQUF3QyxDQUFDO1FBQ3JFLG9CQUFvQixDQUFDLHFDQUFxQyxDQUFDO1FBQzNELG9CQUFvQixDQUFDLDhCQUE4QixDQUFDO0tBQ3JELFlBMUJDLDRCQUE0QjtRQUM1QixZQUFZLENBQUMsUUFBUSxDQUFDO1lBQ3BCO2dCQUNFLGFBQWE7Z0JBQ2IsSUFBSSxFQUFFLElBQUk7Z0JBQ1YsV0FBVyxFQUFFLENBQUMsU0FBUyxFQUFFLFlBQVksQ0FBQztnQkFDdEMsU0FBUyxFQUFFLG1CQUFtQjtnQkFDOUIsSUFBSSxFQUFFO29CQUNKLE9BQU8sRUFBRSxzQkFBc0I7aUJBQ2hDO2FBQ0Y7WUFDRDtnQkFDRSxhQUFhO2dCQUNiLElBQUksRUFBRSxJQUFJO2dCQUNWLFdBQVcsRUFBRSxDQUFDLFNBQVMsRUFBRSxZQUFZLENBQUM7Z0JBQ3RDLFNBQVMsRUFBRSxtQkFBbUI7Z0JBQzlCLElBQUksRUFBRTtvQkFDSixPQUFPLEVBQUUsZ0JBQWdCO2lCQUMxQjthQUNGO1NBQ0YsQ0FBQzsyRkFRTywyQkFBMkI7a0JBOUJ2QyxRQUFRO21CQUFDO29CQUNSLE9BQU8sRUFBRTt3QkFDUCw0QkFBNEI7d0JBQzVCLFlBQVksQ0FBQyxRQUFRLENBQUM7NEJBQ3BCO2dDQUNFLGFBQWE7Z0NBQ2IsSUFBSSxFQUFFLElBQUk7Z0NBQ1YsV0FBVyxFQUFFLENBQUMsU0FBUyxFQUFFLFlBQVksQ0FBQztnQ0FDdEMsU0FBUyxFQUFFLG1CQUFtQjtnQ0FDOUIsSUFBSSxFQUFFO29DQUNKLE9BQU8sRUFBRSxzQkFBc0I7aUNBQ2hDOzZCQUNGOzRCQUNEO2dDQUNFLGFBQWE7Z0NBQ2IsSUFBSSxFQUFFLElBQUk7Z0NBQ1YsV0FBVyxFQUFFLENBQUMsU0FBUyxFQUFFLFlBQVksQ0FBQztnQ0FDdEMsU0FBUyxFQUFFLG1CQUFtQjtnQ0FDOUIsSUFBSSxFQUFFO29DQUNKLE9BQU8sRUFBRSxnQkFBZ0I7aUNBQzFCOzZCQUNGO3lCQUNGLENBQUM7cUJBQ0g7b0JBQ0QsU0FBUyxFQUFFO3dCQUNULDJCQUEyQixDQUFDLHdDQUF3QyxDQUFDO3dCQUNyRSxvQkFBb0IsQ0FBQyxxQ0FBcUMsQ0FBQzt3QkFDM0Qsb0JBQW9CLENBQUMsOEJBQThCLENBQUM7cUJBQ3JEO2lCQUNGIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFJvdXRlck1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQge1xuICBBdXRoR3VhcmQsXG4gIENtc0NvbmZpZyxcbiAgcHJvdmlkZURlZmF1bHRDb25maWcsXG4gIHByb3ZpZGVEZWZhdWx0Q29uZmlnRmFjdG9yeSxcbn0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7IENtc1BhZ2VHdWFyZCwgUGFnZUxheW91dENvbXBvbmVudCB9IGZyb20gJ0BzcGFydGFjdXMvc3RvcmVmcm9udCc7XG5pbXBvcnQgeyBkZWZhdWx0Q3VzdG9tZXJUaWNrZXRpbmdDb25maWcgfSBmcm9tICcuL2NvbmZpZyc7XG5pbXBvcnQgeyBkZWZhdWx0Q3VzdG9tZXJUaWNrZXRpbmdSb3V0aW5nQ29uZmlnIH0gZnJvbSAnLi9jb25maWcvZGVmYXVsdC1jdXN0b21lci10aWNrZXRpbmctcm91dGluZy1jb25maWcnO1xuaW1wb3J0IHtcbiAgQ1VTVE9NRVJfVElDS0VUSU5HX0NPUkVfRkVBVFVSRSxcbiAgQ1VTVE9NRVJfVElDS0VUSU5HX0ZFQVRVUkUsXG59IGZyb20gJy4vZmVhdHVyZS1uYW1lJztcbmltcG9ydCB7IEN1c3RvbWVyVGlja2V0aW5nRXZlbnRNb2R1bGUgfSBmcm9tICcuL2V2ZW50cy9jdXN0b21lci10aWNrZXRpbmctZXZlbnQubW9kdWxlJztcblxuZXhwb3J0IGZ1bmN0aW9uIGRlZmF1bHRDdXN0b21lclRpY2tldGluZ0NvbXBvbmVudHNDb25maWcoKTogQ21zQ29uZmlnIHtcbiAgY29uc3QgY29uZmlnOiBDbXNDb25maWcgPSB7XG4gICAgZmVhdHVyZU1vZHVsZXM6IHtcbiAgICAgIFtDVVNUT01FUl9USUNLRVRJTkdfRkVBVFVSRV06IHtcbiAgICAgICAgY21zQ29tcG9uZW50czogW1xuICAgICAgICAgICdTdXBwb3J0VGlja2V0SGlzdG9yeUNvbXBvbmVudCcsXG4gICAgICAgICAgJ1N1cHBvcnRUaWNrZXRVcGRhdGVDb21wb25lbnQnLFxuICAgICAgICAgICdTdXBwb3J0VGlja2V0RGV0YWlsc0NvbXBvbmVudCcsXG4gICAgICAgICAgJ1N1cHBvcnRUaWNrZXRSZW9wZW5Db21wb25lbnQnLFxuICAgICAgICAgICdTdXBwb3J0VGlja2V0Q2xvc2VDb21wb25lbnQnLFxuICAgICAgICAgICdNeUFjY291bnRWaWV3UmVxdWVzdHNDb21wb25lbnQnLFxuICAgICAgICBdLFxuICAgICAgfSxcblxuICAgICAgLy8gYnkgZGVmYXVsdCBjb3JlIGlzIGJ1bmRsZWQgdG9nZXRoZXIgd2l0aCBjb21wb25lbnRzXG4gICAgICBbQ1VTVE9NRVJfVElDS0VUSU5HX0NPUkVfRkVBVFVSRV06IENVU1RPTUVSX1RJQ0tFVElOR19GRUFUVVJFLFxuICAgIH0sXG4gIH07XG4gIHJldHVybiBjb25maWc7XG59XG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ3VzdG9tZXJUaWNrZXRpbmdFdmVudE1vZHVsZSxcbiAgICBSb3V0ZXJNb2R1bGUuZm9yQ2hpbGQoW1xuICAgICAge1xuICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgIHBhdGg6IG51bGwsXG4gICAgICAgIGNhbkFjdGl2YXRlOiBbQXV0aEd1YXJkLCBDbXNQYWdlR3VhcmRdLFxuICAgICAgICBjb21wb25lbnQ6IFBhZ2VMYXlvdXRDb21wb25lbnQsXG4gICAgICAgIGRhdGE6IHtcbiAgICAgICAgICBjeFJvdXRlOiAnc3VwcG9ydFRpY2tldERldGFpbHMnLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICBwYXRoOiBudWxsLFxuICAgICAgICBjYW5BY3RpdmF0ZTogW0F1dGhHdWFyZCwgQ21zUGFnZUd1YXJkXSxcbiAgICAgICAgY29tcG9uZW50OiBQYWdlTGF5b3V0Q29tcG9uZW50LFxuICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgY3hSb3V0ZTogJ3N1cHBvcnRUaWNrZXRzJyxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgXSksXG4gIF0sXG4gIHByb3ZpZGVyczogW1xuICAgIHByb3ZpZGVEZWZhdWx0Q29uZmlnRmFjdG9yeShkZWZhdWx0Q3VzdG9tZXJUaWNrZXRpbmdDb21wb25lbnRzQ29uZmlnKSxcbiAgICBwcm92aWRlRGVmYXVsdENvbmZpZyhkZWZhdWx0Q3VzdG9tZXJUaWNrZXRpbmdSb3V0aW5nQ29uZmlnKSxcbiAgICBwcm92aWRlRGVmYXVsdENvbmZpZyhkZWZhdWx0Q3VzdG9tZXJUaWNrZXRpbmdDb25maWcpLFxuICBdLFxufSlcbmV4cG9ydCBjbGFzcyBDdXN0b21lclRpY2tldGluZ1Jvb3RNb2R1bGUge31cbiJdfQ==