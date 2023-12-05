/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthGuard, I18nModule, provideDefaultConfig, UrlModule, } from '@spartacus/core';
import { ListNavigationModule } from '@spartacus/storefront';
import { defaultReplenishmentOrderCancellationLayoutConfig } from '../replenishment-order-details/default-replenishment-order-cancellation-layout.config';
import { ReplenishmentOrderHistoryComponent } from './replenishment-order-history.component';
import * as i0 from "@angular/core";
export class ReplenishmentOrderHistoryModule {
}
ReplenishmentOrderHistoryModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ReplenishmentOrderHistoryModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ReplenishmentOrderHistoryModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: ReplenishmentOrderHistoryModule, declarations: [ReplenishmentOrderHistoryComponent], imports: [CommonModule,
        RouterModule,
        ListNavigationModule,
        UrlModule,
        I18nModule], exports: [ReplenishmentOrderHistoryComponent] });
ReplenishmentOrderHistoryModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ReplenishmentOrderHistoryModule, providers: [
        provideDefaultConfig(defaultReplenishmentOrderCancellationLayoutConfig),
        provideDefaultConfig({
            cmsComponents: {
                AccountReplenishmentHistoryComponent: {
                    component: ReplenishmentOrderHistoryComponent,
                    guards: [AuthGuard],
                },
            },
        }),
    ], imports: [CommonModule,
        RouterModule,
        ListNavigationModule,
        UrlModule,
        I18nModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ReplenishmentOrderHistoryModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        RouterModule,
                        ListNavigationModule,
                        UrlModule,
                        I18nModule,
                    ],
                    providers: [
                        provideDefaultConfig(defaultReplenishmentOrderCancellationLayoutConfig),
                        provideDefaultConfig({
                            cmsComponents: {
                                AccountReplenishmentHistoryComponent: {
                                    component: ReplenishmentOrderHistoryComponent,
                                    guards: [AuthGuard],
                                },
                            },
                        }),
                    ],
                    declarations: [ReplenishmentOrderHistoryComponent],
                    exports: [ReplenishmentOrderHistoryComponent],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVwbGVuaXNobWVudC1vcmRlci1oaXN0b3J5Lm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9vcmRlci9jb21wb25lbnRzL3JlcGxlbmlzaG1lbnQtb3JkZXItaGlzdG9yeS9yZXBsZW5pc2htZW50LW9yZGVyLWhpc3RvcnkubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUNMLFNBQVMsRUFFVCxVQUFVLEVBQ1Ysb0JBQW9CLEVBQ3BCLFNBQVMsR0FDVixNQUFNLGlCQUFpQixDQUFDO0FBQ3pCLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzdELE9BQU8sRUFBRSxpREFBaUQsRUFBRSxNQUFNLHVGQUF1RixDQUFDO0FBQzFKLE9BQU8sRUFBRSxrQ0FBa0MsRUFBRSxNQUFNLHlDQUF5QyxDQUFDOztBQXdCN0YsTUFBTSxPQUFPLCtCQUErQjs7NEhBQS9CLCtCQUErQjs2SEFBL0IsK0JBQStCLGlCQUgzQixrQ0FBa0MsYUFqQi9DLFlBQVk7UUFDWixZQUFZO1FBQ1osb0JBQW9CO1FBQ3BCLFNBQVM7UUFDVCxVQUFVLGFBY0Ysa0NBQWtDOzZIQUVqQywrQkFBK0IsYUFkL0I7UUFDVCxvQkFBb0IsQ0FBQyxpREFBaUQsQ0FBQztRQUN2RSxvQkFBb0IsQ0FBWTtZQUM5QixhQUFhLEVBQUU7Z0JBQ2Isb0NBQW9DLEVBQUU7b0JBQ3BDLFNBQVMsRUFBRSxrQ0FBa0M7b0JBQzdDLE1BQU0sRUFBRSxDQUFDLFNBQVMsQ0FBQztpQkFDcEI7YUFDRjtTQUNGLENBQUM7S0FDSCxZQWhCQyxZQUFZO1FBQ1osWUFBWTtRQUNaLG9CQUFvQjtRQUNwQixTQUFTO1FBQ1QsVUFBVTsyRkFnQkQsK0JBQStCO2tCQXRCM0MsUUFBUTttQkFBQztvQkFDUixPQUFPLEVBQUU7d0JBQ1AsWUFBWTt3QkFDWixZQUFZO3dCQUNaLG9CQUFvQjt3QkFDcEIsU0FBUzt3QkFDVCxVQUFVO3FCQUNYO29CQUNELFNBQVMsRUFBRTt3QkFDVCxvQkFBb0IsQ0FBQyxpREFBaUQsQ0FBQzt3QkFDdkUsb0JBQW9CLENBQVk7NEJBQzlCLGFBQWEsRUFBRTtnQ0FDYixvQ0FBb0MsRUFBRTtvQ0FDcEMsU0FBUyxFQUFFLGtDQUFrQztvQ0FDN0MsTUFBTSxFQUFFLENBQUMsU0FBUyxDQUFDO2lDQUNwQjs2QkFDRjt5QkFDRixDQUFDO3FCQUNIO29CQUNELFlBQVksRUFBRSxDQUFDLGtDQUFrQyxDQUFDO29CQUNsRCxPQUFPLEVBQUUsQ0FBQyxrQ0FBa0MsQ0FBQztpQkFDOUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFJvdXRlck1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQge1xuICBBdXRoR3VhcmQsXG4gIENtc0NvbmZpZyxcbiAgSTE4bk1vZHVsZSxcbiAgcHJvdmlkZURlZmF1bHRDb25maWcsXG4gIFVybE1vZHVsZSxcbn0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7IExpc3ROYXZpZ2F0aW9uTW9kdWxlIH0gZnJvbSAnQHNwYXJ0YWN1cy9zdG9yZWZyb250JztcbmltcG9ydCB7IGRlZmF1bHRSZXBsZW5pc2htZW50T3JkZXJDYW5jZWxsYXRpb25MYXlvdXRDb25maWcgfSBmcm9tICcuLi9yZXBsZW5pc2htZW50LW9yZGVyLWRldGFpbHMvZGVmYXVsdC1yZXBsZW5pc2htZW50LW9yZGVyLWNhbmNlbGxhdGlvbi1sYXlvdXQuY29uZmlnJztcbmltcG9ydCB7IFJlcGxlbmlzaG1lbnRPcmRlckhpc3RvcnlDb21wb25lbnQgfSBmcm9tICcuL3JlcGxlbmlzaG1lbnQtb3JkZXItaGlzdG9yeS5jb21wb25lbnQnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIFJvdXRlck1vZHVsZSxcbiAgICBMaXN0TmF2aWdhdGlvbk1vZHVsZSxcbiAgICBVcmxNb2R1bGUsXG4gICAgSTE4bk1vZHVsZSxcbiAgXSxcbiAgcHJvdmlkZXJzOiBbXG4gICAgcHJvdmlkZURlZmF1bHRDb25maWcoZGVmYXVsdFJlcGxlbmlzaG1lbnRPcmRlckNhbmNlbGxhdGlvbkxheW91dENvbmZpZyksXG4gICAgcHJvdmlkZURlZmF1bHRDb25maWcoPENtc0NvbmZpZz57XG4gICAgICBjbXNDb21wb25lbnRzOiB7XG4gICAgICAgIEFjY291bnRSZXBsZW5pc2htZW50SGlzdG9yeUNvbXBvbmVudDoge1xuICAgICAgICAgIGNvbXBvbmVudDogUmVwbGVuaXNobWVudE9yZGVySGlzdG9yeUNvbXBvbmVudCxcbiAgICAgICAgICBndWFyZHM6IFtBdXRoR3VhcmRdLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9KSxcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbUmVwbGVuaXNobWVudE9yZGVySGlzdG9yeUNvbXBvbmVudF0sXG4gIGV4cG9ydHM6IFtSZXBsZW5pc2htZW50T3JkZXJIaXN0b3J5Q29tcG9uZW50XSxcbn0pXG5leHBvcnQgY2xhc3MgUmVwbGVuaXNobWVudE9yZGVySGlzdG9yeU1vZHVsZSB7fVxuIl19