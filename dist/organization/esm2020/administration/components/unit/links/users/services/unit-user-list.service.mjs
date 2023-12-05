/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { B2BUserRole, } from '@spartacus/core';
import { OrganizationTableType } from '../../../../shared/organization.model';
import { SubListService } from '../../../../shared/sub-list/sub-list.service';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/storefront";
import * as i2 from "@spartacus/organization/administration/core";
export class UnitUserListService extends SubListService {
    constructor(tableService, unitService) {
        super(tableService);
        this.tableService = tableService;
        this.unitService = unitService;
        this.tableType = OrganizationTableType.UNIT_USERS;
        this._domainType = OrganizationTableType.USER;
    }
    load(pagination, code) {
        return this.unitService.getUsers(code, B2BUserRole.CUSTOMER, pagination);
    }
}
UnitUserListService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitUserListService, deps: [{ token: i1.TableService }, { token: i2.OrgUnitService }], target: i0.ɵɵFactoryTarget.Injectable });
UnitUserListService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitUserListService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitUserListService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.TableService }, { type: i2.OrgUnitService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidW5pdC11c2VyLWxpc3Quc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9vcmdhbml6YXRpb24vYWRtaW5pc3RyYXRpb24vY29tcG9uZW50cy91bml0L2xpbmtzL3VzZXJzL3NlcnZpY2VzL3VuaXQtdXNlci1saXN0LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUVMLFdBQVcsR0FHWixNQUFNLGlCQUFpQixDQUFDO0FBSXpCLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHVDQUF1QyxDQUFDO0FBQzlFLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSw4Q0FBOEMsQ0FBQzs7OztBQUs5RSxNQUFNLE9BQU8sbUJBQW9CLFNBQVEsY0FBdUI7SUFJOUQsWUFDWSxZQUEwQixFQUMxQixXQUEyQjtRQUVyQyxLQUFLLENBQUMsWUFBWSxDQUFDLENBQUM7UUFIVixpQkFBWSxHQUFaLFlBQVksQ0FBYztRQUMxQixnQkFBVyxHQUFYLFdBQVcsQ0FBZ0I7UUFMN0IsY0FBUyxHQUFHLHFCQUFxQixDQUFDLFVBQVUsQ0FBQztRQUM3QyxnQkFBVyxHQUFHLHFCQUFxQixDQUFDLElBQUksQ0FBQztJQU9uRCxDQUFDO0lBRVMsSUFBSSxDQUNaLFVBQTJCLEVBQzNCLElBQVk7UUFFWixPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxXQUFXLENBQUMsUUFBUSxFQUFFLFVBQVUsQ0FBQyxDQUFDO0lBQzNFLENBQUM7O2dIQWhCVSxtQkFBbUI7b0hBQW5CLG1CQUFtQixjQUZsQixNQUFNOzJGQUVQLG1CQUFtQjtrQkFIL0IsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICBCMkJVc2VyLFxuICBCMkJVc2VyUm9sZSxcbiAgRW50aXRpZXNNb2RlbCxcbiAgUGFnaW5hdGlvbk1vZGVsLFxufSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHsgT3JnVW5pdFNlcnZpY2UgfSBmcm9tICdAc3BhcnRhY3VzL29yZ2FuaXphdGlvbi9hZG1pbmlzdHJhdGlvbi9jb3JlJztcbmltcG9ydCB7IFRhYmxlU2VydmljZSB9IGZyb20gJ0BzcGFydGFjdXMvc3RvcmVmcm9udCc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBPcmdhbml6YXRpb25UYWJsZVR5cGUgfSBmcm9tICcuLi8uLi8uLi8uLi9zaGFyZWQvb3JnYW5pemF0aW9uLm1vZGVsJztcbmltcG9ydCB7IFN1Ykxpc3RTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vLi4vc2hhcmVkL3N1Yi1saXN0L3N1Yi1saXN0LnNlcnZpY2UnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgVW5pdFVzZXJMaXN0U2VydmljZSBleHRlbmRzIFN1Ykxpc3RTZXJ2aWNlPEIyQlVzZXI+IHtcbiAgcHJvdGVjdGVkIHRhYmxlVHlwZSA9IE9yZ2FuaXphdGlvblRhYmxlVHlwZS5VTklUX1VTRVJTO1xuICBwcm90ZWN0ZWQgX2RvbWFpblR5cGUgPSBPcmdhbml6YXRpb25UYWJsZVR5cGUuVVNFUjtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcm90ZWN0ZWQgdGFibGVTZXJ2aWNlOiBUYWJsZVNlcnZpY2UsXG4gICAgcHJvdGVjdGVkIHVuaXRTZXJ2aWNlOiBPcmdVbml0U2VydmljZVxuICApIHtcbiAgICBzdXBlcih0YWJsZVNlcnZpY2UpO1xuICB9XG5cbiAgcHJvdGVjdGVkIGxvYWQoXG4gICAgcGFnaW5hdGlvbjogUGFnaW5hdGlvbk1vZGVsLFxuICAgIGNvZGU6IHN0cmluZ1xuICApOiBPYnNlcnZhYmxlPEVudGl0aWVzTW9kZWw8QjJCVXNlcj4gfCB1bmRlZmluZWQ+IHtcbiAgICByZXR1cm4gdGhpcy51bml0U2VydmljZS5nZXRVc2Vycyhjb2RlLCBCMkJVc2VyUm9sZS5DVVNUT01FUiwgcGFnaW5hdGlvbik7XG4gIH1cbn1cbiJdfQ==