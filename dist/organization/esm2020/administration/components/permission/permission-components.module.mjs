/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { NgModule } from '@angular/core';
import { provideDefaultConfig, provideDefaultConfigFactory, } from '@spartacus/core';
import { SharedOrganizationModule } from '../shared/shared-organization.module';
import { PermissionDetailsModule } from './details/permission-details.module';
import { PermissionFormModule } from './form/permission-form.module';
import { permissionCmsConfig, permissionTableConfigFactory, } from './permission.config';
import * as i0 from "@angular/core";
export class PermissionComponentsModule {
}
PermissionComponentsModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PermissionComponentsModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
PermissionComponentsModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: PermissionComponentsModule, imports: [SharedOrganizationModule,
        PermissionDetailsModule,
        PermissionFormModule] });
PermissionComponentsModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PermissionComponentsModule, providers: [
        provideDefaultConfig(permissionCmsConfig),
        provideDefaultConfigFactory(permissionTableConfigFactory),
    ], imports: [SharedOrganizationModule,
        PermissionDetailsModule,
        PermissionFormModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PermissionComponentsModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        SharedOrganizationModule,
                        PermissionDetailsModule,
                        PermissionFormModule,
                    ],
                    providers: [
                        provideDefaultConfig(permissionCmsConfig),
                        provideDefaultConfigFactory(permissionTableConfigFactory),
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGVybWlzc2lvbi1jb21wb25lbnRzLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9vcmdhbml6YXRpb24vYWRtaW5pc3RyYXRpb24vY29tcG9uZW50cy9wZXJtaXNzaW9uL3Blcm1pc3Npb24tY29tcG9uZW50cy5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUNMLG9CQUFvQixFQUNwQiwyQkFBMkIsR0FDNUIsTUFBTSxpQkFBaUIsQ0FBQztBQUN6QixPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQUNoRixPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQztBQUM5RSxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUNyRSxPQUFPLEVBQ0wsbUJBQW1CLEVBQ25CLDRCQUE0QixHQUM3QixNQUFNLHFCQUFxQixDQUFDOztBQWE3QixNQUFNLE9BQU8sMEJBQTBCOzt1SEFBMUIsMEJBQTBCO3dIQUExQiwwQkFBMEIsWUFUbkMsd0JBQXdCO1FBQ3hCLHVCQUF1QjtRQUN2QixvQkFBb0I7d0hBT1gsMEJBQTBCLGFBTDFCO1FBQ1Qsb0JBQW9CLENBQUMsbUJBQW1CLENBQUM7UUFDekMsMkJBQTJCLENBQUMsNEJBQTRCLENBQUM7S0FDMUQsWUFQQyx3QkFBd0I7UUFDeEIsdUJBQXVCO1FBQ3ZCLG9CQUFvQjsyRkFPWCwwQkFBMEI7a0JBWHRDLFFBQVE7bUJBQUM7b0JBQ1IsT0FBTyxFQUFFO3dCQUNQLHdCQUF3Qjt3QkFDeEIsdUJBQXVCO3dCQUN2QixvQkFBb0I7cUJBQ3JCO29CQUNELFNBQVMsRUFBRTt3QkFDVCxvQkFBb0IsQ0FBQyxtQkFBbUIsQ0FBQzt3QkFDekMsMkJBQTJCLENBQUMsNEJBQTRCLENBQUM7cUJBQzFEO2lCQUNGIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gIHByb3ZpZGVEZWZhdWx0Q29uZmlnLFxuICBwcm92aWRlRGVmYXVsdENvbmZpZ0ZhY3RvcnksXG59IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBTaGFyZWRPcmdhbml6YXRpb25Nb2R1bGUgfSBmcm9tICcuLi9zaGFyZWQvc2hhcmVkLW9yZ2FuaXphdGlvbi5tb2R1bGUnO1xuaW1wb3J0IHsgUGVybWlzc2lvbkRldGFpbHNNb2R1bGUgfSBmcm9tICcuL2RldGFpbHMvcGVybWlzc2lvbi1kZXRhaWxzLm1vZHVsZSc7XG5pbXBvcnQgeyBQZXJtaXNzaW9uRm9ybU1vZHVsZSB9IGZyb20gJy4vZm9ybS9wZXJtaXNzaW9uLWZvcm0ubW9kdWxlJztcbmltcG9ydCB7XG4gIHBlcm1pc3Npb25DbXNDb25maWcsXG4gIHBlcm1pc3Npb25UYWJsZUNvbmZpZ0ZhY3RvcnksXG59IGZyb20gJy4vcGVybWlzc2lvbi5jb25maWcnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgU2hhcmVkT3JnYW5pemF0aW9uTW9kdWxlLFxuICAgIFBlcm1pc3Npb25EZXRhaWxzTW9kdWxlLFxuICAgIFBlcm1pc3Npb25Gb3JtTW9kdWxlLFxuICBdLFxuICBwcm92aWRlcnM6IFtcbiAgICBwcm92aWRlRGVmYXVsdENvbmZpZyhwZXJtaXNzaW9uQ21zQ29uZmlnKSxcbiAgICBwcm92aWRlRGVmYXVsdENvbmZpZ0ZhY3RvcnkocGVybWlzc2lvblRhYmxlQ29uZmlnRmFjdG9yeSksXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIFBlcm1pc3Npb25Db21wb25lbnRzTW9kdWxlIHt9XG4iXX0=