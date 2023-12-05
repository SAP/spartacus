/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { filter, map } from 'rxjs/operators';
import { OrganizationTableType } from '../../shared/organization.model';
import { SubListService } from '../../shared/sub-list/sub-list.service';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/storefront";
import * as i2 from "@spartacus/organization/administration/core";
export class BudgetCostCenterListService extends SubListService {
    constructor(tableService, budgetService) {
        super(tableService);
        this.tableService = tableService;
        this.budgetService = budgetService;
        this.tableType = OrganizationTableType.BUDGET_ASSIGNED_COST_CENTERS;
        this._domainType = OrganizationTableType.COST_CENTER;
    }
    load(_pagination, code) {
        return this.budgetService.getCostCenters(code).pipe(filter((list) => Boolean(list)), map((costCenter) => this.filterSelected(costCenter)));
    }
    /**
     * As we can't filter with the backend API, we do this client side.
     */
    filterSelected({ pagination, sorts, values, }) {
        return {
            pagination,
            sorts,
            values: values.filter((value) => value.active),
        };
    }
}
BudgetCostCenterListService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: BudgetCostCenterListService, deps: [{ token: i1.TableService }, { token: i2.BudgetService }], target: i0.ɵɵFactoryTarget.Injectable });
BudgetCostCenterListService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: BudgetCostCenterListService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: BudgetCostCenterListService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.TableService }, { type: i2.BudgetService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVkZ2V0LWNvc3QtY2VudGVyLWxpc3Quc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9vcmdhbml6YXRpb24vYWRtaW5pc3RyYXRpb24vY29tcG9uZW50cy9idWRnZXQvY29zdC1jZW50ZXJzL2J1ZGdldC1jb3N0LWNlbnRlci1saXN0LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFRM0MsT0FBTyxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM3QyxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUN4RSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sd0NBQXdDLENBQUM7Ozs7QUFLeEUsTUFBTSxPQUFPLDJCQUE0QixTQUFRLGNBQXNCO0lBSXJFLFlBQ1ksWUFBMEIsRUFDMUIsYUFBNEI7UUFFdEMsS0FBSyxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBSFYsaUJBQVksR0FBWixZQUFZLENBQWM7UUFDMUIsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFMOUIsY0FBUyxHQUFHLHFCQUFxQixDQUFDLDRCQUE0QixDQUFDO1FBQy9ELGdCQUFXLEdBQUcscUJBQXFCLENBQUMsV0FBVyxDQUFDO0lBTzFELENBQUM7SUFFUyxJQUFJLENBQ1osV0FBNEIsRUFDNUIsSUFBWTtRQUVaLE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUNqRCxNQUFNLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUMvQixHQUFHLENBQUMsQ0FBQyxVQUFVLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FDckQsQ0FBQztJQUNKLENBQUM7SUFFRDs7T0FFRztJQUNPLGNBQWMsQ0FBQyxFQUN2QixVQUFVLEVBQ1YsS0FBSyxFQUNMLE1BQU0sR0FDb0I7UUFDMUIsT0FBTztZQUNMLFVBQVU7WUFDVixLQUFLO1lBQ0wsTUFBTSxFQUFFLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUM7U0FDL0MsQ0FBQztJQUNKLENBQUM7O3dIQWxDVSwyQkFBMkI7NEhBQTNCLDJCQUEyQixjQUYxQixNQUFNOzJGQUVQLDJCQUEyQjtrQkFIdkMsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb3N0Q2VudGVyLCBFbnRpdGllc01vZGVsLCBQYWdpbmF0aW9uTW9kZWwgfSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHtcbiAgQnVkZ2V0LFxuICBCdWRnZXRTZXJ2aWNlLFxufSBmcm9tICdAc3BhcnRhY3VzL29yZ2FuaXphdGlvbi9hZG1pbmlzdHJhdGlvbi9jb3JlJztcbmltcG9ydCB7IFRhYmxlU2VydmljZSB9IGZyb20gJ0BzcGFydGFjdXMvc3RvcmVmcm9udCc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBmaWx0ZXIsIG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IE9yZ2FuaXphdGlvblRhYmxlVHlwZSB9IGZyb20gJy4uLy4uL3NoYXJlZC9vcmdhbml6YXRpb24ubW9kZWwnO1xuaW1wb3J0IHsgU3ViTGlzdFNlcnZpY2UgfSBmcm9tICcuLi8uLi9zaGFyZWQvc3ViLWxpc3Qvc3ViLWxpc3Quc2VydmljZSc7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBCdWRnZXRDb3N0Q2VudGVyTGlzdFNlcnZpY2UgZXh0ZW5kcyBTdWJMaXN0U2VydmljZTxCdWRnZXQ+IHtcbiAgcHJvdGVjdGVkIHRhYmxlVHlwZSA9IE9yZ2FuaXphdGlvblRhYmxlVHlwZS5CVURHRVRfQVNTSUdORURfQ09TVF9DRU5URVJTO1xuICBwcm90ZWN0ZWQgX2RvbWFpblR5cGUgPSBPcmdhbml6YXRpb25UYWJsZVR5cGUuQ09TVF9DRU5URVI7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJvdGVjdGVkIHRhYmxlU2VydmljZTogVGFibGVTZXJ2aWNlLFxuICAgIHByb3RlY3RlZCBidWRnZXRTZXJ2aWNlOiBCdWRnZXRTZXJ2aWNlXG4gICkge1xuICAgIHN1cGVyKHRhYmxlU2VydmljZSk7XG4gIH1cblxuICBwcm90ZWN0ZWQgbG9hZChcbiAgICBfcGFnaW5hdGlvbjogUGFnaW5hdGlvbk1vZGVsLFxuICAgIGNvZGU6IHN0cmluZ1xuICApOiBPYnNlcnZhYmxlPEVudGl0aWVzTW9kZWw8Q29zdENlbnRlcj4+IHtcbiAgICByZXR1cm4gdGhpcy5idWRnZXRTZXJ2aWNlLmdldENvc3RDZW50ZXJzKGNvZGUpLnBpcGUoXG4gICAgICBmaWx0ZXIoKGxpc3QpID0+IEJvb2xlYW4obGlzdCkpLFxuICAgICAgbWFwKChjb3N0Q2VudGVyKSA9PiB0aGlzLmZpbHRlclNlbGVjdGVkKGNvc3RDZW50ZXIpKVxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogQXMgd2UgY2FuJ3QgZmlsdGVyIHdpdGggdGhlIGJhY2tlbmQgQVBJLCB3ZSBkbyB0aGlzIGNsaWVudCBzaWRlLlxuICAgKi9cbiAgcHJvdGVjdGVkIGZpbHRlclNlbGVjdGVkKHtcbiAgICBwYWdpbmF0aW9uLFxuICAgIHNvcnRzLFxuICAgIHZhbHVlcyxcbiAgfTogRW50aXRpZXNNb2RlbDxDb3N0Q2VudGVyPik6IEVudGl0aWVzTW9kZWw8Q29zdENlbnRlcj4ge1xuICAgIHJldHVybiB7XG4gICAgICBwYWdpbmF0aW9uLFxuICAgICAgc29ydHMsXG4gICAgICB2YWx1ZXM6IHZhbHVlcy5maWx0ZXIoKHZhbHVlKSA9PiB2YWx1ZS5hY3RpdmUpLFxuICAgIH07XG4gIH1cbn1cbiJdfQ==