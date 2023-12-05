/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ORDER_ENTRIES_CONTEXT } from '@spartacus/cart/base/root';
import { AuthGuard, provideDefaultConfig, provideDefaultConfigFactory, } from '@spartacus/core';
import { ORDER_FEATURE } from '@spartacus/order/root';
import { CmsPageGuard, PageLayoutComponent } from '@spartacus/storefront';
import { UnitOrderDetailsOrderEntriesContextToken } from './context';
import { ORGANIZATION_UNIT_ORDER_FEATURE } from './feature-name';
import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
// TODO: Inline this factory when we start releasing Ivy compiled libraries
export function defaultOrganizationUnitOrderComponentsConfig() {
    const config = {
        featureModules: {
            [ORGANIZATION_UNIT_ORDER_FEATURE]: {
                cmsComponents: [
                    'UnitLevelOrderHistoryComponent',
                    'UnitLevelOrderDetailsOverviewComponent',
                    'UnitLevelOrderDetailsItemsComponent',
                    'UnitLevelOrderDetailsTotalsComponent',
                ],
                dependencies: [ORDER_FEATURE],
            },
        },
    };
    return config;
}
export class UnitOrderRootModule {
}
UnitOrderRootModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitOrderRootModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
UnitOrderRootModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: UnitOrderRootModule, imports: [i1.RouterModule] });
UnitOrderRootModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitOrderRootModule, providers: [
        provideDefaultConfigFactory(defaultOrganizationUnitOrderComponentsConfig),
        provideDefaultConfig({
            routing: {
                routes: {
                    unitLevelOrders: {
                        paths: ['my-account/unitLevelOrders'],
                    },
                    unitLevelOrderDetail: {
                        paths: ['my-account/unitLevelOrderDetails/:orderCode'],
                        paramsMapping: { orderCode: 'code' },
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
                data: { cxRoute: 'unitLevelOrders' },
            },
            {
                // @ts-ignore
                path: null,
                canActivate: [AuthGuard, CmsPageGuard],
                component: PageLayoutComponent,
                data: {
                    cxRoute: 'unitLevelOrderDetail',
                    cxContext: {
                        [ORDER_ENTRIES_CONTEXT]: UnitOrderDetailsOrderEntriesContextToken,
                    },
                },
            },
        ])] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitOrderRootModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        RouterModule.forChild([
                            {
                                // @ts-ignore
                                path: null,
                                canActivate: [AuthGuard, CmsPageGuard],
                                component: PageLayoutComponent,
                                data: { cxRoute: 'unitLevelOrders' },
                            },
                            {
                                // @ts-ignore
                                path: null,
                                canActivate: [AuthGuard, CmsPageGuard],
                                component: PageLayoutComponent,
                                data: {
                                    cxRoute: 'unitLevelOrderDetail',
                                    cxContext: {
                                        [ORDER_ENTRIES_CONTEXT]: UnitOrderDetailsOrderEntriesContextToken,
                                    },
                                },
                            },
                        ]),
                    ],
                    providers: [
                        provideDefaultConfigFactory(defaultOrganizationUnitOrderComponentsConfig),
                        provideDefaultConfig({
                            routing: {
                                routes: {
                                    unitLevelOrders: {
                                        paths: ['my-account/unitLevelOrders'],
                                    },
                                    unitLevelOrderDetail: {
                                        paths: ['my-account/unitLevelOrderDetails/:orderCode'],
                                        paramsMapping: { orderCode: 'code' },
                                    },
                                },
                            },
                        }),
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidW5pdC1vcmRlci1yb290Lm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9vcmdhbml6YXRpb24vdW5pdC1vcmRlci9yb290L3VuaXQtb3JkZXItcm9vdC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQ2xFLE9BQU8sRUFDTCxTQUFTLEVBRVQsb0JBQW9CLEVBQ3BCLDJCQUEyQixHQUU1QixNQUFNLGlCQUFpQixDQUFDO0FBQ3pCLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUN0RCxPQUFPLEVBQUUsWUFBWSxFQUFFLG1CQUFtQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDMUUsT0FBTyxFQUFFLHdDQUF3QyxFQUFFLE1BQU0sV0FBVyxDQUFDO0FBQ3JFLE9BQU8sRUFBRSwrQkFBK0IsRUFBRSxNQUFNLGdCQUFnQixDQUFDOzs7QUFFakUsMkVBQTJFO0FBQzNFLE1BQU0sVUFBVSw0Q0FBNEM7SUFDMUQsTUFBTSxNQUFNLEdBQWM7UUFDeEIsY0FBYyxFQUFFO1lBQ2QsQ0FBQywrQkFBK0IsQ0FBQyxFQUFFO2dCQUNqQyxhQUFhLEVBQUU7b0JBQ2IsZ0NBQWdDO29CQUNoQyx3Q0FBd0M7b0JBQ3hDLHFDQUFxQztvQkFDckMsc0NBQXNDO2lCQUN2QztnQkFDRCxZQUFZLEVBQUUsQ0FBQyxhQUFhLENBQUM7YUFDOUI7U0FDRjtLQUNGLENBQUM7SUFFRixPQUFPLE1BQU0sQ0FBQztBQUNoQixDQUFDO0FBMkNELE1BQU0sT0FBTyxtQkFBbUI7O2dIQUFuQixtQkFBbUI7aUhBQW5CLG1CQUFtQjtpSEFBbkIsbUJBQW1CLGFBakJuQjtRQUNULDJCQUEyQixDQUFDLDRDQUE0QyxDQUFDO1FBQ3pFLG9CQUFvQixDQUFDO1lBQ25CLE9BQU8sRUFBRTtnQkFDUCxNQUFNLEVBQUU7b0JBQ04sZUFBZSxFQUFFO3dCQUNmLEtBQUssRUFBRSxDQUFDLDRCQUE0QixDQUFDO3FCQUN0QztvQkFDRCxvQkFBb0IsRUFBRTt3QkFDcEIsS0FBSyxFQUFFLENBQUMsNkNBQTZDLENBQUM7d0JBQ3RELGFBQWEsRUFBRSxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUU7cUJBQ3JDO2lCQUNGO2FBQ0Y7U0FDZSxDQUFDO0tBQ3BCLFlBckNDLFlBQVksQ0FBQyxRQUFRLENBQUM7WUFDcEI7Z0JBQ0UsYUFBYTtnQkFDYixJQUFJLEVBQUUsSUFBSTtnQkFDVixXQUFXLEVBQUUsQ0FBQyxTQUFTLEVBQUUsWUFBWSxDQUFDO2dCQUN0QyxTQUFTLEVBQUUsbUJBQW1CO2dCQUM5QixJQUFJLEVBQUUsRUFBRSxPQUFPLEVBQUUsaUJBQWlCLEVBQUU7YUFDckM7WUFDRDtnQkFDRSxhQUFhO2dCQUNiLElBQUksRUFBRSxJQUFJO2dCQUNWLFdBQVcsRUFBRSxDQUFDLFNBQVMsRUFBRSxZQUFZLENBQUM7Z0JBQ3RDLFNBQVMsRUFBRSxtQkFBbUI7Z0JBQzlCLElBQUksRUFBRTtvQkFDSixPQUFPLEVBQUUsc0JBQXNCO29CQUMvQixTQUFTLEVBQUU7d0JBQ1QsQ0FBQyxxQkFBcUIsQ0FBQyxFQUFFLHdDQUF3QztxQkFDbEU7aUJBQ0Y7YUFDRjtTQUNGLENBQUM7MkZBbUJPLG1CQUFtQjtrQkF6Qy9CLFFBQVE7bUJBQUM7b0JBQ1IsT0FBTyxFQUFFO3dCQUNQLFlBQVksQ0FBQyxRQUFRLENBQUM7NEJBQ3BCO2dDQUNFLGFBQWE7Z0NBQ2IsSUFBSSxFQUFFLElBQUk7Z0NBQ1YsV0FBVyxFQUFFLENBQUMsU0FBUyxFQUFFLFlBQVksQ0FBQztnQ0FDdEMsU0FBUyxFQUFFLG1CQUFtQjtnQ0FDOUIsSUFBSSxFQUFFLEVBQUUsT0FBTyxFQUFFLGlCQUFpQixFQUFFOzZCQUNyQzs0QkFDRDtnQ0FDRSxhQUFhO2dDQUNiLElBQUksRUFBRSxJQUFJO2dDQUNWLFdBQVcsRUFBRSxDQUFDLFNBQVMsRUFBRSxZQUFZLENBQUM7Z0NBQ3RDLFNBQVMsRUFBRSxtQkFBbUI7Z0NBQzlCLElBQUksRUFBRTtvQ0FDSixPQUFPLEVBQUUsc0JBQXNCO29DQUMvQixTQUFTLEVBQUU7d0NBQ1QsQ0FBQyxxQkFBcUIsQ0FBQyxFQUFFLHdDQUF3QztxQ0FDbEU7aUNBQ0Y7NkJBQ0Y7eUJBQ0YsQ0FBQztxQkFDSDtvQkFDRCxTQUFTLEVBQUU7d0JBQ1QsMkJBQTJCLENBQUMsNENBQTRDLENBQUM7d0JBQ3pFLG9CQUFvQixDQUFDOzRCQUNuQixPQUFPLEVBQUU7Z0NBQ1AsTUFBTSxFQUFFO29DQUNOLGVBQWUsRUFBRTt3Q0FDZixLQUFLLEVBQUUsQ0FBQyw0QkFBNEIsQ0FBQztxQ0FDdEM7b0NBQ0Qsb0JBQW9CLEVBQUU7d0NBQ3BCLEtBQUssRUFBRSxDQUFDLDZDQUE2QyxDQUFDO3dDQUN0RCxhQUFhLEVBQUUsRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFO3FDQUNyQztpQ0FDRjs2QkFDRjt5QkFDZSxDQUFDO3FCQUNwQjtpQkFDRiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBSb3V0ZXJNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgT1JERVJfRU5UUklFU19DT05URVhUIH0gZnJvbSAnQHNwYXJ0YWN1cy9jYXJ0L2Jhc2Uvcm9vdCc7XG5pbXBvcnQge1xuICBBdXRoR3VhcmQsXG4gIENtc0NvbmZpZyxcbiAgcHJvdmlkZURlZmF1bHRDb25maWcsXG4gIHByb3ZpZGVEZWZhdWx0Q29uZmlnRmFjdG9yeSxcbiAgUm91dGluZ0NvbmZpZyxcbn0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7IE9SREVSX0ZFQVRVUkUgfSBmcm9tICdAc3BhcnRhY3VzL29yZGVyL3Jvb3QnO1xuaW1wb3J0IHsgQ21zUGFnZUd1YXJkLCBQYWdlTGF5b3V0Q29tcG9uZW50IH0gZnJvbSAnQHNwYXJ0YWN1cy9zdG9yZWZyb250JztcbmltcG9ydCB7IFVuaXRPcmRlckRldGFpbHNPcmRlckVudHJpZXNDb250ZXh0VG9rZW4gfSBmcm9tICcuL2NvbnRleHQnO1xuaW1wb3J0IHsgT1JHQU5JWkFUSU9OX1VOSVRfT1JERVJfRkVBVFVSRSB9IGZyb20gJy4vZmVhdHVyZS1uYW1lJztcblxuLy8gVE9ETzogSW5saW5lIHRoaXMgZmFjdG9yeSB3aGVuIHdlIHN0YXJ0IHJlbGVhc2luZyBJdnkgY29tcGlsZWQgbGlicmFyaWVzXG5leHBvcnQgZnVuY3Rpb24gZGVmYXVsdE9yZ2FuaXphdGlvblVuaXRPcmRlckNvbXBvbmVudHNDb25maWcoKTogQ21zQ29uZmlnIHtcbiAgY29uc3QgY29uZmlnOiBDbXNDb25maWcgPSB7XG4gICAgZmVhdHVyZU1vZHVsZXM6IHtcbiAgICAgIFtPUkdBTklaQVRJT05fVU5JVF9PUkRFUl9GRUFUVVJFXToge1xuICAgICAgICBjbXNDb21wb25lbnRzOiBbXG4gICAgICAgICAgJ1VuaXRMZXZlbE9yZGVySGlzdG9yeUNvbXBvbmVudCcsXG4gICAgICAgICAgJ1VuaXRMZXZlbE9yZGVyRGV0YWlsc092ZXJ2aWV3Q29tcG9uZW50JyxcbiAgICAgICAgICAnVW5pdExldmVsT3JkZXJEZXRhaWxzSXRlbXNDb21wb25lbnQnLFxuICAgICAgICAgICdVbml0TGV2ZWxPcmRlckRldGFpbHNUb3RhbHNDb21wb25lbnQnLFxuICAgICAgICBdLFxuICAgICAgICBkZXBlbmRlbmNpZXM6IFtPUkRFUl9GRUFUVVJFXSxcbiAgICAgIH0sXG4gICAgfSxcbiAgfTtcblxuICByZXR1cm4gY29uZmlnO1xufVxuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgUm91dGVyTW9kdWxlLmZvckNoaWxkKFtcbiAgICAgIHtcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICBwYXRoOiBudWxsLFxuICAgICAgICBjYW5BY3RpdmF0ZTogW0F1dGhHdWFyZCwgQ21zUGFnZUd1YXJkXSxcbiAgICAgICAgY29tcG9uZW50OiBQYWdlTGF5b3V0Q29tcG9uZW50LFxuICAgICAgICBkYXRhOiB7IGN4Um91dGU6ICd1bml0TGV2ZWxPcmRlcnMnIH0sXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgIHBhdGg6IG51bGwsXG4gICAgICAgIGNhbkFjdGl2YXRlOiBbQXV0aEd1YXJkLCBDbXNQYWdlR3VhcmRdLFxuICAgICAgICBjb21wb25lbnQ6IFBhZ2VMYXlvdXRDb21wb25lbnQsXG4gICAgICAgIGRhdGE6IHtcbiAgICAgICAgICBjeFJvdXRlOiAndW5pdExldmVsT3JkZXJEZXRhaWwnLFxuICAgICAgICAgIGN4Q29udGV4dDoge1xuICAgICAgICAgICAgW09SREVSX0VOVFJJRVNfQ09OVEVYVF06IFVuaXRPcmRlckRldGFpbHNPcmRlckVudHJpZXNDb250ZXh0VG9rZW4sXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgXSksXG4gIF0sXG4gIHByb3ZpZGVyczogW1xuICAgIHByb3ZpZGVEZWZhdWx0Q29uZmlnRmFjdG9yeShkZWZhdWx0T3JnYW5pemF0aW9uVW5pdE9yZGVyQ29tcG9uZW50c0NvbmZpZyksXG4gICAgcHJvdmlkZURlZmF1bHRDb25maWcoe1xuICAgICAgcm91dGluZzoge1xuICAgICAgICByb3V0ZXM6IHtcbiAgICAgICAgICB1bml0TGV2ZWxPcmRlcnM6IHtcbiAgICAgICAgICAgIHBhdGhzOiBbJ215LWFjY291bnQvdW5pdExldmVsT3JkZXJzJ10sXG4gICAgICAgICAgfSxcbiAgICAgICAgICB1bml0TGV2ZWxPcmRlckRldGFpbDoge1xuICAgICAgICAgICAgcGF0aHM6IFsnbXktYWNjb3VudC91bml0TGV2ZWxPcmRlckRldGFpbHMvOm9yZGVyQ29kZSddLFxuICAgICAgICAgICAgcGFyYW1zTWFwcGluZzogeyBvcmRlckNvZGU6ICdjb2RlJyB9LFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0gYXMgUm91dGluZ0NvbmZpZyksXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIFVuaXRPcmRlclJvb3RNb2R1bGUge31cbiJdfQ==