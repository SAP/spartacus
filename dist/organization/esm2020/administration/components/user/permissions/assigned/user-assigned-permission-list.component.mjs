/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ListService } from '../../../shared/list/list.service';
import { UserAssignedPermissionListService } from './user-assigned-permission-list.service';
import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
import * as i2 from "../../../shared/sub-list/sub-list.component";
import * as i3 from "@spartacus/core";
export class UserAssignedPermissionListComponent {
}
UserAssignedPermissionListComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserAssignedPermissionListComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
UserAssignedPermissionListComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: UserAssignedPermissionListComponent, selector: "cx-org-user-assigned-permission-list", host: { classAttribute: "content-wrapper" }, providers: [
        {
            provide: ListService,
            useExisting: UserAssignedPermissionListService,
        },
    ], ngImport: i0, template: "<cx-org-sub-list>\n  <a actions class=\"link\" routerLink=\"assign\">\n    {{ 'organization.assign' | cxTranslate }}\n  </a>\n</cx-org-sub-list>\n", dependencies: [{ kind: "directive", type: i1.RouterLink, selector: "[routerLink]", inputs: ["target", "queryParams", "fragment", "queryParamsHandling", "state", "relativeTo", "preserveFragment", "skipLocationChange", "replaceUrl", "routerLink"] }, { kind: "component", type: i2.SubListComponent, selector: "cx-org-sub-list", inputs: ["previous", "key", "showHint", "routerKey"] }, { kind: "pipe", type: i3.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserAssignedPermissionListComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-org-user-assigned-permission-list', changeDetection: ChangeDetectionStrategy.OnPush, host: { class: 'content-wrapper' }, providers: [
                        {
                            provide: ListService,
                            useExisting: UserAssignedPermissionListService,
                        },
                    ], template: "<cx-org-sub-list>\n  <a actions class=\"link\" routerLink=\"assign\">\n    {{ 'organization.assign' | cxTranslate }}\n  </a>\n</cx-org-sub-list>\n" }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci1hc3NpZ25lZC1wZXJtaXNzaW9uLWxpc3QuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL29yZ2FuaXphdGlvbi9hZG1pbmlzdHJhdGlvbi9jb21wb25lbnRzL3VzZXIvcGVybWlzc2lvbnMvYXNzaWduZWQvdXNlci1hc3NpZ25lZC1wZXJtaXNzaW9uLWxpc3QuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL29yZ2FuaXphdGlvbi9hZG1pbmlzdHJhdGlvbi9jb21wb25lbnRzL3VzZXIvcGVybWlzc2lvbnMvYXNzaWduZWQvdXNlci1hc3NpZ25lZC1wZXJtaXNzaW9uLWxpc3QuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDbkUsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBQ2hFLE9BQU8sRUFBRSxpQ0FBaUMsRUFBRSxNQUFNLHlDQUF5QyxDQUFDOzs7OztBQWM1RixNQUFNLE9BQU8sbUNBQW1DOztnSUFBbkMsbUNBQW1DO29IQUFuQyxtQ0FBbUMsNEdBUG5DO1FBQ1Q7WUFDRSxPQUFPLEVBQUUsV0FBVztZQUNwQixXQUFXLEVBQUUsaUNBQWlDO1NBQy9DO0tBQ0YsMEJDcEJILG9KQUtBOzJGRGlCYSxtQ0FBbUM7a0JBWi9DLFNBQVM7K0JBQ0Usc0NBQXNDLG1CQUUvQix1QkFBdUIsQ0FBQyxNQUFNLFFBQ3pDLEVBQUUsS0FBSyxFQUFFLGlCQUFpQixFQUFFLGFBQ3ZCO3dCQUNUOzRCQUNFLE9BQU8sRUFBRSxXQUFXOzRCQUNwQixXQUFXLEVBQUUsaUNBQWlDO3lCQUMvQztxQkFDRiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IExpc3RTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL2xpc3QvbGlzdC5zZXJ2aWNlJztcbmltcG9ydCB7IFVzZXJBc3NpZ25lZFBlcm1pc3Npb25MaXN0U2VydmljZSB9IGZyb20gJy4vdXNlci1hc3NpZ25lZC1wZXJtaXNzaW9uLWxpc3Quc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2N4LW9yZy11c2VyLWFzc2lnbmVkLXBlcm1pc3Npb24tbGlzdCcsXG4gIHRlbXBsYXRlVXJsOiAnLi91c2VyLWFzc2lnbmVkLXBlcm1pc3Npb24tbGlzdC5jb21wb25lbnQuaHRtbCcsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBob3N0OiB7IGNsYXNzOiAnY29udGVudC13cmFwcGVyJyB9LFxuICBwcm92aWRlcnM6IFtcbiAgICB7XG4gICAgICBwcm92aWRlOiBMaXN0U2VydmljZSxcbiAgICAgIHVzZUV4aXN0aW5nOiBVc2VyQXNzaWduZWRQZXJtaXNzaW9uTGlzdFNlcnZpY2UsXG4gICAgfSxcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgVXNlckFzc2lnbmVkUGVybWlzc2lvbkxpc3RDb21wb25lbnQge31cbiIsIjxjeC1vcmctc3ViLWxpc3Q+XG4gIDxhIGFjdGlvbnMgY2xhc3M9XCJsaW5rXCIgcm91dGVyTGluaz1cImFzc2lnblwiPlxuICAgIHt7ICdvcmdhbml6YXRpb24uYXNzaWduJyB8IGN4VHJhbnNsYXRlIH19XG4gIDwvYT5cbjwvY3gtb3JnLXN1Yi1saXN0PlxuIl19