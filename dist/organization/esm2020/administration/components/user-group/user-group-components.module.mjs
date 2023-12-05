/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { NgModule } from '@angular/core';
import { provideDefaultConfig, provideDefaultConfigFactory, } from '@spartacus/core';
import { SharedOrganizationModule } from '../shared/shared-organization.module';
import { UserGroupDetailsModule } from './details/user-group-details.module';
import { UserGroupFormModule } from './form/user-group-form.module';
import { UserGroupPermissionModule } from './permissions/user-group-permission-list.module';
import { userGroupCmsConfig, userGroupTableConfigFactory, } from './user-group.config';
import { UserGroupUserModule } from './users/user-group-user-list.module';
import * as i0 from "@angular/core";
export class UserGroupComponentsModule {
}
UserGroupComponentsModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserGroupComponentsModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
UserGroupComponentsModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: UserGroupComponentsModule, imports: [SharedOrganizationModule,
        UserGroupDetailsModule,
        UserGroupFormModule,
        UserGroupPermissionModule,
        UserGroupUserModule] });
UserGroupComponentsModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserGroupComponentsModule, providers: [
        provideDefaultConfig(userGroupCmsConfig),
        provideDefaultConfigFactory(userGroupTableConfigFactory),
    ], imports: [SharedOrganizationModule,
        UserGroupDetailsModule,
        UserGroupFormModule,
        UserGroupPermissionModule,
        UserGroupUserModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserGroupComponentsModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        SharedOrganizationModule,
                        UserGroupDetailsModule,
                        UserGroupFormModule,
                        UserGroupPermissionModule,
                        UserGroupUserModule,
                    ],
                    providers: [
                        provideDefaultConfig(userGroupCmsConfig),
                        provideDefaultConfigFactory(userGroupTableConfigFactory),
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci1ncm91cC1jb21wb25lbnRzLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9vcmdhbml6YXRpb24vYWRtaW5pc3RyYXRpb24vY29tcG9uZW50cy91c2VyLWdyb3VwL3VzZXItZ3JvdXAtY29tcG9uZW50cy5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUNMLG9CQUFvQixFQUNwQiwyQkFBMkIsR0FDNUIsTUFBTSxpQkFBaUIsQ0FBQztBQUN6QixPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQUNoRixPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQztBQUM3RSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUNwRSxPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSxpREFBaUQsQ0FBQztBQUM1RixPQUFPLEVBQ0wsa0JBQWtCLEVBQ2xCLDJCQUEyQixHQUM1QixNQUFNLHFCQUFxQixDQUFDO0FBQzdCLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHFDQUFxQyxDQUFDOztBQWUxRSxNQUFNLE9BQU8seUJBQXlCOztzSEFBekIseUJBQXlCO3VIQUF6Qix5QkFBeUIsWUFYbEMsd0JBQXdCO1FBQ3hCLHNCQUFzQjtRQUN0QixtQkFBbUI7UUFDbkIseUJBQXlCO1FBQ3pCLG1CQUFtQjt1SEFPVix5QkFBeUIsYUFMekI7UUFDVCxvQkFBb0IsQ0FBQyxrQkFBa0IsQ0FBQztRQUN4QywyQkFBMkIsQ0FBQywyQkFBMkIsQ0FBQztLQUN6RCxZQVRDLHdCQUF3QjtRQUN4QixzQkFBc0I7UUFDdEIsbUJBQW1CO1FBQ25CLHlCQUF5QjtRQUN6QixtQkFBbUI7MkZBT1YseUJBQXlCO2tCQWJyQyxRQUFRO21CQUFDO29CQUNSLE9BQU8sRUFBRTt3QkFDUCx3QkFBd0I7d0JBQ3hCLHNCQUFzQjt3QkFDdEIsbUJBQW1CO3dCQUNuQix5QkFBeUI7d0JBQ3pCLG1CQUFtQjtxQkFDcEI7b0JBQ0QsU0FBUyxFQUFFO3dCQUNULG9CQUFvQixDQUFDLGtCQUFrQixDQUFDO3dCQUN4QywyQkFBMkIsQ0FBQywyQkFBMkIsQ0FBQztxQkFDekQ7aUJBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgcHJvdmlkZURlZmF1bHRDb25maWcsXG4gIHByb3ZpZGVEZWZhdWx0Q29uZmlnRmFjdG9yeSxcbn0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7IFNoYXJlZE9yZ2FuaXphdGlvbk1vZHVsZSB9IGZyb20gJy4uL3NoYXJlZC9zaGFyZWQtb3JnYW5pemF0aW9uLm1vZHVsZSc7XG5pbXBvcnQgeyBVc2VyR3JvdXBEZXRhaWxzTW9kdWxlIH0gZnJvbSAnLi9kZXRhaWxzL3VzZXItZ3JvdXAtZGV0YWlscy5tb2R1bGUnO1xuaW1wb3J0IHsgVXNlckdyb3VwRm9ybU1vZHVsZSB9IGZyb20gJy4vZm9ybS91c2VyLWdyb3VwLWZvcm0ubW9kdWxlJztcbmltcG9ydCB7IFVzZXJHcm91cFBlcm1pc3Npb25Nb2R1bGUgfSBmcm9tICcuL3Blcm1pc3Npb25zL3VzZXItZ3JvdXAtcGVybWlzc2lvbi1saXN0Lm1vZHVsZSc7XG5pbXBvcnQge1xuICB1c2VyR3JvdXBDbXNDb25maWcsXG4gIHVzZXJHcm91cFRhYmxlQ29uZmlnRmFjdG9yeSxcbn0gZnJvbSAnLi91c2VyLWdyb3VwLmNvbmZpZyc7XG5pbXBvcnQgeyBVc2VyR3JvdXBVc2VyTW9kdWxlIH0gZnJvbSAnLi91c2Vycy91c2VyLWdyb3VwLXVzZXItbGlzdC5tb2R1bGUnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgU2hhcmVkT3JnYW5pemF0aW9uTW9kdWxlLFxuICAgIFVzZXJHcm91cERldGFpbHNNb2R1bGUsXG4gICAgVXNlckdyb3VwRm9ybU1vZHVsZSxcbiAgICBVc2VyR3JvdXBQZXJtaXNzaW9uTW9kdWxlLFxuICAgIFVzZXJHcm91cFVzZXJNb2R1bGUsXG4gIF0sXG4gIHByb3ZpZGVyczogW1xuICAgIHByb3ZpZGVEZWZhdWx0Q29uZmlnKHVzZXJHcm91cENtc0NvbmZpZyksXG4gICAgcHJvdmlkZURlZmF1bHRDb25maWdGYWN0b3J5KHVzZXJHcm91cFRhYmxlQ29uZmlnRmFjdG9yeSksXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIFVzZXJHcm91cENvbXBvbmVudHNNb2R1bGUge31cbiJdfQ==