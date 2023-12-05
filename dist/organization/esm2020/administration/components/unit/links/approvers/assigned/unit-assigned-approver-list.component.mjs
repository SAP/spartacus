/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ListService } from '../../../../shared/list/list.service';
import { UnitAssignedApproverListService } from './unit-assigned-approver-list.service';
import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
import * as i2 from "../../../../shared/sub-list/sub-list.component";
import * as i3 from "@spartacus/core";
export class UnitAssignedApproverListComponent {
}
UnitAssignedApproverListComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitAssignedApproverListComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
UnitAssignedApproverListComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: UnitAssignedApproverListComponent, selector: "cx-org-unit-assigned-approver-list", host: { classAttribute: "content-wrapper" }, providers: [
        {
            provide: ListService,
            useExisting: UnitAssignedApproverListService,
        },
    ], ngImport: i0, template: "<cx-org-sub-list [showHint]=\"true\">\n  <a actions class=\"link\" routerLink=\"assign\">\n    {{ 'organization.assign' | cxTranslate }}\n  </a>\n</cx-org-sub-list>\n", dependencies: [{ kind: "directive", type: i1.RouterLink, selector: "[routerLink]", inputs: ["target", "queryParams", "fragment", "queryParamsHandling", "state", "relativeTo", "preserveFragment", "skipLocationChange", "replaceUrl", "routerLink"] }, { kind: "component", type: i2.SubListComponent, selector: "cx-org-sub-list", inputs: ["previous", "key", "showHint", "routerKey"] }, { kind: "pipe", type: i3.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitAssignedApproverListComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-org-unit-assigned-approver-list', changeDetection: ChangeDetectionStrategy.OnPush, host: { class: 'content-wrapper' }, providers: [
                        {
                            provide: ListService,
                            useExisting: UnitAssignedApproverListService,
                        },
                    ], template: "<cx-org-sub-list [showHint]=\"true\">\n  <a actions class=\"link\" routerLink=\"assign\">\n    {{ 'organization.assign' | cxTranslate }}\n  </a>\n</cx-org-sub-list>\n" }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidW5pdC1hc3NpZ25lZC1hcHByb3Zlci1saXN0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9vcmdhbml6YXRpb24vYWRtaW5pc3RyYXRpb24vY29tcG9uZW50cy91bml0L2xpbmtzL2FwcHJvdmVycy9hc3NpZ25lZC91bml0LWFzc2lnbmVkLWFwcHJvdmVyLWxpc3QuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL29yZ2FuaXphdGlvbi9hZG1pbmlzdHJhdGlvbi9jb21wb25lbnRzL3VuaXQvbGlua3MvYXBwcm92ZXJzL2Fzc2lnbmVkL3VuaXQtYXNzaWduZWQtYXBwcm92ZXItbGlzdC5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLHVCQUF1QixFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNuRSxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sc0NBQXNDLENBQUM7QUFDbkUsT0FBTyxFQUFFLCtCQUErQixFQUFFLE1BQU0sdUNBQXVDLENBQUM7Ozs7O0FBY3hGLE1BQU0sT0FBTyxpQ0FBaUM7OzhIQUFqQyxpQ0FBaUM7a0hBQWpDLGlDQUFpQywwR0FQakM7UUFDVDtZQUNFLE9BQU8sRUFBRSxXQUFXO1lBQ3BCLFdBQVcsRUFBRSwrQkFBK0I7U0FDN0M7S0FDRiwwQkNwQkgsd0tBS0E7MkZEaUJhLGlDQUFpQztrQkFaN0MsU0FBUzsrQkFDRSxvQ0FBb0MsbUJBRTdCLHVCQUF1QixDQUFDLE1BQU0sUUFDekMsRUFBRSxLQUFLLEVBQUUsaUJBQWlCLEVBQUUsYUFDdkI7d0JBQ1Q7NEJBQ0UsT0FBTyxFQUFFLFdBQVc7NEJBQ3BCLFdBQVcsRUFBRSwrQkFBK0I7eUJBQzdDO3FCQUNGIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTGlzdFNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi8uLi9zaGFyZWQvbGlzdC9saXN0LnNlcnZpY2UnO1xuaW1wb3J0IHsgVW5pdEFzc2lnbmVkQXBwcm92ZXJMaXN0U2VydmljZSB9IGZyb20gJy4vdW5pdC1hc3NpZ25lZC1hcHByb3Zlci1saXN0LnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdjeC1vcmctdW5pdC1hc3NpZ25lZC1hcHByb3Zlci1saXN0JyxcbiAgdGVtcGxhdGVVcmw6ICcuL3VuaXQtYXNzaWduZWQtYXBwcm92ZXItbGlzdC5jb21wb25lbnQuaHRtbCcsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBob3N0OiB7IGNsYXNzOiAnY29udGVudC13cmFwcGVyJyB9LFxuICBwcm92aWRlcnM6IFtcbiAgICB7XG4gICAgICBwcm92aWRlOiBMaXN0U2VydmljZSxcbiAgICAgIHVzZUV4aXN0aW5nOiBVbml0QXNzaWduZWRBcHByb3Zlckxpc3RTZXJ2aWNlLFxuICAgIH0sXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIFVuaXRBc3NpZ25lZEFwcHJvdmVyTGlzdENvbXBvbmVudCB7fVxuIiwiPGN4LW9yZy1zdWItbGlzdCBbc2hvd0hpbnRdPVwidHJ1ZVwiPlxuICA8YSBhY3Rpb25zIGNsYXNzPVwibGlua1wiIHJvdXRlckxpbms9XCJhc3NpZ25cIj5cbiAgICB7eyAnb3JnYW5pemF0aW9uLmFzc2lnbicgfCBjeFRyYW5zbGF0ZSB9fVxuICA8L2E+XG48L2N4LW9yZy1zdWItbGlzdD5cbiJdfQ==