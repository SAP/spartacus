/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { NgModule } from '@angular/core';
import { provideDefaultConfig, provideDefaultConfigFactory, } from '@spartacus/core';
import { ListModule } from '../shared/list/list.module';
import { UserApproverListModule } from './approvers/user-approver-list.module';
import { UserChangePasswordFormModule } from './change-password-form/user-change-password-form.module';
import { UserDetailsModule } from './details/user-details.module';
import { UserFormModule } from './form/user-form.module';
import { UserPermissionListModule } from './permissions/user-permission-list.module';
import { UserUserGroupsModule } from './user-groups/user-user-group-list.module';
import { userCmsConfig, userTableConfigFactory } from './user.config';
import * as i0 from "@angular/core";
export class UserComponentsModule {
}
UserComponentsModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserComponentsModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
UserComponentsModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: UserComponentsModule, imports: [ListModule,
        UserChangePasswordFormModule,
        UserDetailsModule,
        UserFormModule,
        UserPermissionListModule,
        UserUserGroupsModule,
        UserApproverListModule] });
UserComponentsModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserComponentsModule, providers: [
        provideDefaultConfig(userCmsConfig),
        provideDefaultConfigFactory(userTableConfigFactory),
    ], imports: [ListModule,
        UserChangePasswordFormModule,
        UserDetailsModule,
        UserFormModule,
        UserPermissionListModule,
        UserUserGroupsModule,
        UserApproverListModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserComponentsModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        ListModule,
                        UserChangePasswordFormModule,
                        UserDetailsModule,
                        UserFormModule,
                        UserPermissionListModule,
                        UserUserGroupsModule,
                        UserApproverListModule,
                    ],
                    providers: [
                        provideDefaultConfig(userCmsConfig),
                        provideDefaultConfigFactory(userTableConfigFactory),
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci1jb21wb25lbnRzLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9vcmdhbml6YXRpb24vYWRtaW5pc3RyYXRpb24vY29tcG9uZW50cy91c2VyL3VzZXItY29tcG9uZW50cy5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUNMLG9CQUFvQixFQUNwQiwyQkFBMkIsR0FDNUIsTUFBTSxpQkFBaUIsQ0FBQztBQUN6QixPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDeEQsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sdUNBQXVDLENBQUM7QUFDL0UsT0FBTyxFQUFFLDRCQUE0QixFQUFFLE1BQU0seURBQXlELENBQUM7QUFDdkcsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDbEUsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQ3pELE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLDJDQUEyQyxDQUFDO0FBQ3JGLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLDJDQUEyQyxDQUFDO0FBQ2pGLE9BQU8sRUFBRSxhQUFhLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSxlQUFlLENBQUM7O0FBZ0J0RSxNQUFNLE9BQU8sb0JBQW9COztpSEFBcEIsb0JBQW9CO2tIQUFwQixvQkFBb0IsWUFiN0IsVUFBVTtRQUNWLDRCQUE0QjtRQUM1QixpQkFBaUI7UUFDakIsY0FBYztRQUNkLHdCQUF3QjtRQUN4QixvQkFBb0I7UUFDcEIsc0JBQXNCO2tIQU9iLG9CQUFvQixhQUxwQjtRQUNULG9CQUFvQixDQUFDLGFBQWEsQ0FBQztRQUNuQywyQkFBMkIsQ0FBQyxzQkFBc0IsQ0FBQztLQUNwRCxZQVhDLFVBQVU7UUFDViw0QkFBNEI7UUFDNUIsaUJBQWlCO1FBQ2pCLGNBQWM7UUFDZCx3QkFBd0I7UUFDeEIsb0JBQW9CO1FBQ3BCLHNCQUFzQjsyRkFPYixvQkFBb0I7a0JBZmhDLFFBQVE7bUJBQUM7b0JBQ1IsT0FBTyxFQUFFO3dCQUNQLFVBQVU7d0JBQ1YsNEJBQTRCO3dCQUM1QixpQkFBaUI7d0JBQ2pCLGNBQWM7d0JBQ2Qsd0JBQXdCO3dCQUN4QixvQkFBb0I7d0JBQ3BCLHNCQUFzQjtxQkFDdkI7b0JBQ0QsU0FBUyxFQUFFO3dCQUNULG9CQUFvQixDQUFDLGFBQWEsQ0FBQzt3QkFDbkMsMkJBQTJCLENBQUMsc0JBQXNCLENBQUM7cUJBQ3BEO2lCQUNGIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gIHByb3ZpZGVEZWZhdWx0Q29uZmlnLFxuICBwcm92aWRlRGVmYXVsdENvbmZpZ0ZhY3RvcnksXG59IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBMaXN0TW9kdWxlIH0gZnJvbSAnLi4vc2hhcmVkL2xpc3QvbGlzdC5tb2R1bGUnO1xuaW1wb3J0IHsgVXNlckFwcHJvdmVyTGlzdE1vZHVsZSB9IGZyb20gJy4vYXBwcm92ZXJzL3VzZXItYXBwcm92ZXItbGlzdC5tb2R1bGUnO1xuaW1wb3J0IHsgVXNlckNoYW5nZVBhc3N3b3JkRm9ybU1vZHVsZSB9IGZyb20gJy4vY2hhbmdlLXBhc3N3b3JkLWZvcm0vdXNlci1jaGFuZ2UtcGFzc3dvcmQtZm9ybS5tb2R1bGUnO1xuaW1wb3J0IHsgVXNlckRldGFpbHNNb2R1bGUgfSBmcm9tICcuL2RldGFpbHMvdXNlci1kZXRhaWxzLm1vZHVsZSc7XG5pbXBvcnQgeyBVc2VyRm9ybU1vZHVsZSB9IGZyb20gJy4vZm9ybS91c2VyLWZvcm0ubW9kdWxlJztcbmltcG9ydCB7IFVzZXJQZXJtaXNzaW9uTGlzdE1vZHVsZSB9IGZyb20gJy4vcGVybWlzc2lvbnMvdXNlci1wZXJtaXNzaW9uLWxpc3QubW9kdWxlJztcbmltcG9ydCB7IFVzZXJVc2VyR3JvdXBzTW9kdWxlIH0gZnJvbSAnLi91c2VyLWdyb3Vwcy91c2VyLXVzZXItZ3JvdXAtbGlzdC5tb2R1bGUnO1xuaW1wb3J0IHsgdXNlckNtc0NvbmZpZywgdXNlclRhYmxlQ29uZmlnRmFjdG9yeSB9IGZyb20gJy4vdXNlci5jb25maWcnO1xuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIExpc3RNb2R1bGUsXG4gICAgVXNlckNoYW5nZVBhc3N3b3JkRm9ybU1vZHVsZSxcbiAgICBVc2VyRGV0YWlsc01vZHVsZSxcbiAgICBVc2VyRm9ybU1vZHVsZSxcbiAgICBVc2VyUGVybWlzc2lvbkxpc3RNb2R1bGUsXG4gICAgVXNlclVzZXJHcm91cHNNb2R1bGUsXG4gICAgVXNlckFwcHJvdmVyTGlzdE1vZHVsZSxcbiAgXSxcbiAgcHJvdmlkZXJzOiBbXG4gICAgcHJvdmlkZURlZmF1bHRDb25maWcodXNlckNtc0NvbmZpZyksXG4gICAgcHJvdmlkZURlZmF1bHRDb25maWdGYWN0b3J5KHVzZXJUYWJsZUNvbmZpZ0ZhY3RvcnkpLFxuICBdLFxufSlcbmV4cG9ydCBjbGFzcyBVc2VyQ29tcG9uZW50c01vZHVsZSB7fVxuIl19