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
export class CostCenterBudgetListService extends SubListService {
    constructor(tableService, costCenterService, budgetService) {
        super(tableService);
        this.tableService = tableService;
        this.costCenterService = costCenterService;
        this.budgetService = budgetService;
        this.tableType = OrganizationTableType.COST_CENTER_BUDGETS;
        this._domainType = OrganizationTableType.BUDGET;
    }
    load(pagination, code) {
        return this.costCenterService.getBudgets(code, pagination);
    }
    /**
     * @override
     * Assign budget to the cost center.
     */
    assign(costCenterCode, budgetCode) {
        this.costCenterService.assignBudget(costCenterCode, budgetCode);
        return this.budgetService.getLoadingStatus(budgetCode);
    }
    /**
     * @override
     * Unassign the budget from the cost center.
     */
    unassign(costCenterCode, budgetCode) {
        this.costCenterService.unassignBudget(costCenterCode, budgetCode);
        return this.budgetService.getLoadingStatus(budgetCode);
    }
}
CostCenterBudgetListService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CostCenterBudgetListService, deps: [{ token: i1.TableService }, { token: i2.CostCenterService }, { token: i2.BudgetService }], target: i0.ɵɵFactoryTarget.Injectable });
CostCenterBudgetListService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CostCenterBudgetListService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CostCenterBudgetListService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.TableService }, { type: i2.CostCenterService }, { type: i2.BudgetService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29zdC1jZW50ZXItYnVkZ2V0LWxpc3Quc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9vcmdhbml6YXRpb24vYWRtaW5pc3RyYXRpb24vY29tcG9uZW50cy9jb3N0LWNlbnRlci9idWRnZXRzL2Nvc3QtY2VudGVyLWJ1ZGdldC1saXN0LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFVM0MsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDeEUsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHdDQUF3QyxDQUFDOzs7O0FBS3hFLE1BQU0sT0FBTywyQkFBNEIsU0FBUSxjQUFzQjtJQUlyRSxZQUNZLFlBQTBCLEVBQzFCLGlCQUFvQyxFQUNwQyxhQUE0QjtRQUV0QyxLQUFLLENBQUMsWUFBWSxDQUFDLENBQUM7UUFKVixpQkFBWSxHQUFaLFlBQVksQ0FBYztRQUMxQixzQkFBaUIsR0FBakIsaUJBQWlCLENBQW1CO1FBQ3BDLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBTjlCLGNBQVMsR0FBRyxxQkFBcUIsQ0FBQyxtQkFBbUIsQ0FBQztRQUN0RCxnQkFBVyxHQUFHLHFCQUFxQixDQUFDLE1BQU0sQ0FBQztJQVFyRCxDQUFDO0lBRVMsSUFBSSxDQUNaLFVBQTJCLEVBQzNCLElBQVk7UUFFWixPQUFPLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLFVBQVUsQ0FBQyxDQUFDO0lBQzdELENBQUM7SUFFRDs7O09BR0c7SUFDSCxNQUFNLENBQ0osY0FBc0IsRUFDdEIsVUFBa0I7UUFFbEIsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFlBQVksQ0FBQyxjQUFjLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFDaEUsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDLGdCQUFnQixDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ3pELENBQUM7SUFFRDs7O09BR0c7SUFDSCxRQUFRLENBQ04sY0FBc0IsRUFDdEIsVUFBa0I7UUFFbEIsSUFBSSxDQUFDLGlCQUFpQixDQUFDLGNBQWMsQ0FBQyxjQUFjLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFDbEUsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDLGdCQUFnQixDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ3pELENBQUM7O3dIQXpDVSwyQkFBMkI7NEhBQTNCLDJCQUEyQixjQUYxQixNQUFNOzJGQUVQLDJCQUEyQjtrQkFIdkMsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBFbnRpdGllc01vZGVsLCBQYWdpbmF0aW9uTW9kZWwgfSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHtcbiAgQnVkZ2V0LFxuICBCdWRnZXRTZXJ2aWNlLFxuICBDb3N0Q2VudGVyU2VydmljZSxcbiAgT3JnYW5pemF0aW9uSXRlbVN0YXR1cyxcbn0gZnJvbSAnQHNwYXJ0YWN1cy9vcmdhbml6YXRpb24vYWRtaW5pc3RyYXRpb24vY29yZSc7XG5pbXBvcnQgeyBUYWJsZVNlcnZpY2UgfSBmcm9tICdAc3BhcnRhY3VzL3N0b3JlZnJvbnQnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgT3JnYW5pemF0aW9uVGFibGVUeXBlIH0gZnJvbSAnLi4vLi4vc2hhcmVkL29yZ2FuaXphdGlvbi5tb2RlbCc7XG5pbXBvcnQgeyBTdWJMaXN0U2VydmljZSB9IGZyb20gJy4uLy4uL3NoYXJlZC9zdWItbGlzdC9zdWItbGlzdC5zZXJ2aWNlJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIENvc3RDZW50ZXJCdWRnZXRMaXN0U2VydmljZSBleHRlbmRzIFN1Ykxpc3RTZXJ2aWNlPEJ1ZGdldD4ge1xuICBwcm90ZWN0ZWQgdGFibGVUeXBlID0gT3JnYW5pemF0aW9uVGFibGVUeXBlLkNPU1RfQ0VOVEVSX0JVREdFVFM7XG4gIHByb3RlY3RlZCBfZG9tYWluVHlwZSA9IE9yZ2FuaXphdGlvblRhYmxlVHlwZS5CVURHRVQ7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJvdGVjdGVkIHRhYmxlU2VydmljZTogVGFibGVTZXJ2aWNlLFxuICAgIHByb3RlY3RlZCBjb3N0Q2VudGVyU2VydmljZTogQ29zdENlbnRlclNlcnZpY2UsXG4gICAgcHJvdGVjdGVkIGJ1ZGdldFNlcnZpY2U6IEJ1ZGdldFNlcnZpY2VcbiAgKSB7XG4gICAgc3VwZXIodGFibGVTZXJ2aWNlKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBsb2FkKFxuICAgIHBhZ2luYXRpb246IFBhZ2luYXRpb25Nb2RlbCxcbiAgICBjb2RlOiBzdHJpbmdcbiAgKTogT2JzZXJ2YWJsZTxFbnRpdGllc01vZGVsPEJ1ZGdldD4gfCB1bmRlZmluZWQ+IHtcbiAgICByZXR1cm4gdGhpcy5jb3N0Q2VudGVyU2VydmljZS5nZXRCdWRnZXRzKGNvZGUsIHBhZ2luYXRpb24pO1xuICB9XG5cbiAgLyoqXG4gICAqIEBvdmVycmlkZVxuICAgKiBBc3NpZ24gYnVkZ2V0IHRvIHRoZSBjb3N0IGNlbnRlci5cbiAgICovXG4gIGFzc2lnbihcbiAgICBjb3N0Q2VudGVyQ29kZTogc3RyaW5nLFxuICAgIGJ1ZGdldENvZGU6IHN0cmluZ1xuICApOiBPYnNlcnZhYmxlPE9yZ2FuaXphdGlvbkl0ZW1TdGF0dXM8QnVkZ2V0Pj4ge1xuICAgIHRoaXMuY29zdENlbnRlclNlcnZpY2UuYXNzaWduQnVkZ2V0KGNvc3RDZW50ZXJDb2RlLCBidWRnZXRDb2RlKTtcbiAgICByZXR1cm4gdGhpcy5idWRnZXRTZXJ2aWNlLmdldExvYWRpbmdTdGF0dXMoYnVkZ2V0Q29kZSk7XG4gIH1cblxuICAvKipcbiAgICogQG92ZXJyaWRlXG4gICAqIFVuYXNzaWduIHRoZSBidWRnZXQgZnJvbSB0aGUgY29zdCBjZW50ZXIuXG4gICAqL1xuICB1bmFzc2lnbihcbiAgICBjb3N0Q2VudGVyQ29kZTogc3RyaW5nLFxuICAgIGJ1ZGdldENvZGU6IHN0cmluZ1xuICApOiBPYnNlcnZhYmxlPE9yZ2FuaXphdGlvbkl0ZW1TdGF0dXM8QnVkZ2V0Pj4ge1xuICAgIHRoaXMuY29zdENlbnRlclNlcnZpY2UudW5hc3NpZ25CdWRnZXQoY29zdENlbnRlckNvZGUsIGJ1ZGdldENvZGUpO1xuICAgIHJldHVybiB0aGlzLmJ1ZGdldFNlcnZpY2UuZ2V0TG9hZGluZ1N0YXR1cyhidWRnZXRDb2RlKTtcbiAgfVxufVxuIl19