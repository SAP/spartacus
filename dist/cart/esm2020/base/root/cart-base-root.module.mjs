/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { provideDefaultConfig, provideDefaultConfigFactory, } from '@spartacus/core';
import { CmsPageGuard, PageLayoutComponent } from '@spartacus/storefront';
import { defaultCartConfig } from './config/default-cart-config';
import { defaultCartRoutingConfig } from './config/default-cart-routing-config';
import { ORDER_ENTRIES_CONTEXT } from './context/order-entires.context';
import { CartBaseEventModule } from './events/cart-base-event.module';
import { ADD_TO_CART_FEATURE, CART_BASE_CORE_FEATURE, CART_BASE_FEATURE, MINI_CART_FEATURE, } from './feature-name';
import { ActiveCartOrderEntriesContextToken } from './tokens/context';
import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
export function defaultCartComponentsConfig() {
    const config = {
        featureModules: {
            [CART_BASE_FEATURE]: {
                cmsComponents: [
                    'CartApplyCouponComponent',
                    'CartComponent',
                    'CartProceedToCheckoutComponent',
                    'CartTotalsComponent',
                    'SaveForLaterComponent',
                    'ClearCartComponent',
                ],
            },
            [MINI_CART_FEATURE]: {
                cmsComponents: ['MiniCartComponent'],
            },
            [ADD_TO_CART_FEATURE]: {
                cmsComponents: ['ProductAddToCartComponent'],
            },
            // By default core is bundled together with components.
            // The cart lib should keep using this default.
            //
            // While the lazy loading configurations make it possible to
            // split the core part and the components part, it is required that
            // they stay together for the cart lib.  This compromise is required to
            // optimize performances by delaying the moment the cart lib is loaded and
            // making sure cart lib is loaded when needed.
            [CART_BASE_CORE_FEATURE]: CART_BASE_FEATURE,
        },
    };
    return config;
}
export class CartBaseRootModule {
}
CartBaseRootModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CartBaseRootModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
CartBaseRootModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: CartBaseRootModule, imports: [CartBaseEventModule, i1.RouterModule] });
CartBaseRootModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CartBaseRootModule, providers: [
        provideDefaultConfigFactory(defaultCartComponentsConfig),
        provideDefaultConfig(defaultCartConfig),
        provideDefaultConfig(defaultCartRoutingConfig),
    ], imports: [CartBaseEventModule,
        RouterModule.forChild([
            {
                // @ts-ignore
                path: null,
                canActivate: [CmsPageGuard],
                component: PageLayoutComponent,
                data: {
                    cxRoute: 'cart',
                    cxContext: {
                        [ORDER_ENTRIES_CONTEXT]: ActiveCartOrderEntriesContextToken,
                    },
                },
            },
        ])] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CartBaseRootModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CartBaseEventModule,
                        RouterModule.forChild([
                            {
                                // @ts-ignore
                                path: null,
                                canActivate: [CmsPageGuard],
                                component: PageLayoutComponent,
                                data: {
                                    cxRoute: 'cart',
                                    cxContext: {
                                        [ORDER_ENTRIES_CONTEXT]: ActiveCartOrderEntriesContextToken,
                                    },
                                },
                            },
                        ]),
                    ],
                    providers: [
                        provideDefaultConfigFactory(defaultCartComponentsConfig),
                        provideDefaultConfig(defaultCartConfig),
                        provideDefaultConfig(defaultCartRoutingConfig),
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FydC1iYXNlLXJvb3QubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL2NhcnQvYmFzZS9yb290L2NhcnQtYmFzZS1yb290Lm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUNMLG9CQUFvQixFQUNwQiwyQkFBMkIsR0FDNUIsTUFBTSxpQkFBaUIsQ0FBQztBQUN6QixPQUFPLEVBQUUsWUFBWSxFQUFFLG1CQUFtQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDMUUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDakUsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sc0NBQXNDLENBQUM7QUFDaEYsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDeEUsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDdEUsT0FBTyxFQUNMLG1CQUFtQixFQUNuQixzQkFBc0IsRUFDdEIsaUJBQWlCLEVBQ2pCLGlCQUFpQixHQUNsQixNQUFNLGdCQUFnQixDQUFDO0FBQ3hCLE9BQU8sRUFBRSxrQ0FBa0MsRUFBRSxNQUFNLGtCQUFrQixDQUFDOzs7QUFFdEUsTUFBTSxVQUFVLDJCQUEyQjtJQUN6QyxNQUFNLE1BQU0sR0FBRztRQUNiLGNBQWMsRUFBRTtZQUNkLENBQUMsaUJBQWlCLENBQUMsRUFBRTtnQkFDbkIsYUFBYSxFQUFFO29CQUNiLDBCQUEwQjtvQkFDMUIsZUFBZTtvQkFDZixnQ0FBZ0M7b0JBQ2hDLHFCQUFxQjtvQkFDckIsdUJBQXVCO29CQUN2QixvQkFBb0I7aUJBQ3JCO2FBQ0Y7WUFDRCxDQUFDLGlCQUFpQixDQUFDLEVBQUU7Z0JBQ25CLGFBQWEsRUFBRSxDQUFDLG1CQUFtQixDQUFDO2FBQ3JDO1lBQ0QsQ0FBQyxtQkFBbUIsQ0FBQyxFQUFFO2dCQUNyQixhQUFhLEVBQUUsQ0FBQywyQkFBMkIsQ0FBQzthQUM3QztZQUNELHVEQUF1RDtZQUN2RCwrQ0FBK0M7WUFDL0MsRUFBRTtZQUNGLDREQUE0RDtZQUM1RCxtRUFBbUU7WUFDbkUsdUVBQXVFO1lBQ3ZFLDBFQUEwRTtZQUMxRSw4Q0FBOEM7WUFDOUMsQ0FBQyxzQkFBc0IsQ0FBQyxFQUFFLGlCQUFpQjtTQUM1QztLQUNGLENBQUM7SUFDRixPQUFPLE1BQU0sQ0FBQztBQUNoQixDQUFDO0FBMEJELE1BQU0sT0FBTyxrQkFBa0I7OytHQUFsQixrQkFBa0I7Z0hBQWxCLGtCQUFrQixZQXRCM0IsbUJBQW1CO2dIQXNCVixrQkFBa0IsYUFObEI7UUFDVCwyQkFBMkIsQ0FBQywyQkFBMkIsQ0FBQztRQUN4RCxvQkFBb0IsQ0FBQyxpQkFBaUIsQ0FBQztRQUN2QyxvQkFBb0IsQ0FBQyx3QkFBd0IsQ0FBQztLQUMvQyxZQXBCQyxtQkFBbUI7UUFDbkIsWUFBWSxDQUFDLFFBQVEsQ0FBQztZQUNwQjtnQkFDRSxhQUFhO2dCQUNiLElBQUksRUFBRSxJQUFJO2dCQUNWLFdBQVcsRUFBRSxDQUFDLFlBQVksQ0FBQztnQkFDM0IsU0FBUyxFQUFFLG1CQUFtQjtnQkFDOUIsSUFBSSxFQUFFO29CQUNKLE9BQU8sRUFBRSxNQUFNO29CQUNmLFNBQVMsRUFBRTt3QkFDVCxDQUFDLHFCQUFxQixDQUFDLEVBQUUsa0NBQWtDO3FCQUM1RDtpQkFDRjthQUNGO1NBQ0YsQ0FBQzsyRkFRTyxrQkFBa0I7a0JBeEI5QixRQUFRO21CQUFDO29CQUNSLE9BQU8sRUFBRTt3QkFDUCxtQkFBbUI7d0JBQ25CLFlBQVksQ0FBQyxRQUFRLENBQUM7NEJBQ3BCO2dDQUNFLGFBQWE7Z0NBQ2IsSUFBSSxFQUFFLElBQUk7Z0NBQ1YsV0FBVyxFQUFFLENBQUMsWUFBWSxDQUFDO2dDQUMzQixTQUFTLEVBQUUsbUJBQW1CO2dDQUM5QixJQUFJLEVBQUU7b0NBQ0osT0FBTyxFQUFFLE1BQU07b0NBQ2YsU0FBUyxFQUFFO3dDQUNULENBQUMscUJBQXFCLENBQUMsRUFBRSxrQ0FBa0M7cUNBQzVEO2lDQUNGOzZCQUNGO3lCQUNGLENBQUM7cUJBQ0g7b0JBQ0QsU0FBUyxFQUFFO3dCQUNULDJCQUEyQixDQUFDLDJCQUEyQixDQUFDO3dCQUN4RCxvQkFBb0IsQ0FBQyxpQkFBaUIsQ0FBQzt3QkFDdkMsb0JBQW9CLENBQUMsd0JBQXdCLENBQUM7cUJBQy9DO2lCQUNGIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFJvdXRlck1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQge1xuICBwcm92aWRlRGVmYXVsdENvbmZpZyxcbiAgcHJvdmlkZURlZmF1bHRDb25maWdGYWN0b3J5LFxufSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHsgQ21zUGFnZUd1YXJkLCBQYWdlTGF5b3V0Q29tcG9uZW50IH0gZnJvbSAnQHNwYXJ0YWN1cy9zdG9yZWZyb250JztcbmltcG9ydCB7IGRlZmF1bHRDYXJ0Q29uZmlnIH0gZnJvbSAnLi9jb25maWcvZGVmYXVsdC1jYXJ0LWNvbmZpZyc7XG5pbXBvcnQgeyBkZWZhdWx0Q2FydFJvdXRpbmdDb25maWcgfSBmcm9tICcuL2NvbmZpZy9kZWZhdWx0LWNhcnQtcm91dGluZy1jb25maWcnO1xuaW1wb3J0IHsgT1JERVJfRU5UUklFU19DT05URVhUIH0gZnJvbSAnLi9jb250ZXh0L29yZGVyLWVudGlyZXMuY29udGV4dCc7XG5pbXBvcnQgeyBDYXJ0QmFzZUV2ZW50TW9kdWxlIH0gZnJvbSAnLi9ldmVudHMvY2FydC1iYXNlLWV2ZW50Lm1vZHVsZSc7XG5pbXBvcnQge1xuICBBRERfVE9fQ0FSVF9GRUFUVVJFLFxuICBDQVJUX0JBU0VfQ09SRV9GRUFUVVJFLFxuICBDQVJUX0JBU0VfRkVBVFVSRSxcbiAgTUlOSV9DQVJUX0ZFQVRVUkUsXG59IGZyb20gJy4vZmVhdHVyZS1uYW1lJztcbmltcG9ydCB7IEFjdGl2ZUNhcnRPcmRlckVudHJpZXNDb250ZXh0VG9rZW4gfSBmcm9tICcuL3Rva2Vucy9jb250ZXh0JztcblxuZXhwb3J0IGZ1bmN0aW9uIGRlZmF1bHRDYXJ0Q29tcG9uZW50c0NvbmZpZygpIHtcbiAgY29uc3QgY29uZmlnID0ge1xuICAgIGZlYXR1cmVNb2R1bGVzOiB7XG4gICAgICBbQ0FSVF9CQVNFX0ZFQVRVUkVdOiB7XG4gICAgICAgIGNtc0NvbXBvbmVudHM6IFtcbiAgICAgICAgICAnQ2FydEFwcGx5Q291cG9uQ29tcG9uZW50JyxcbiAgICAgICAgICAnQ2FydENvbXBvbmVudCcsXG4gICAgICAgICAgJ0NhcnRQcm9jZWVkVG9DaGVja291dENvbXBvbmVudCcsXG4gICAgICAgICAgJ0NhcnRUb3RhbHNDb21wb25lbnQnLFxuICAgICAgICAgICdTYXZlRm9yTGF0ZXJDb21wb25lbnQnLFxuICAgICAgICAgICdDbGVhckNhcnRDb21wb25lbnQnLFxuICAgICAgICBdLFxuICAgICAgfSxcbiAgICAgIFtNSU5JX0NBUlRfRkVBVFVSRV06IHtcbiAgICAgICAgY21zQ29tcG9uZW50czogWydNaW5pQ2FydENvbXBvbmVudCddLFxuICAgICAgfSxcbiAgICAgIFtBRERfVE9fQ0FSVF9GRUFUVVJFXToge1xuICAgICAgICBjbXNDb21wb25lbnRzOiBbJ1Byb2R1Y3RBZGRUb0NhcnRDb21wb25lbnQnXSxcbiAgICAgIH0sXG4gICAgICAvLyBCeSBkZWZhdWx0IGNvcmUgaXMgYnVuZGxlZCB0b2dldGhlciB3aXRoIGNvbXBvbmVudHMuXG4gICAgICAvLyBUaGUgY2FydCBsaWIgc2hvdWxkIGtlZXAgdXNpbmcgdGhpcyBkZWZhdWx0LlxuICAgICAgLy9cbiAgICAgIC8vIFdoaWxlIHRoZSBsYXp5IGxvYWRpbmcgY29uZmlndXJhdGlvbnMgbWFrZSBpdCBwb3NzaWJsZSB0b1xuICAgICAgLy8gc3BsaXQgdGhlIGNvcmUgcGFydCBhbmQgdGhlIGNvbXBvbmVudHMgcGFydCwgaXQgaXMgcmVxdWlyZWQgdGhhdFxuICAgICAgLy8gdGhleSBzdGF5IHRvZ2V0aGVyIGZvciB0aGUgY2FydCBsaWIuICBUaGlzIGNvbXByb21pc2UgaXMgcmVxdWlyZWQgdG9cbiAgICAgIC8vIG9wdGltaXplIHBlcmZvcm1hbmNlcyBieSBkZWxheWluZyB0aGUgbW9tZW50IHRoZSBjYXJ0IGxpYiBpcyBsb2FkZWQgYW5kXG4gICAgICAvLyBtYWtpbmcgc3VyZSBjYXJ0IGxpYiBpcyBsb2FkZWQgd2hlbiBuZWVkZWQuXG4gICAgICBbQ0FSVF9CQVNFX0NPUkVfRkVBVFVSRV06IENBUlRfQkFTRV9GRUFUVVJFLFxuICAgIH0sXG4gIH07XG4gIHJldHVybiBjb25maWc7XG59XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDYXJ0QmFzZUV2ZW50TW9kdWxlLFxuICAgIFJvdXRlck1vZHVsZS5mb3JDaGlsZChbXG4gICAgICB7XG4gICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgcGF0aDogbnVsbCxcbiAgICAgICAgY2FuQWN0aXZhdGU6IFtDbXNQYWdlR3VhcmRdLFxuICAgICAgICBjb21wb25lbnQ6IFBhZ2VMYXlvdXRDb21wb25lbnQsXG4gICAgICAgIGRhdGE6IHtcbiAgICAgICAgICBjeFJvdXRlOiAnY2FydCcsXG4gICAgICAgICAgY3hDb250ZXh0OiB7XG4gICAgICAgICAgICBbT1JERVJfRU5UUklFU19DT05URVhUXTogQWN0aXZlQ2FydE9yZGVyRW50cmllc0NvbnRleHRUb2tlbixcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICBdKSxcbiAgXSxcbiAgcHJvdmlkZXJzOiBbXG4gICAgcHJvdmlkZURlZmF1bHRDb25maWdGYWN0b3J5KGRlZmF1bHRDYXJ0Q29tcG9uZW50c0NvbmZpZyksXG4gICAgcHJvdmlkZURlZmF1bHRDb25maWcoZGVmYXVsdENhcnRDb25maWcpLFxuICAgIHByb3ZpZGVEZWZhdWx0Q29uZmlnKGRlZmF1bHRDYXJ0Um91dGluZ0NvbmZpZyksXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIENhcnRCYXNlUm9vdE1vZHVsZSB7fVxuIl19