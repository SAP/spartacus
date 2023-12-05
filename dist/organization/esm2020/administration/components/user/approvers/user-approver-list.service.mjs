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
export class UserApproverListService extends SubListService {
    constructor(tableService, userService) {
        super(tableService);
        this.tableService = tableService;
        this.userService = userService;
        this.tableType = OrganizationTableType.USER_APPROVERS;
        this._domainType = OrganizationTableType.USER_GROUP;
    }
    load(pagination, code) {
        return this.userService.getApprovers(code, pagination);
    }
    /**
     * @override
     * Assign approver to the user.
     */
    assign(userCode, approverId) {
        this.userService.assignApprover(userCode, approverId);
        return this.userService.getLoadingStatus(approverId);
    }
    /**
     * @override
     * Unassign the approver from the user.
     */
    unassign(userCode, approverId) {
        this.userService.unassignApprover(userCode, approverId);
        return this.userService.getLoadingStatus(approverId);
    }
}
UserApproverListService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserApproverListService, deps: [{ token: i1.TableService }, { token: i2.B2BUserService }], target: i0.ɵɵFactoryTarget.Injectable });
UserApproverListService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserApproverListService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserApproverListService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.TableService }, { type: i2.B2BUserService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci1hcHByb3Zlci1saXN0LnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvb3JnYW5pemF0aW9uL2FkbWluaXN0cmF0aW9uL2NvbXBvbmVudHMvdXNlci9hcHByb3ZlcnMvdXNlci1hcHByb3Zlci1saXN0LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFRM0MsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDeEUsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHdDQUF3QyxDQUFDOzs7O0FBS3hFLE1BQU0sT0FBTyx1QkFBd0IsU0FBUSxjQUF1QjtJQUlsRSxZQUNZLFlBQTBCLEVBQzFCLFdBQTJCO1FBRXJDLEtBQUssQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUhWLGlCQUFZLEdBQVosWUFBWSxDQUFjO1FBQzFCLGdCQUFXLEdBQVgsV0FBVyxDQUFnQjtRQUw3QixjQUFTLEdBQUcscUJBQXFCLENBQUMsY0FBYyxDQUFDO1FBQ2pELGdCQUFXLEdBQUcscUJBQXFCLENBQUMsVUFBVSxDQUFDO0lBT3pELENBQUM7SUFFUyxJQUFJLENBQ1osVUFBMkIsRUFDM0IsSUFBWTtRQUVaLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLFVBQVUsQ0FBQyxDQUFDO0lBQ3pELENBQUM7SUFFRDs7O09BR0c7SUFDSCxNQUFNLENBQ0osUUFBZ0IsRUFDaEIsVUFBa0I7UUFFbEIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxjQUFjLENBQUMsUUFBUSxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBQ3RELE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxnQkFBZ0IsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUN2RCxDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsUUFBUSxDQUNOLFFBQWdCLEVBQ2hCLFVBQWtCO1FBRWxCLElBQUksQ0FBQyxXQUFXLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBQ3hELE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxnQkFBZ0IsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUN2RCxDQUFDOztvSEF4Q1UsdUJBQXVCO3dIQUF2Qix1QkFBdUIsY0FGdEIsTUFBTTsyRkFFUCx1QkFBdUI7a0JBSG5DLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQjJCVXNlciwgRW50aXRpZXNNb2RlbCwgUGFnaW5hdGlvbk1vZGVsIH0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7XG4gIEIyQlVzZXJTZXJ2aWNlLFxuICBPcmdhbml6YXRpb25JdGVtU3RhdHVzLFxufSBmcm9tICdAc3BhcnRhY3VzL29yZ2FuaXphdGlvbi9hZG1pbmlzdHJhdGlvbi9jb3JlJztcbmltcG9ydCB7IFRhYmxlU2VydmljZSB9IGZyb20gJ0BzcGFydGFjdXMvc3RvcmVmcm9udCc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBPcmdhbml6YXRpb25UYWJsZVR5cGUgfSBmcm9tICcuLi8uLi9zaGFyZWQvb3JnYW5pemF0aW9uLm1vZGVsJztcbmltcG9ydCB7IFN1Ykxpc3RTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2hhcmVkL3N1Yi1saXN0L3N1Yi1saXN0LnNlcnZpY2UnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgVXNlckFwcHJvdmVyTGlzdFNlcnZpY2UgZXh0ZW5kcyBTdWJMaXN0U2VydmljZTxCMkJVc2VyPiB7XG4gIHByb3RlY3RlZCB0YWJsZVR5cGUgPSBPcmdhbml6YXRpb25UYWJsZVR5cGUuVVNFUl9BUFBST1ZFUlM7XG4gIHByb3RlY3RlZCBfZG9tYWluVHlwZSA9IE9yZ2FuaXphdGlvblRhYmxlVHlwZS5VU0VSX0dST1VQO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByb3RlY3RlZCB0YWJsZVNlcnZpY2U6IFRhYmxlU2VydmljZSxcbiAgICBwcm90ZWN0ZWQgdXNlclNlcnZpY2U6IEIyQlVzZXJTZXJ2aWNlXG4gICkge1xuICAgIHN1cGVyKHRhYmxlU2VydmljZSk7XG4gIH1cblxuICBwcm90ZWN0ZWQgbG9hZChcbiAgICBwYWdpbmF0aW9uOiBQYWdpbmF0aW9uTW9kZWwsXG4gICAgY29kZTogc3RyaW5nXG4gICk6IE9ic2VydmFibGU8RW50aXRpZXNNb2RlbDxCMkJVc2VyPiB8IHVuZGVmaW5lZD4ge1xuICAgIHJldHVybiB0aGlzLnVzZXJTZXJ2aWNlLmdldEFwcHJvdmVycyhjb2RlLCBwYWdpbmF0aW9uKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAb3ZlcnJpZGVcbiAgICogQXNzaWduIGFwcHJvdmVyIHRvIHRoZSB1c2VyLlxuICAgKi9cbiAgYXNzaWduKFxuICAgIHVzZXJDb2RlOiBzdHJpbmcsXG4gICAgYXBwcm92ZXJJZDogc3RyaW5nXG4gICk6IE9ic2VydmFibGU8T3JnYW5pemF0aW9uSXRlbVN0YXR1czxCMkJVc2VyPj4ge1xuICAgIHRoaXMudXNlclNlcnZpY2UuYXNzaWduQXBwcm92ZXIodXNlckNvZGUsIGFwcHJvdmVySWQpO1xuICAgIHJldHVybiB0aGlzLnVzZXJTZXJ2aWNlLmdldExvYWRpbmdTdGF0dXMoYXBwcm92ZXJJZCk7XG4gIH1cblxuICAvKipcbiAgICogQG92ZXJyaWRlXG4gICAqIFVuYXNzaWduIHRoZSBhcHByb3ZlciBmcm9tIHRoZSB1c2VyLlxuICAgKi9cbiAgdW5hc3NpZ24oXG4gICAgdXNlckNvZGU6IHN0cmluZyxcbiAgICBhcHByb3ZlcklkOiBzdHJpbmdcbiAgKTogT2JzZXJ2YWJsZTxPcmdhbml6YXRpb25JdGVtU3RhdHVzPEIyQlVzZXI+PiB7XG4gICAgdGhpcy51c2VyU2VydmljZS51bmFzc2lnbkFwcHJvdmVyKHVzZXJDb2RlLCBhcHByb3ZlcklkKTtcbiAgICByZXR1cm4gdGhpcy51c2VyU2VydmljZS5nZXRMb2FkaW5nU3RhdHVzKGFwcHJvdmVySWQpO1xuICB9XG59XG4iXX0=