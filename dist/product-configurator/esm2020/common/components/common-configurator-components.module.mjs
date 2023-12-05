/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { NgModule } from '@angular/core';
import { ConfiguratorCartEntryInfoModule } from './configurator-cart-entry-info/configurator-cart-entry-info.module';
import { ConfiguratorIssuesNotificationModule } from './configurator-issues-notification/configurator-issues-notification.module';
import { ConfigureCartEntryModule } from './configure-cart-entry/configure-cart-entry.module';
import { ConfigureProductModule } from './configure-product/configure-product.module';
import { ConfiguratorCartEntryBundleInfoModule } from './configurator-cart-entry-bundle-info/configurator-cart-entry-bundle-info.module';
import * as i0 from "@angular/core";
export class CommonConfiguratorComponentsModule {
}
CommonConfiguratorComponentsModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CommonConfiguratorComponentsModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
CommonConfiguratorComponentsModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: CommonConfiguratorComponentsModule, imports: [ConfiguratorIssuesNotificationModule,
        ConfiguratorCartEntryInfoModule,
        ConfiguratorCartEntryBundleInfoModule,
        ConfigureCartEntryModule,
        ConfigureProductModule] });
CommonConfiguratorComponentsModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CommonConfiguratorComponentsModule, imports: [ConfiguratorIssuesNotificationModule,
        ConfiguratorCartEntryInfoModule,
        ConfiguratorCartEntryBundleInfoModule,
        ConfigureCartEntryModule,
        ConfigureProductModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CommonConfiguratorComponentsModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        ConfiguratorIssuesNotificationModule,
                        ConfiguratorCartEntryInfoModule,
                        ConfiguratorCartEntryBundleInfoModule,
                        ConfigureCartEntryModule,
                        ConfigureProductModule,
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbW9uLWNvbmZpZ3VyYXRvci1jb21wb25lbnRzLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9wcm9kdWN0LWNvbmZpZ3VyYXRvci9jb21tb24vY29tcG9uZW50cy9jb21tb24tY29uZmlndXJhdG9yLWNvbXBvbmVudHMubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSwrQkFBK0IsRUFBRSxNQUFNLG9FQUFvRSxDQUFDO0FBQ3JILE9BQU8sRUFBRSxvQ0FBb0MsRUFBRSxNQUFNLDRFQUE0RSxDQUFDO0FBQ2xJLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLG9EQUFvRCxDQUFDO0FBQzlGLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLDhDQUE4QyxDQUFDO0FBQ3RGLE9BQU8sRUFBRSxxQ0FBcUMsRUFBRSxNQUFNLGtGQUFrRixDQUFDOztBQVd6SSxNQUFNLE9BQU8sa0NBQWtDOzsrSEFBbEMsa0NBQWtDO2dJQUFsQyxrQ0FBa0MsWUFQM0Msb0NBQW9DO1FBQ3BDLCtCQUErQjtRQUMvQixxQ0FBcUM7UUFDckMsd0JBQXdCO1FBQ3hCLHNCQUFzQjtnSUFHYixrQ0FBa0MsWUFQM0Msb0NBQW9DO1FBQ3BDLCtCQUErQjtRQUMvQixxQ0FBcUM7UUFDckMsd0JBQXdCO1FBQ3hCLHNCQUFzQjsyRkFHYixrQ0FBa0M7a0JBVDlDLFFBQVE7bUJBQUM7b0JBQ1IsT0FBTyxFQUFFO3dCQUNQLG9DQUFvQzt3QkFDcEMsK0JBQStCO3dCQUMvQixxQ0FBcUM7d0JBQ3JDLHdCQUF3Qjt3QkFDeEIsc0JBQXNCO3FCQUN2QjtpQkFDRiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb25maWd1cmF0b3JDYXJ0RW50cnlJbmZvTW9kdWxlIH0gZnJvbSAnLi9jb25maWd1cmF0b3ItY2FydC1lbnRyeS1pbmZvL2NvbmZpZ3VyYXRvci1jYXJ0LWVudHJ5LWluZm8ubW9kdWxlJztcbmltcG9ydCB7IENvbmZpZ3VyYXRvcklzc3Vlc05vdGlmaWNhdGlvbk1vZHVsZSB9IGZyb20gJy4vY29uZmlndXJhdG9yLWlzc3Vlcy1ub3RpZmljYXRpb24vY29uZmlndXJhdG9yLWlzc3Vlcy1ub3RpZmljYXRpb24ubW9kdWxlJztcbmltcG9ydCB7IENvbmZpZ3VyZUNhcnRFbnRyeU1vZHVsZSB9IGZyb20gJy4vY29uZmlndXJlLWNhcnQtZW50cnkvY29uZmlndXJlLWNhcnQtZW50cnkubW9kdWxlJztcbmltcG9ydCB7IENvbmZpZ3VyZVByb2R1Y3RNb2R1bGUgfSBmcm9tICcuL2NvbmZpZ3VyZS1wcm9kdWN0L2NvbmZpZ3VyZS1wcm9kdWN0Lm1vZHVsZSc7XG5pbXBvcnQgeyBDb25maWd1cmF0b3JDYXJ0RW50cnlCdW5kbGVJbmZvTW9kdWxlIH0gZnJvbSAnLi9jb25maWd1cmF0b3ItY2FydC1lbnRyeS1idW5kbGUtaW5mby9jb25maWd1cmF0b3ItY2FydC1lbnRyeS1idW5kbGUtaW5mby5tb2R1bGUnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29uZmlndXJhdG9ySXNzdWVzTm90aWZpY2F0aW9uTW9kdWxlLFxuICAgIENvbmZpZ3VyYXRvckNhcnRFbnRyeUluZm9Nb2R1bGUsXG4gICAgQ29uZmlndXJhdG9yQ2FydEVudHJ5QnVuZGxlSW5mb01vZHVsZSxcbiAgICBDb25maWd1cmVDYXJ0RW50cnlNb2R1bGUsXG4gICAgQ29uZmlndXJlUHJvZHVjdE1vZHVsZSxcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgQ29tbW9uQ29uZmlndXJhdG9yQ29tcG9uZW50c01vZHVsZSB7fVxuIl19