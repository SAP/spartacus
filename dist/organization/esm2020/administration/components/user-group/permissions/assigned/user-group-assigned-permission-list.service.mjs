/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { OrganizationTableType } from '../../../shared/organization.model';
import { UserGroupPermissionListService } from '../user-group-permission-list.service';
import * as i0 from "@angular/core";
export class UserGroupAssignedPermissionsListService extends UserGroupPermissionListService {
    constructor() {
        super(...arguments);
        this.tableType = OrganizationTableType.USER_GROUP_ASSIGNED_PERMISSIONS;
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
UserGroupAssignedPermissionsListService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserGroupAssignedPermissionsListService, deps: null, target: i0.ɵɵFactoryTarget.Injectable });
UserGroupAssignedPermissionsListService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserGroupAssignedPermissionsListService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserGroupAssignedPermissionsListService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci1ncm91cC1hc3NpZ25lZC1wZXJtaXNzaW9uLWxpc3Quc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9vcmdhbml6YXRpb24vYWRtaW5pc3RyYXRpb24vY29tcG9uZW50cy91c2VyLWdyb3VwL3Blcm1pc3Npb25zL2Fzc2lnbmVkL3VzZXItZ3JvdXAtYXNzaWduZWQtcGVybWlzc2lvbi1saXN0LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFJM0MsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3JDLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBQzNFLE9BQU8sRUFBRSw4QkFBOEIsRUFBRSxNQUFNLHVDQUF1QyxDQUFDOztBQUt2RixNQUFNLE9BQU8sdUNBQXdDLFNBQVEsOEJBQThCO0lBSDNGOztRQUlZLGNBQVMsR0FBRyxxQkFBcUIsQ0FBQywrQkFBK0IsQ0FBQztLQWE3RTtJQVpDOzs7T0FHRztJQUNPLElBQUksQ0FDWixVQUEyQixFQUMzQixJQUFZO1FBRVosT0FBTyxLQUFLO2FBQ1QsSUFBSSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUM7YUFDdEIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDdEQsQ0FBQzs7b0lBYlUsdUNBQXVDO3dJQUF2Qyx1Q0FBdUMsY0FGdEMsTUFBTTsyRkFFUCx1Q0FBdUM7a0JBSG5ELFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRW50aXRpZXNNb2RlbCwgUGFnaW5hdGlvbk1vZGVsIH0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7IFBlcm1pc3Npb24gfSBmcm9tICdAc3BhcnRhY3VzL29yZ2FuaXphdGlvbi9hZG1pbmlzdHJhdGlvbi9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IE9yZ2FuaXphdGlvblRhYmxlVHlwZSB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9vcmdhbml6YXRpb24ubW9kZWwnO1xuaW1wb3J0IHsgVXNlckdyb3VwUGVybWlzc2lvbkxpc3RTZXJ2aWNlIH0gZnJvbSAnLi4vdXNlci1ncm91cC1wZXJtaXNzaW9uLWxpc3Quc2VydmljZSc7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBVc2VyR3JvdXBBc3NpZ25lZFBlcm1pc3Npb25zTGlzdFNlcnZpY2UgZXh0ZW5kcyBVc2VyR3JvdXBQZXJtaXNzaW9uTGlzdFNlcnZpY2Uge1xuICBwcm90ZWN0ZWQgdGFibGVUeXBlID0gT3JnYW5pemF0aW9uVGFibGVUeXBlLlVTRVJfR1JPVVBfQVNTSUdORURfUEVSTUlTU0lPTlM7XG4gIC8qKlxuICAgKiBAb3ZlcnJpZGVcbiAgICogTG9hZCBhbGwgYjJiIHVzZXJzIGFzc2lnbmVkIHRvIHRoZSBnaXZlbiB1c2VyIGdyb3VwXG4gICAqL1xuICBwcm90ZWN0ZWQgbG9hZChcbiAgICBwYWdpbmF0aW9uOiBQYWdpbmF0aW9uTW9kZWwsXG4gICAgY29kZTogc3RyaW5nXG4gICk6IE9ic2VydmFibGU8RW50aXRpZXNNb2RlbDxQZXJtaXNzaW9uPiB8IHVuZGVmaW5lZD4ge1xuICAgIHJldHVybiBzdXBlclxuICAgICAgLmxvYWQocGFnaW5hdGlvbiwgY29kZSlcbiAgICAgIC5waXBlKG1hcCgodXNlcnMpID0+IHRoaXMuZmlsdGVyU2VsZWN0ZWQodXNlcnMpKSk7XG4gIH1cbn1cbiJdfQ==