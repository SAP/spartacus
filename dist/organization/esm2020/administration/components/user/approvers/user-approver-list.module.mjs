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
import { UserAssignedApproverListComponent } from './assigned/user-assigned-approver-list.component';
import { UserApproverListComponent } from './user-approver-list.component';
import * as i0 from "@angular/core";
export class UserApproverListModule {
}
UserApproverListModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserApproverListModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
UserApproverListModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: UserApproverListModule, declarations: [UserApproverListComponent, UserAssignedApproverListComponent], imports: [ListModule, I18nModule, RouterModule, SubListModule] });
UserApproverListModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserApproverListModule, imports: [ListModule, I18nModule, RouterModule, SubListModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserApproverListModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [ListModule, I18nModule, RouterModule, SubListModule],
                    declarations: [UserApproverListComponent, UserAssignedApproverListComponent],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci1hcHByb3Zlci1saXN0Lm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9vcmdhbml6YXRpb24vYWRtaW5pc3RyYXRpb24vY29tcG9uZW50cy91c2VyL2FwcHJvdmVycy91c2VyLWFwcHJvdmVyLWxpc3QubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDN0MsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQzNELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQztBQUN0RSxPQUFPLEVBQUUsaUNBQWlDLEVBQUUsTUFBTSxrREFBa0QsQ0FBQztBQUNyRyxPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQzs7QUFNM0UsTUFBTSxPQUFPLHNCQUFzQjs7bUhBQXRCLHNCQUFzQjtvSEFBdEIsc0JBQXNCLGlCQUZsQix5QkFBeUIsRUFBRSxpQ0FBaUMsYUFEakUsVUFBVSxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsYUFBYTtvSEFHbEQsc0JBQXNCLFlBSHZCLFVBQVUsRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLGFBQWE7MkZBR2xELHNCQUFzQjtrQkFKbEMsUUFBUTttQkFBQztvQkFDUixPQUFPLEVBQUUsQ0FBQyxVQUFVLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxhQUFhLENBQUM7b0JBQzlELFlBQVksRUFBRSxDQUFDLHlCQUF5QixFQUFFLGlDQUFpQyxDQUFDO2lCQUM3RSIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBSb3V0ZXJNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgSTE4bk1vZHVsZSB9IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBMaXN0TW9kdWxlIH0gZnJvbSAnLi4vLi4vc2hhcmVkL2xpc3QvbGlzdC5tb2R1bGUnO1xuaW1wb3J0IHsgU3ViTGlzdE1vZHVsZSB9IGZyb20gJy4uLy4uL3NoYXJlZC9zdWItbGlzdC9zdWItbGlzdC5tb2R1bGUnO1xuaW1wb3J0IHsgVXNlckFzc2lnbmVkQXBwcm92ZXJMaXN0Q29tcG9uZW50IH0gZnJvbSAnLi9hc3NpZ25lZC91c2VyLWFzc2lnbmVkLWFwcHJvdmVyLWxpc3QuY29tcG9uZW50JztcbmltcG9ydCB7IFVzZXJBcHByb3Zlckxpc3RDb21wb25lbnQgfSBmcm9tICcuL3VzZXItYXBwcm92ZXItbGlzdC5jb21wb25lbnQnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbTGlzdE1vZHVsZSwgSTE4bk1vZHVsZSwgUm91dGVyTW9kdWxlLCBTdWJMaXN0TW9kdWxlXSxcbiAgZGVjbGFyYXRpb25zOiBbVXNlckFwcHJvdmVyTGlzdENvbXBvbmVudCwgVXNlckFzc2lnbmVkQXBwcm92ZXJMaXN0Q29tcG9uZW50XSxcbn0pXG5leHBvcnQgY2xhc3MgVXNlckFwcHJvdmVyTGlzdE1vZHVsZSB7fVxuIl19