/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ListService } from '../../../shared/list/list.service';
import { UserGroupAssignedPermissionsListService } from './user-group-assigned-permission-list.service';
import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
import * as i2 from "../../../shared/sub-list/sub-list.component";
import * as i3 from "@spartacus/core";
export class UserGroupAssignedPermissionListComponent {
}
UserGroupAssignedPermissionListComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserGroupAssignedPermissionListComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
UserGroupAssignedPermissionListComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: UserGroupAssignedPermissionListComponent, selector: "cx-org-user-group-assigned-permission-list", host: { classAttribute: "content-wrapper" }, providers: [
        {
            provide: ListService,
            useExisting: UserGroupAssignedPermissionsListService,
        },
    ], ngImport: i0, template: "<cx-org-sub-list>\n  <a actions class=\"link\" routerLink=\"assign\">\n    {{ 'organization.assign' | cxTranslate }}\n  </a>\n</cx-org-sub-list>\n", dependencies: [{ kind: "directive", type: i1.RouterLink, selector: "[routerLink]", inputs: ["target", "queryParams", "fragment", "queryParamsHandling", "state", "relativeTo", "preserveFragment", "skipLocationChange", "replaceUrl", "routerLink"] }, { kind: "component", type: i2.SubListComponent, selector: "cx-org-sub-list", inputs: ["previous", "key", "showHint", "routerKey"] }, { kind: "pipe", type: i3.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserGroupAssignedPermissionListComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-org-user-group-assigned-permission-list', changeDetection: ChangeDetectionStrategy.OnPush, host: { class: 'content-wrapper' }, providers: [
                        {
                            provide: ListService,
                            useExisting: UserGroupAssignedPermissionsListService,
                        },
                    ], template: "<cx-org-sub-list>\n  <a actions class=\"link\" routerLink=\"assign\">\n    {{ 'organization.assign' | cxTranslate }}\n  </a>\n</cx-org-sub-list>\n" }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci1ncm91cC1hc3NpZ25lZC1wZXJtaXNzaW9uLWxpc3QuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL29yZ2FuaXphdGlvbi9hZG1pbmlzdHJhdGlvbi9jb21wb25lbnRzL3VzZXItZ3JvdXAvcGVybWlzc2lvbnMvYXNzaWduZWQvdXNlci1ncm91cC1hc3NpZ25lZC1wZXJtaXNzaW9uLWxpc3QuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL29yZ2FuaXphdGlvbi9hZG1pbmlzdHJhdGlvbi9jb21wb25lbnRzL3VzZXItZ3JvdXAvcGVybWlzc2lvbnMvYXNzaWduZWQvdXNlci1ncm91cC1hc3NpZ25lZC1wZXJtaXNzaW9uLWxpc3QuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDbkUsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBQ2hFLE9BQU8sRUFBRSx1Q0FBdUMsRUFBRSxNQUFNLCtDQUErQyxDQUFDOzs7OztBQWN4RyxNQUFNLE9BQU8sd0NBQXdDOztxSUFBeEMsd0NBQXdDO3lIQUF4Qyx3Q0FBd0Msa0hBUHhDO1FBQ1Q7WUFDRSxPQUFPLEVBQUUsV0FBVztZQUNwQixXQUFXLEVBQUUsdUNBQXVDO1NBQ3JEO0tBQ0YsMEJDcEJILG9KQUtBOzJGRGlCYSx3Q0FBd0M7a0JBWnBELFNBQVM7K0JBQ0UsNENBQTRDLG1CQUVyQyx1QkFBdUIsQ0FBQyxNQUFNLFFBQ3pDLEVBQUUsS0FBSyxFQUFFLGlCQUFpQixFQUFFLGFBQ3ZCO3dCQUNUOzRCQUNFLE9BQU8sRUFBRSxXQUFXOzRCQUNwQixXQUFXLEVBQUUsdUNBQXVDO3lCQUNyRDtxQkFDRiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IExpc3RTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL2xpc3QvbGlzdC5zZXJ2aWNlJztcbmltcG9ydCB7IFVzZXJHcm91cEFzc2lnbmVkUGVybWlzc2lvbnNMaXN0U2VydmljZSB9IGZyb20gJy4vdXNlci1ncm91cC1hc3NpZ25lZC1wZXJtaXNzaW9uLWxpc3Quc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2N4LW9yZy11c2VyLWdyb3VwLWFzc2lnbmVkLXBlcm1pc3Npb24tbGlzdCcsXG4gIHRlbXBsYXRlVXJsOiAnLi91c2VyLWdyb3VwLWFzc2lnbmVkLXBlcm1pc3Npb24tbGlzdC5jb21wb25lbnQuaHRtbCcsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBob3N0OiB7IGNsYXNzOiAnY29udGVudC13cmFwcGVyJyB9LFxuICBwcm92aWRlcnM6IFtcbiAgICB7XG4gICAgICBwcm92aWRlOiBMaXN0U2VydmljZSxcbiAgICAgIHVzZUV4aXN0aW5nOiBVc2VyR3JvdXBBc3NpZ25lZFBlcm1pc3Npb25zTGlzdFNlcnZpY2UsXG4gICAgfSxcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgVXNlckdyb3VwQXNzaWduZWRQZXJtaXNzaW9uTGlzdENvbXBvbmVudCB7fVxuIiwiPGN4LW9yZy1zdWItbGlzdD5cbiAgPGEgYWN0aW9ucyBjbGFzcz1cImxpbmtcIiByb3V0ZXJMaW5rPVwiYXNzaWduXCI+XG4gICAge3sgJ29yZ2FuaXphdGlvbi5hc3NpZ24nIHwgY3hUcmFuc2xhdGUgfX1cbiAgPC9hPlxuPC9jeC1vcmctc3ViLWxpc3Q+XG4iXX0=