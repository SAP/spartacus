/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { OrganizationTableType } from '../../../shared/organization.model';
import { UserPermissionListService } from '../user-permission-list.service';
import * as i0 from "@angular/core";
export class UserAssignedPermissionListService extends UserPermissionListService {
    constructor() {
        super(...arguments);
        this.tableType = OrganizationTableType.USER_ASSIGNED_PERMISSIONS;
    }
    load(pagination, code) {
        return super
            .load(pagination, code)
            .pipe(map((result) => this.filterSelected(result)));
    }
}
UserAssignedPermissionListService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserAssignedPermissionListService, deps: null, target: i0.ɵɵFactoryTarget.Injectable });
UserAssignedPermissionListService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserAssignedPermissionListService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserAssignedPermissionListService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci1hc3NpZ25lZC1wZXJtaXNzaW9uLWxpc3Quc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9vcmdhbml6YXRpb24vYWRtaW5pc3RyYXRpb24vY29tcG9uZW50cy91c2VyL3Blcm1pc3Npb25zL2Fzc2lnbmVkL3VzZXItYXNzaWduZWQtcGVybWlzc2lvbi1saXN0LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFHM0MsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3JDLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBQzNFLE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxNQUFNLGlDQUFpQyxDQUFDOztBQUs1RSxNQUFNLE9BQU8saUNBQWtDLFNBQVEseUJBQXlCO0lBSGhGOztRQUlZLGNBQVMsR0FBRyxxQkFBcUIsQ0FBQyx5QkFBeUIsQ0FBQztLQVV2RTtJQVJXLElBQUksQ0FDWixVQUEyQixFQUMzQixJQUFZO1FBRVosT0FBTyxLQUFLO2FBQ1QsSUFBSSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUM7YUFDdEIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDeEQsQ0FBQzs7OEhBVlUsaUNBQWlDO2tJQUFqQyxpQ0FBaUMsY0FGaEMsTUFBTTsyRkFFUCxpQ0FBaUM7a0JBSDdDLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQjJCVXNlciwgRW50aXRpZXNNb2RlbCwgUGFnaW5hdGlvbk1vZGVsIH0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IE9yZ2FuaXphdGlvblRhYmxlVHlwZSB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9vcmdhbml6YXRpb24ubW9kZWwnO1xuaW1wb3J0IHsgVXNlclBlcm1pc3Npb25MaXN0U2VydmljZSB9IGZyb20gJy4uL3VzZXItcGVybWlzc2lvbi1saXN0LnNlcnZpY2UnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgVXNlckFzc2lnbmVkUGVybWlzc2lvbkxpc3RTZXJ2aWNlIGV4dGVuZHMgVXNlclBlcm1pc3Npb25MaXN0U2VydmljZSB7XG4gIHByb3RlY3RlZCB0YWJsZVR5cGUgPSBPcmdhbml6YXRpb25UYWJsZVR5cGUuVVNFUl9BU1NJR05FRF9QRVJNSVNTSU9OUztcblxuICBwcm90ZWN0ZWQgbG9hZChcbiAgICBwYWdpbmF0aW9uOiBQYWdpbmF0aW9uTW9kZWwsXG4gICAgY29kZTogc3RyaW5nXG4gICk6IE9ic2VydmFibGU8RW50aXRpZXNNb2RlbDxCMkJVc2VyPiB8IHVuZGVmaW5lZD4ge1xuICAgIHJldHVybiBzdXBlclxuICAgICAgLmxvYWQocGFnaW5hdGlvbiwgY29kZSlcbiAgICAgIC5waXBlKG1hcCgocmVzdWx0KSA9PiB0aGlzLmZpbHRlclNlbGVjdGVkKHJlc3VsdCkpKTtcbiAgfVxufVxuIl19