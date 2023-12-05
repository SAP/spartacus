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
import { UserGroupAssignedUserListComponent } from './assigned/user-group-assigned-user-list.component';
import { UserGroupUserListComponent } from './user-group-user-list.component';
import * as i0 from "@angular/core";
export class UserGroupUserModule {
}
UserGroupUserModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserGroupUserModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
UserGroupUserModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: UserGroupUserModule, declarations: [UserGroupAssignedUserListComponent,
        UserGroupUserListComponent], imports: [CommonModule, I18nModule, RouterModule, SubListModule] });
UserGroupUserModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserGroupUserModule, imports: [CommonModule, I18nModule, RouterModule, SubListModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserGroupUserModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, I18nModule, RouterModule, SubListModule],
                    declarations: [
                        UserGroupAssignedUserListComponent,
                        UserGroupUserListComponent,
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci1ncm91cC11c2VyLWxpc3QubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL29yZ2FuaXphdGlvbi9hZG1pbmlzdHJhdGlvbi9jb21wb25lbnRzL3VzZXItZ3JvdXAvdXNlcnMvdXNlci1ncm91cC11c2VyLWxpc3QubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzdDLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQztBQUN0RSxPQUFPLEVBQUUsa0NBQWtDLEVBQUUsTUFBTSxvREFBb0QsQ0FBQztBQUN4RyxPQUFPLEVBQUUsMEJBQTBCLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQzs7QUFTOUUsTUFBTSxPQUFPLG1CQUFtQjs7Z0hBQW5CLG1CQUFtQjtpSEFBbkIsbUJBQW1CLGlCQUo1QixrQ0FBa0M7UUFDbEMsMEJBQTBCLGFBSGxCLFlBQVksRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLGFBQWE7aUhBTXBELG1CQUFtQixZQU5wQixZQUFZLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxhQUFhOzJGQU1wRCxtQkFBbUI7a0JBUC9CLFFBQVE7bUJBQUM7b0JBQ1IsT0FBTyxFQUFFLENBQUMsWUFBWSxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsYUFBYSxDQUFDO29CQUNoRSxZQUFZLEVBQUU7d0JBQ1osa0NBQWtDO3dCQUNsQywwQkFBMEI7cUJBQzNCO2lCQUNGIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBSb3V0ZXJNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgSTE4bk1vZHVsZSB9IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBTdWJMaXN0TW9kdWxlIH0gZnJvbSAnLi4vLi4vc2hhcmVkL3N1Yi1saXN0L3N1Yi1saXN0Lm1vZHVsZSc7XG5pbXBvcnQgeyBVc2VyR3JvdXBBc3NpZ25lZFVzZXJMaXN0Q29tcG9uZW50IH0gZnJvbSAnLi9hc3NpZ25lZC91c2VyLWdyb3VwLWFzc2lnbmVkLXVzZXItbGlzdC5jb21wb25lbnQnO1xuaW1wb3J0IHsgVXNlckdyb3VwVXNlckxpc3RDb21wb25lbnQgfSBmcm9tICcuL3VzZXItZ3JvdXAtdXNlci1saXN0LmNvbXBvbmVudCc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsIEkxOG5Nb2R1bGUsIFJvdXRlck1vZHVsZSwgU3ViTGlzdE1vZHVsZV0sXG4gIGRlY2xhcmF0aW9uczogW1xuICAgIFVzZXJHcm91cEFzc2lnbmVkVXNlckxpc3RDb21wb25lbnQsXG4gICAgVXNlckdyb3VwVXNlckxpc3RDb21wb25lbnQsXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIFVzZXJHcm91cFVzZXJNb2R1bGUge31cbiJdfQ==