/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ListService } from '../../../shared/list/list.service';
import { UserGroupAssignedUserListService } from './user-group-assigned-user-list.service';
import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
import * as i2 from "../../../shared/sub-list/sub-list.component";
import * as i3 from "@spartacus/core";
export class UserGroupAssignedUserListComponent {
}
UserGroupAssignedUserListComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserGroupAssignedUserListComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
UserGroupAssignedUserListComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: UserGroupAssignedUserListComponent, selector: "cx-org-user-group-assigned-user-list", host: { classAttribute: "content-wrapper" }, providers: [
        {
            provide: ListService,
            useExisting: UserGroupAssignedUserListService,
        },
    ], ngImport: i0, template: "<cx-org-sub-list>\n  <a actions class=\"link\" routerLink=\"assign\">\n    {{ 'organization.assign' | cxTranslate }}\n  </a>\n</cx-org-sub-list>\n", dependencies: [{ kind: "directive", type: i1.RouterLink, selector: "[routerLink]", inputs: ["target", "queryParams", "fragment", "queryParamsHandling", "state", "relativeTo", "preserveFragment", "skipLocationChange", "replaceUrl", "routerLink"] }, { kind: "component", type: i2.SubListComponent, selector: "cx-org-sub-list", inputs: ["previous", "key", "showHint", "routerKey"] }, { kind: "pipe", type: i3.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserGroupAssignedUserListComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-org-user-group-assigned-user-list', changeDetection: ChangeDetectionStrategy.OnPush, host: { class: 'content-wrapper' }, providers: [
                        {
                            provide: ListService,
                            useExisting: UserGroupAssignedUserListService,
                        },
                    ], template: "<cx-org-sub-list>\n  <a actions class=\"link\" routerLink=\"assign\">\n    {{ 'organization.assign' | cxTranslate }}\n  </a>\n</cx-org-sub-list>\n" }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci1ncm91cC1hc3NpZ25lZC11c2VyLWxpc3QuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL29yZ2FuaXphdGlvbi9hZG1pbmlzdHJhdGlvbi9jb21wb25lbnRzL3VzZXItZ3JvdXAvdXNlcnMvYXNzaWduZWQvdXNlci1ncm91cC1hc3NpZ25lZC11c2VyLWxpc3QuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL29yZ2FuaXphdGlvbi9hZG1pbmlzdHJhdGlvbi9jb21wb25lbnRzL3VzZXItZ3JvdXAvdXNlcnMvYXNzaWduZWQvdXNlci1ncm91cC1hc3NpZ25lZC11c2VyLWxpc3QuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDbkUsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBQ2hFLE9BQU8sRUFBRSxnQ0FBZ0MsRUFBRSxNQUFNLHlDQUF5QyxDQUFDOzs7OztBQWMzRixNQUFNLE9BQU8sa0NBQWtDOzsrSEFBbEMsa0NBQWtDO21IQUFsQyxrQ0FBa0MsNEdBUGxDO1FBQ1Q7WUFDRSxPQUFPLEVBQUUsV0FBVztZQUNwQixXQUFXLEVBQUUsZ0NBQWdDO1NBQzlDO0tBQ0YsMEJDcEJILG9KQUtBOzJGRGlCYSxrQ0FBa0M7a0JBWjlDLFNBQVM7K0JBQ0Usc0NBQXNDLG1CQUUvQix1QkFBdUIsQ0FBQyxNQUFNLFFBQ3pDLEVBQUUsS0FBSyxFQUFFLGlCQUFpQixFQUFFLGFBQ3ZCO3dCQUNUOzRCQUNFLE9BQU8sRUFBRSxXQUFXOzRCQUNwQixXQUFXLEVBQUUsZ0NBQWdDO3lCQUM5QztxQkFDRiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IExpc3RTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL2xpc3QvbGlzdC5zZXJ2aWNlJztcbmltcG9ydCB7IFVzZXJHcm91cEFzc2lnbmVkVXNlckxpc3RTZXJ2aWNlIH0gZnJvbSAnLi91c2VyLWdyb3VwLWFzc2lnbmVkLXVzZXItbGlzdC5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnY3gtb3JnLXVzZXItZ3JvdXAtYXNzaWduZWQtdXNlci1saXN0JyxcbiAgdGVtcGxhdGVVcmw6ICcuL3VzZXItZ3JvdXAtYXNzaWduZWQtdXNlci1saXN0LmNvbXBvbmVudC5odG1sJyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIGhvc3Q6IHsgY2xhc3M6ICdjb250ZW50LXdyYXBwZXInIH0sXG4gIHByb3ZpZGVyczogW1xuICAgIHtcbiAgICAgIHByb3ZpZGU6IExpc3RTZXJ2aWNlLFxuICAgICAgdXNlRXhpc3Rpbmc6IFVzZXJHcm91cEFzc2lnbmVkVXNlckxpc3RTZXJ2aWNlLFxuICAgIH0sXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIFVzZXJHcm91cEFzc2lnbmVkVXNlckxpc3RDb21wb25lbnQge31cbiIsIjxjeC1vcmctc3ViLWxpc3Q+XG4gIDxhIGFjdGlvbnMgY2xhc3M9XCJsaW5rXCIgcm91dGVyTGluaz1cImFzc2lnblwiPlxuICAgIHt7ICdvcmdhbml6YXRpb24uYXNzaWduJyB8IGN4VHJhbnNsYXRlIH19XG4gIDwvYT5cbjwvY3gtb3JnLXN1Yi1saXN0PlxuIl19