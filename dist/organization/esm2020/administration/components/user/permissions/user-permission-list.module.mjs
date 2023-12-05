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
import { UserAssignedPermissionListComponent } from './assigned/user-assigned-permission-list.component';
import { UserPermissionListComponent } from './user-permission-list.component';
import * as i0 from "@angular/core";
export class UserPermissionListModule {
}
UserPermissionListModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserPermissionListModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
UserPermissionListModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: UserPermissionListModule, declarations: [UserPermissionListComponent,
        UserAssignedPermissionListComponent], imports: [ListModule, I18nModule, RouterModule, SubListModule] });
UserPermissionListModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserPermissionListModule, imports: [ListModule, I18nModule, RouterModule, SubListModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserPermissionListModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [ListModule, I18nModule, RouterModule, SubListModule],
                    declarations: [
                        UserPermissionListComponent,
                        UserAssignedPermissionListComponent,
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci1wZXJtaXNzaW9uLWxpc3QubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL29yZ2FuaXphdGlvbi9hZG1pbmlzdHJhdGlvbi9jb21wb25lbnRzL3VzZXIvcGVybWlzc2lvbnMvdXNlci1wZXJtaXNzaW9uLWxpc3QubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDN0MsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQzNELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQztBQUN0RSxPQUFPLEVBQUUsbUNBQW1DLEVBQUUsTUFBTSxvREFBb0QsQ0FBQztBQUN6RyxPQUFPLEVBQUUsMkJBQTJCLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQzs7QUFTL0UsTUFBTSxPQUFPLHdCQUF3Qjs7cUhBQXhCLHdCQUF3QjtzSEFBeEIsd0JBQXdCLGlCQUpqQywyQkFBMkI7UUFDM0IsbUNBQW1DLGFBSDNCLFVBQVUsRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLGFBQWE7c0hBTWxELHdCQUF3QixZQU56QixVQUFVLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxhQUFhOzJGQU1sRCx3QkFBd0I7a0JBUHBDLFFBQVE7bUJBQUM7b0JBQ1IsT0FBTyxFQUFFLENBQUMsVUFBVSxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsYUFBYSxDQUFDO29CQUM5RCxZQUFZLEVBQUU7d0JBQ1osMkJBQTJCO3dCQUMzQixtQ0FBbUM7cUJBQ3BDO2lCQUNGIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFJvdXRlck1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBJMThuTW9kdWxlIH0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7IExpc3RNb2R1bGUgfSBmcm9tICcuLi8uLi9zaGFyZWQvbGlzdC9saXN0Lm1vZHVsZSc7XG5pbXBvcnQgeyBTdWJMaXN0TW9kdWxlIH0gZnJvbSAnLi4vLi4vc2hhcmVkL3N1Yi1saXN0L3N1Yi1saXN0Lm1vZHVsZSc7XG5pbXBvcnQgeyBVc2VyQXNzaWduZWRQZXJtaXNzaW9uTGlzdENvbXBvbmVudCB9IGZyb20gJy4vYXNzaWduZWQvdXNlci1hc3NpZ25lZC1wZXJtaXNzaW9uLWxpc3QuY29tcG9uZW50JztcbmltcG9ydCB7IFVzZXJQZXJtaXNzaW9uTGlzdENvbXBvbmVudCB9IGZyb20gJy4vdXNlci1wZXJtaXNzaW9uLWxpc3QuY29tcG9uZW50JztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW0xpc3RNb2R1bGUsIEkxOG5Nb2R1bGUsIFJvdXRlck1vZHVsZSwgU3ViTGlzdE1vZHVsZV0sXG4gIGRlY2xhcmF0aW9uczogW1xuICAgIFVzZXJQZXJtaXNzaW9uTGlzdENvbXBvbmVudCxcbiAgICBVc2VyQXNzaWduZWRQZXJtaXNzaW9uTGlzdENvbXBvbmVudCxcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgVXNlclBlcm1pc3Npb25MaXN0TW9kdWxlIHt9XG4iXX0=