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
import { ConfiguratorIssuesNotificationModule } from '../configurator-issues-notification/configurator-issues-notification.module';
import { ConfigureCartEntryModule } from '../configure-cart-entry/configure-cart-entry.module';
import { ConfiguratorCartEntryInfoComponent } from './configurator-cart-entry-info.component';
import * as i0 from "@angular/core";
export class ConfiguratorCartEntryInfoModule {
}
ConfiguratorCartEntryInfoModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorCartEntryInfoModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ConfiguratorCartEntryInfoModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorCartEntryInfoModule, declarations: [ConfiguratorCartEntryInfoComponent], imports: [CommonModule,
        UrlModule,
        I18nModule,
        IconModule,
        ConfiguratorIssuesNotificationModule,
        ConfigureCartEntryModule] });
ConfiguratorCartEntryInfoModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorCartEntryInfoModule, providers: [
        provideOutlet({
            id: CartOutlets.ITEM_DETAILS,
            position: OutletPosition.AFTER,
            component: ConfiguratorCartEntryInfoComponent,
        }),
    ], imports: [CommonModule,
        UrlModule,
        I18nModule,
        IconModule,
        ConfiguratorIssuesNotificationModule,
        ConfigureCartEntryModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorCartEntryInfoModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        UrlModule,
                        I18nModule,
                        IconModule,
                        ConfiguratorIssuesNotificationModule,
                        ConfigureCartEntryModule,
                    ],
                    declarations: [ConfiguratorCartEntryInfoComponent],
                    providers: [
                        provideOutlet({
                            id: CartOutlets.ITEM_DETAILS,
                            position: OutletPosition.AFTER,
                            component: ConfiguratorCartEntryInfoComponent,
                        }),
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlndXJhdG9yLWNhcnQtZW50cnktaW5mby5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvcHJvZHVjdC1jb25maWd1cmF0b3IvY29tbW9uL2NvbXBvbmVudHMvY29uZmlndXJhdG9yLWNhcnQtZW50cnktaW5mby9jb25maWd1cmF0b3ItY2FydC1lbnRyeS1pbmZvLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQ3hELE9BQU8sRUFBRSxVQUFVLEVBQUUsU0FBUyxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDeEQsT0FBTyxFQUNMLFVBQVUsRUFDVixjQUFjLEVBQ2QsYUFBYSxHQUNkLE1BQU0sdUJBQXVCLENBQUM7QUFDL0IsT0FBTyxFQUFFLG9DQUFvQyxFQUFFLE1BQU0sNkVBQTZFLENBQUM7QUFDbkksT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0scURBQXFELENBQUM7QUFDL0YsT0FBTyxFQUFFLGtDQUFrQyxFQUFFLE1BQU0sMENBQTBDLENBQUM7O0FBcUI5RixNQUFNLE9BQU8sK0JBQStCOzs0SEFBL0IsK0JBQStCOzZIQUEvQiwrQkFBK0IsaUJBVjNCLGtDQUFrQyxhQVAvQyxZQUFZO1FBQ1osU0FBUztRQUNULFVBQVU7UUFDVixVQUFVO1FBQ1Ysb0NBQW9DO1FBQ3BDLHdCQUF3Qjs2SEFZZiwrQkFBK0IsYUFSL0I7UUFDVCxhQUFhLENBQUM7WUFDWixFQUFFLEVBQUUsV0FBVyxDQUFDLFlBQVk7WUFDNUIsUUFBUSxFQUFFLGNBQWMsQ0FBQyxLQUFLO1lBQzlCLFNBQVMsRUFBRSxrQ0FBa0M7U0FDOUMsQ0FBQztLQUNILFlBZkMsWUFBWTtRQUNaLFNBQVM7UUFDVCxVQUFVO1FBQ1YsVUFBVTtRQUNWLG9DQUFvQztRQUNwQyx3QkFBd0I7MkZBWWYsK0JBQStCO2tCQW5CM0MsUUFBUTttQkFBQztvQkFDUixPQUFPLEVBQUU7d0JBQ1AsWUFBWTt3QkFDWixTQUFTO3dCQUNULFVBQVU7d0JBQ1YsVUFBVTt3QkFDVixvQ0FBb0M7d0JBQ3BDLHdCQUF3QjtxQkFDekI7b0JBQ0QsWUFBWSxFQUFFLENBQUMsa0NBQWtDLENBQUM7b0JBRWxELFNBQVMsRUFBRTt3QkFDVCxhQUFhLENBQUM7NEJBQ1osRUFBRSxFQUFFLFdBQVcsQ0FBQyxZQUFZOzRCQUM1QixRQUFRLEVBQUUsY0FBYyxDQUFDLEtBQUs7NEJBQzlCLFNBQVMsRUFBRSxrQ0FBa0M7eUJBQzlDLENBQUM7cUJBQ0g7aUJBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENhcnRPdXRsZXRzIH0gZnJvbSAnQHNwYXJ0YWN1cy9jYXJ0L2Jhc2Uvcm9vdCc7XG5pbXBvcnQgeyBJMThuTW9kdWxlLCBVcmxNb2R1bGUgfSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHtcbiAgSWNvbk1vZHVsZSxcbiAgT3V0bGV0UG9zaXRpb24sXG4gIHByb3ZpZGVPdXRsZXQsXG59IGZyb20gJ0BzcGFydGFjdXMvc3RvcmVmcm9udCc7XG5pbXBvcnQgeyBDb25maWd1cmF0b3JJc3N1ZXNOb3RpZmljYXRpb25Nb2R1bGUgfSBmcm9tICcuLi9jb25maWd1cmF0b3ItaXNzdWVzLW5vdGlmaWNhdGlvbi9jb25maWd1cmF0b3ItaXNzdWVzLW5vdGlmaWNhdGlvbi5tb2R1bGUnO1xuaW1wb3J0IHsgQ29uZmlndXJlQ2FydEVudHJ5TW9kdWxlIH0gZnJvbSAnLi4vY29uZmlndXJlLWNhcnQtZW50cnkvY29uZmlndXJlLWNhcnQtZW50cnkubW9kdWxlJztcbmltcG9ydCB7IENvbmZpZ3VyYXRvckNhcnRFbnRyeUluZm9Db21wb25lbnQgfSBmcm9tICcuL2NvbmZpZ3VyYXRvci1jYXJ0LWVudHJ5LWluZm8uY29tcG9uZW50JztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBVcmxNb2R1bGUsXG4gICAgSTE4bk1vZHVsZSxcbiAgICBJY29uTW9kdWxlLFxuICAgIENvbmZpZ3VyYXRvcklzc3Vlc05vdGlmaWNhdGlvbk1vZHVsZSxcbiAgICBDb25maWd1cmVDYXJ0RW50cnlNb2R1bGUsXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW0NvbmZpZ3VyYXRvckNhcnRFbnRyeUluZm9Db21wb25lbnRdLFxuXG4gIHByb3ZpZGVyczogW1xuICAgIHByb3ZpZGVPdXRsZXQoe1xuICAgICAgaWQ6IENhcnRPdXRsZXRzLklURU1fREVUQUlMUyxcbiAgICAgIHBvc2l0aW9uOiBPdXRsZXRQb3NpdGlvbi5BRlRFUixcbiAgICAgIGNvbXBvbmVudDogQ29uZmlndXJhdG9yQ2FydEVudHJ5SW5mb0NvbXBvbmVudCxcbiAgICB9KSxcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgQ29uZmlndXJhdG9yQ2FydEVudHJ5SW5mb01vZHVsZSB7fVxuIl19