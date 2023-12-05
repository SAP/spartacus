/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { provideDefaultConfig } from '@spartacus/core';
import { UserRegistrationAdapter } from '@spartacus/organization/user-registration/core';
import { OccUserRegistrationAdapter } from './adapters';
import { defaultOccOrganizationUserRegistrationConfig } from './config/default-occ-organization-config';
import * as i0 from "@angular/core";
export class UserRegistrationOccModule {
}
UserRegistrationOccModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserRegistrationOccModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
UserRegistrationOccModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: UserRegistrationOccModule, imports: [CommonModule] });
UserRegistrationOccModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserRegistrationOccModule, providers: [
        provideDefaultConfig(defaultOccOrganizationUserRegistrationConfig),
        {
            provide: UserRegistrationAdapter,
            useExisting: OccUserRegistrationAdapter,
        },
    ], imports: [CommonModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserRegistrationOccModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule],
                    providers: [
                        provideDefaultConfig(defaultOccOrganizationUserRegistrationConfig),
                        {
                            provide: UserRegistrationAdapter,
                            useExisting: OccUserRegistrationAdapter,
                        },
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci1yZWdpc3RyYXRpb24tb2NjLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9vcmdhbml6YXRpb24vdXNlci1yZWdpc3RyYXRpb24vb2NjL3VzZXItcmVnaXN0cmF0aW9uLW9jYy5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ3ZELE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLGdEQUFnRCxDQUFDO0FBQ3pGLE9BQU8sRUFBRSwwQkFBMEIsRUFBRSxNQUFNLFlBQVksQ0FBQztBQUN4RCxPQUFPLEVBQUUsNENBQTRDLEVBQUUsTUFBTSwwQ0FBMEMsQ0FBQzs7QUFZeEcsTUFBTSxPQUFPLHlCQUF5Qjs7c0hBQXpCLHlCQUF5Qjt1SEFBekIseUJBQXlCLFlBVDFCLFlBQVk7dUhBU1gseUJBQXlCLGFBUnpCO1FBQ1Qsb0JBQW9CLENBQUMsNENBQTRDLENBQUM7UUFDbEU7WUFDRSxPQUFPLEVBQUUsdUJBQXVCO1lBQ2hDLFdBQVcsRUFBRSwwQkFBMEI7U0FDeEM7S0FDRixZQVBTLFlBQVk7MkZBU1gseUJBQXlCO2tCQVZyQyxRQUFRO21CQUFDO29CQUNSLE9BQU8sRUFBRSxDQUFDLFlBQVksQ0FBQztvQkFDdkIsU0FBUyxFQUFFO3dCQUNULG9CQUFvQixDQUFDLDRDQUE0QyxDQUFDO3dCQUNsRTs0QkFDRSxPQUFPLEVBQUUsdUJBQXVCOzRCQUNoQyxXQUFXLEVBQUUsMEJBQTBCO3lCQUN4QztxQkFDRjtpQkFDRiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgcHJvdmlkZURlZmF1bHRDb25maWcgfSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHsgVXNlclJlZ2lzdHJhdGlvbkFkYXB0ZXIgfSBmcm9tICdAc3BhcnRhY3VzL29yZ2FuaXphdGlvbi91c2VyLXJlZ2lzdHJhdGlvbi9jb3JlJztcbmltcG9ydCB7IE9jY1VzZXJSZWdpc3RyYXRpb25BZGFwdGVyIH0gZnJvbSAnLi9hZGFwdGVycyc7XG5pbXBvcnQgeyBkZWZhdWx0T2NjT3JnYW5pemF0aW9uVXNlclJlZ2lzdHJhdGlvbkNvbmZpZyB9IGZyb20gJy4vY29uZmlnL2RlZmF1bHQtb2NjLW9yZ2FuaXphdGlvbi1jb25maWcnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlXSxcbiAgcHJvdmlkZXJzOiBbXG4gICAgcHJvdmlkZURlZmF1bHRDb25maWcoZGVmYXVsdE9jY09yZ2FuaXphdGlvblVzZXJSZWdpc3RyYXRpb25Db25maWcpLFxuICAgIHtcbiAgICAgIHByb3ZpZGU6IFVzZXJSZWdpc3RyYXRpb25BZGFwdGVyLFxuICAgICAgdXNlRXhpc3Rpbmc6IE9jY1VzZXJSZWdpc3RyYXRpb25BZGFwdGVyLFxuICAgIH0sXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIFVzZXJSZWdpc3RyYXRpb25PY2NNb2R1bGUge31cbiJdfQ==