/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { OrganizationTableType } from '../../../shared/organization.model';
import { CostCenterBudgetListService } from '../cost-center-budget-list.service';
import * as i0 from "@angular/core";
export class CostCenterAssignedBudgetListService extends CostCenterBudgetListService {
    constructor() {
        super(...arguments);
        this.tableType = OrganizationTableType.COST_CENTER_ASSIGNED_BUDGETS;
    }
    load(pagination, code) {
        return super
            .load(pagination, code)
            .pipe(map((budgets) => this.filterSelected(budgets)));
    }
}
CostCenterAssignedBudgetListService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CostCenterAssignedBudgetListService, deps: null, target: i0.ɵɵFactoryTarget.Injectable });
CostCenterAssignedBudgetListService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CostCenterAssignedBudgetListService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CostCenterAssignedBudgetListService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29zdC1jZW50ZXItYXNzaWduZWQtYnVkZ2V0LWxpc3Quc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9vcmdhbml6YXRpb24vYWRtaW5pc3RyYXRpb24vY29tcG9uZW50cy9jb3N0LWNlbnRlci9idWRnZXRzL2Fzc2lnbmVkL2Nvc3QtY2VudGVyLWFzc2lnbmVkLWJ1ZGdldC1saXN0LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFJM0MsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3JDLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBQzNFLE9BQU8sRUFBRSwyQkFBMkIsRUFBRSxNQUFNLG9DQUFvQyxDQUFDOztBQUtqRixNQUFNLE9BQU8sbUNBQW9DLFNBQVEsMkJBQTJCO0lBSHBGOztRQUlZLGNBQVMsR0FBRyxxQkFBcUIsQ0FBQyw0QkFBNEIsQ0FBQztLQVUxRTtJQVJXLElBQUksQ0FDWixVQUEyQixFQUMzQixJQUFZO1FBRVosT0FBTyxLQUFLO2FBQ1QsSUFBSSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUM7YUFDdEIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDMUQsQ0FBQzs7Z0lBVlUsbUNBQW1DO29JQUFuQyxtQ0FBbUMsY0FGbEMsTUFBTTsyRkFFUCxtQ0FBbUM7a0JBSC9DLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRW50aXRpZXNNb2RlbCwgUGFnaW5hdGlvbk1vZGVsIH0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7IEJ1ZGdldCB9IGZyb20gJ0BzcGFydGFjdXMvb3JnYW5pemF0aW9uL2FkbWluaXN0cmF0aW9uL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgT3JnYW5pemF0aW9uVGFibGVUeXBlIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL29yZ2FuaXphdGlvbi5tb2RlbCc7XG5pbXBvcnQgeyBDb3N0Q2VudGVyQnVkZ2V0TGlzdFNlcnZpY2UgfSBmcm9tICcuLi9jb3N0LWNlbnRlci1idWRnZXQtbGlzdC5zZXJ2aWNlJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIENvc3RDZW50ZXJBc3NpZ25lZEJ1ZGdldExpc3RTZXJ2aWNlIGV4dGVuZHMgQ29zdENlbnRlckJ1ZGdldExpc3RTZXJ2aWNlIHtcbiAgcHJvdGVjdGVkIHRhYmxlVHlwZSA9IE9yZ2FuaXphdGlvblRhYmxlVHlwZS5DT1NUX0NFTlRFUl9BU1NJR05FRF9CVURHRVRTO1xuXG4gIHByb3RlY3RlZCBsb2FkKFxuICAgIHBhZ2luYXRpb246IFBhZ2luYXRpb25Nb2RlbCxcbiAgICBjb2RlOiBzdHJpbmdcbiAgKTogT2JzZXJ2YWJsZTxFbnRpdGllc01vZGVsPEJ1ZGdldD4gfCB1bmRlZmluZWQ+IHtcbiAgICByZXR1cm4gc3VwZXJcbiAgICAgIC5sb2FkKHBhZ2luYXRpb24sIGNvZGUpXG4gICAgICAucGlwZShtYXAoKGJ1ZGdldHMpID0+IHRoaXMuZmlsdGVyU2VsZWN0ZWQoYnVkZ2V0cykpKTtcbiAgfVxufVxuIl19