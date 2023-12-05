/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { B2BUserRole, } from '@spartacus/core';
import { map } from 'rxjs/operators';
import { OrganizationTableType } from '../../../../shared/index';
import { UnitApproverListService } from '../unit-approver-list.service';
import * as i0 from "@angular/core";
export class UnitAssignedApproverListService extends UnitApproverListService {
    constructor() {
        super(...arguments);
        this.tableType = OrganizationTableType.UNIT_ASSIGNED_APPROVERS;
    }
    load(pagination, code) {
        this.unitService.clearAssignedUsersList(code, B2BUserRole.APPROVER, pagination);
        return super
            .load(pagination, code)
            .pipe(map((users) => this.filterSelected(users)));
    }
}
UnitAssignedApproverListService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitAssignedApproverListService, deps: null, target: i0.ɵɵFactoryTarget.Injectable });
UnitAssignedApproverListService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitAssignedApproverListService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitAssignedApproverListService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidW5pdC1hc3NpZ25lZC1hcHByb3Zlci1saXN0LnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvb3JnYW5pemF0aW9uL2FkbWluaXN0cmF0aW9uL2NvbXBvbmVudHMvdW5pdC9saW5rcy9hcHByb3ZlcnMvYXNzaWduZWQvdW5pdC1hc3NpZ25lZC1hcHByb3Zlci1saXN0LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUVMLFdBQVcsR0FHWixNQUFNLGlCQUFpQixDQUFDO0FBRXpCLE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNyQyxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUNqRSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQzs7QUFLeEUsTUFBTSxPQUFPLCtCQUFnQyxTQUFRLHVCQUF1QjtJQUg1RTs7UUFJWSxjQUFTLEdBQUcscUJBQXFCLENBQUMsdUJBQXVCLENBQUM7S0FlckU7SUFiVyxJQUFJLENBQ1osVUFBMkIsRUFDM0IsSUFBWTtRQUVaLElBQUksQ0FBQyxXQUFXLENBQUMsc0JBQXNCLENBQ3JDLElBQUksRUFDSixXQUFXLENBQUMsUUFBUSxFQUNwQixVQUFVLENBQ1gsQ0FBQztRQUNGLE9BQU8sS0FBSzthQUNULElBQUksQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDO2FBQ3RCLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3RELENBQUM7OzRIQWZVLCtCQUErQjtnSUFBL0IsK0JBQStCLGNBRjlCLE1BQU07MkZBRVAsK0JBQStCO2tCQUgzQyxVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gIEIyQlVzZXIsXG4gIEIyQlVzZXJSb2xlLFxuICBFbnRpdGllc01vZGVsLFxuICBQYWdpbmF0aW9uTW9kZWwsXG59IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBPcmdhbml6YXRpb25UYWJsZVR5cGUgfSBmcm9tICcuLi8uLi8uLi8uLi9zaGFyZWQvaW5kZXgnO1xuaW1wb3J0IHsgVW5pdEFwcHJvdmVyTGlzdFNlcnZpY2UgfSBmcm9tICcuLi91bml0LWFwcHJvdmVyLWxpc3Quc2VydmljZSc7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBVbml0QXNzaWduZWRBcHByb3Zlckxpc3RTZXJ2aWNlIGV4dGVuZHMgVW5pdEFwcHJvdmVyTGlzdFNlcnZpY2Uge1xuICBwcm90ZWN0ZWQgdGFibGVUeXBlID0gT3JnYW5pemF0aW9uVGFibGVUeXBlLlVOSVRfQVNTSUdORURfQVBQUk9WRVJTO1xuXG4gIHByb3RlY3RlZCBsb2FkKFxuICAgIHBhZ2luYXRpb246IFBhZ2luYXRpb25Nb2RlbCxcbiAgICBjb2RlOiBzdHJpbmdcbiAgKTogT2JzZXJ2YWJsZTxFbnRpdGllc01vZGVsPEIyQlVzZXI+IHwgdW5kZWZpbmVkPiB7XG4gICAgdGhpcy51bml0U2VydmljZS5jbGVhckFzc2lnbmVkVXNlcnNMaXN0KFxuICAgICAgY29kZSxcbiAgICAgIEIyQlVzZXJSb2xlLkFQUFJPVkVSLFxuICAgICAgcGFnaW5hdGlvblxuICAgICk7XG4gICAgcmV0dXJuIHN1cGVyXG4gICAgICAubG9hZChwYWdpbmF0aW9uLCBjb2RlKVxuICAgICAgLnBpcGUobWFwKCh1c2VycykgPT4gdGhpcy5maWx0ZXJTZWxlY3RlZCh1c2VycykpKTtcbiAgfVxufVxuIl19