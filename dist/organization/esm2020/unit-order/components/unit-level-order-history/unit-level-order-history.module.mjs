/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { AuthGuard, I18nModule, provideDefaultConfig, UrlModule, } from '@spartacus/core';
import { ListNavigationModule } from '@spartacus/storefront';
import { UnitLevelOrdersViewerGuard } from '@spartacus/organization/unit-order/core';
import { UnitLevelOrderHistoryComponent } from './unit-level-order-history.component';
import { UnitLevelOrderHistoryFilterModule } from './filter/unit-level-order-history-filter.module';
import * as i0 from "@angular/core";
export class UnitLevelOrderHistoryModule {
}
UnitLevelOrderHistoryModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitLevelOrderHistoryModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
UnitLevelOrderHistoryModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: UnitLevelOrderHistoryModule, declarations: [UnitLevelOrderHistoryComponent], imports: [CommonModule,
        RouterModule,
        ReactiveFormsModule,
        NgSelectModule,
        ListNavigationModule,
        UrlModule,
        I18nModule,
        UnitLevelOrderHistoryFilterModule], exports: [UnitLevelOrderHistoryComponent] });
UnitLevelOrderHistoryModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitLevelOrderHistoryModule, providers: [
        provideDefaultConfig({
            cmsComponents: {
                UnitLevelOrderHistoryComponent: {
                    component: UnitLevelOrderHistoryComponent,
                    guards: [AuthGuard, UnitLevelOrdersViewerGuard],
                },
            },
        }),
    ], imports: [CommonModule,
        RouterModule,
        ReactiveFormsModule,
        NgSelectModule,
        ListNavigationModule,
        UrlModule,
        I18nModule,
        UnitLevelOrderHistoryFilterModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitLevelOrderHistoryModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        RouterModule,
                        ReactiveFormsModule,
                        NgSelectModule,
                        ListNavigationModule,
                        UrlModule,
                        I18nModule,
                        UnitLevelOrderHistoryFilterModule,
                    ],
                    declarations: [UnitLevelOrderHistoryComponent],
                    exports: [UnitLevelOrderHistoryComponent],
                    providers: [
                        provideDefaultConfig({
                            cmsComponents: {
                                UnitLevelOrderHistoryComponent: {
                                    component: UnitLevelOrderHistoryComponent,
                                    guards: [AuthGuard, UnitLevelOrdersViewerGuard],
                                },
                            },
                        }),
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidW5pdC1sZXZlbC1vcmRlci1oaXN0b3J5Lm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9vcmdhbml6YXRpb24vdW5pdC1vcmRlci9jb21wb25lbnRzL3VuaXQtbGV2ZWwtb3JkZXItaGlzdG9yeS91bml0LWxldmVsLW9yZGVyLWhpc3RvcnkubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNyRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3RELE9BQU8sRUFDTCxTQUFTLEVBRVQsVUFBVSxFQUNWLG9CQUFvQixFQUNwQixTQUFTLEdBQ1YsTUFBTSxpQkFBaUIsQ0FBQztBQUN6QixPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUM3RCxPQUFPLEVBQUUsMEJBQTBCLEVBQUUsTUFBTSx5Q0FBeUMsQ0FBQztBQUNyRixPQUFPLEVBQUUsOEJBQThCLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQUN0RixPQUFPLEVBQUUsaUNBQWlDLEVBQUUsTUFBTSxpREFBaUQsQ0FBQzs7QUEwQnBHLE1BQU0sT0FBTywyQkFBMkI7O3dIQUEzQiwyQkFBMkI7eUhBQTNCLDJCQUEyQixpQkFidkIsOEJBQThCLGFBVDNDLFlBQVk7UUFDWixZQUFZO1FBQ1osbUJBQW1CO1FBQ25CLGNBQWM7UUFDZCxvQkFBb0I7UUFDcEIsU0FBUztRQUNULFVBQVU7UUFDVixpQ0FBaUMsYUFHekIsOEJBQThCO3lIQVk3QiwyQkFBMkIsYUFYM0I7UUFDVCxvQkFBb0IsQ0FBQztZQUNuQixhQUFhLEVBQUU7Z0JBQ2IsOEJBQThCLEVBQUU7b0JBQzlCLFNBQVMsRUFBRSw4QkFBOEI7b0JBQ3pDLE1BQU0sRUFBRSxDQUFDLFNBQVMsRUFBRSwwQkFBMEIsQ0FBQztpQkFDaEQ7YUFDRjtTQUNXLENBQUM7S0FDaEIsWUFwQkMsWUFBWTtRQUNaLFlBQVk7UUFDWixtQkFBbUI7UUFDbkIsY0FBYztRQUNkLG9CQUFvQjtRQUNwQixTQUFTO1FBQ1QsVUFBVTtRQUNWLGlDQUFpQzsyRkFleEIsMkJBQTJCO2tCQXhCdkMsUUFBUTttQkFBQztvQkFDUixPQUFPLEVBQUU7d0JBQ1AsWUFBWTt3QkFDWixZQUFZO3dCQUNaLG1CQUFtQjt3QkFDbkIsY0FBYzt3QkFDZCxvQkFBb0I7d0JBQ3BCLFNBQVM7d0JBQ1QsVUFBVTt3QkFDVixpQ0FBaUM7cUJBQ2xDO29CQUNELFlBQVksRUFBRSxDQUFDLDhCQUE4QixDQUFDO29CQUM5QyxPQUFPLEVBQUUsQ0FBQyw4QkFBOEIsQ0FBQztvQkFDekMsU0FBUyxFQUFFO3dCQUNULG9CQUFvQixDQUFDOzRCQUNuQixhQUFhLEVBQUU7Z0NBQ2IsOEJBQThCLEVBQUU7b0NBQzlCLFNBQVMsRUFBRSw4QkFBOEI7b0NBQ3pDLE1BQU0sRUFBRSxDQUFDLFNBQVMsRUFBRSwwQkFBMEIsQ0FBQztpQ0FDaEQ7NkJBQ0Y7eUJBQ1csQ0FBQztxQkFDaEI7aUJBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFJlYWN0aXZlRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBSb3V0ZXJNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgTmdTZWxlY3RNb2R1bGUgfSBmcm9tICdAbmctc2VsZWN0L25nLXNlbGVjdCc7XG5pbXBvcnQge1xuICBBdXRoR3VhcmQsXG4gIENtc0NvbmZpZyxcbiAgSTE4bk1vZHVsZSxcbiAgcHJvdmlkZURlZmF1bHRDb25maWcsXG4gIFVybE1vZHVsZSxcbn0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7IExpc3ROYXZpZ2F0aW9uTW9kdWxlIH0gZnJvbSAnQHNwYXJ0YWN1cy9zdG9yZWZyb250JztcbmltcG9ydCB7IFVuaXRMZXZlbE9yZGVyc1ZpZXdlckd1YXJkIH0gZnJvbSAnQHNwYXJ0YWN1cy9vcmdhbml6YXRpb24vdW5pdC1vcmRlci9jb3JlJztcbmltcG9ydCB7IFVuaXRMZXZlbE9yZGVySGlzdG9yeUNvbXBvbmVudCB9IGZyb20gJy4vdW5pdC1sZXZlbC1vcmRlci1oaXN0b3J5LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBVbml0TGV2ZWxPcmRlckhpc3RvcnlGaWx0ZXJNb2R1bGUgfSBmcm9tICcuL2ZpbHRlci91bml0LWxldmVsLW9yZGVyLWhpc3RvcnktZmlsdGVyLm1vZHVsZSc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgUm91dGVyTW9kdWxlLFxuICAgIFJlYWN0aXZlRm9ybXNNb2R1bGUsXG4gICAgTmdTZWxlY3RNb2R1bGUsXG4gICAgTGlzdE5hdmlnYXRpb25Nb2R1bGUsXG4gICAgVXJsTW9kdWxlLFxuICAgIEkxOG5Nb2R1bGUsXG4gICAgVW5pdExldmVsT3JkZXJIaXN0b3J5RmlsdGVyTW9kdWxlLFxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtVbml0TGV2ZWxPcmRlckhpc3RvcnlDb21wb25lbnRdLFxuICBleHBvcnRzOiBbVW5pdExldmVsT3JkZXJIaXN0b3J5Q29tcG9uZW50XSxcbiAgcHJvdmlkZXJzOiBbXG4gICAgcHJvdmlkZURlZmF1bHRDb25maWcoe1xuICAgICAgY21zQ29tcG9uZW50czoge1xuICAgICAgICBVbml0TGV2ZWxPcmRlckhpc3RvcnlDb21wb25lbnQ6IHtcbiAgICAgICAgICBjb21wb25lbnQ6IFVuaXRMZXZlbE9yZGVySGlzdG9yeUNvbXBvbmVudCxcbiAgICAgICAgICBndWFyZHM6IFtBdXRoR3VhcmQsIFVuaXRMZXZlbE9yZGVyc1ZpZXdlckd1YXJkXSxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfSBhcyBDbXNDb25maWcpLFxuICBdLFxufSlcbmV4cG9ydCBjbGFzcyBVbml0TGV2ZWxPcmRlckhpc3RvcnlNb2R1bGUge31cbiJdfQ==