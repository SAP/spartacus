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
export class UserPermissionListService extends SubListService {
    constructor(tableService, userService, permissionService) {
        super(tableService);
        this.tableService = tableService;
        this.userService = userService;
        this.permissionService = permissionService;
        this.tableType = OrganizationTableType.USER_PERMISSIONS;
        this._domainType = OrganizationTableType.PERMISSION;
    }
    load(pagination, code) {
        return this.userService.getPermissions(code, pagination);
    }
    /**
     * @override
     * Assign permission to the user.
     */
    assign(userCode, code) {
        this.userService.assignPermission(userCode, code);
        return this.permissionService.getLoadingStatus(code);
    }
    /**
     * @override
     * Unassign the permission from the user.
     */
    unassign(userCode, code) {
        this.userService.unassignPermission(userCode, code);
        return this.permissionService.getLoadingStatus(code);
    }
}
UserPermissionListService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserPermissionListService, deps: [{ token: i1.TableService }, { token: i2.B2BUserService }, { token: i2.PermissionService }], target: i0.ɵɵFactoryTarget.Injectable });
UserPermissionListService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserPermissionListService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserPermissionListService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.TableService }, { type: i2.B2BUserService }, { type: i2.PermissionService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci1wZXJtaXNzaW9uLWxpc3Quc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9vcmdhbml6YXRpb24vYWRtaW5pc3RyYXRpb24vY29tcG9uZW50cy91c2VyL3Blcm1pc3Npb25zL3VzZXItcGVybWlzc2lvbi1saXN0LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFVM0MsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDeEUsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHdDQUF3QyxDQUFDOzs7O0FBS3hFLE1BQU0sT0FBTyx5QkFBMEIsU0FBUSxjQUEwQjtJQUl2RSxZQUNZLFlBQTBCLEVBQzFCLFdBQTJCLEVBQzNCLGlCQUFvQztRQUU5QyxLQUFLLENBQUMsWUFBWSxDQUFDLENBQUM7UUFKVixpQkFBWSxHQUFaLFlBQVksQ0FBYztRQUMxQixnQkFBVyxHQUFYLFdBQVcsQ0FBZ0I7UUFDM0Isc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtRQU50QyxjQUFTLEdBQUcscUJBQXFCLENBQUMsZ0JBQWdCLENBQUM7UUFDbkQsZ0JBQVcsR0FBRyxxQkFBcUIsQ0FBQyxVQUFVLENBQUM7SUFRekQsQ0FBQztJQUVTLElBQUksQ0FDWixVQUEyQixFQUMzQixJQUFZO1FBRVosT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUUsVUFBVSxDQUFDLENBQUM7SUFDM0QsQ0FBQztJQUVEOzs7T0FHRztJQUNILE1BQU0sQ0FDSixRQUFnQixFQUNoQixJQUFZO1FBRVosSUFBSSxDQUFDLFdBQVcsQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDbEQsT0FBTyxJQUFJLENBQUMsaUJBQWlCLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDdkQsQ0FBQztJQUVEOzs7T0FHRztJQUNILFFBQVEsQ0FDTixRQUFnQixFQUNoQixJQUFZO1FBRVosSUFBSSxDQUFDLFdBQVcsQ0FBQyxrQkFBa0IsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDcEQsT0FBTyxJQUFJLENBQUMsaUJBQWlCLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDdkQsQ0FBQzs7c0hBekNVLHlCQUF5QjswSEFBekIseUJBQXlCLGNBRnhCLE1BQU07MkZBRVAseUJBQXlCO2tCQUhyQyxVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEIyQlVzZXIsIEVudGl0aWVzTW9kZWwsIFBhZ2luYXRpb25Nb2RlbCB9IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQge1xuICBCMkJVc2VyU2VydmljZSxcbiAgT3JnYW5pemF0aW9uSXRlbVN0YXR1cyxcbiAgUGVybWlzc2lvbixcbiAgUGVybWlzc2lvblNlcnZpY2UsXG59IGZyb20gJ0BzcGFydGFjdXMvb3JnYW5pemF0aW9uL2FkbWluaXN0cmF0aW9uL2NvcmUnO1xuaW1wb3J0IHsgVGFibGVTZXJ2aWNlIH0gZnJvbSAnQHNwYXJ0YWN1cy9zdG9yZWZyb250JztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IE9yZ2FuaXphdGlvblRhYmxlVHlwZSB9IGZyb20gJy4uLy4uL3NoYXJlZC9vcmdhbml6YXRpb24ubW9kZWwnO1xuaW1wb3J0IHsgU3ViTGlzdFNlcnZpY2UgfSBmcm9tICcuLi8uLi9zaGFyZWQvc3ViLWxpc3Qvc3ViLWxpc3Quc2VydmljZSc7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBVc2VyUGVybWlzc2lvbkxpc3RTZXJ2aWNlIGV4dGVuZHMgU3ViTGlzdFNlcnZpY2U8UGVybWlzc2lvbj4ge1xuICBwcm90ZWN0ZWQgdGFibGVUeXBlID0gT3JnYW5pemF0aW9uVGFibGVUeXBlLlVTRVJfUEVSTUlTU0lPTlM7XG4gIHByb3RlY3RlZCBfZG9tYWluVHlwZSA9IE9yZ2FuaXphdGlvblRhYmxlVHlwZS5QRVJNSVNTSU9OO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByb3RlY3RlZCB0YWJsZVNlcnZpY2U6IFRhYmxlU2VydmljZSxcbiAgICBwcm90ZWN0ZWQgdXNlclNlcnZpY2U6IEIyQlVzZXJTZXJ2aWNlLFxuICAgIHByb3RlY3RlZCBwZXJtaXNzaW9uU2VydmljZTogUGVybWlzc2lvblNlcnZpY2VcbiAgKSB7XG4gICAgc3VwZXIodGFibGVTZXJ2aWNlKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBsb2FkKFxuICAgIHBhZ2luYXRpb246IFBhZ2luYXRpb25Nb2RlbCxcbiAgICBjb2RlOiBzdHJpbmdcbiAgKTogT2JzZXJ2YWJsZTxFbnRpdGllc01vZGVsPEIyQlVzZXI+IHwgdW5kZWZpbmVkPiB7XG4gICAgcmV0dXJuIHRoaXMudXNlclNlcnZpY2UuZ2V0UGVybWlzc2lvbnMoY29kZSwgcGFnaW5hdGlvbik7XG4gIH1cblxuICAvKipcbiAgICogQG92ZXJyaWRlXG4gICAqIEFzc2lnbiBwZXJtaXNzaW9uIHRvIHRoZSB1c2VyLlxuICAgKi9cbiAgYXNzaWduKFxuICAgIHVzZXJDb2RlOiBzdHJpbmcsXG4gICAgY29kZTogc3RyaW5nXG4gICk6IE9ic2VydmFibGU8T3JnYW5pemF0aW9uSXRlbVN0YXR1czxQZXJtaXNzaW9uPj4ge1xuICAgIHRoaXMudXNlclNlcnZpY2UuYXNzaWduUGVybWlzc2lvbih1c2VyQ29kZSwgY29kZSk7XG4gICAgcmV0dXJuIHRoaXMucGVybWlzc2lvblNlcnZpY2UuZ2V0TG9hZGluZ1N0YXR1cyhjb2RlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAb3ZlcnJpZGVcbiAgICogVW5hc3NpZ24gdGhlIHBlcm1pc3Npb24gZnJvbSB0aGUgdXNlci5cbiAgICovXG4gIHVuYXNzaWduKFxuICAgIHVzZXJDb2RlOiBzdHJpbmcsXG4gICAgY29kZTogc3RyaW5nXG4gICk6IE9ic2VydmFibGU8T3JnYW5pemF0aW9uSXRlbVN0YXR1czxQZXJtaXNzaW9uPj4ge1xuICAgIHRoaXMudXNlclNlcnZpY2UudW5hc3NpZ25QZXJtaXNzaW9uKHVzZXJDb2RlLCBjb2RlKTtcbiAgICByZXR1cm4gdGhpcy5wZXJtaXNzaW9uU2VydmljZS5nZXRMb2FkaW5nU3RhdHVzKGNvZGUpO1xuICB9XG59XG4iXX0=