/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CART_BASE_FEATURE, ORDER_ENTRIES_CONTEXT, } from '@spartacus/cart/base/root';
import { AuthGuard, provideDefaultConfig, provideDefaultConfigFactory, } from '@spartacus/core';
import { CmsPageGuard, PageLayoutComponent } from '@spartacus/storefront';
import { CART_SAVED_CART_CORE_FEATURE, CART_SAVED_CART_FEATURE, } from './feature-name';
import { NewSavedCartOrderEntriesContextToken, SavedCartOrderEntriesContextToken, } from './tokens/context';
import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
// TODO: Inline this factory when we start releasing Ivy compiled libraries
export function defaultCartSavedCartComponentsConfig() {
    const config = {
        featureModules: {
            [CART_SAVED_CART_FEATURE]: {
                cmsComponents: [
                    'AddToSavedCartsComponent',
                    'AccountSavedCartHistoryComponent',
                    'SavedCartDetailsOverviewComponent',
                    'SavedCartDetailsItemsComponent',
                    'SavedCartDetailsActionComponent',
                ],
                dependencies: [CART_BASE_FEATURE],
            },
            // by default core is bundled together with components
            [CART_SAVED_CART_CORE_FEATURE]: CART_SAVED_CART_FEATURE,
        },
    };
    return config;
}
export class SavedCartRootModule {
}
SavedCartRootModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: SavedCartRootModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
SavedCartRootModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: SavedCartRootModule, imports: [i1.RouterModule] });
SavedCartRootModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: SavedCartRootModule, providers: [
        provideDefaultConfigFactory(defaultCartSavedCartComponentsConfig),
        provideDefaultConfig({
            routing: {
                routes: {
                    savedCarts: {
                        paths: ['my-account/saved-carts'],
                    },
                    savedCartsDetails: {
                        paths: ['my-account/saved-cart/:savedCartId'],
                        paramsMapping: { savedCartId: 'savedCartId' },
                    },
                },
            },
        }),
    ], imports: [RouterModule.forChild([
            {
                // @ts-ignore
                path: null,
                canActivate: [AuthGuard, CmsPageGuard],
                component: PageLayoutComponent,
                data: {
                    cxRoute: 'savedCartsDetails',
                    cxContext: {
                        [ORDER_ENTRIES_CONTEXT]: SavedCartOrderEntriesContextToken,
                    },
                },
            },
            {
                // @ts-ignore
                path: null,
                canActivate: [AuthGuard, CmsPageGuard],
                component: PageLayoutComponent,
                data: {
                    cxRoute: 'savedCarts',
                    cxContext: {
                        [ORDER_ENTRIES_CONTEXT]: NewSavedCartOrderEntriesContextToken,
                    },
                },
            },
        ])] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: SavedCartRootModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        RouterModule.forChild([
                            {
                                // @ts-ignore
                                path: null,
                                canActivate: [AuthGuard, CmsPageGuard],
                                component: PageLayoutComponent,
                                data: {
                                    cxRoute: 'savedCartsDetails',
                                    cxContext: {
                                        [ORDER_ENTRIES_CONTEXT]: SavedCartOrderEntriesContextToken,
                                    },
                                },
                            },
                            {
                                // @ts-ignore
                                path: null,
                                canActivate: [AuthGuard, CmsPageGuard],
                                component: PageLayoutComponent,
                                data: {
                                    cxRoute: 'savedCarts',
                                    cxContext: {
                                        [ORDER_ENTRIES_CONTEXT]: NewSavedCartOrderEntriesContextToken,
                                    },
                                },
                            },
                        ]),
                    ],
                    providers: [
                        provideDefaultConfigFactory(defaultCartSavedCartComponentsConfig),
                        provideDefaultConfig({
                            routing: {
                                routes: {
                                    savedCarts: {
                                        paths: ['my-account/saved-carts'],
                                    },
                                    savedCartsDetails: {
                                        paths: ['my-account/saved-cart/:savedCartId'],
                                        paramsMapping: { savedCartId: 'savedCartId' },
                                    },
                                },
                            },
                        }),
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2F2ZWQtY2FydC1yb290Lm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9jYXJ0L3NhdmVkLWNhcnQvcm9vdC9zYXZlZC1jYXJ0LXJvb3QubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQ0wsaUJBQWlCLEVBQ2pCLHFCQUFxQixHQUN0QixNQUFNLDJCQUEyQixDQUFDO0FBQ25DLE9BQU8sRUFDTCxTQUFTLEVBRVQsb0JBQW9CLEVBQ3BCLDJCQUEyQixHQUU1QixNQUFNLGlCQUFpQixDQUFDO0FBQ3pCLE9BQU8sRUFBRSxZQUFZLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUMxRSxPQUFPLEVBQ0wsNEJBQTRCLEVBQzVCLHVCQUF1QixHQUN4QixNQUFNLGdCQUFnQixDQUFDO0FBQ3hCLE9BQU8sRUFDTCxvQ0FBb0MsRUFDcEMsaUNBQWlDLEdBQ2xDLE1BQU0sa0JBQWtCLENBQUM7OztBQUUxQiwyRUFBMkU7QUFDM0UsTUFBTSxVQUFVLG9DQUFvQztJQUNsRCxNQUFNLE1BQU0sR0FBYztRQUN4QixjQUFjLEVBQUU7WUFDZCxDQUFDLHVCQUF1QixDQUFDLEVBQUU7Z0JBQ3pCLGFBQWEsRUFBRTtvQkFDYiwwQkFBMEI7b0JBQzFCLGtDQUFrQztvQkFDbEMsbUNBQW1DO29CQUNuQyxnQ0FBZ0M7b0JBQ2hDLGlDQUFpQztpQkFDbEM7Z0JBQ0QsWUFBWSxFQUFFLENBQUMsaUJBQWlCLENBQUM7YUFDbEM7WUFFRCxzREFBc0Q7WUFDdEQsQ0FBQyw0QkFBNEIsQ0FBQyxFQUFFLHVCQUF1QjtTQUN4RDtLQUNGLENBQUM7SUFDRixPQUFPLE1BQU0sQ0FBQztBQUNoQixDQUFDO0FBZ0RELE1BQU0sT0FBTyxtQkFBbUI7O2dIQUFuQixtQkFBbUI7aUhBQW5CLG1CQUFtQjtpSEFBbkIsbUJBQW1CLGFBakJuQjtRQUNULDJCQUEyQixDQUFDLG9DQUFvQyxDQUFDO1FBQ2pFLG9CQUFvQixDQUFnQjtZQUNsQyxPQUFPLEVBQUU7Z0JBQ1AsTUFBTSxFQUFFO29CQUNOLFVBQVUsRUFBRTt3QkFDVixLQUFLLEVBQUUsQ0FBQyx3QkFBd0IsQ0FBQztxQkFDbEM7b0JBQ0QsaUJBQWlCLEVBQUU7d0JBQ2pCLEtBQUssRUFBRSxDQUFDLG9DQUFvQyxDQUFDO3dCQUM3QyxhQUFhLEVBQUUsRUFBRSxXQUFXLEVBQUUsYUFBYSxFQUFFO3FCQUM5QztpQkFDRjthQUNGO1NBQ0YsQ0FBQztLQUNILFlBMUNDLFlBQVksQ0FBQyxRQUFRLENBQUM7WUFDcEI7Z0JBQ0UsYUFBYTtnQkFDYixJQUFJLEVBQUUsSUFBSTtnQkFDVixXQUFXLEVBQUUsQ0FBQyxTQUFTLEVBQUUsWUFBWSxDQUFDO2dCQUN0QyxTQUFTLEVBQUUsbUJBQW1CO2dCQUM5QixJQUFJLEVBQUU7b0JBQ0osT0FBTyxFQUFFLG1CQUFtQjtvQkFDNUIsU0FBUyxFQUFFO3dCQUNULENBQUMscUJBQXFCLENBQUMsRUFBRSxpQ0FBaUM7cUJBQzNEO2lCQUNGO2FBQ0Y7WUFDRDtnQkFDRSxhQUFhO2dCQUNiLElBQUksRUFBRSxJQUFJO2dCQUNWLFdBQVcsRUFBRSxDQUFDLFNBQVMsRUFBRSxZQUFZLENBQUM7Z0JBQ3RDLFNBQVMsRUFBRSxtQkFBbUI7Z0JBQzlCLElBQUksRUFBRTtvQkFDSixPQUFPLEVBQUUsWUFBWTtvQkFDckIsU0FBUyxFQUFFO3dCQUNULENBQUMscUJBQXFCLENBQUMsRUFBRSxvQ0FBb0M7cUJBQzlEO2lCQUNGO2FBQ0Y7U0FDRixDQUFDOzJGQW1CTyxtQkFBbUI7a0JBOUMvQixRQUFRO21CQUFDO29CQUNSLE9BQU8sRUFBRTt3QkFDUCxZQUFZLENBQUMsUUFBUSxDQUFDOzRCQUNwQjtnQ0FDRSxhQUFhO2dDQUNiLElBQUksRUFBRSxJQUFJO2dDQUNWLFdBQVcsRUFBRSxDQUFDLFNBQVMsRUFBRSxZQUFZLENBQUM7Z0NBQ3RDLFNBQVMsRUFBRSxtQkFBbUI7Z0NBQzlCLElBQUksRUFBRTtvQ0FDSixPQUFPLEVBQUUsbUJBQW1CO29DQUM1QixTQUFTLEVBQUU7d0NBQ1QsQ0FBQyxxQkFBcUIsQ0FBQyxFQUFFLGlDQUFpQztxQ0FDM0Q7aUNBQ0Y7NkJBQ0Y7NEJBQ0Q7Z0NBQ0UsYUFBYTtnQ0FDYixJQUFJLEVBQUUsSUFBSTtnQ0FDVixXQUFXLEVBQUUsQ0FBQyxTQUFTLEVBQUUsWUFBWSxDQUFDO2dDQUN0QyxTQUFTLEVBQUUsbUJBQW1CO2dDQUM5QixJQUFJLEVBQUU7b0NBQ0osT0FBTyxFQUFFLFlBQVk7b0NBQ3JCLFNBQVMsRUFBRTt3Q0FDVCxDQUFDLHFCQUFxQixDQUFDLEVBQUUsb0NBQW9DO3FDQUM5RDtpQ0FDRjs2QkFDRjt5QkFDRixDQUFDO3FCQUNIO29CQUNELFNBQVMsRUFBRTt3QkFDVCwyQkFBMkIsQ0FBQyxvQ0FBb0MsQ0FBQzt3QkFDakUsb0JBQW9CLENBQWdCOzRCQUNsQyxPQUFPLEVBQUU7Z0NBQ1AsTUFBTSxFQUFFO29DQUNOLFVBQVUsRUFBRTt3Q0FDVixLQUFLLEVBQUUsQ0FBQyx3QkFBd0IsQ0FBQztxQ0FDbEM7b0NBQ0QsaUJBQWlCLEVBQUU7d0NBQ2pCLEtBQUssRUFBRSxDQUFDLG9DQUFvQyxDQUFDO3dDQUM3QyxhQUFhLEVBQUUsRUFBRSxXQUFXLEVBQUUsYUFBYSxFQUFFO3FDQUM5QztpQ0FDRjs2QkFDRjt5QkFDRixDQUFDO3FCQUNIO2lCQUNGIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFJvdXRlck1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQge1xuICBDQVJUX0JBU0VfRkVBVFVSRSxcbiAgT1JERVJfRU5UUklFU19DT05URVhULFxufSBmcm9tICdAc3BhcnRhY3VzL2NhcnQvYmFzZS9yb290JztcbmltcG9ydCB7XG4gIEF1dGhHdWFyZCxcbiAgQ21zQ29uZmlnLFxuICBwcm92aWRlRGVmYXVsdENvbmZpZyxcbiAgcHJvdmlkZURlZmF1bHRDb25maWdGYWN0b3J5LFxuICBSb3V0aW5nQ29uZmlnLFxufSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHsgQ21zUGFnZUd1YXJkLCBQYWdlTGF5b3V0Q29tcG9uZW50IH0gZnJvbSAnQHNwYXJ0YWN1cy9zdG9yZWZyb250JztcbmltcG9ydCB7XG4gIENBUlRfU0FWRURfQ0FSVF9DT1JFX0ZFQVRVUkUsXG4gIENBUlRfU0FWRURfQ0FSVF9GRUFUVVJFLFxufSBmcm9tICcuL2ZlYXR1cmUtbmFtZSc7XG5pbXBvcnQge1xuICBOZXdTYXZlZENhcnRPcmRlckVudHJpZXNDb250ZXh0VG9rZW4sXG4gIFNhdmVkQ2FydE9yZGVyRW50cmllc0NvbnRleHRUb2tlbixcbn0gZnJvbSAnLi90b2tlbnMvY29udGV4dCc7XG5cbi8vIFRPRE86IElubGluZSB0aGlzIGZhY3Rvcnkgd2hlbiB3ZSBzdGFydCByZWxlYXNpbmcgSXZ5IGNvbXBpbGVkIGxpYnJhcmllc1xuZXhwb3J0IGZ1bmN0aW9uIGRlZmF1bHRDYXJ0U2F2ZWRDYXJ0Q29tcG9uZW50c0NvbmZpZygpOiBDbXNDb25maWcge1xuICBjb25zdCBjb25maWc6IENtc0NvbmZpZyA9IHtcbiAgICBmZWF0dXJlTW9kdWxlczoge1xuICAgICAgW0NBUlRfU0FWRURfQ0FSVF9GRUFUVVJFXToge1xuICAgICAgICBjbXNDb21wb25lbnRzOiBbXG4gICAgICAgICAgJ0FkZFRvU2F2ZWRDYXJ0c0NvbXBvbmVudCcsXG4gICAgICAgICAgJ0FjY291bnRTYXZlZENhcnRIaXN0b3J5Q29tcG9uZW50JyxcbiAgICAgICAgICAnU2F2ZWRDYXJ0RGV0YWlsc092ZXJ2aWV3Q29tcG9uZW50JyxcbiAgICAgICAgICAnU2F2ZWRDYXJ0RGV0YWlsc0l0ZW1zQ29tcG9uZW50JyxcbiAgICAgICAgICAnU2F2ZWRDYXJ0RGV0YWlsc0FjdGlvbkNvbXBvbmVudCcsXG4gICAgICAgIF0sXG4gICAgICAgIGRlcGVuZGVuY2llczogW0NBUlRfQkFTRV9GRUFUVVJFXSxcbiAgICAgIH0sXG5cbiAgICAgIC8vIGJ5IGRlZmF1bHQgY29yZSBpcyBidW5kbGVkIHRvZ2V0aGVyIHdpdGggY29tcG9uZW50c1xuICAgICAgW0NBUlRfU0FWRURfQ0FSVF9DT1JFX0ZFQVRVUkVdOiBDQVJUX1NBVkVEX0NBUlRfRkVBVFVSRSxcbiAgICB9LFxuICB9O1xuICByZXR1cm4gY29uZmlnO1xufVxuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgUm91dGVyTW9kdWxlLmZvckNoaWxkKFtcbiAgICAgIHtcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICBwYXRoOiBudWxsLFxuICAgICAgICBjYW5BY3RpdmF0ZTogW0F1dGhHdWFyZCwgQ21zUGFnZUd1YXJkXSxcbiAgICAgICAgY29tcG9uZW50OiBQYWdlTGF5b3V0Q29tcG9uZW50LFxuICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgY3hSb3V0ZTogJ3NhdmVkQ2FydHNEZXRhaWxzJyxcbiAgICAgICAgICBjeENvbnRleHQ6IHtcbiAgICAgICAgICAgIFtPUkRFUl9FTlRSSUVTX0NPTlRFWFRdOiBTYXZlZENhcnRPcmRlckVudHJpZXNDb250ZXh0VG9rZW4sXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgcGF0aDogbnVsbCxcbiAgICAgICAgY2FuQWN0aXZhdGU6IFtBdXRoR3VhcmQsIENtc1BhZ2VHdWFyZF0sXG4gICAgICAgIGNvbXBvbmVudDogUGFnZUxheW91dENvbXBvbmVudCxcbiAgICAgICAgZGF0YToge1xuICAgICAgICAgIGN4Um91dGU6ICdzYXZlZENhcnRzJyxcbiAgICAgICAgICBjeENvbnRleHQ6IHtcbiAgICAgICAgICAgIFtPUkRFUl9FTlRSSUVTX0NPTlRFWFRdOiBOZXdTYXZlZENhcnRPcmRlckVudHJpZXNDb250ZXh0VG9rZW4sXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgXSksXG4gIF0sXG4gIHByb3ZpZGVyczogW1xuICAgIHByb3ZpZGVEZWZhdWx0Q29uZmlnRmFjdG9yeShkZWZhdWx0Q2FydFNhdmVkQ2FydENvbXBvbmVudHNDb25maWcpLFxuICAgIHByb3ZpZGVEZWZhdWx0Q29uZmlnKDxSb3V0aW5nQ29uZmlnPntcbiAgICAgIHJvdXRpbmc6IHtcbiAgICAgICAgcm91dGVzOiB7XG4gICAgICAgICAgc2F2ZWRDYXJ0czoge1xuICAgICAgICAgICAgcGF0aHM6IFsnbXktYWNjb3VudC9zYXZlZC1jYXJ0cyddLFxuICAgICAgICAgIH0sXG4gICAgICAgICAgc2F2ZWRDYXJ0c0RldGFpbHM6IHtcbiAgICAgICAgICAgIHBhdGhzOiBbJ215LWFjY291bnQvc2F2ZWQtY2FydC86c2F2ZWRDYXJ0SWQnXSxcbiAgICAgICAgICAgIHBhcmFtc01hcHBpbmc6IHsgc2F2ZWRDYXJ0SWQ6ICdzYXZlZENhcnRJZCcgfSxcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9KSxcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgU2F2ZWRDYXJ0Um9vdE1vZHVsZSB7fVxuIl19