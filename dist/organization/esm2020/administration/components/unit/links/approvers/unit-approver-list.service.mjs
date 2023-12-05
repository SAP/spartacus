/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { B2BUserRole, } from '@spartacus/core';
import { OrganizationTableType } from '../../../shared/organization.model';
import { SubListService } from '../../../shared/sub-list/sub-list.service';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/storefront";
import * as i2 from "@spartacus/organization/administration/core";
export class UnitApproverListService extends SubListService {
    constructor(tableService, unitService, userService) {
        super(tableService);
        this.tableService = tableService;
        this.unitService = unitService;
        this.userService = userService;
        this.tableType = OrganizationTableType.UNIT_APPROVERS;
        this._domainType = OrganizationTableType.USER;
    }
    load(pagination, code) {
        return this.unitService.getUsers(code, B2BUserRole.APPROVER, pagination);
    }
    /**
     * @override
     * Assign budget to the cost center.
     */
    assign(unitId, customerId) {
        this.unitService.assignApprover(unitId, customerId, B2BUserRole.APPROVER);
        return this.userService.getLoadingStatus(customerId);
    }
    /**
     * @override
     * Unassign the budget from the cost center.
     */
    unassign(unitId, customerId) {
        this.unitService.unassignApprover(unitId, customerId, B2BUserRole.APPROVER);
        return this.userService.getLoadingStatus(customerId);
    }
}
UnitApproverListService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitApproverListService, deps: [{ token: i1.TableService }, { token: i2.OrgUnitService }, { token: i2.B2BUserService }], target: i0.ɵɵFactoryTarget.Injectable });
UnitApproverListService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitApproverListService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitApproverListService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.TableService }, { type: i2.OrgUnitService }, { type: i2.B2BUserService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidW5pdC1hcHByb3Zlci1saXN0LnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvb3JnYW5pemF0aW9uL2FkbWluaXN0cmF0aW9uL2NvbXBvbmVudHMvdW5pdC9saW5rcy9hcHByb3ZlcnMvdW5pdC1hcHByb3Zlci1saXN0LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUVMLFdBQVcsR0FHWixNQUFNLGlCQUFpQixDQUFDO0FBUXpCLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBQzNFLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSwyQ0FBMkMsQ0FBQzs7OztBQUszRSxNQUFNLE9BQU8sdUJBQXdCLFNBQVEsY0FBdUI7SUFJbEUsWUFDWSxZQUEwQixFQUMxQixXQUEyQixFQUMzQixXQUEyQjtRQUVyQyxLQUFLLENBQUMsWUFBWSxDQUFDLENBQUM7UUFKVixpQkFBWSxHQUFaLFlBQVksQ0FBYztRQUMxQixnQkFBVyxHQUFYLFdBQVcsQ0FBZ0I7UUFDM0IsZ0JBQVcsR0FBWCxXQUFXLENBQWdCO1FBTjdCLGNBQVMsR0FBRyxxQkFBcUIsQ0FBQyxjQUFjLENBQUM7UUFDakQsZ0JBQVcsR0FBRyxxQkFBcUIsQ0FBQyxJQUFJLENBQUM7SUFRbkQsQ0FBQztJQUVTLElBQUksQ0FDWixVQUEyQixFQUMzQixJQUFZO1FBRVosT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsV0FBVyxDQUFDLFFBQVEsRUFBRSxVQUFVLENBQUMsQ0FBQztJQUMzRSxDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsTUFBTSxDQUNKLE1BQWMsRUFDZCxVQUFrQjtRQUVsQixJQUFJLENBQUMsV0FBVyxDQUFDLGNBQWMsQ0FBQyxNQUFNLEVBQUUsVUFBVSxFQUFFLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUMxRSxPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsZ0JBQWdCLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDdkQsQ0FBQztJQUVEOzs7T0FHRztJQUNILFFBQVEsQ0FDTixNQUFjLEVBQ2QsVUFBa0I7UUFFbEIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLEVBQUUsVUFBVSxFQUFFLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUM1RSxPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsZ0JBQWdCLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDdkQsQ0FBQzs7b0hBekNVLHVCQUF1Qjt3SEFBdkIsdUJBQXVCLGNBRnRCLE1BQU07MkZBRVAsdUJBQXVCO2tCQUhuQyxVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gIEIyQlVzZXIsXG4gIEIyQlVzZXJSb2xlLFxuICBFbnRpdGllc01vZGVsLFxuICBQYWdpbmF0aW9uTW9kZWwsXG59IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQge1xuICBCMkJVc2VyU2VydmljZSxcbiAgT3JnYW5pemF0aW9uSXRlbVN0YXR1cyxcbiAgT3JnVW5pdFNlcnZpY2UsXG59IGZyb20gJ0BzcGFydGFjdXMvb3JnYW5pemF0aW9uL2FkbWluaXN0cmF0aW9uL2NvcmUnO1xuaW1wb3J0IHsgVGFibGVTZXJ2aWNlIH0gZnJvbSAnQHNwYXJ0YWN1cy9zdG9yZWZyb250JztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IE9yZ2FuaXphdGlvblRhYmxlVHlwZSB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9vcmdhbml6YXRpb24ubW9kZWwnO1xuaW1wb3J0IHsgU3ViTGlzdFNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvc3ViLWxpc3Qvc3ViLWxpc3Quc2VydmljZSc7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBVbml0QXBwcm92ZXJMaXN0U2VydmljZSBleHRlbmRzIFN1Ykxpc3RTZXJ2aWNlPEIyQlVzZXI+IHtcbiAgcHJvdGVjdGVkIHRhYmxlVHlwZSA9IE9yZ2FuaXphdGlvblRhYmxlVHlwZS5VTklUX0FQUFJPVkVSUztcbiAgcHJvdGVjdGVkIF9kb21haW5UeXBlID0gT3JnYW5pemF0aW9uVGFibGVUeXBlLlVTRVI7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJvdGVjdGVkIHRhYmxlU2VydmljZTogVGFibGVTZXJ2aWNlLFxuICAgIHByb3RlY3RlZCB1bml0U2VydmljZTogT3JnVW5pdFNlcnZpY2UsXG4gICAgcHJvdGVjdGVkIHVzZXJTZXJ2aWNlOiBCMkJVc2VyU2VydmljZVxuICApIHtcbiAgICBzdXBlcih0YWJsZVNlcnZpY2UpO1xuICB9XG5cbiAgcHJvdGVjdGVkIGxvYWQoXG4gICAgcGFnaW5hdGlvbjogUGFnaW5hdGlvbk1vZGVsLFxuICAgIGNvZGU6IHN0cmluZ1xuICApOiBPYnNlcnZhYmxlPEVudGl0aWVzTW9kZWw8QjJCVXNlcj4gfCB1bmRlZmluZWQ+IHtcbiAgICByZXR1cm4gdGhpcy51bml0U2VydmljZS5nZXRVc2Vycyhjb2RlLCBCMkJVc2VyUm9sZS5BUFBST1ZFUiwgcGFnaW5hdGlvbik7XG4gIH1cblxuICAvKipcbiAgICogQG92ZXJyaWRlXG4gICAqIEFzc2lnbiBidWRnZXQgdG8gdGhlIGNvc3QgY2VudGVyLlxuICAgKi9cbiAgYXNzaWduKFxuICAgIHVuaXRJZDogc3RyaW5nLFxuICAgIGN1c3RvbWVySWQ6IHN0cmluZ1xuICApOiBPYnNlcnZhYmxlPE9yZ2FuaXphdGlvbkl0ZW1TdGF0dXM8QjJCVXNlcj4+IHtcbiAgICB0aGlzLnVuaXRTZXJ2aWNlLmFzc2lnbkFwcHJvdmVyKHVuaXRJZCwgY3VzdG9tZXJJZCwgQjJCVXNlclJvbGUuQVBQUk9WRVIpO1xuICAgIHJldHVybiB0aGlzLnVzZXJTZXJ2aWNlLmdldExvYWRpbmdTdGF0dXMoY3VzdG9tZXJJZCk7XG4gIH1cblxuICAvKipcbiAgICogQG92ZXJyaWRlXG4gICAqIFVuYXNzaWduIHRoZSBidWRnZXQgZnJvbSB0aGUgY29zdCBjZW50ZXIuXG4gICAqL1xuICB1bmFzc2lnbihcbiAgICB1bml0SWQ6IHN0cmluZyxcbiAgICBjdXN0b21lcklkOiBzdHJpbmdcbiAgKTogT2JzZXJ2YWJsZTxPcmdhbml6YXRpb25JdGVtU3RhdHVzPEIyQlVzZXI+PiB7XG4gICAgdGhpcy51bml0U2VydmljZS51bmFzc2lnbkFwcHJvdmVyKHVuaXRJZCwgY3VzdG9tZXJJZCwgQjJCVXNlclJvbGUuQVBQUk9WRVIpO1xuICAgIHJldHVybiB0aGlzLnVzZXJTZXJ2aWNlLmdldExvYWRpbmdTdGF0dXMoY3VzdG9tZXJJZCk7XG4gIH1cbn1cbiJdfQ==