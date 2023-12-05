/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { OrganizationTableType } from '../../shared/organization.model';
import { SubListService } from '../../shared/sub-list/sub-list.service';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/storefront";
import * as i2 from "@spartacus/organization/administration/core";
export class UserGroupPermissionListService extends SubListService {
    constructor(tableService, userGroupService, permissionService) {
        super(tableService);
        this.tableService = tableService;
        this.userGroupService = userGroupService;
        this.permissionService = permissionService;
        this.tableType = OrganizationTableType.USER_GROUP_PERMISSIONS;
        this._domainType = OrganizationTableType.PERMISSION;
    }
    /**
     *
     * @override
     * Loads all b2b users.
     *
     * @param code The user group code.
     */
    load(pagination, code) {
        return this.userGroupService.getAvailableOrderApprovalPermissions(code, pagination);
    }
    /**
     * @override
     * Assign user to the user group.
     */
    assign(userGroupCode, permissionCode) {
        this.userGroupService.assignPermission(userGroupCode, permissionCode);
        return this.permissionService.getLoadingStatus(permissionCode);
    }
    /**
     * @override
     * Unassigns the user from the user group.
     */
    unassign(userGroupCode, permissionCode) {
        this.userGroupService.unassignPermission(userGroupCode, permissionCode);
        return this.permissionService.getLoadingStatus(permissionCode);
    }
}
UserGroupPermissionListService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserGroupPermissionListService, deps: [{ token: i1.TableService }, { token: i2.UserGroupService }, { token: i2.PermissionService }], target: i0.ɵɵFactoryTarget.Injectable });
UserGroupPermissionListService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserGroupPermissionListService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserGroupPermissionListService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.TableService }, { type: i2.UserGroupService }, { type: i2.PermissionService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci1ncm91cC1wZXJtaXNzaW9uLWxpc3Quc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9vcmdhbml6YXRpb24vYWRtaW5pc3RyYXRpb24vY29tcG9uZW50cy91c2VyLWdyb3VwL3Blcm1pc3Npb25zL3VzZXItZ3JvdXAtcGVybWlzc2lvbi1saXN0LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFXM0MsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDeEUsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHdDQUF3QyxDQUFDOzs7O0FBS3hFLE1BQU0sT0FBTyw4QkFBK0IsU0FBUSxjQUEwQjtJQUk1RSxZQUNZLFlBQTBCLEVBQzFCLGdCQUFrQyxFQUNsQyxpQkFBb0M7UUFFOUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBSlYsaUJBQVksR0FBWixZQUFZLENBQWM7UUFDMUIscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUNsQyxzQkFBaUIsR0FBakIsaUJBQWlCLENBQW1CO1FBTnRDLGNBQVMsR0FBRyxxQkFBcUIsQ0FBQyxzQkFBc0IsQ0FBQztRQUN6RCxnQkFBVyxHQUFHLHFCQUFxQixDQUFDLFVBQVUsQ0FBQztJQVF6RCxDQUFDO0lBRUQ7Ozs7OztPQU1HO0lBQ08sSUFBSSxDQUNaLFVBQTJCLEVBQzNCLElBQVk7UUFFWixPQUFPLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxvQ0FBb0MsQ0FDL0QsSUFBSSxFQUNKLFVBQVUsQ0FDWCxDQUFDO0lBQ0osQ0FBQztJQUVEOzs7T0FHRztJQUNILE1BQU0sQ0FDSixhQUFxQixFQUNyQixjQUFzQjtRQUV0QixJQUFJLENBQUMsZ0JBQWdCLENBQUMsZ0JBQWdCLENBQUMsYUFBYSxFQUFFLGNBQWMsQ0FBQyxDQUFDO1FBQ3RFLE9BQU8sSUFBSSxDQUFDLGlCQUFpQixDQUFDLGdCQUFnQixDQUFDLGNBQWMsQ0FBQyxDQUFDO0lBQ2pFLENBQUM7SUFFRDs7O09BR0c7SUFDSCxRQUFRLENBQ04sYUFBcUIsRUFDckIsY0FBc0I7UUFFdEIsSUFBSSxDQUFDLGdCQUFnQixDQUFDLGtCQUFrQixDQUFDLGFBQWEsRUFBRSxjQUFjLENBQUMsQ0FBQztRQUN4RSxPQUFPLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxnQkFBZ0IsQ0FBQyxjQUFjLENBQUMsQ0FBQztJQUNqRSxDQUFDOzsySEFuRFUsOEJBQThCOytIQUE5Qiw4QkFBOEIsY0FGN0IsTUFBTTsyRkFFUCw4QkFBOEI7a0JBSDFDLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRW50aXRpZXNNb2RlbCwgUGFnaW5hdGlvbk1vZGVsIH0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7XG4gIE9yZ2FuaXphdGlvbkl0ZW1TdGF0dXMsXG4gIFBlcm1pc3Npb24sXG4gIFBlcm1pc3Npb25TZXJ2aWNlLFxuICBVc2VyR3JvdXAsXG4gIFVzZXJHcm91cFNlcnZpY2UsXG59IGZyb20gJ0BzcGFydGFjdXMvb3JnYW5pemF0aW9uL2FkbWluaXN0cmF0aW9uL2NvcmUnO1xuaW1wb3J0IHsgVGFibGVTZXJ2aWNlIH0gZnJvbSAnQHNwYXJ0YWN1cy9zdG9yZWZyb250JztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IE9yZ2FuaXphdGlvblRhYmxlVHlwZSB9IGZyb20gJy4uLy4uL3NoYXJlZC9vcmdhbml6YXRpb24ubW9kZWwnO1xuaW1wb3J0IHsgU3ViTGlzdFNlcnZpY2UgfSBmcm9tICcuLi8uLi9zaGFyZWQvc3ViLWxpc3Qvc3ViLWxpc3Quc2VydmljZSc7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBVc2VyR3JvdXBQZXJtaXNzaW9uTGlzdFNlcnZpY2UgZXh0ZW5kcyBTdWJMaXN0U2VydmljZTxQZXJtaXNzaW9uPiB7XG4gIHByb3RlY3RlZCB0YWJsZVR5cGUgPSBPcmdhbml6YXRpb25UYWJsZVR5cGUuVVNFUl9HUk9VUF9QRVJNSVNTSU9OUztcbiAgcHJvdGVjdGVkIF9kb21haW5UeXBlID0gT3JnYW5pemF0aW9uVGFibGVUeXBlLlBFUk1JU1NJT047XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJvdGVjdGVkIHRhYmxlU2VydmljZTogVGFibGVTZXJ2aWNlLFxuICAgIHByb3RlY3RlZCB1c2VyR3JvdXBTZXJ2aWNlOiBVc2VyR3JvdXBTZXJ2aWNlLFxuICAgIHByb3RlY3RlZCBwZXJtaXNzaW9uU2VydmljZTogUGVybWlzc2lvblNlcnZpY2VcbiAgKSB7XG4gICAgc3VwZXIodGFibGVTZXJ2aWNlKTtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBAb3ZlcnJpZGVcbiAgICogTG9hZHMgYWxsIGIyYiB1c2Vycy5cbiAgICpcbiAgICogQHBhcmFtIGNvZGUgVGhlIHVzZXIgZ3JvdXAgY29kZS5cbiAgICovXG4gIHByb3RlY3RlZCBsb2FkKFxuICAgIHBhZ2luYXRpb246IFBhZ2luYXRpb25Nb2RlbCxcbiAgICBjb2RlOiBzdHJpbmdcbiAgKTogT2JzZXJ2YWJsZTxFbnRpdGllc01vZGVsPFBlcm1pc3Npb24+IHwgdW5kZWZpbmVkPiB7XG4gICAgcmV0dXJuIHRoaXMudXNlckdyb3VwU2VydmljZS5nZXRBdmFpbGFibGVPcmRlckFwcHJvdmFsUGVybWlzc2lvbnMoXG4gICAgICBjb2RlLFxuICAgICAgcGFnaW5hdGlvblxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogQG92ZXJyaWRlXG4gICAqIEFzc2lnbiB1c2VyIHRvIHRoZSB1c2VyIGdyb3VwLlxuICAgKi9cbiAgYXNzaWduKFxuICAgIHVzZXJHcm91cENvZGU6IHN0cmluZyxcbiAgICBwZXJtaXNzaW9uQ29kZTogc3RyaW5nXG4gICk6IE9ic2VydmFibGU8T3JnYW5pemF0aW9uSXRlbVN0YXR1czxVc2VyR3JvdXA+PiB7XG4gICAgdGhpcy51c2VyR3JvdXBTZXJ2aWNlLmFzc2lnblBlcm1pc3Npb24odXNlckdyb3VwQ29kZSwgcGVybWlzc2lvbkNvZGUpO1xuICAgIHJldHVybiB0aGlzLnBlcm1pc3Npb25TZXJ2aWNlLmdldExvYWRpbmdTdGF0dXMocGVybWlzc2lvbkNvZGUpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBvdmVycmlkZVxuICAgKiBVbmFzc2lnbnMgdGhlIHVzZXIgZnJvbSB0aGUgdXNlciBncm91cC5cbiAgICovXG4gIHVuYXNzaWduKFxuICAgIHVzZXJHcm91cENvZGU6IHN0cmluZyxcbiAgICBwZXJtaXNzaW9uQ29kZTogc3RyaW5nXG4gICk6IE9ic2VydmFibGU8T3JnYW5pemF0aW9uSXRlbVN0YXR1czxVc2VyR3JvdXA+PiB7XG4gICAgdGhpcy51c2VyR3JvdXBTZXJ2aWNlLnVuYXNzaWduUGVybWlzc2lvbih1c2VyR3JvdXBDb2RlLCBwZXJtaXNzaW9uQ29kZSk7XG4gICAgcmV0dXJuIHRoaXMucGVybWlzc2lvblNlcnZpY2UuZ2V0TG9hZGluZ1N0YXR1cyhwZXJtaXNzaW9uQ29kZSk7XG4gIH1cbn1cbiJdfQ==