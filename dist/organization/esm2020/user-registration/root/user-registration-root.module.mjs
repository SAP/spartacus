/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { NgModule } from '@angular/core';
import { provideDefaultConfigFactory } from '@spartacus/core';
import { ORGANIZATION_USER_REGISTRATION_FEATURE } from './feature-name';
import * as i0 from "@angular/core";
export function defaultOrganizationUserRegistrationComponentsConfig() {
    const config = {
        featureModules: {
            [ORGANIZATION_USER_REGISTRATION_FEATURE]: {
                cmsComponents: ['OrganizationUserRegistrationComponent'],
            },
        },
    };
    return config;
}
export class OrganizationUserRegistrationRootModule {
}
OrganizationUserRegistrationRootModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrganizationUserRegistrationRootModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
OrganizationUserRegistrationRootModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: OrganizationUserRegistrationRootModule });
OrganizationUserRegistrationRootModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrganizationUserRegistrationRootModule, providers: [
        provideDefaultConfigFactory(defaultOrganizationUserRegistrationComponentsConfig),
    ] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrganizationUserRegistrationRootModule, decorators: [{
            type: NgModule,
            args: [{
                    providers: [
                        provideDefaultConfigFactory(defaultOrganizationUserRegistrationComponentsConfig),
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci1yZWdpc3RyYXRpb24tcm9vdC5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvb3JnYW5pemF0aW9uL3VzZXItcmVnaXN0cmF0aW9uL3Jvb3QvdXNlci1yZWdpc3RyYXRpb24tcm9vdC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFhLDJCQUEyQixFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDekUsT0FBTyxFQUFFLHNDQUFzQyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7O0FBRXhFLE1BQU0sVUFBVSxtREFBbUQ7SUFDakUsTUFBTSxNQUFNLEdBQWM7UUFDeEIsY0FBYyxFQUFFO1lBQ2QsQ0FBQyxzQ0FBc0MsQ0FBQyxFQUFFO2dCQUN4QyxhQUFhLEVBQUUsQ0FBQyx1Q0FBdUMsQ0FBQzthQUN6RDtTQUNGO0tBQ0YsQ0FBQztJQUVGLE9BQU8sTUFBTSxDQUFDO0FBQ2hCLENBQUM7QUFTRCxNQUFNLE9BQU8sc0NBQXNDOzttSUFBdEMsc0NBQXNDO29JQUF0QyxzQ0FBc0M7b0lBQXRDLHNDQUFzQyxhQU50QztRQUNULDJCQUEyQixDQUN6QixtREFBbUQsQ0FDcEQ7S0FDRjsyRkFFVSxzQ0FBc0M7a0JBUGxELFFBQVE7bUJBQUM7b0JBQ1IsU0FBUyxFQUFFO3dCQUNULDJCQUEyQixDQUN6QixtREFBbUQsQ0FDcEQ7cUJBQ0Y7aUJBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ21zQ29uZmlnLCBwcm92aWRlRGVmYXVsdENvbmZpZ0ZhY3RvcnkgfSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHsgT1JHQU5JWkFUSU9OX1VTRVJfUkVHSVNUUkFUSU9OX0ZFQVRVUkUgfSBmcm9tICcuL2ZlYXR1cmUtbmFtZSc7XG5cbmV4cG9ydCBmdW5jdGlvbiBkZWZhdWx0T3JnYW5pemF0aW9uVXNlclJlZ2lzdHJhdGlvbkNvbXBvbmVudHNDb25maWcoKTogQ21zQ29uZmlnIHtcbiAgY29uc3QgY29uZmlnOiBDbXNDb25maWcgPSB7XG4gICAgZmVhdHVyZU1vZHVsZXM6IHtcbiAgICAgIFtPUkdBTklaQVRJT05fVVNFUl9SRUdJU1RSQVRJT05fRkVBVFVSRV06IHtcbiAgICAgICAgY21zQ29tcG9uZW50czogWydPcmdhbml6YXRpb25Vc2VyUmVnaXN0cmF0aW9uQ29tcG9uZW50J10sXG4gICAgICB9LFxuICAgIH0sXG4gIH07XG5cbiAgcmV0dXJuIGNvbmZpZztcbn1cblxuQE5nTW9kdWxlKHtcbiAgcHJvdmlkZXJzOiBbXG4gICAgcHJvdmlkZURlZmF1bHRDb25maWdGYWN0b3J5KFxuICAgICAgZGVmYXVsdE9yZ2FuaXphdGlvblVzZXJSZWdpc3RyYXRpb25Db21wb25lbnRzQ29uZmlnXG4gICAgKSxcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgT3JnYW5pemF0aW9uVXNlclJlZ2lzdHJhdGlvblJvb3RNb2R1bGUge31cbiJdfQ==