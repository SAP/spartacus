/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { I18nModule } from '@spartacus/core';
import { SubListModule } from '../../../shared/sub-list/sub-list.module';
import { UnitAssignedApproverListComponent } from './assigned/unit-assigned-approver-list.component';
import { UnitApproverListComponent } from './unit-approver-list.component';
import * as i0 from "@angular/core";
export class UnitApproverListModule {
}
UnitApproverListModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitApproverListModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
UnitApproverListModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: UnitApproverListModule, declarations: [UnitApproverListComponent, UnitAssignedApproverListComponent], imports: [I18nModule, RouterModule, SubListModule] });
UnitApproverListModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitApproverListModule, imports: [I18nModule, RouterModule, SubListModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitApproverListModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [I18nModule, RouterModule, SubListModule],
                    declarations: [UnitApproverListComponent, UnitAssignedApproverListComponent],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidW5pdC1hcHByb3Zlci1saXN0Lm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9vcmdhbml6YXRpb24vYWRtaW5pc3RyYXRpb24vY29tcG9uZW50cy91bml0L2xpbmtzL2FwcHJvdmVycy91bml0LWFwcHJvdmVyLWxpc3QubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDN0MsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLDBDQUEwQyxDQUFDO0FBQ3pFLE9BQU8sRUFBRSxpQ0FBaUMsRUFBRSxNQUFNLGtEQUFrRCxDQUFDO0FBQ3JHLE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxNQUFNLGdDQUFnQyxDQUFDOztBQU0zRSxNQUFNLE9BQU8sc0JBQXNCOzttSEFBdEIsc0JBQXNCO29IQUF0QixzQkFBc0IsaUJBRmxCLHlCQUF5QixFQUFFLGlDQUFpQyxhQURqRSxVQUFVLEVBQUUsWUFBWSxFQUFFLGFBQWE7b0hBR3RDLHNCQUFzQixZQUh2QixVQUFVLEVBQUUsWUFBWSxFQUFFLGFBQWE7MkZBR3RDLHNCQUFzQjtrQkFKbEMsUUFBUTttQkFBQztvQkFDUixPQUFPLEVBQUUsQ0FBQyxVQUFVLEVBQUUsWUFBWSxFQUFFLGFBQWEsQ0FBQztvQkFDbEQsWUFBWSxFQUFFLENBQUMseUJBQXlCLEVBQUUsaUNBQWlDLENBQUM7aUJBQzdFIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFJvdXRlck1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBJMThuTW9kdWxlIH0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7IFN1Ykxpc3RNb2R1bGUgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvc3ViLWxpc3Qvc3ViLWxpc3QubW9kdWxlJztcbmltcG9ydCB7IFVuaXRBc3NpZ25lZEFwcHJvdmVyTGlzdENvbXBvbmVudCB9IGZyb20gJy4vYXNzaWduZWQvdW5pdC1hc3NpZ25lZC1hcHByb3Zlci1saXN0LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBVbml0QXBwcm92ZXJMaXN0Q29tcG9uZW50IH0gZnJvbSAnLi91bml0LWFwcHJvdmVyLWxpc3QuY29tcG9uZW50JztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW0kxOG5Nb2R1bGUsIFJvdXRlck1vZHVsZSwgU3ViTGlzdE1vZHVsZV0sXG4gIGRlY2xhcmF0aW9uczogW1VuaXRBcHByb3Zlckxpc3RDb21wb25lbnQsIFVuaXRBc3NpZ25lZEFwcHJvdmVyTGlzdENvbXBvbmVudF0sXG59KVxuZXhwb3J0IGNsYXNzIFVuaXRBcHByb3Zlckxpc3RNb2R1bGUge31cbiJdfQ==