/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CartOutlets } from '@spartacus/cart/base/root';
import { I18nModule, UrlModule } from '@spartacus/core';
import { IconModule, OutletPosition, provideOutlet, } from '@spartacus/storefront';
import { ConfigureCartEntryModule } from '../configure-cart-entry/configure-cart-entry.module';
import { ConfiguratorIssuesNotificationComponent } from './configurator-issues-notification.component';
import * as i0 from "@angular/core";
export class ConfiguratorIssuesNotificationModule {
}
ConfiguratorIssuesNotificationModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorIssuesNotificationModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ConfiguratorIssuesNotificationModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorIssuesNotificationModule, declarations: [ConfiguratorIssuesNotificationComponent], imports: [CommonModule,
        UrlModule,
        I18nModule,
        IconModule,
        ConfigureCartEntryModule], exports: [ConfiguratorIssuesNotificationComponent] });
ConfiguratorIssuesNotificationModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorIssuesNotificationModule, providers: [
        provideOutlet({
            id: CartOutlets.ITEM_CONFIGURATOR_ISSUES,
            position: OutletPosition.REPLACE,
            component: ConfiguratorIssuesNotificationComponent,
        }),
    ], imports: [CommonModule,
        UrlModule,
        I18nModule,
        IconModule,
        ConfigureCartEntryModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorIssuesNotificationModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        UrlModule,
                        I18nModule,
                        IconModule,
                        ConfigureCartEntryModule,
                    ],
                    declarations: [ConfiguratorIssuesNotificationComponent],
                    providers: [
                        provideOutlet({
                            id: CartOutlets.ITEM_CONFIGURATOR_ISSUES,
                            position: OutletPosition.REPLACE,
                            component: ConfiguratorIssuesNotificationComponent,
                        }),
                    ],
                    exports: [ConfiguratorIssuesNotificationComponent],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlndXJhdG9yLWlzc3Vlcy1ub3RpZmljYXRpb24ubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL3Byb2R1Y3QtY29uZmlndXJhdG9yL2NvbW1vbi9jb21wb25lbnRzL2NvbmZpZ3VyYXRvci1pc3N1ZXMtbm90aWZpY2F0aW9uL2NvbmZpZ3VyYXRvci1pc3N1ZXMtbm90aWZpY2F0aW9uLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQ3hELE9BQU8sRUFBRSxVQUFVLEVBQUUsU0FBUyxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDeEQsT0FBTyxFQUNMLFVBQVUsRUFDVixjQUFjLEVBQ2QsYUFBYSxHQUNkLE1BQU0sdUJBQXVCLENBQUM7QUFDL0IsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0scURBQXFELENBQUM7QUFDL0YsT0FBTyxFQUFFLHVDQUF1QyxFQUFFLE1BQU0sOENBQThDLENBQUM7O0FBb0J2RyxNQUFNLE9BQU8sb0NBQW9DOztpSUFBcEMsb0NBQW9DO2tJQUFwQyxvQ0FBb0MsaUJBVmhDLHVDQUF1QyxhQU5wRCxZQUFZO1FBQ1osU0FBUztRQUNULFVBQVU7UUFDVixVQUFVO1FBQ1Ysd0JBQXdCLGFBVWhCLHVDQUF1QztrSUFFdEMsb0NBQW9DLGFBVHBDO1FBQ1QsYUFBYSxDQUFDO1lBQ1osRUFBRSxFQUFFLFdBQVcsQ0FBQyx3QkFBd0I7WUFDeEMsUUFBUSxFQUFFLGNBQWMsQ0FBQyxPQUFPO1lBQ2hDLFNBQVMsRUFBRSx1Q0FBdUM7U0FDbkQsQ0FBQztLQUNILFlBYkMsWUFBWTtRQUNaLFNBQVM7UUFDVCxVQUFVO1FBQ1YsVUFBVTtRQUNWLHdCQUF3QjsyRkFZZixvQ0FBb0M7a0JBbEJoRCxRQUFRO21CQUFDO29CQUNSLE9BQU8sRUFBRTt3QkFDUCxZQUFZO3dCQUNaLFNBQVM7d0JBQ1QsVUFBVTt3QkFDVixVQUFVO3dCQUNWLHdCQUF3QjtxQkFDekI7b0JBQ0QsWUFBWSxFQUFFLENBQUMsdUNBQXVDLENBQUM7b0JBQ3ZELFNBQVMsRUFBRTt3QkFDVCxhQUFhLENBQUM7NEJBQ1osRUFBRSxFQUFFLFdBQVcsQ0FBQyx3QkFBd0I7NEJBQ3hDLFFBQVEsRUFBRSxjQUFjLENBQUMsT0FBTzs0QkFDaEMsU0FBUyxFQUFFLHVDQUF1Qzt5QkFDbkQsQ0FBQztxQkFDSDtvQkFDRCxPQUFPLEVBQUUsQ0FBQyx1Q0FBdUMsQ0FBQztpQkFDbkQiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENhcnRPdXRsZXRzIH0gZnJvbSAnQHNwYXJ0YWN1cy9jYXJ0L2Jhc2Uvcm9vdCc7XG5pbXBvcnQgeyBJMThuTW9kdWxlLCBVcmxNb2R1bGUgfSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHtcbiAgSWNvbk1vZHVsZSxcbiAgT3V0bGV0UG9zaXRpb24sXG4gIHByb3ZpZGVPdXRsZXQsXG59IGZyb20gJ0BzcGFydGFjdXMvc3RvcmVmcm9udCc7XG5pbXBvcnQgeyBDb25maWd1cmVDYXJ0RW50cnlNb2R1bGUgfSBmcm9tICcuLi9jb25maWd1cmUtY2FydC1lbnRyeS9jb25maWd1cmUtY2FydC1lbnRyeS5tb2R1bGUnO1xuaW1wb3J0IHsgQ29uZmlndXJhdG9ySXNzdWVzTm90aWZpY2F0aW9uQ29tcG9uZW50IH0gZnJvbSAnLi9jb25maWd1cmF0b3ItaXNzdWVzLW5vdGlmaWNhdGlvbi5jb21wb25lbnQnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIFVybE1vZHVsZSxcbiAgICBJMThuTW9kdWxlLFxuICAgIEljb25Nb2R1bGUsXG4gICAgQ29uZmlndXJlQ2FydEVudHJ5TW9kdWxlLFxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtDb25maWd1cmF0b3JJc3N1ZXNOb3RpZmljYXRpb25Db21wb25lbnRdLFxuICBwcm92aWRlcnM6IFtcbiAgICBwcm92aWRlT3V0bGV0KHtcbiAgICAgIGlkOiBDYXJ0T3V0bGV0cy5JVEVNX0NPTkZJR1VSQVRPUl9JU1NVRVMsXG4gICAgICBwb3NpdGlvbjogT3V0bGV0UG9zaXRpb24uUkVQTEFDRSxcbiAgICAgIGNvbXBvbmVudDogQ29uZmlndXJhdG9ySXNzdWVzTm90aWZpY2F0aW9uQ29tcG9uZW50LFxuICAgIH0pLFxuICBdLFxuICBleHBvcnRzOiBbQ29uZmlndXJhdG9ySXNzdWVzTm90aWZpY2F0aW9uQ29tcG9uZW50XSxcbn0pXG5leHBvcnQgY2xhc3MgQ29uZmlndXJhdG9ySXNzdWVzTm90aWZpY2F0aW9uTW9kdWxlIHt9XG4iXX0=