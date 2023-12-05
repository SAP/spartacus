/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { provideDefaultConfig } from '@spartacus/core';
import { CmsPageGuard, HamburgerMenuModule, PageLayoutComponent, } from '@spartacus/storefront';
import { CpqConfiguratorLayoutModule } from './cpq-configurator-layout.module';
import { defaultCpqInteractiveRoutingConfig } from './default-cpq-interactive-routing-config';
import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
/**
 * Takes care of the interactive configuration process (the user enters new attribute values and navigates through the configuration).
 * Provides routing, assignment of ng components to CMS components and assignment of CMS components to the layout slots
 */
export class CpqConfiguratorInteractiveModule {
}
CpqConfiguratorInteractiveModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CpqConfiguratorInteractiveModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
CpqConfiguratorInteractiveModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: CpqConfiguratorInteractiveModule, imports: [i1.RouterModule, HamburgerMenuModule,
        CpqConfiguratorLayoutModule] });
CpqConfiguratorInteractiveModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CpqConfiguratorInteractiveModule, providers: [provideDefaultConfig(defaultCpqInteractiveRoutingConfig)], imports: [RouterModule.forChild([
            {
                // We can neither omit the path nor set to undefined
                // @ts-ignore
                path: null,
                data: {
                    cxRoute: 'configureCLOUDCPQCONFIGURATOR',
                },
                component: PageLayoutComponent,
                canActivate: [CmsPageGuard],
            },
        ]),
        HamburgerMenuModule,
        CpqConfiguratorLayoutModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CpqConfiguratorInteractiveModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        RouterModule.forChild([
                            {
                                // We can neither omit the path nor set to undefined
                                // @ts-ignore
                                path: null,
                                data: {
                                    cxRoute: 'configureCLOUDCPQCONFIGURATOR',
                                },
                                component: PageLayoutComponent,
                                canActivate: [CmsPageGuard],
                            },
                        ]),
                        HamburgerMenuModule,
                        CpqConfiguratorLayoutModule,
                    ],
                    providers: [provideDefaultConfig(defaultCpqInteractiveRoutingConfig)],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3BxLWNvbmZpZ3VyYXRvci1pbnRlcmFjdGl2ZS5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvcHJvZHVjdC1jb25maWd1cmF0b3IvcnVsZWJhc2VkL3Jvb3QvY3BxL2NwcS1jb25maWd1cmF0b3ItaW50ZXJhY3RpdmUubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUN2RCxPQUFPLEVBQ0wsWUFBWSxFQUNaLG1CQUFtQixFQUNuQixtQkFBbUIsR0FDcEIsTUFBTSx1QkFBdUIsQ0FBQztBQUMvQixPQUFPLEVBQUUsMkJBQTJCLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUMvRSxPQUFPLEVBQUUsa0NBQWtDLEVBQUUsTUFBTSwwQ0FBMEMsQ0FBQzs7O0FBRTlGOzs7R0FHRztBQW9CSCxNQUFNLE9BQU8sZ0NBQWdDOzs2SEFBaEMsZ0NBQWdDOzhIQUFoQyxnQ0FBZ0MsNkJBTHpDLG1CQUFtQjtRQUNuQiwyQkFBMkI7OEhBSWxCLGdDQUFnQyxhQUZoQyxDQUFDLG9CQUFvQixDQUFDLGtDQUFrQyxDQUFDLENBQUMsWUFmbkUsWUFBWSxDQUFDLFFBQVEsQ0FBQztZQUNwQjtnQkFDRSxvREFBb0Q7Z0JBQ3BELGFBQWE7Z0JBQ2IsSUFBSSxFQUFFLElBQUk7Z0JBQ1YsSUFBSSxFQUFFO29CQUNKLE9BQU8sRUFBRSwrQkFBK0I7aUJBQ3pDO2dCQUNELFNBQVMsRUFBRSxtQkFBbUI7Z0JBQzlCLFdBQVcsRUFBRSxDQUFDLFlBQVksQ0FBQzthQUM1QjtTQUNGLENBQUM7UUFDRixtQkFBbUI7UUFDbkIsMkJBQTJCOzJGQUlsQixnQ0FBZ0M7a0JBbkI1QyxRQUFRO21CQUFDO29CQUNSLE9BQU8sRUFBRTt3QkFDUCxZQUFZLENBQUMsUUFBUSxDQUFDOzRCQUNwQjtnQ0FDRSxvREFBb0Q7Z0NBQ3BELGFBQWE7Z0NBQ2IsSUFBSSxFQUFFLElBQUk7Z0NBQ1YsSUFBSSxFQUFFO29DQUNKLE9BQU8sRUFBRSwrQkFBK0I7aUNBQ3pDO2dDQUNELFNBQVMsRUFBRSxtQkFBbUI7Z0NBQzlCLFdBQVcsRUFBRSxDQUFDLFlBQVksQ0FBQzs2QkFDNUI7eUJBQ0YsQ0FBQzt3QkFDRixtQkFBbUI7d0JBQ25CLDJCQUEyQjtxQkFDNUI7b0JBQ0QsU0FBUyxFQUFFLENBQUMsb0JBQW9CLENBQUMsa0NBQWtDLENBQUMsQ0FBQztpQkFDdEUiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUm91dGVyTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IHByb3ZpZGVEZWZhdWx0Q29uZmlnIH0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7XG4gIENtc1BhZ2VHdWFyZCxcbiAgSGFtYnVyZ2VyTWVudU1vZHVsZSxcbiAgUGFnZUxheW91dENvbXBvbmVudCxcbn0gZnJvbSAnQHNwYXJ0YWN1cy9zdG9yZWZyb250JztcbmltcG9ydCB7IENwcUNvbmZpZ3VyYXRvckxheW91dE1vZHVsZSB9IGZyb20gJy4vY3BxLWNvbmZpZ3VyYXRvci1sYXlvdXQubW9kdWxlJztcbmltcG9ydCB7IGRlZmF1bHRDcHFJbnRlcmFjdGl2ZVJvdXRpbmdDb25maWcgfSBmcm9tICcuL2RlZmF1bHQtY3BxLWludGVyYWN0aXZlLXJvdXRpbmctY29uZmlnJztcblxuLyoqXG4gKiBUYWtlcyBjYXJlIG9mIHRoZSBpbnRlcmFjdGl2ZSBjb25maWd1cmF0aW9uIHByb2Nlc3MgKHRoZSB1c2VyIGVudGVycyBuZXcgYXR0cmlidXRlIHZhbHVlcyBhbmQgbmF2aWdhdGVzIHRocm91Z2ggdGhlIGNvbmZpZ3VyYXRpb24pLlxuICogUHJvdmlkZXMgcm91dGluZywgYXNzaWdubWVudCBvZiBuZyBjb21wb25lbnRzIHRvIENNUyBjb21wb25lbnRzIGFuZCBhc3NpZ25tZW50IG9mIENNUyBjb21wb25lbnRzIHRvIHRoZSBsYXlvdXQgc2xvdHNcbiAqL1xuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIFJvdXRlck1vZHVsZS5mb3JDaGlsZChbXG4gICAgICB7XG4gICAgICAgIC8vIFdlIGNhbiBuZWl0aGVyIG9taXQgdGhlIHBhdGggbm9yIHNldCB0byB1bmRlZmluZWRcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICBwYXRoOiBudWxsLFxuICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgY3hSb3V0ZTogJ2NvbmZpZ3VyZUNMT1VEQ1BRQ09ORklHVVJBVE9SJyxcbiAgICAgICAgfSxcbiAgICAgICAgY29tcG9uZW50OiBQYWdlTGF5b3V0Q29tcG9uZW50LFxuICAgICAgICBjYW5BY3RpdmF0ZTogW0Ntc1BhZ2VHdWFyZF0sXG4gICAgICB9LFxuICAgIF0pLFxuICAgIEhhbWJ1cmdlck1lbnVNb2R1bGUsXG4gICAgQ3BxQ29uZmlndXJhdG9yTGF5b3V0TW9kdWxlLFxuICBdLFxuICBwcm92aWRlcnM6IFtwcm92aWRlRGVmYXVsdENvbmZpZyhkZWZhdWx0Q3BxSW50ZXJhY3RpdmVSb3V0aW5nQ29uZmlnKV0sXG59KVxuZXhwb3J0IGNsYXNzIENwcUNvbmZpZ3VyYXRvckludGVyYWN0aXZlTW9kdWxlIHt9XG4iXX0=