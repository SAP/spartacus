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
export class UserUserGroupListService extends SubListService {
    constructor(tableService, userService, userGroupService) {
        super(tableService);
        this.tableService = tableService;
        this.userService = userService;
        this.userGroupService = userGroupService;
        this.tableType = OrganizationTableType.USER_USER_GROUPS;
        this._domainType = OrganizationTableType.USER_GROUP;
    }
    load(pagination, code) {
        return this.userService.getUserGroups(code, pagination);
    }
    /**
     * @override
     * Assign user group to the user.
     */
    assign(userCode, userGroupCode) {
        this.userService.assignUserGroup(userCode, userGroupCode);
        return this.userGroupService.getLoadingStatus(userGroupCode);
    }
    /**
     * @override
     * Unassign the user group from the user.
     */
    unassign(userCode, userGroupCode) {
        this.userService.unassignUserGroup(userCode, userGroupCode);
        return this.userGroupService.getLoadingStatus(userGroupCode);
    }
}
UserUserGroupListService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserUserGroupListService, deps: [{ token: i1.TableService }, { token: i2.B2BUserService }, { token: i2.UserGroupService }], target: i0.ɵɵFactoryTarget.Injectable });
UserUserGroupListService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserUserGroupListService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserUserGroupListService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.TableService }, { type: i2.B2BUserService }, { type: i2.UserGroupService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci11c2VyLWdyb3VwLWxpc3Quc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9vcmdhbml6YXRpb24vYWRtaW5pc3RyYXRpb24vY29tcG9uZW50cy91c2VyL3VzZXItZ3JvdXBzL3VzZXItdXNlci1ncm91cC1saXN0LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFVM0MsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDeEUsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHdDQUF3QyxDQUFDOzs7O0FBS3hFLE1BQU0sT0FBTyx3QkFBeUIsU0FBUSxjQUF5QjtJQUlyRSxZQUNZLFlBQTBCLEVBQzFCLFdBQTJCLEVBQzNCLGdCQUFrQztRQUU1QyxLQUFLLENBQUMsWUFBWSxDQUFDLENBQUM7UUFKVixpQkFBWSxHQUFaLFlBQVksQ0FBYztRQUMxQixnQkFBVyxHQUFYLFdBQVcsQ0FBZ0I7UUFDM0IscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQU5wQyxjQUFTLEdBQUcscUJBQXFCLENBQUMsZ0JBQWdCLENBQUM7UUFDbkQsZ0JBQVcsR0FBRyxxQkFBcUIsQ0FBQyxVQUFVLENBQUM7SUFRekQsQ0FBQztJQUVTLElBQUksQ0FDWixVQUEyQixFQUMzQixJQUFZO1FBRVosT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxJQUFJLEVBQUUsVUFBVSxDQUFDLENBQUM7SUFDMUQsQ0FBQztJQUVEOzs7T0FHRztJQUNILE1BQU0sQ0FDSixRQUFnQixFQUNoQixhQUFxQjtRQUVyQixJQUFJLENBQUMsV0FBVyxDQUFDLGVBQWUsQ0FBQyxRQUFRLEVBQUUsYUFBYSxDQUFDLENBQUM7UUFDMUQsT0FBTyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsZ0JBQWdCLENBQUMsYUFBYSxDQUFDLENBQUM7SUFDL0QsQ0FBQztJQUVEOzs7T0FHRztJQUNILFFBQVEsQ0FDTixRQUFnQixFQUNoQixhQUFxQjtRQUVyQixJQUFJLENBQUMsV0FBVyxDQUFDLGlCQUFpQixDQUFDLFFBQVEsRUFBRSxhQUFhLENBQUMsQ0FBQztRQUM1RCxPQUFPLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxnQkFBZ0IsQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUMvRCxDQUFDOztxSEF6Q1Usd0JBQXdCO3lIQUF4Qix3QkFBd0IsY0FGdkIsTUFBTTsyRkFFUCx3QkFBd0I7a0JBSHBDLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRW50aXRpZXNNb2RlbCwgUGFnaW5hdGlvbk1vZGVsIH0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7XG4gIEIyQlVzZXJTZXJ2aWNlLFxuICBPcmdhbml6YXRpb25JdGVtU3RhdHVzLFxuICBVc2VyR3JvdXAsXG4gIFVzZXJHcm91cFNlcnZpY2UsXG59IGZyb20gJ0BzcGFydGFjdXMvb3JnYW5pemF0aW9uL2FkbWluaXN0cmF0aW9uL2NvcmUnO1xuaW1wb3J0IHsgVGFibGVTZXJ2aWNlIH0gZnJvbSAnQHNwYXJ0YWN1cy9zdG9yZWZyb250JztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IE9yZ2FuaXphdGlvblRhYmxlVHlwZSB9IGZyb20gJy4uLy4uL3NoYXJlZC9vcmdhbml6YXRpb24ubW9kZWwnO1xuaW1wb3J0IHsgU3ViTGlzdFNlcnZpY2UgfSBmcm9tICcuLi8uLi9zaGFyZWQvc3ViLWxpc3Qvc3ViLWxpc3Quc2VydmljZSc7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBVc2VyVXNlckdyb3VwTGlzdFNlcnZpY2UgZXh0ZW5kcyBTdWJMaXN0U2VydmljZTxVc2VyR3JvdXA+IHtcbiAgcHJvdGVjdGVkIHRhYmxlVHlwZSA9IE9yZ2FuaXphdGlvblRhYmxlVHlwZS5VU0VSX1VTRVJfR1JPVVBTO1xuICBwcm90ZWN0ZWQgX2RvbWFpblR5cGUgPSBPcmdhbml6YXRpb25UYWJsZVR5cGUuVVNFUl9HUk9VUDtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcm90ZWN0ZWQgdGFibGVTZXJ2aWNlOiBUYWJsZVNlcnZpY2UsXG4gICAgcHJvdGVjdGVkIHVzZXJTZXJ2aWNlOiBCMkJVc2VyU2VydmljZSxcbiAgICBwcm90ZWN0ZWQgdXNlckdyb3VwU2VydmljZTogVXNlckdyb3VwU2VydmljZVxuICApIHtcbiAgICBzdXBlcih0YWJsZVNlcnZpY2UpO1xuICB9XG5cbiAgcHJvdGVjdGVkIGxvYWQoXG4gICAgcGFnaW5hdGlvbjogUGFnaW5hdGlvbk1vZGVsLFxuICAgIGNvZGU6IHN0cmluZ1xuICApOiBPYnNlcnZhYmxlPEVudGl0aWVzTW9kZWw8VXNlckdyb3VwPiB8IHVuZGVmaW5lZD4ge1xuICAgIHJldHVybiB0aGlzLnVzZXJTZXJ2aWNlLmdldFVzZXJHcm91cHMoY29kZSwgcGFnaW5hdGlvbik7XG4gIH1cblxuICAvKipcbiAgICogQG92ZXJyaWRlXG4gICAqIEFzc2lnbiB1c2VyIGdyb3VwIHRvIHRoZSB1c2VyLlxuICAgKi9cbiAgYXNzaWduKFxuICAgIHVzZXJDb2RlOiBzdHJpbmcsXG4gICAgdXNlckdyb3VwQ29kZTogc3RyaW5nXG4gICk6IE9ic2VydmFibGU8T3JnYW5pemF0aW9uSXRlbVN0YXR1czxVc2VyR3JvdXA+PiB7XG4gICAgdGhpcy51c2VyU2VydmljZS5hc3NpZ25Vc2VyR3JvdXAodXNlckNvZGUsIHVzZXJHcm91cENvZGUpO1xuICAgIHJldHVybiB0aGlzLnVzZXJHcm91cFNlcnZpY2UuZ2V0TG9hZGluZ1N0YXR1cyh1c2VyR3JvdXBDb2RlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAb3ZlcnJpZGVcbiAgICogVW5hc3NpZ24gdGhlIHVzZXIgZ3JvdXAgZnJvbSB0aGUgdXNlci5cbiAgICovXG4gIHVuYXNzaWduKFxuICAgIHVzZXJDb2RlOiBzdHJpbmcsXG4gICAgdXNlckdyb3VwQ29kZTogc3RyaW5nXG4gICk6IE9ic2VydmFibGU8T3JnYW5pemF0aW9uSXRlbVN0YXR1czxVc2VyR3JvdXA+PiB7XG4gICAgdGhpcy51c2VyU2VydmljZS51bmFzc2lnblVzZXJHcm91cCh1c2VyQ29kZSwgdXNlckdyb3VwQ29kZSk7XG4gICAgcmV0dXJuIHRoaXMudXNlckdyb3VwU2VydmljZS5nZXRMb2FkaW5nU3RhdHVzKHVzZXJHcm91cENvZGUpO1xuICB9XG59XG4iXX0=