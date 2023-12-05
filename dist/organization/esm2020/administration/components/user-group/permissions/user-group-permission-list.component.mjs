/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ListService } from '../../shared/list/list.service';
import { UserGroupPermissionListService } from './user-group-permission-list.service';
import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
import * as i2 from "../../shared/sub-list/sub-list.component";
import * as i3 from "@spartacus/core";
export class UserGroupPermissionListComponent {
}
UserGroupPermissionListComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserGroupPermissionListComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
UserGroupPermissionListComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: UserGroupPermissionListComponent, selector: "cx-org-user-group-permission-list", host: { classAttribute: "content-wrapper" }, providers: [
        {
            provide: ListService,
            useExisting: UserGroupPermissionListService,
        },
    ], ngImport: i0, template: "<cx-org-sub-list [previous]=\"false\">\n  <a actions class=\"link\" routerLink=\"../\">\n    {{ 'organization.done' | cxTranslate }}\n  </a>\n</cx-org-sub-list>\n", dependencies: [{ kind: "directive", type: i1.RouterLink, selector: "[routerLink]", inputs: ["target", "queryParams", "fragment", "queryParamsHandling", "state", "relativeTo", "preserveFragment", "skipLocationChange", "replaceUrl", "routerLink"] }, { kind: "component", type: i2.SubListComponent, selector: "cx-org-sub-list", inputs: ["previous", "key", "showHint", "routerKey"] }, { kind: "pipe", type: i3.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserGroupPermissionListComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-org-user-group-permission-list', changeDetection: ChangeDetectionStrategy.OnPush, host: { class: 'content-wrapper' }, providers: [
                        {
                            provide: ListService,
                            useExisting: UserGroupPermissionListService,
                        },
                    ], template: "<cx-org-sub-list [previous]=\"false\">\n  <a actions class=\"link\" routerLink=\"../\">\n    {{ 'organization.done' | cxTranslate }}\n  </a>\n</cx-org-sub-list>\n" }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci1ncm91cC1wZXJtaXNzaW9uLWxpc3QuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL29yZ2FuaXphdGlvbi9hZG1pbmlzdHJhdGlvbi9jb21wb25lbnRzL3VzZXItZ3JvdXAvcGVybWlzc2lvbnMvdXNlci1ncm91cC1wZXJtaXNzaW9uLWxpc3QuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL29yZ2FuaXphdGlvbi9hZG1pbmlzdHJhdGlvbi9jb21wb25lbnRzL3VzZXItZ3JvdXAvcGVybWlzc2lvbnMvdXNlci1ncm91cC1wZXJtaXNzaW9uLWxpc3QuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDbkUsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQzdELE9BQU8sRUFBRSw4QkFBOEIsRUFBRSxNQUFNLHNDQUFzQyxDQUFDOzs7OztBQWN0RixNQUFNLE9BQU8sZ0NBQWdDOzs2SEFBaEMsZ0NBQWdDO2lIQUFoQyxnQ0FBZ0MseUdBUGhDO1FBQ1Q7WUFDRSxPQUFPLEVBQUUsV0FBVztZQUNwQixXQUFXLEVBQUUsOEJBQThCO1NBQzVDO0tBQ0YsMEJDcEJILG9LQUtBOzJGRGlCYSxnQ0FBZ0M7a0JBWjVDLFNBQVM7K0JBQ0UsbUNBQW1DLG1CQUU1Qix1QkFBdUIsQ0FBQyxNQUFNLFFBQ3pDLEVBQUUsS0FBSyxFQUFFLGlCQUFpQixFQUFFLGFBQ3ZCO3dCQUNUOzRCQUNFLE9BQU8sRUFBRSxXQUFXOzRCQUNwQixXQUFXLEVBQUUsOEJBQThCO3lCQUM1QztxQkFDRiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IExpc3RTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2hhcmVkL2xpc3QvbGlzdC5zZXJ2aWNlJztcbmltcG9ydCB7IFVzZXJHcm91cFBlcm1pc3Npb25MaXN0U2VydmljZSB9IGZyb20gJy4vdXNlci1ncm91cC1wZXJtaXNzaW9uLWxpc3Quc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2N4LW9yZy11c2VyLWdyb3VwLXBlcm1pc3Npb24tbGlzdCcsXG4gIHRlbXBsYXRlVXJsOiAnLi91c2VyLWdyb3VwLXBlcm1pc3Npb24tbGlzdC5jb21wb25lbnQuaHRtbCcsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBob3N0OiB7IGNsYXNzOiAnY29udGVudC13cmFwcGVyJyB9LFxuICBwcm92aWRlcnM6IFtcbiAgICB7XG4gICAgICBwcm92aWRlOiBMaXN0U2VydmljZSxcbiAgICAgIHVzZUV4aXN0aW5nOiBVc2VyR3JvdXBQZXJtaXNzaW9uTGlzdFNlcnZpY2UsXG4gICAgfSxcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgVXNlckdyb3VwUGVybWlzc2lvbkxpc3RDb21wb25lbnQge31cbiIsIjxjeC1vcmctc3ViLWxpc3QgW3ByZXZpb3VzXT1cImZhbHNlXCI+XG4gIDxhIGFjdGlvbnMgY2xhc3M9XCJsaW5rXCIgcm91dGVyTGluaz1cIi4uL1wiPlxuICAgIHt7ICdvcmdhbml6YXRpb24uZG9uZScgfCBjeFRyYW5zbGF0ZSB9fVxuICA8L2E+XG48L2N4LW9yZy1zdWItbGlzdD5cbiJdfQ==