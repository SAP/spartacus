/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { I18nModule } from '@spartacus/core';
import { SubListModule } from '../../shared/sub-list/sub-list.module';
import { UserGroupAssignedPermissionListComponent } from './assigned/user-group-assigned-permission-list.component';
import { UserGroupPermissionListComponent } from './user-group-permission-list.component';
import * as i0 from "@angular/core";
export class UserGroupPermissionModule {
}
UserGroupPermissionModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserGroupPermissionModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
UserGroupPermissionModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: UserGroupPermissionModule, declarations: [UserGroupPermissionListComponent,
        UserGroupAssignedPermissionListComponent], imports: [CommonModule, I18nModule, RouterModule, SubListModule] });
UserGroupPermissionModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserGroupPermissionModule, imports: [CommonModule, I18nModule, RouterModule, SubListModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserGroupPermissionModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, I18nModule, RouterModule, SubListModule],
                    declarations: [
                        UserGroupPermissionListComponent,
                        UserGroupAssignedPermissionListComponent,
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci1ncm91cC1wZXJtaXNzaW9uLWxpc3QubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL29yZ2FuaXphdGlvbi9hZG1pbmlzdHJhdGlvbi9jb21wb25lbnRzL3VzZXItZ3JvdXAvcGVybWlzc2lvbnMvdXNlci1ncm91cC1wZXJtaXNzaW9uLWxpc3QubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzdDLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQztBQUN0RSxPQUFPLEVBQUUsd0NBQXdDLEVBQUUsTUFBTSwwREFBMEQsQ0FBQztBQUNwSCxPQUFPLEVBQUUsZ0NBQWdDLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQzs7QUFVMUYsTUFBTSxPQUFPLHlCQUF5Qjs7c0hBQXpCLHlCQUF5Qjt1SEFBekIseUJBQXlCLGlCQUpsQyxnQ0FBZ0M7UUFDaEMsd0NBQXdDLGFBSmhDLFlBQVksRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLGFBQWE7dUhBT3BELHlCQUF5QixZQVAxQixZQUFZLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxhQUFhOzJGQU9wRCx5QkFBeUI7a0JBUnJDLFFBQVE7bUJBQUM7b0JBQ1IsT0FBTyxFQUFFLENBQUMsWUFBWSxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsYUFBYSxDQUFDO29CQUVoRSxZQUFZLEVBQUU7d0JBQ1osZ0NBQWdDO3dCQUNoQyx3Q0FBd0M7cUJBQ3pDO2lCQUNGIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBSb3V0ZXJNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgSTE4bk1vZHVsZSB9IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBTdWJMaXN0TW9kdWxlIH0gZnJvbSAnLi4vLi4vc2hhcmVkL3N1Yi1saXN0L3N1Yi1saXN0Lm1vZHVsZSc7XG5pbXBvcnQgeyBVc2VyR3JvdXBBc3NpZ25lZFBlcm1pc3Npb25MaXN0Q29tcG9uZW50IH0gZnJvbSAnLi9hc3NpZ25lZC91c2VyLWdyb3VwLWFzc2lnbmVkLXBlcm1pc3Npb24tbGlzdC5jb21wb25lbnQnO1xuaW1wb3J0IHsgVXNlckdyb3VwUGVybWlzc2lvbkxpc3RDb21wb25lbnQgfSBmcm9tICcuL3VzZXItZ3JvdXAtcGVybWlzc2lvbi1saXN0LmNvbXBvbmVudCc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsIEkxOG5Nb2R1bGUsIFJvdXRlck1vZHVsZSwgU3ViTGlzdE1vZHVsZV0sXG5cbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgVXNlckdyb3VwUGVybWlzc2lvbkxpc3RDb21wb25lbnQsXG4gICAgVXNlckdyb3VwQXNzaWduZWRQZXJtaXNzaW9uTGlzdENvbXBvbmVudCxcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgVXNlckdyb3VwUGVybWlzc2lvbk1vZHVsZSB7fVxuIl19