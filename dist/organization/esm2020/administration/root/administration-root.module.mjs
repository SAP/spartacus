/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { NgModule } from '@angular/core';
import { provideDefaultConfig, provideDefaultConfigFactory, } from '@spartacus/core';
import { defaultBudgetRoutingConfig } from './config/default-budget-routing.config';
import { defaultCostCenterRoutingConfig } from './config/default-cost-center-routing.config';
import { defaultOrganizationLayoutConfig } from './config/default-organization-layout.config';
import { defaultPermissionRoutingConfig } from './config/default-permission-routing.config';
import { defaultUnitsRoutingConfig } from './config/default-units-routing.config';
import { defaultUserGroupRoutingConfig } from './config/default-user-group-routing.config';
import { defaultUserRoutingConfig } from './config/default-user-routing.config';
import { ORGANIZATION_ADMINISTRATION_FEATURE } from './feature-name';
import * as i0 from "@angular/core";
// TODO: Inline this factory when we start releasing Ivy compiled libraries
export function defaultOrganizationAdministrationComponentsConfig() {
    const config = {
        featureModules: {
            [ORGANIZATION_ADMINISTRATION_FEATURE]: {
                cmsComponents: [
                    'ManageBudgetsListComponent',
                    'ManageCostCentersListComponent',
                    'ManagePermissionsListComponent',
                    'ManageUnitsListComponent',
                    'ManageUsersListComponent',
                    'ManageUserGroupsListComponent',
                ],
            },
        },
    };
    return config;
}
export class AdministrationRootModule {
}
AdministrationRootModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AdministrationRootModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
AdministrationRootModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: AdministrationRootModule });
AdministrationRootModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AdministrationRootModule, providers: [
        provideDefaultConfig(defaultOrganizationLayoutConfig),
        provideDefaultConfig({
            routing: { routes: { organization: { paths: ['organization'] } } },
        }),
        provideDefaultConfig(defaultBudgetRoutingConfig),
        provideDefaultConfig(defaultCostCenterRoutingConfig),
        provideDefaultConfig(defaultPermissionRoutingConfig),
        provideDefaultConfig(defaultUnitsRoutingConfig),
        provideDefaultConfig(defaultUserRoutingConfig),
        provideDefaultConfig(defaultUserGroupRoutingConfig),
        provideDefaultConfigFactory(defaultOrganizationAdministrationComponentsConfig),
    ] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AdministrationRootModule, decorators: [{
            type: NgModule,
            args: [{
                    providers: [
                        provideDefaultConfig(defaultOrganizationLayoutConfig),
                        provideDefaultConfig({
                            routing: { routes: { organization: { paths: ['organization'] } } },
                        }),
                        provideDefaultConfig(defaultBudgetRoutingConfig),
                        provideDefaultConfig(defaultCostCenterRoutingConfig),
                        provideDefaultConfig(defaultPermissionRoutingConfig),
                        provideDefaultConfig(defaultUnitsRoutingConfig),
                        provideDefaultConfig(defaultUserRoutingConfig),
                        provideDefaultConfig(defaultUserGroupRoutingConfig),
                        provideDefaultConfigFactory(defaultOrganizationAdministrationComponentsConfig),
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRtaW5pc3RyYXRpb24tcm9vdC5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvb3JnYW5pemF0aW9uL2FkbWluaXN0cmF0aW9uL3Jvb3QvYWRtaW5pc3RyYXRpb24tcm9vdC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUVMLG9CQUFvQixFQUNwQiwyQkFBMkIsR0FFNUIsTUFBTSxpQkFBaUIsQ0FBQztBQUN6QixPQUFPLEVBQUUsMEJBQTBCLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQztBQUNwRixPQUFPLEVBQUUsOEJBQThCLEVBQUUsTUFBTSw2Q0FBNkMsQ0FBQztBQUM3RixPQUFPLEVBQUUsK0JBQStCLEVBQUUsTUFBTSw2Q0FBNkMsQ0FBQztBQUM5RixPQUFPLEVBQUUsOEJBQThCLEVBQUUsTUFBTSw0Q0FBNEMsQ0FBQztBQUM1RixPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQztBQUNsRixPQUFPLEVBQUUsNkJBQTZCLEVBQUUsTUFBTSw0Q0FBNEMsQ0FBQztBQUMzRixPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQUNoRixPQUFPLEVBQUUsbUNBQW1DLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7QUFFckUsMkVBQTJFO0FBQzNFLE1BQU0sVUFBVSxpREFBaUQ7SUFDL0QsTUFBTSxNQUFNLEdBQWM7UUFDeEIsY0FBYyxFQUFFO1lBQ2QsQ0FBQyxtQ0FBbUMsQ0FBQyxFQUFFO2dCQUNyQyxhQUFhLEVBQUU7b0JBQ2IsNEJBQTRCO29CQUM1QixnQ0FBZ0M7b0JBQ2hDLGdDQUFnQztvQkFDaEMsMEJBQTBCO29CQUMxQiwwQkFBMEI7b0JBQzFCLCtCQUErQjtpQkFDaEM7YUFDRjtTQUNGO0tBQ0YsQ0FBQztJQUVGLE9BQU8sTUFBTSxDQUFDO0FBQ2hCLENBQUM7QUFxQkQsTUFBTSxPQUFPLHdCQUF3Qjs7cUhBQXhCLHdCQUF3QjtzSEFBeEIsd0JBQXdCO3NIQUF4Qix3QkFBd0IsYUFsQnhCO1FBQ1Qsb0JBQW9CLENBQUMsK0JBQStCLENBQUM7UUFFckQsb0JBQW9CLENBQWdCO1lBQ2xDLE9BQU8sRUFBRSxFQUFFLE1BQU0sRUFBRSxFQUFFLFlBQVksRUFBRSxFQUFFLEtBQUssRUFBRSxDQUFDLGNBQWMsQ0FBQyxFQUFFLEVBQUUsRUFBRTtTQUNuRSxDQUFDO1FBQ0Ysb0JBQW9CLENBQUMsMEJBQTBCLENBQUM7UUFDaEQsb0JBQW9CLENBQUMsOEJBQThCLENBQUM7UUFDcEQsb0JBQW9CLENBQUMsOEJBQThCLENBQUM7UUFDcEQsb0JBQW9CLENBQUMseUJBQXlCLENBQUM7UUFDL0Msb0JBQW9CLENBQUMsd0JBQXdCLENBQUM7UUFDOUMsb0JBQW9CLENBQUMsNkJBQTZCLENBQUM7UUFFbkQsMkJBQTJCLENBQ3pCLGlEQUFpRCxDQUNsRDtLQUNGOzJGQUVVLHdCQUF3QjtrQkFuQnBDLFFBQVE7bUJBQUM7b0JBQ1IsU0FBUyxFQUFFO3dCQUNULG9CQUFvQixDQUFDLCtCQUErQixDQUFDO3dCQUVyRCxvQkFBb0IsQ0FBZ0I7NEJBQ2xDLE9BQU8sRUFBRSxFQUFFLE1BQU0sRUFBRSxFQUFFLFlBQVksRUFBRSxFQUFFLEtBQUssRUFBRSxDQUFDLGNBQWMsQ0FBQyxFQUFFLEVBQUUsRUFBRTt5QkFDbkUsQ0FBQzt3QkFDRixvQkFBb0IsQ0FBQywwQkFBMEIsQ0FBQzt3QkFDaEQsb0JBQW9CLENBQUMsOEJBQThCLENBQUM7d0JBQ3BELG9CQUFvQixDQUFDLDhCQUE4QixDQUFDO3dCQUNwRCxvQkFBb0IsQ0FBQyx5QkFBeUIsQ0FBQzt3QkFDL0Msb0JBQW9CLENBQUMsd0JBQXdCLENBQUM7d0JBQzlDLG9CQUFvQixDQUFDLDZCQUE2QixDQUFDO3dCQUVuRCwyQkFBMkIsQ0FDekIsaURBQWlELENBQ2xEO3FCQUNGO2lCQUNGIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gIENtc0NvbmZpZyxcbiAgcHJvdmlkZURlZmF1bHRDb25maWcsXG4gIHByb3ZpZGVEZWZhdWx0Q29uZmlnRmFjdG9yeSxcbiAgUm91dGluZ0NvbmZpZyxcbn0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7IGRlZmF1bHRCdWRnZXRSb3V0aW5nQ29uZmlnIH0gZnJvbSAnLi9jb25maWcvZGVmYXVsdC1idWRnZXQtcm91dGluZy5jb25maWcnO1xuaW1wb3J0IHsgZGVmYXVsdENvc3RDZW50ZXJSb3V0aW5nQ29uZmlnIH0gZnJvbSAnLi9jb25maWcvZGVmYXVsdC1jb3N0LWNlbnRlci1yb3V0aW5nLmNvbmZpZyc7XG5pbXBvcnQgeyBkZWZhdWx0T3JnYW5pemF0aW9uTGF5b3V0Q29uZmlnIH0gZnJvbSAnLi9jb25maWcvZGVmYXVsdC1vcmdhbml6YXRpb24tbGF5b3V0LmNvbmZpZyc7XG5pbXBvcnQgeyBkZWZhdWx0UGVybWlzc2lvblJvdXRpbmdDb25maWcgfSBmcm9tICcuL2NvbmZpZy9kZWZhdWx0LXBlcm1pc3Npb24tcm91dGluZy5jb25maWcnO1xuaW1wb3J0IHsgZGVmYXVsdFVuaXRzUm91dGluZ0NvbmZpZyB9IGZyb20gJy4vY29uZmlnL2RlZmF1bHQtdW5pdHMtcm91dGluZy5jb25maWcnO1xuaW1wb3J0IHsgZGVmYXVsdFVzZXJHcm91cFJvdXRpbmdDb25maWcgfSBmcm9tICcuL2NvbmZpZy9kZWZhdWx0LXVzZXItZ3JvdXAtcm91dGluZy5jb25maWcnO1xuaW1wb3J0IHsgZGVmYXVsdFVzZXJSb3V0aW5nQ29uZmlnIH0gZnJvbSAnLi9jb25maWcvZGVmYXVsdC11c2VyLXJvdXRpbmcuY29uZmlnJztcbmltcG9ydCB7IE9SR0FOSVpBVElPTl9BRE1JTklTVFJBVElPTl9GRUFUVVJFIH0gZnJvbSAnLi9mZWF0dXJlLW5hbWUnO1xuXG4vLyBUT0RPOiBJbmxpbmUgdGhpcyBmYWN0b3J5IHdoZW4gd2Ugc3RhcnQgcmVsZWFzaW5nIEl2eSBjb21waWxlZCBsaWJyYXJpZXNcbmV4cG9ydCBmdW5jdGlvbiBkZWZhdWx0T3JnYW5pemF0aW9uQWRtaW5pc3RyYXRpb25Db21wb25lbnRzQ29uZmlnKCk6IENtc0NvbmZpZyB7XG4gIGNvbnN0IGNvbmZpZzogQ21zQ29uZmlnID0ge1xuICAgIGZlYXR1cmVNb2R1bGVzOiB7XG4gICAgICBbT1JHQU5JWkFUSU9OX0FETUlOSVNUUkFUSU9OX0ZFQVRVUkVdOiB7XG4gICAgICAgIGNtc0NvbXBvbmVudHM6IFtcbiAgICAgICAgICAnTWFuYWdlQnVkZ2V0c0xpc3RDb21wb25lbnQnLFxuICAgICAgICAgICdNYW5hZ2VDb3N0Q2VudGVyc0xpc3RDb21wb25lbnQnLFxuICAgICAgICAgICdNYW5hZ2VQZXJtaXNzaW9uc0xpc3RDb21wb25lbnQnLFxuICAgICAgICAgICdNYW5hZ2VVbml0c0xpc3RDb21wb25lbnQnLFxuICAgICAgICAgICdNYW5hZ2VVc2Vyc0xpc3RDb21wb25lbnQnLFxuICAgICAgICAgICdNYW5hZ2VVc2VyR3JvdXBzTGlzdENvbXBvbmVudCcsXG4gICAgICAgIF0sXG4gICAgICB9LFxuICAgIH0sXG4gIH07XG5cbiAgcmV0dXJuIGNvbmZpZztcbn1cblxuQE5nTW9kdWxlKHtcbiAgcHJvdmlkZXJzOiBbXG4gICAgcHJvdmlkZURlZmF1bHRDb25maWcoZGVmYXVsdE9yZ2FuaXphdGlvbkxheW91dENvbmZpZyksXG5cbiAgICBwcm92aWRlRGVmYXVsdENvbmZpZyg8Um91dGluZ0NvbmZpZz57XG4gICAgICByb3V0aW5nOiB7IHJvdXRlczogeyBvcmdhbml6YXRpb246IHsgcGF0aHM6IFsnb3JnYW5pemF0aW9uJ10gfSB9IH0sXG4gICAgfSksXG4gICAgcHJvdmlkZURlZmF1bHRDb25maWcoZGVmYXVsdEJ1ZGdldFJvdXRpbmdDb25maWcpLFxuICAgIHByb3ZpZGVEZWZhdWx0Q29uZmlnKGRlZmF1bHRDb3N0Q2VudGVyUm91dGluZ0NvbmZpZyksXG4gICAgcHJvdmlkZURlZmF1bHRDb25maWcoZGVmYXVsdFBlcm1pc3Npb25Sb3V0aW5nQ29uZmlnKSxcbiAgICBwcm92aWRlRGVmYXVsdENvbmZpZyhkZWZhdWx0VW5pdHNSb3V0aW5nQ29uZmlnKSxcbiAgICBwcm92aWRlRGVmYXVsdENvbmZpZyhkZWZhdWx0VXNlclJvdXRpbmdDb25maWcpLFxuICAgIHByb3ZpZGVEZWZhdWx0Q29uZmlnKGRlZmF1bHRVc2VyR3JvdXBSb3V0aW5nQ29uZmlnKSxcblxuICAgIHByb3ZpZGVEZWZhdWx0Q29uZmlnRmFjdG9yeShcbiAgICAgIGRlZmF1bHRPcmdhbml6YXRpb25BZG1pbmlzdHJhdGlvbkNvbXBvbmVudHNDb25maWdcbiAgICApLFxuICBdLFxufSlcbmV4cG9ydCBjbGFzcyBBZG1pbmlzdHJhdGlvblJvb3RNb2R1bGUge31cbiJdfQ==