/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { OrganizationTableType } from '../../../shared/organization.model';
import { UserGroupUserListService } from '../user-group-user-list.service';
import * as i0 from "@angular/core";
export class UserGroupAssignedUserListService extends UserGroupUserListService {
    constructor() {
        super(...arguments);
        this.tableType = OrganizationTableType.USER_GROUP_ASSIGNED_USERS;
    }
    /**
     * @override
     * Load all b2b users assigned to the given user group
     */
    load(pagination, code) {
        return super
            .load(pagination, code)
            .pipe(map((users) => this.filterSelected(users)));
    }
}
UserGroupAssignedUserListService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserGroupAssignedUserListService, deps: null, target: i0.ɵɵFactoryTarget.Injectable });
UserGroupAssignedUserListService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserGroupAssignedUserListService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserGroupAssignedUserListService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci1ncm91cC1hc3NpZ25lZC11c2VyLWxpc3Quc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9vcmdhbml6YXRpb24vYWRtaW5pc3RyYXRpb24vY29tcG9uZW50cy91c2VyLWdyb3VwL3VzZXJzL2Fzc2lnbmVkL3VzZXItZ3JvdXAtYXNzaWduZWQtdXNlci1saXN0LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFHM0MsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3JDLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBQzNFLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLGlDQUFpQyxDQUFDOztBQUszRSxNQUFNLE9BQU8sZ0NBQWlDLFNBQVEsd0JBQXdCO0lBSDlFOztRQUlZLGNBQVMsR0FBRyxxQkFBcUIsQ0FBQyx5QkFBeUIsQ0FBQztLQWF2RTtJQVpDOzs7T0FHRztJQUNPLElBQUksQ0FDWixVQUEyQixFQUMzQixJQUFZO1FBRVosT0FBTyxLQUFLO2FBQ1QsSUFBSSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUM7YUFDdEIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDdEQsQ0FBQzs7NkhBYlUsZ0NBQWdDO2lJQUFoQyxnQ0FBZ0MsY0FGL0IsTUFBTTsyRkFFUCxnQ0FBZ0M7a0JBSDVDLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQjJCVXNlciwgRW50aXRpZXNNb2RlbCwgUGFnaW5hdGlvbk1vZGVsIH0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IE9yZ2FuaXphdGlvblRhYmxlVHlwZSB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9vcmdhbml6YXRpb24ubW9kZWwnO1xuaW1wb3J0IHsgVXNlckdyb3VwVXNlckxpc3RTZXJ2aWNlIH0gZnJvbSAnLi4vdXNlci1ncm91cC11c2VyLWxpc3Quc2VydmljZSc7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBVc2VyR3JvdXBBc3NpZ25lZFVzZXJMaXN0U2VydmljZSBleHRlbmRzIFVzZXJHcm91cFVzZXJMaXN0U2VydmljZSB7XG4gIHByb3RlY3RlZCB0YWJsZVR5cGUgPSBPcmdhbml6YXRpb25UYWJsZVR5cGUuVVNFUl9HUk9VUF9BU1NJR05FRF9VU0VSUztcbiAgLyoqXG4gICAqIEBvdmVycmlkZVxuICAgKiBMb2FkIGFsbCBiMmIgdXNlcnMgYXNzaWduZWQgdG8gdGhlIGdpdmVuIHVzZXIgZ3JvdXBcbiAgICovXG4gIHByb3RlY3RlZCBsb2FkKFxuICAgIHBhZ2luYXRpb246IFBhZ2luYXRpb25Nb2RlbCxcbiAgICBjb2RlOiBzdHJpbmdcbiAgKTogT2JzZXJ2YWJsZTxFbnRpdGllc01vZGVsPEIyQlVzZXI+IHwgdW5kZWZpbmVkPiB7XG4gICAgcmV0dXJuIHN1cGVyXG4gICAgICAubG9hZChwYWdpbmF0aW9uLCBjb2RlKVxuICAgICAgLnBpcGUobWFwKCh1c2VycykgPT4gdGhpcy5maWx0ZXJTZWxlY3RlZCh1c2VycykpKTtcbiAgfVxufVxuIl19