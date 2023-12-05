/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { NgModule } from '@angular/core';
import { provideDefaultConfig } from '@spartacus/core';
import { unitsCmsConfig, userCmsConfig, UserListService, } from '@spartacus/organization/administration/components';
import { B2BUserService, OrgUnitService, } from '@spartacus/organization/administration/core';
import { CdcB2BUserService } from './cdc-b2b-user.service';
import { CdcOrgUnitService } from './cdc-org-unit.service';
import { CdcUserListService } from './cdc-user-list.service';
import * as i0 from "@angular/core";
export class CdcAdministrationModule {
}
CdcAdministrationModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CdcAdministrationModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
CdcAdministrationModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: CdcAdministrationModule });
CdcAdministrationModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CdcAdministrationModule, providers: [
        //to override UserListService in ListComponent
        provideDefaultConfig({
            cmsComponents: {
                ManageUsersListComponent: {
                    providers: [
                        {
                            provide: UserListService,
                            useExisting: CdcUserListService,
                        },
                        userCmsConfig.cmsComponents?.ManageUsersListComponent?.providers ||
                            [],
                    ],
                },
            },
        }),
        //to override B2BUserService in UserDetailsComponent, UnitUserListComponent
        { provide: B2BUserService, useClass: CdcB2BUserService },
        //to override B2BUserService in UnitUserRolesCellComponent
        provideDefaultConfig({
            cmsComponents: {
                ManageUnitsListComponent: {
                    providers: [
                        {
                            provide: B2BUserService,
                            useExisting: CdcB2BUserService,
                        },
                        unitsCmsConfig.cmsComponents?.ManageUnitsListComponent?.providers ||
                            [],
                    ],
                },
            },
        }),
        { provide: OrgUnitService, useClass: CdcOrgUnitService },
    ] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CdcAdministrationModule, decorators: [{
            type: NgModule,
            args: [{
                    providers: [
                        //to override UserListService in ListComponent
                        provideDefaultConfig({
                            cmsComponents: {
                                ManageUsersListComponent: {
                                    providers: [
                                        {
                                            provide: UserListService,
                                            useExisting: CdcUserListService,
                                        },
                                        userCmsConfig.cmsComponents?.ManageUsersListComponent?.providers ||
                                            [],
                                    ],
                                },
                            },
                        }),
                        //to override B2BUserService in UserDetailsComponent, UnitUserListComponent
                        { provide: B2BUserService, useClass: CdcB2BUserService },
                        //to override B2BUserService in UnitUserRolesCellComponent
                        provideDefaultConfig({
                            cmsComponents: {
                                ManageUnitsListComponent: {
                                    providers: [
                                        {
                                            provide: B2BUserService,
                                            useExisting: CdcB2BUserService,
                                        },
                                        unitsCmsConfig.cmsComponents?.ManageUnitsListComponent?.providers ||
                                            [],
                                    ],
                                },
                            },
                        }),
                        { provide: OrgUnitService, useClass: CdcOrgUnitService },
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2RjLWFkbWluaXN0cmF0aW9uLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2ludGVncmF0aW9uLWxpYnMvY2RjL29yZ2FuaXphdGlvbi9hZG1pbmlzdHJhdGlvbi9jZGMtYWRtaW5pc3RyYXRpb24ubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRXpDLE9BQU8sRUFBYSxvQkFBb0IsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ2xFLE9BQU8sRUFDTCxjQUFjLEVBQ2QsYUFBYSxFQUNiLGVBQWUsR0FDaEIsTUFBTSxtREFBbUQsQ0FBQztBQUMzRCxPQUFPLEVBQ0wsY0FBYyxFQUNkLGNBQWMsR0FDZixNQUFNLDZDQUE2QyxDQUFDO0FBQ3JELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQzNELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQzNELE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLHlCQUF5QixDQUFDOztBQXVDN0QsTUFBTSxPQUFPLHVCQUF1Qjs7b0hBQXZCLHVCQUF1QjtxSEFBdkIsdUJBQXVCO3FIQUF2Qix1QkFBdUIsYUFwQ3ZCO1FBQ1QsOENBQThDO1FBQzlDLG9CQUFvQixDQUFZO1lBQzlCLGFBQWEsRUFBRTtnQkFDYix3QkFBd0IsRUFBRTtvQkFDeEIsU0FBUyxFQUFFO3dCQUNUOzRCQUNFLE9BQU8sRUFBRSxlQUFlOzRCQUN4QixXQUFXLEVBQUUsa0JBQWtCO3lCQUNoQzt3QkFDRCxhQUFhLENBQUMsYUFBYSxFQUFFLHdCQUF3QixFQUFFLFNBQVM7NEJBQzlELEVBQUU7cUJBQ0w7aUJBQ0Y7YUFDRjtTQUNGLENBQUM7UUFDRiwyRUFBMkU7UUFDM0UsRUFBRSxPQUFPLEVBQUUsY0FBYyxFQUFFLFFBQVEsRUFBRSxpQkFBaUIsRUFBRTtRQUN4RCwwREFBMEQ7UUFDMUQsb0JBQW9CLENBQVk7WUFDOUIsYUFBYSxFQUFFO2dCQUNiLHdCQUF3QixFQUFFO29CQUN4QixTQUFTLEVBQUU7d0JBQ1Q7NEJBQ0UsT0FBTyxFQUFFLGNBQWM7NEJBQ3ZCLFdBQVcsRUFBRSxpQkFBaUI7eUJBQy9CO3dCQUNELGNBQWMsQ0FBQyxhQUFhLEVBQUUsd0JBQXdCLEVBQUUsU0FBUzs0QkFDL0QsRUFBRTtxQkFDTDtpQkFDRjthQUNGO1NBQ0YsQ0FBQztRQUNGLEVBQUUsT0FBTyxFQUFFLGNBQWMsRUFBRSxRQUFRLEVBQUUsaUJBQWlCLEVBQUU7S0FDekQ7MkZBRVUsdUJBQXVCO2tCQXJDbkMsUUFBUTttQkFBQztvQkFDUixTQUFTLEVBQUU7d0JBQ1QsOENBQThDO3dCQUM5QyxvQkFBb0IsQ0FBWTs0QkFDOUIsYUFBYSxFQUFFO2dDQUNiLHdCQUF3QixFQUFFO29DQUN4QixTQUFTLEVBQUU7d0NBQ1Q7NENBQ0UsT0FBTyxFQUFFLGVBQWU7NENBQ3hCLFdBQVcsRUFBRSxrQkFBa0I7eUNBQ2hDO3dDQUNELGFBQWEsQ0FBQyxhQUFhLEVBQUUsd0JBQXdCLEVBQUUsU0FBUzs0Q0FDOUQsRUFBRTtxQ0FDTDtpQ0FDRjs2QkFDRjt5QkFDRixDQUFDO3dCQUNGLDJFQUEyRTt3QkFDM0UsRUFBRSxPQUFPLEVBQUUsY0FBYyxFQUFFLFFBQVEsRUFBRSxpQkFBaUIsRUFBRTt3QkFDeEQsMERBQTBEO3dCQUMxRCxvQkFBb0IsQ0FBWTs0QkFDOUIsYUFBYSxFQUFFO2dDQUNiLHdCQUF3QixFQUFFO29DQUN4QixTQUFTLEVBQUU7d0NBQ1Q7NENBQ0UsT0FBTyxFQUFFLGNBQWM7NENBQ3ZCLFdBQVcsRUFBRSxpQkFBaUI7eUNBQy9CO3dDQUNELGNBQWMsQ0FBQyxhQUFhLEVBQUUsd0JBQXdCLEVBQUUsU0FBUzs0Q0FDL0QsRUFBRTtxQ0FDTDtpQ0FDRjs2QkFDRjt5QkFDRixDQUFDO3dCQUNGLEVBQUUsT0FBTyxFQUFFLGNBQWMsRUFBRSxRQUFRLEVBQUUsaUJBQWlCLEVBQUU7cUJBQ3pEO2lCQUNGIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgQ21zQ29uZmlnLCBwcm92aWRlRGVmYXVsdENvbmZpZyB9IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQge1xuICB1bml0c0Ntc0NvbmZpZyxcbiAgdXNlckNtc0NvbmZpZyxcbiAgVXNlckxpc3RTZXJ2aWNlLFxufSBmcm9tICdAc3BhcnRhY3VzL29yZ2FuaXphdGlvbi9hZG1pbmlzdHJhdGlvbi9jb21wb25lbnRzJztcbmltcG9ydCB7XG4gIEIyQlVzZXJTZXJ2aWNlLFxuICBPcmdVbml0U2VydmljZSxcbn0gZnJvbSAnQHNwYXJ0YWN1cy9vcmdhbml6YXRpb24vYWRtaW5pc3RyYXRpb24vY29yZSc7XG5pbXBvcnQgeyBDZGNCMkJVc2VyU2VydmljZSB9IGZyb20gJy4vY2RjLWIyYi11c2VyLnNlcnZpY2UnO1xuaW1wb3J0IHsgQ2RjT3JnVW5pdFNlcnZpY2UgfSBmcm9tICcuL2NkYy1vcmctdW5pdC5zZXJ2aWNlJztcbmltcG9ydCB7IENkY1VzZXJMaXN0U2VydmljZSB9IGZyb20gJy4vY2RjLXVzZXItbGlzdC5zZXJ2aWNlJztcblxuQE5nTW9kdWxlKHtcbiAgcHJvdmlkZXJzOiBbXG4gICAgLy90byBvdmVycmlkZSBVc2VyTGlzdFNlcnZpY2UgaW4gTGlzdENvbXBvbmVudFxuICAgIHByb3ZpZGVEZWZhdWx0Q29uZmlnKDxDbXNDb25maWc+e1xuICAgICAgY21zQ29tcG9uZW50czoge1xuICAgICAgICBNYW5hZ2VVc2Vyc0xpc3RDb21wb25lbnQ6IHtcbiAgICAgICAgICBwcm92aWRlcnM6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgcHJvdmlkZTogVXNlckxpc3RTZXJ2aWNlLFxuICAgICAgICAgICAgICB1c2VFeGlzdGluZzogQ2RjVXNlckxpc3RTZXJ2aWNlLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHVzZXJDbXNDb25maWcuY21zQ29tcG9uZW50cz8uTWFuYWdlVXNlcnNMaXN0Q29tcG9uZW50Py5wcm92aWRlcnMgfHxcbiAgICAgICAgICAgICAgW10sXG4gICAgICAgICAgXSxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfSksXG4gICAgLy90byBvdmVycmlkZSBCMkJVc2VyU2VydmljZSBpbiBVc2VyRGV0YWlsc0NvbXBvbmVudCwgVW5pdFVzZXJMaXN0Q29tcG9uZW50XG4gICAgeyBwcm92aWRlOiBCMkJVc2VyU2VydmljZSwgdXNlQ2xhc3M6IENkY0IyQlVzZXJTZXJ2aWNlIH0sXG4gICAgLy90byBvdmVycmlkZSBCMkJVc2VyU2VydmljZSBpbiBVbml0VXNlclJvbGVzQ2VsbENvbXBvbmVudFxuICAgIHByb3ZpZGVEZWZhdWx0Q29uZmlnKDxDbXNDb25maWc+e1xuICAgICAgY21zQ29tcG9uZW50czoge1xuICAgICAgICBNYW5hZ2VVbml0c0xpc3RDb21wb25lbnQ6IHtcbiAgICAgICAgICBwcm92aWRlcnM6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgcHJvdmlkZTogQjJCVXNlclNlcnZpY2UsXG4gICAgICAgICAgICAgIHVzZUV4aXN0aW5nOiBDZGNCMkJVc2VyU2VydmljZSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB1bml0c0Ntc0NvbmZpZy5jbXNDb21wb25lbnRzPy5NYW5hZ2VVbml0c0xpc3RDb21wb25lbnQ/LnByb3ZpZGVycyB8fFxuICAgICAgICAgICAgICBbXSxcbiAgICAgICAgICBdLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9KSxcbiAgICB7IHByb3ZpZGU6IE9yZ1VuaXRTZXJ2aWNlLCB1c2VDbGFzczogQ2RjT3JnVW5pdFNlcnZpY2UgfSxcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgQ2RjQWRtaW5pc3RyYXRpb25Nb2R1bGUge31cbiJdfQ==