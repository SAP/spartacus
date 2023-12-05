/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { I18nModule, provideDefaultConfig, UrlModule, } from '@spartacus/core';
import { IconModule } from '@spartacus/storefront';
import { ConfiguratorOverviewNotificationBannerComponent } from './configurator-overview-notification-banner.component';
import * as i0 from "@angular/core";
export class ConfiguratorOverviewNotificationBannerModule {
}
ConfiguratorOverviewNotificationBannerModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorOverviewNotificationBannerModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ConfiguratorOverviewNotificationBannerModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorOverviewNotificationBannerModule, declarations: [ConfiguratorOverviewNotificationBannerComponent], imports: [CommonModule, I18nModule, UrlModule, IconModule, RouterModule], exports: [ConfiguratorOverviewNotificationBannerComponent] });
ConfiguratorOverviewNotificationBannerModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorOverviewNotificationBannerModule, providers: [
        provideDefaultConfig({
            cmsComponents: {
                ConfiguratorOverviewBanner: {
                    component: ConfiguratorOverviewNotificationBannerComponent,
                },
            },
        }),
    ], imports: [CommonModule, I18nModule, UrlModule, IconModule, RouterModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorOverviewNotificationBannerModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, I18nModule, UrlModule, IconModule, RouterModule],
                    providers: [
                        provideDefaultConfig({
                            cmsComponents: {
                                ConfiguratorOverviewBanner: {
                                    component: ConfiguratorOverviewNotificationBannerComponent,
                                },
                            },
                        }),
                    ],
                    declarations: [ConfiguratorOverviewNotificationBannerComponent],
                    exports: [ConfiguratorOverviewNotificationBannerComponent],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlndXJhdG9yLW92ZXJ2aWV3LW5vdGlmaWNhdGlvbi1iYW5uZXIubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL3Byb2R1Y3QtY29uZmlndXJhdG9yL3J1bGViYXNlZC9jb21wb25lbnRzL292ZXJ2aWV3LW5vdGlmaWNhdGlvbi1iYW5uZXIvY29uZmlndXJhdG9yLW92ZXJ2aWV3LW5vdGlmaWNhdGlvbi1iYW5uZXIubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUVMLFVBQVUsRUFDVixvQkFBb0IsRUFDcEIsU0FBUyxHQUNWLE1BQU0saUJBQWlCLENBQUM7QUFDekIsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ25ELE9BQU8sRUFBRSwrQ0FBK0MsRUFBRSxNQUFNLHVEQUF1RCxDQUFDOztBQWdCeEgsTUFBTSxPQUFPLDRDQUE0Qzs7eUlBQTVDLDRDQUE0QzswSUFBNUMsNENBQTRDLGlCQUh4QywrQ0FBK0MsYUFWcEQsWUFBWSxFQUFFLFVBQVUsRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLFlBQVksYUFXN0QsK0NBQStDOzBJQUU5Qyw0Q0FBNEMsYUFaNUM7UUFDVCxvQkFBb0IsQ0FBWTtZQUM5QixhQUFhLEVBQUU7Z0JBQ2IsMEJBQTBCLEVBQUU7b0JBQzFCLFNBQVMsRUFBRSwrQ0FBK0M7aUJBQzNEO2FBQ0Y7U0FDRixDQUFDO0tBQ0gsWUFUUyxZQUFZLEVBQUUsVUFBVSxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsWUFBWTsyRkFhNUQsNENBQTRDO2tCQWR4RCxRQUFRO21CQUFDO29CQUNSLE9BQU8sRUFBRSxDQUFDLFlBQVksRUFBRSxVQUFVLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxZQUFZLENBQUM7b0JBQ3hFLFNBQVMsRUFBRTt3QkFDVCxvQkFBb0IsQ0FBWTs0QkFDOUIsYUFBYSxFQUFFO2dDQUNiLDBCQUEwQixFQUFFO29DQUMxQixTQUFTLEVBQUUsK0NBQStDO2lDQUMzRDs2QkFDRjt5QkFDRixDQUFDO3FCQUNIO29CQUNELFlBQVksRUFBRSxDQUFDLCtDQUErQyxDQUFDO29CQUMvRCxPQUFPLEVBQUUsQ0FBQywrQ0FBK0MsQ0FBQztpQkFDM0QiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFJvdXRlck1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQge1xuICBDbXNDb25maWcsXG4gIEkxOG5Nb2R1bGUsXG4gIHByb3ZpZGVEZWZhdWx0Q29uZmlnLFxuICBVcmxNb2R1bGUsXG59IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBJY29uTW9kdWxlIH0gZnJvbSAnQHNwYXJ0YWN1cy9zdG9yZWZyb250JztcbmltcG9ydCB7IENvbmZpZ3VyYXRvck92ZXJ2aWV3Tm90aWZpY2F0aW9uQmFubmVyQ29tcG9uZW50IH0gZnJvbSAnLi9jb25maWd1cmF0b3Itb3ZlcnZpZXctbm90aWZpY2F0aW9uLWJhbm5lci5jb21wb25lbnQnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLCBJMThuTW9kdWxlLCBVcmxNb2R1bGUsIEljb25Nb2R1bGUsIFJvdXRlck1vZHVsZV0sXG4gIHByb3ZpZGVyczogW1xuICAgIHByb3ZpZGVEZWZhdWx0Q29uZmlnKDxDbXNDb25maWc+e1xuICAgICAgY21zQ29tcG9uZW50czoge1xuICAgICAgICBDb25maWd1cmF0b3JPdmVydmlld0Jhbm5lcjoge1xuICAgICAgICAgIGNvbXBvbmVudDogQ29uZmlndXJhdG9yT3ZlcnZpZXdOb3RpZmljYXRpb25CYW5uZXJDb21wb25lbnQsXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0pLFxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtDb25maWd1cmF0b3JPdmVydmlld05vdGlmaWNhdGlvbkJhbm5lckNvbXBvbmVudF0sXG4gIGV4cG9ydHM6IFtDb25maWd1cmF0b3JPdmVydmlld05vdGlmaWNhdGlvbkJhbm5lckNvbXBvbmVudF0sXG59KVxuZXhwb3J0IGNsYXNzIENvbmZpZ3VyYXRvck92ZXJ2aWV3Tm90aWZpY2F0aW9uQmFubmVyTW9kdWxlIHt9XG4iXX0=