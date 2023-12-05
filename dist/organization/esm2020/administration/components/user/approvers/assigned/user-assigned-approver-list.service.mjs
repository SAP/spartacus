/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { OrganizationTableType } from '../../../shared/organization.model';
import { UserApproverListService } from '../user-approver-list.service';
import * as i0 from "@angular/core";
export class UserAssignedApproverListService extends UserApproverListService {
    constructor() {
        super(...arguments);
        this.tableType = OrganizationTableType.USER_ASSIGNED_APPROVERS;
    }
    load(pagination, code) {
        return super
            .load(pagination, code)
            .pipe(map((users) => this.filterSelected(users)));
    }
}
UserAssignedApproverListService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserAssignedApproverListService, deps: null, target: i0.ɵɵFactoryTarget.Injectable });
UserAssignedApproverListService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserAssignedApproverListService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserAssignedApproverListService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci1hc3NpZ25lZC1hcHByb3Zlci1saXN0LnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvb3JnYW5pemF0aW9uL2FkbWluaXN0cmF0aW9uL2NvbXBvbmVudHMvdXNlci9hcHByb3ZlcnMvYXNzaWduZWQvdXNlci1hc3NpZ25lZC1hcHByb3Zlci1saXN0LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFHM0MsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3JDLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBQzNFLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLCtCQUErQixDQUFDOztBQUt4RSxNQUFNLE9BQU8sK0JBQWdDLFNBQVEsdUJBQXVCO0lBSDVFOztRQUlZLGNBQVMsR0FBRyxxQkFBcUIsQ0FBQyx1QkFBdUIsQ0FBQztLQVVyRTtJQVJXLElBQUksQ0FDWixVQUEyQixFQUMzQixJQUFZO1FBRVosT0FBTyxLQUFLO2FBQ1QsSUFBSSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUM7YUFDdEIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDdEQsQ0FBQzs7NEhBVlUsK0JBQStCO2dJQUEvQiwrQkFBK0IsY0FGOUIsTUFBTTsyRkFFUCwrQkFBK0I7a0JBSDNDLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQjJCVXNlciwgRW50aXRpZXNNb2RlbCwgUGFnaW5hdGlvbk1vZGVsIH0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IE9yZ2FuaXphdGlvblRhYmxlVHlwZSB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9vcmdhbml6YXRpb24ubW9kZWwnO1xuaW1wb3J0IHsgVXNlckFwcHJvdmVyTGlzdFNlcnZpY2UgfSBmcm9tICcuLi91c2VyLWFwcHJvdmVyLWxpc3Quc2VydmljZSc7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBVc2VyQXNzaWduZWRBcHByb3Zlckxpc3RTZXJ2aWNlIGV4dGVuZHMgVXNlckFwcHJvdmVyTGlzdFNlcnZpY2Uge1xuICBwcm90ZWN0ZWQgdGFibGVUeXBlID0gT3JnYW5pemF0aW9uVGFibGVUeXBlLlVTRVJfQVNTSUdORURfQVBQUk9WRVJTO1xuXG4gIHByb3RlY3RlZCBsb2FkKFxuICAgIHBhZ2luYXRpb246IFBhZ2luYXRpb25Nb2RlbCxcbiAgICBjb2RlOiBzdHJpbmdcbiAgKTogT2JzZXJ2YWJsZTxFbnRpdGllc01vZGVsPEIyQlVzZXI+IHwgdW5kZWZpbmVkPiB7XG4gICAgcmV0dXJuIHN1cGVyXG4gICAgICAubG9hZChwYWdpbmF0aW9uLCBjb2RlKVxuICAgICAgLnBpcGUobWFwKCh1c2VycykgPT4gdGhpcy5maWx0ZXJTZWxlY3RlZCh1c2VycykpKTtcbiAgfVxufVxuIl19