/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ORDER_ENTRIES_CONTEXT } from '@spartacus/cart/base/root';
import { provideDefaultConfig, provideDefaultConfigFactory, } from '@spartacus/core';
import { CmsPageGuard, PageLayoutComponent } from '@spartacus/storefront';
import { defaultQuickOrderConfig } from './config/default-quick-order.config';
import { CART_QUICK_ORDER_CORE_FEATURE, CART_QUICK_ORDER_FEATURE, } from './feature-name';
import { QuickOrderOrderEntriesContextToken } from './tokens/context';
import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
export function defaultQuickOrderComponentsConfig() {
    const config = {
        featureModules: {
            [CART_QUICK_ORDER_FEATURE]: {
                cmsComponents: ['QuickOrderComponent', 'CartQuickOrderFormComponent'],
            },
            // by default core is bundled together with components
            [CART_QUICK_ORDER_CORE_FEATURE]: CART_QUICK_ORDER_FEATURE,
        },
    };
    return config;
}
export const defaultQuickOrderRoutingConfig = {
    routing: {
        routes: {
            quickOrder: {
                paths: ['my-account/quick-order'],
            },
        },
    },
};
export class QuickOrderRootModule {
}
QuickOrderRootModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: QuickOrderRootModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
QuickOrderRootModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: QuickOrderRootModule, imports: [i1.RouterModule] });
QuickOrderRootModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: QuickOrderRootModule, providers: [
        provideDefaultConfigFactory(defaultQuickOrderComponentsConfig),
        provideDefaultConfig(defaultQuickOrderRoutingConfig),
        provideDefaultConfig(defaultQuickOrderConfig),
    ], imports: [RouterModule.forChild([
            {
                // @ts-ignore
                path: null,
                canActivate: [CmsPageGuard],
                component: PageLayoutComponent,
                data: {
                    cxRoute: 'quickOrder',
                    cxContext: {
                        [ORDER_ENTRIES_CONTEXT]: QuickOrderOrderEntriesContextToken,
                    },
                },
            },
        ])] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: QuickOrderRootModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        RouterModule.forChild([
                            {
                                // @ts-ignore
                                path: null,
                                canActivate: [CmsPageGuard],
                                component: PageLayoutComponent,
                                data: {
                                    cxRoute: 'quickOrder',
                                    cxContext: {
                                        [ORDER_ENTRIES_CONTEXT]: QuickOrderOrderEntriesContextToken,
                                    },
                                },
                            },
                        ]),
                    ],
                    providers: [
                        provideDefaultConfigFactory(defaultQuickOrderComponentsConfig),
                        provideDefaultConfig(defaultQuickOrderRoutingConfig),
                        provideDefaultConfig(defaultQuickOrderConfig),
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVpY2stb3JkZXItcm9vdC5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvY2FydC9xdWljay1vcmRlci9yb290L3F1aWNrLW9yZGVyLXJvb3QubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUNsRSxPQUFPLEVBQ0wsb0JBQW9CLEVBQ3BCLDJCQUEyQixHQUU1QixNQUFNLGlCQUFpQixDQUFDO0FBQ3pCLE9BQU8sRUFBRSxZQUFZLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUMxRSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQztBQUM5RSxPQUFPLEVBQ0wsNkJBQTZCLEVBQzdCLHdCQUF3QixHQUN6QixNQUFNLGdCQUFnQixDQUFDO0FBQ3hCLE9BQU8sRUFBRSxrQ0FBa0MsRUFBRSxNQUFNLGtCQUFrQixDQUFDOzs7QUFFdEUsTUFBTSxVQUFVLGlDQUFpQztJQUMvQyxNQUFNLE1BQU0sR0FBRztRQUNiLGNBQWMsRUFBRTtZQUNkLENBQUMsd0JBQXdCLENBQUMsRUFBRTtnQkFDMUIsYUFBYSxFQUFFLENBQUMscUJBQXFCLEVBQUUsNkJBQTZCLENBQUM7YUFDdEU7WUFDRCxzREFBc0Q7WUFDdEQsQ0FBQyw2QkFBNkIsQ0FBQyxFQUFFLHdCQUF3QjtTQUMxRDtLQUNGLENBQUM7SUFDRixPQUFPLE1BQU0sQ0FBQztBQUNoQixDQUFDO0FBRUQsTUFBTSxDQUFDLE1BQU0sOEJBQThCLEdBQWtCO0lBQzNELE9BQU8sRUFBRTtRQUNQLE1BQU0sRUFBRTtZQUNOLFVBQVUsRUFBRTtnQkFDVixLQUFLLEVBQUUsQ0FBQyx3QkFBd0IsQ0FBQzthQUNsQztTQUNGO0tBQ0Y7Q0FDRixDQUFDO0FBeUJGLE1BQU0sT0FBTyxvQkFBb0I7O2lIQUFwQixvQkFBb0I7a0hBQXBCLG9CQUFvQjtrSEFBcEIsb0JBQW9CLGFBTnBCO1FBQ1QsMkJBQTJCLENBQUMsaUNBQWlDLENBQUM7UUFDOUQsb0JBQW9CLENBQUMsOEJBQThCLENBQUM7UUFDcEQsb0JBQW9CLENBQUMsdUJBQXVCLENBQUM7S0FDOUMsWUFuQkMsWUFBWSxDQUFDLFFBQVEsQ0FBQztZQUNwQjtnQkFDRSxhQUFhO2dCQUNiLElBQUksRUFBRSxJQUFJO2dCQUNWLFdBQVcsRUFBRSxDQUFDLFlBQVksQ0FBQztnQkFDM0IsU0FBUyxFQUFFLG1CQUFtQjtnQkFDOUIsSUFBSSxFQUFFO29CQUNKLE9BQU8sRUFBRSxZQUFZO29CQUNyQixTQUFTLEVBQUU7d0JBQ1QsQ0FBQyxxQkFBcUIsQ0FBQyxFQUFFLGtDQUFrQztxQkFDNUQ7aUJBQ0Y7YUFDRjtTQUNGLENBQUM7MkZBUU8sb0JBQW9CO2tCQXZCaEMsUUFBUTttQkFBQztvQkFDUixPQUFPLEVBQUU7d0JBQ1AsWUFBWSxDQUFDLFFBQVEsQ0FBQzs0QkFDcEI7Z0NBQ0UsYUFBYTtnQ0FDYixJQUFJLEVBQUUsSUFBSTtnQ0FDVixXQUFXLEVBQUUsQ0FBQyxZQUFZLENBQUM7Z0NBQzNCLFNBQVMsRUFBRSxtQkFBbUI7Z0NBQzlCLElBQUksRUFBRTtvQ0FDSixPQUFPLEVBQUUsWUFBWTtvQ0FDckIsU0FBUyxFQUFFO3dDQUNULENBQUMscUJBQXFCLENBQUMsRUFBRSxrQ0FBa0M7cUNBQzVEO2lDQUNGOzZCQUNGO3lCQUNGLENBQUM7cUJBQ0g7b0JBQ0QsU0FBUyxFQUFFO3dCQUNULDJCQUEyQixDQUFDLGlDQUFpQyxDQUFDO3dCQUM5RCxvQkFBb0IsQ0FBQyw4QkFBOEIsQ0FBQzt3QkFDcEQsb0JBQW9CLENBQUMsdUJBQXVCLENBQUM7cUJBQzlDO2lCQUNGIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFJvdXRlck1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBPUkRFUl9FTlRSSUVTX0NPTlRFWFQgfSBmcm9tICdAc3BhcnRhY3VzL2NhcnQvYmFzZS9yb290JztcbmltcG9ydCB7XG4gIHByb3ZpZGVEZWZhdWx0Q29uZmlnLFxuICBwcm92aWRlRGVmYXVsdENvbmZpZ0ZhY3RvcnksXG4gIFJvdXRpbmdDb25maWcsXG59IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBDbXNQYWdlR3VhcmQsIFBhZ2VMYXlvdXRDb21wb25lbnQgfSBmcm9tICdAc3BhcnRhY3VzL3N0b3JlZnJvbnQnO1xuaW1wb3J0IHsgZGVmYXVsdFF1aWNrT3JkZXJDb25maWcgfSBmcm9tICcuL2NvbmZpZy9kZWZhdWx0LXF1aWNrLW9yZGVyLmNvbmZpZyc7XG5pbXBvcnQge1xuICBDQVJUX1FVSUNLX09SREVSX0NPUkVfRkVBVFVSRSxcbiAgQ0FSVF9RVUlDS19PUkRFUl9GRUFUVVJFLFxufSBmcm9tICcuL2ZlYXR1cmUtbmFtZSc7XG5pbXBvcnQgeyBRdWlja09yZGVyT3JkZXJFbnRyaWVzQ29udGV4dFRva2VuIH0gZnJvbSAnLi90b2tlbnMvY29udGV4dCc7XG5cbmV4cG9ydCBmdW5jdGlvbiBkZWZhdWx0UXVpY2tPcmRlckNvbXBvbmVudHNDb25maWcoKSB7XG4gIGNvbnN0IGNvbmZpZyA9IHtcbiAgICBmZWF0dXJlTW9kdWxlczoge1xuICAgICAgW0NBUlRfUVVJQ0tfT1JERVJfRkVBVFVSRV06IHtcbiAgICAgICAgY21zQ29tcG9uZW50czogWydRdWlja09yZGVyQ29tcG9uZW50JywgJ0NhcnRRdWlja09yZGVyRm9ybUNvbXBvbmVudCddLFxuICAgICAgfSxcbiAgICAgIC8vIGJ5IGRlZmF1bHQgY29yZSBpcyBidW5kbGVkIHRvZ2V0aGVyIHdpdGggY29tcG9uZW50c1xuICAgICAgW0NBUlRfUVVJQ0tfT1JERVJfQ09SRV9GRUFUVVJFXTogQ0FSVF9RVUlDS19PUkRFUl9GRUFUVVJFLFxuICAgIH0sXG4gIH07XG4gIHJldHVybiBjb25maWc7XG59XG5cbmV4cG9ydCBjb25zdCBkZWZhdWx0UXVpY2tPcmRlclJvdXRpbmdDb25maWc6IFJvdXRpbmdDb25maWcgPSB7XG4gIHJvdXRpbmc6IHtcbiAgICByb3V0ZXM6IHtcbiAgICAgIHF1aWNrT3JkZXI6IHtcbiAgICAgICAgcGF0aHM6IFsnbXktYWNjb3VudC9xdWljay1vcmRlciddLFxuICAgICAgfSxcbiAgICB9LFxuICB9LFxufTtcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIFJvdXRlck1vZHVsZS5mb3JDaGlsZChbXG4gICAgICB7XG4gICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgcGF0aDogbnVsbCxcbiAgICAgICAgY2FuQWN0aXZhdGU6IFtDbXNQYWdlR3VhcmRdLFxuICAgICAgICBjb21wb25lbnQ6IFBhZ2VMYXlvdXRDb21wb25lbnQsXG4gICAgICAgIGRhdGE6IHtcbiAgICAgICAgICBjeFJvdXRlOiAncXVpY2tPcmRlcicsXG4gICAgICAgICAgY3hDb250ZXh0OiB7XG4gICAgICAgICAgICBbT1JERVJfRU5UUklFU19DT05URVhUXTogUXVpY2tPcmRlck9yZGVyRW50cmllc0NvbnRleHRUb2tlbixcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICBdKSxcbiAgXSxcbiAgcHJvdmlkZXJzOiBbXG4gICAgcHJvdmlkZURlZmF1bHRDb25maWdGYWN0b3J5KGRlZmF1bHRRdWlja09yZGVyQ29tcG9uZW50c0NvbmZpZyksXG4gICAgcHJvdmlkZURlZmF1bHRDb25maWcoZGVmYXVsdFF1aWNrT3JkZXJSb3V0aW5nQ29uZmlnKSxcbiAgICBwcm92aWRlRGVmYXVsdENvbmZpZyhkZWZhdWx0UXVpY2tPcmRlckNvbmZpZyksXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIFF1aWNrT3JkZXJSb290TW9kdWxlIHt9XG4iXX0=