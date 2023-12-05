/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { isNotUndefined, } from '@spartacus/core';
import { filter, map } from 'rxjs/operators';
import { ListService } from '../../shared/list/list.service';
import { OrganizationTableType } from '../../shared/organization.model';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/storefront";
import * as i2 from "@spartacus/organization/administration/core";
/**
 * Service to populate Cost Center data to `Table` data. The cost center
 * data is driven by the table configuration, using the `OrganizationTables.COST_CENTER`.
 */
export class CostCenterListService extends ListService {
    constructor(tableService, costCenterService) {
        super(tableService);
        this.tableService = tableService;
        this.costCenterService = costCenterService;
        this.tableType = OrganizationTableType.COST_CENTER;
    }
    load(pagination) {
        return this.costCenterService.getList(pagination).pipe(filter(isNotUndefined), map((raw) => this.convertCostCenters(raw)));
    }
    /**
     * Populates the cost center data to a convenient table data model, so that we
     * can skip specific conversion in the view logic where possible.
     */
    convertCostCenters({ pagination, sorts, values, }) {
        const costCenterModels = {
            pagination,
            sorts,
            values: values.map((value) => ({
                ...value,
                currency: value.currency?.isocode,
            })),
        };
        return costCenterModels;
    }
}
CostCenterListService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CostCenterListService, deps: [{ token: i1.TableService }, { token: i2.CostCenterService }], target: i0.ɵɵFactoryTarget.Injectable });
CostCenterListService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CostCenterListService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CostCenterListService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.TableService }, { type: i2.CostCenterService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29zdC1jZW50ZXItbGlzdC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL29yZ2FuaXphdGlvbi9hZG1pbmlzdHJhdGlvbi9jb21wb25lbnRzL2Nvc3QtY2VudGVyL3NlcnZpY2VzL2Nvc3QtY2VudGVyLWxpc3Quc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBR0wsY0FBYyxHQUVmLE1BQU0saUJBQWlCLENBQUM7QUFJekIsT0FBTyxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM3QyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDN0QsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0saUNBQWlDLENBQUM7Ozs7QUFjeEU7OztHQUdHO0FBSUgsTUFBTSxPQUFPLHFCQUFzQixTQUFRLFdBQTRCO0lBR3JFLFlBQ1ksWUFBMEIsRUFDMUIsaUJBQW9DO1FBRTlDLEtBQUssQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUhWLGlCQUFZLEdBQVosWUFBWSxDQUFjO1FBQzFCLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBbUI7UUFKdEMsY0FBUyxHQUFHLHFCQUFxQixDQUFDLFdBQVcsQ0FBQztJQU94RCxDQUFDO0lBRVMsSUFBSSxDQUNaLFVBQTJCO1FBRTNCLE9BQU8sSUFBSSxDQUFDLGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQyxJQUFJLENBQ3BELE1BQU0sQ0FBQyxjQUFjLENBQUMsRUFDdEIsR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FDM0MsQ0FBQztJQUNKLENBQUM7SUFFRDs7O09BR0c7SUFDTyxrQkFBa0IsQ0FBQyxFQUMzQixVQUFVLEVBQ1YsS0FBSyxFQUNMLE1BQU0sR0FDb0I7UUFDMUIsTUFBTSxnQkFBZ0IsR0FBbUM7WUFDdkQsVUFBVTtZQUNWLEtBQUs7WUFDTCxNQUFNLEVBQUUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQVUsRUFBRSxFQUFFLENBQUMsQ0FBQztnQkFDbEMsR0FBRyxLQUFLO2dCQUNSLFFBQVEsRUFBRSxLQUFLLENBQUMsUUFBUSxFQUFFLE9BQU87YUFDbEMsQ0FBQyxDQUFDO1NBQ0osQ0FBQztRQUNGLE9BQU8sZ0JBQWdCLENBQUM7SUFDMUIsQ0FBQzs7a0hBckNVLHFCQUFxQjtzSEFBckIscUJBQXFCLGNBRnBCLE1BQU07MkZBRVAscUJBQXFCO2tCQUhqQyxVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gIENvc3RDZW50ZXIsXG4gIEVudGl0aWVzTW9kZWwsXG4gIGlzTm90VW5kZWZpbmVkLFxuICBQYWdpbmF0aW9uTW9kZWwsXG59IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBDb3N0Q2VudGVyU2VydmljZSB9IGZyb20gJ0BzcGFydGFjdXMvb3JnYW5pemF0aW9uL2FkbWluaXN0cmF0aW9uL2NvcmUnO1xuaW1wb3J0IHsgVGFibGVTZXJ2aWNlIH0gZnJvbSAnQHNwYXJ0YWN1cy9zdG9yZWZyb250JztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGZpbHRlciwgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgTGlzdFNlcnZpY2UgfSBmcm9tICcuLi8uLi9zaGFyZWQvbGlzdC9saXN0LnNlcnZpY2UnO1xuaW1wb3J0IHsgT3JnYW5pemF0aW9uVGFibGVUeXBlIH0gZnJvbSAnLi4vLi4vc2hhcmVkL29yZ2FuaXphdGlvbi5tb2RlbCc7XG5cbi8qKlxuICogVGhlIFVJIG1vZGVsIGZvciB0aGUgY29zdCBjZW50ZXIsIHdoaWNoIGlzIGEgc2xpZ2h0bHkgZmxhdHRlbmVkIHZlcnNpb25cbiAqIG9mIHRoZSBjb3JlIGNvc3QgY2VudGVyIG1vZGVsLlxuICovXG5leHBvcnQgaW50ZXJmYWNlIENvc3RDZW50ZXJNb2RlbCB7XG4gIGNvZGU/OiBzdHJpbmc7XG4gIG5hbWU/OiBzdHJpbmc7XG4gIHVuaXQ/OiBhbnk7XG4gIGN1cnJlbmN5Pzogc3RyaW5nO1xuICBhY3RpdmU/OiBib29sZWFuO1xufVxuXG4vKipcbiAqIFNlcnZpY2UgdG8gcG9wdWxhdGUgQ29zdCBDZW50ZXIgZGF0YSB0byBgVGFibGVgIGRhdGEuIFRoZSBjb3N0IGNlbnRlclxuICogZGF0YSBpcyBkcml2ZW4gYnkgdGhlIHRhYmxlIGNvbmZpZ3VyYXRpb24sIHVzaW5nIHRoZSBgT3JnYW5pemF0aW9uVGFibGVzLkNPU1RfQ0VOVEVSYC5cbiAqL1xuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIENvc3RDZW50ZXJMaXN0U2VydmljZSBleHRlbmRzIExpc3RTZXJ2aWNlPENvc3RDZW50ZXJNb2RlbD4ge1xuICBwcm90ZWN0ZWQgdGFibGVUeXBlID0gT3JnYW5pemF0aW9uVGFibGVUeXBlLkNPU1RfQ0VOVEVSO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByb3RlY3RlZCB0YWJsZVNlcnZpY2U6IFRhYmxlU2VydmljZSxcbiAgICBwcm90ZWN0ZWQgY29zdENlbnRlclNlcnZpY2U6IENvc3RDZW50ZXJTZXJ2aWNlXG4gICkge1xuICAgIHN1cGVyKHRhYmxlU2VydmljZSk7XG4gIH1cblxuICBwcm90ZWN0ZWQgbG9hZChcbiAgICBwYWdpbmF0aW9uOiBQYWdpbmF0aW9uTW9kZWxcbiAgKTogT2JzZXJ2YWJsZTxFbnRpdGllc01vZGVsPENvc3RDZW50ZXJNb2RlbD4+IHtcbiAgICByZXR1cm4gdGhpcy5jb3N0Q2VudGVyU2VydmljZS5nZXRMaXN0KHBhZ2luYXRpb24pLnBpcGUoXG4gICAgICBmaWx0ZXIoaXNOb3RVbmRlZmluZWQpLFxuICAgICAgbWFwKChyYXcpID0+IHRoaXMuY29udmVydENvc3RDZW50ZXJzKHJhdykpXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBQb3B1bGF0ZXMgdGhlIGNvc3QgY2VudGVyIGRhdGEgdG8gYSBjb252ZW5pZW50IHRhYmxlIGRhdGEgbW9kZWwsIHNvIHRoYXQgd2VcbiAgICogY2FuIHNraXAgc3BlY2lmaWMgY29udmVyc2lvbiBpbiB0aGUgdmlldyBsb2dpYyB3aGVyZSBwb3NzaWJsZS5cbiAgICovXG4gIHByb3RlY3RlZCBjb252ZXJ0Q29zdENlbnRlcnMoe1xuICAgIHBhZ2luYXRpb24sXG4gICAgc29ydHMsXG4gICAgdmFsdWVzLFxuICB9OiBFbnRpdGllc01vZGVsPENvc3RDZW50ZXI+KTogRW50aXRpZXNNb2RlbDxDb3N0Q2VudGVyTW9kZWw+IHtcbiAgICBjb25zdCBjb3N0Q2VudGVyTW9kZWxzOiBFbnRpdGllc01vZGVsPENvc3RDZW50ZXJNb2RlbD4gPSB7XG4gICAgICBwYWdpbmF0aW9uLFxuICAgICAgc29ydHMsXG4gICAgICB2YWx1ZXM6IHZhbHVlcy5tYXAoKHZhbHVlOiBhbnkpID0+ICh7XG4gICAgICAgIC4uLnZhbHVlLFxuICAgICAgICBjdXJyZW5jeTogdmFsdWUuY3VycmVuY3k/Lmlzb2NvZGUsXG4gICAgICB9KSksXG4gICAgfTtcbiAgICByZXR1cm4gY29zdENlbnRlck1vZGVscztcbiAgfVxufVxuIl19