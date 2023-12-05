/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { SubListService } from '../../../shared/sub-list/sub-list.service';
import { OrganizationTableType } from '../../../shared/organization.model';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/storefront";
import * as i2 from "@spartacus/organization/administration/core";
export class UnitCostCenterListService extends SubListService {
    constructor(tableService, unitService) {
        super(tableService);
        this.tableService = tableService;
        this.unitService = unitService;
        this.tableType = OrganizationTableType.UNIT_COST_CENTERS;
        this._domainType = OrganizationTableType.COST_CENTER;
    }
    load(_pagination, code) {
        return this.unitService.getCostCenters(code);
    }
}
UnitCostCenterListService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitCostCenterListService, deps: [{ token: i1.TableService }, { token: i2.OrgUnitService }], target: i0.ɵɵFactoryTarget.Injectable });
UnitCostCenterListService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitCostCenterListService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitCostCenterListService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.TableService }, { type: i2.OrgUnitService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidW5pdC1jb3N0LWNlbnRlcnMuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9vcmdhbml6YXRpb24vYWRtaW5pc3RyYXRpb24vY29tcG9uZW50cy91bml0L2xpbmtzL2Nvc3QtY2VudGVycy91bml0LWNvc3QtY2VudGVycy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBSzNDLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSwyQ0FBMkMsQ0FBQztBQUMzRSxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQzs7OztBQUszRSxNQUFNLE9BQU8seUJBQTBCLFNBQVEsY0FBdUI7SUFJcEUsWUFDWSxZQUEwQixFQUMxQixXQUEyQjtRQUVyQyxLQUFLLENBQUMsWUFBWSxDQUFDLENBQUM7UUFIVixpQkFBWSxHQUFaLFlBQVksQ0FBYztRQUMxQixnQkFBVyxHQUFYLFdBQVcsQ0FBZ0I7UUFMN0IsY0FBUyxHQUFHLHFCQUFxQixDQUFDLGlCQUFpQixDQUFDO1FBQ3BELGdCQUFXLEdBQUcscUJBQXFCLENBQUMsV0FBVyxDQUFDO0lBTzFELENBQUM7SUFFUyxJQUFJLENBQ1osV0FBNEIsRUFDNUIsSUFBWTtRQUVaLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDL0MsQ0FBQzs7c0hBaEJVLHlCQUF5QjswSEFBekIseUJBQXlCLGNBRnhCLE1BQU07MkZBRVAseUJBQXlCO2tCQUhyQyxVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEIyQlVzZXIsIEVudGl0aWVzTW9kZWwsIFBhZ2luYXRpb25Nb2RlbCB9IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBPcmdVbml0U2VydmljZSB9IGZyb20gJ0BzcGFydGFjdXMvb3JnYW5pemF0aW9uL2FkbWluaXN0cmF0aW9uL2NvcmUnO1xuaW1wb3J0IHsgVGFibGVTZXJ2aWNlIH0gZnJvbSAnQHNwYXJ0YWN1cy9zdG9yZWZyb250JztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IFN1Ykxpc3RTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL3N1Yi1saXN0L3N1Yi1saXN0LnNlcnZpY2UnO1xuaW1wb3J0IHsgT3JnYW5pemF0aW9uVGFibGVUeXBlIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL29yZ2FuaXphdGlvbi5tb2RlbCc7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBVbml0Q29zdENlbnRlckxpc3RTZXJ2aWNlIGV4dGVuZHMgU3ViTGlzdFNlcnZpY2U8QjJCVXNlcj4ge1xuICBwcm90ZWN0ZWQgdGFibGVUeXBlID0gT3JnYW5pemF0aW9uVGFibGVUeXBlLlVOSVRfQ09TVF9DRU5URVJTO1xuICBwcm90ZWN0ZWQgX2RvbWFpblR5cGUgPSBPcmdhbml6YXRpb25UYWJsZVR5cGUuQ09TVF9DRU5URVI7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJvdGVjdGVkIHRhYmxlU2VydmljZTogVGFibGVTZXJ2aWNlLFxuICAgIHByb3RlY3RlZCB1bml0U2VydmljZTogT3JnVW5pdFNlcnZpY2VcbiAgKSB7XG4gICAgc3VwZXIodGFibGVTZXJ2aWNlKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBsb2FkKFxuICAgIF9wYWdpbmF0aW9uOiBQYWdpbmF0aW9uTW9kZWwsXG4gICAgY29kZTogc3RyaW5nXG4gICk6IE9ic2VydmFibGU8RW50aXRpZXNNb2RlbDxCMkJVc2VyPj4ge1xuICAgIHJldHVybiB0aGlzLnVuaXRTZXJ2aWNlLmdldENvc3RDZW50ZXJzKGNvZGUpO1xuICB9XG59XG4iXX0=