/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { I18nModule } from '@spartacus/core';
import { ListModule } from '../../shared/list/list.module';
import { SubListModule } from '../../shared/sub-list/sub-list.module';
import { UserAssignedUserGroupListComponent } from './assigned/user-assigned-user-group-list.component';
import { UserUserGroupListComponent } from './user-user-group-list.component';
import * as i0 from "@angular/core";
export class UserUserGroupsModule {
}
UserUserGroupsModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserUserGroupsModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
UserUserGroupsModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: UserUserGroupsModule, declarations: [UserUserGroupListComponent,
        UserAssignedUserGroupListComponent], imports: [ListModule, I18nModule, RouterModule, SubListModule] });
UserUserGroupsModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserUserGroupsModule, imports: [ListModule, I18nModule, RouterModule, SubListModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserUserGroupsModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [ListModule, I18nModule, RouterModule, SubListModule],
                    declarations: [
                        UserUserGroupListComponent,
                        UserAssignedUserGroupListComponent,
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci11c2VyLWdyb3VwLWxpc3QubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL29yZ2FuaXphdGlvbi9hZG1pbmlzdHJhdGlvbi9jb21wb25lbnRzL3VzZXIvdXNlci1ncm91cHMvdXNlci11c2VyLWdyb3VwLWxpc3QubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDN0MsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQzNELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQztBQUN0RSxPQUFPLEVBQUUsa0NBQWtDLEVBQUUsTUFBTSxvREFBb0QsQ0FBQztBQUN4RyxPQUFPLEVBQUUsMEJBQTBCLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQzs7QUFTOUUsTUFBTSxPQUFPLG9CQUFvQjs7aUhBQXBCLG9CQUFvQjtrSEFBcEIsb0JBQW9CLGlCQUo3QiwwQkFBMEI7UUFDMUIsa0NBQWtDLGFBSDFCLFVBQVUsRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLGFBQWE7a0hBTWxELG9CQUFvQixZQU5yQixVQUFVLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxhQUFhOzJGQU1sRCxvQkFBb0I7a0JBUGhDLFFBQVE7bUJBQUM7b0JBQ1IsT0FBTyxFQUFFLENBQUMsVUFBVSxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsYUFBYSxDQUFDO29CQUM5RCxZQUFZLEVBQUU7d0JBQ1osMEJBQTBCO3dCQUMxQixrQ0FBa0M7cUJBQ25DO2lCQUNGIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFJvdXRlck1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBJMThuTW9kdWxlIH0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7IExpc3RNb2R1bGUgfSBmcm9tICcuLi8uLi9zaGFyZWQvbGlzdC9saXN0Lm1vZHVsZSc7XG5pbXBvcnQgeyBTdWJMaXN0TW9kdWxlIH0gZnJvbSAnLi4vLi4vc2hhcmVkL3N1Yi1saXN0L3N1Yi1saXN0Lm1vZHVsZSc7XG5pbXBvcnQgeyBVc2VyQXNzaWduZWRVc2VyR3JvdXBMaXN0Q29tcG9uZW50IH0gZnJvbSAnLi9hc3NpZ25lZC91c2VyLWFzc2lnbmVkLXVzZXItZ3JvdXAtbGlzdC5jb21wb25lbnQnO1xuaW1wb3J0IHsgVXNlclVzZXJHcm91cExpc3RDb21wb25lbnQgfSBmcm9tICcuL3VzZXItdXNlci1ncm91cC1saXN0LmNvbXBvbmVudCc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtMaXN0TW9kdWxlLCBJMThuTW9kdWxlLCBSb3V0ZXJNb2R1bGUsIFN1Ykxpc3RNb2R1bGVdLFxuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBVc2VyVXNlckdyb3VwTGlzdENvbXBvbmVudCxcbiAgICBVc2VyQXNzaWduZWRVc2VyR3JvdXBMaXN0Q29tcG9uZW50LFxuICBdLFxufSlcbmV4cG9ydCBjbGFzcyBVc2VyVXNlckdyb3Vwc01vZHVsZSB7fVxuIl19