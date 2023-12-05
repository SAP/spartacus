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
 * Service to populate Budget data to `Table` data. Budget
 * data is driven by the table configuration, using the `OrganizationTables.BUDGET`.
 */
export class BudgetListService extends ListService {
    constructor(tableService, budgetService) {
        super(tableService);
        this.tableService = tableService;
        this.budgetService = budgetService;
        this.tableType = OrganizationTableType.BUDGET;
    }
    load(pagination) {
        return this.budgetService.getList(pagination).pipe(filter(isNotUndefined), map((raw) => this.convertBudgets(raw)));
    }
    /**
     * Populates budget data to a convenient table data model, so that we
     * can skip specific conversion in the view logic where possible.
     */
    convertBudgets({ pagination, sorts, values, }) {
        const budgetModels = {
            pagination,
            sorts,
            values: values.map((value) => ({
                ...value,
                currency: value.currency?.isocode,
                unit: value.orgUnit,
            })),
        };
        return budgetModels;
    }
}
BudgetListService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: BudgetListService, deps: [{ token: i1.TableService }, { token: i2.BudgetService }], target: i0.ɵɵFactoryTarget.Injectable });
BudgetListService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: BudgetListService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: BudgetListService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.TableService }, { type: i2.BudgetService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVkZ2V0LWxpc3Quc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9vcmdhbml6YXRpb24vYWRtaW5pc3RyYXRpb24vY29tcG9uZW50cy9idWRnZXQvc2VydmljZXMvYnVkZ2V0LWxpc3Quc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBRUwsY0FBYyxHQUVmLE1BQU0saUJBQWlCLENBQUM7QUFPekIsT0FBTyxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM3QyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDN0QsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0saUNBQWlDLENBQUM7Ozs7QUFFeEU7OztHQUdHO0FBSUgsTUFBTSxPQUFPLGlCQUFrQixTQUFRLFdBQW1CO0lBR3hELFlBQ1ksWUFBMEIsRUFDMUIsYUFBNEI7UUFFdEMsS0FBSyxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBSFYsaUJBQVksR0FBWixZQUFZLENBQWM7UUFDMUIsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFKOUIsY0FBUyxHQUFHLHFCQUFxQixDQUFDLE1BQU0sQ0FBQztJQU9uRCxDQUFDO0lBRVMsSUFBSSxDQUNaLFVBQTJCO1FBRTNCLE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUMsSUFBSSxDQUNoRCxNQUFNLENBQUMsY0FBYyxDQUFDLEVBQ3RCLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUN2QyxDQUFDO0lBQ0osQ0FBQztJQUVEOzs7T0FHRztJQUNPLGNBQWMsQ0FBQyxFQUN2QixVQUFVLEVBQ1YsS0FBSyxFQUNMLE1BQU0sR0FDZ0I7UUFDdEIsTUFBTSxZQUFZLEdBQTBCO1lBQzFDLFVBQVU7WUFDVixLQUFLO1lBQ0wsTUFBTSxFQUFFLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFVLEVBQUUsRUFBRSxDQUFDLENBQUM7Z0JBQ2xDLEdBQUcsS0FBSztnQkFDUixRQUFRLEVBQUUsS0FBSyxDQUFDLFFBQVEsRUFBRSxPQUFPO2dCQUNqQyxJQUFJLEVBQUUsS0FBSyxDQUFDLE9BQU87YUFDcEIsQ0FBQyxDQUFDO1NBQ0osQ0FBQztRQUNGLE9BQU8sWUFBWSxDQUFDO0lBQ3RCLENBQUM7OzhHQXRDVSxpQkFBaUI7a0hBQWpCLGlCQUFpQixjQUZoQixNQUFNOzJGQUVQLGlCQUFpQjtrQkFIN0IsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICBFbnRpdGllc01vZGVsLFxuICBpc05vdFVuZGVmaW5lZCxcbiAgUGFnaW5hdGlvbk1vZGVsLFxufSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHtcbiAgQnVkZ2V0LFxuICBCdWRnZXRTZXJ2aWNlLFxufSBmcm9tICdAc3BhcnRhY3VzL29yZ2FuaXphdGlvbi9hZG1pbmlzdHJhdGlvbi9jb3JlJztcbmltcG9ydCB7IFRhYmxlU2VydmljZSB9IGZyb20gJ0BzcGFydGFjdXMvc3RvcmVmcm9udCc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBmaWx0ZXIsIG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IExpc3RTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2hhcmVkL2xpc3QvbGlzdC5zZXJ2aWNlJztcbmltcG9ydCB7IE9yZ2FuaXphdGlvblRhYmxlVHlwZSB9IGZyb20gJy4uLy4uL3NoYXJlZC9vcmdhbml6YXRpb24ubW9kZWwnO1xuXG4vKipcbiAqIFNlcnZpY2UgdG8gcG9wdWxhdGUgQnVkZ2V0IGRhdGEgdG8gYFRhYmxlYCBkYXRhLiBCdWRnZXRcbiAqIGRhdGEgaXMgZHJpdmVuIGJ5IHRoZSB0YWJsZSBjb25maWd1cmF0aW9uLCB1c2luZyB0aGUgYE9yZ2FuaXphdGlvblRhYmxlcy5CVURHRVRgLlxuICovXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgQnVkZ2V0TGlzdFNlcnZpY2UgZXh0ZW5kcyBMaXN0U2VydmljZTxCdWRnZXQ+IHtcbiAgcHJvdGVjdGVkIHRhYmxlVHlwZSA9IE9yZ2FuaXphdGlvblRhYmxlVHlwZS5CVURHRVQ7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJvdGVjdGVkIHRhYmxlU2VydmljZTogVGFibGVTZXJ2aWNlLFxuICAgIHByb3RlY3RlZCBidWRnZXRTZXJ2aWNlOiBCdWRnZXRTZXJ2aWNlXG4gICkge1xuICAgIHN1cGVyKHRhYmxlU2VydmljZSk7XG4gIH1cblxuICBwcm90ZWN0ZWQgbG9hZChcbiAgICBwYWdpbmF0aW9uOiBQYWdpbmF0aW9uTW9kZWxcbiAgKTogT2JzZXJ2YWJsZTxFbnRpdGllc01vZGVsPEJ1ZGdldD4+IHtcbiAgICByZXR1cm4gdGhpcy5idWRnZXRTZXJ2aWNlLmdldExpc3QocGFnaW5hdGlvbikucGlwZShcbiAgICAgIGZpbHRlcihpc05vdFVuZGVmaW5lZCksXG4gICAgICBtYXAoKHJhdykgPT4gdGhpcy5jb252ZXJ0QnVkZ2V0cyhyYXcpKVxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogUG9wdWxhdGVzIGJ1ZGdldCBkYXRhIHRvIGEgY29udmVuaWVudCB0YWJsZSBkYXRhIG1vZGVsLCBzbyB0aGF0IHdlXG4gICAqIGNhbiBza2lwIHNwZWNpZmljIGNvbnZlcnNpb24gaW4gdGhlIHZpZXcgbG9naWMgd2hlcmUgcG9zc2libGUuXG4gICAqL1xuICBwcm90ZWN0ZWQgY29udmVydEJ1ZGdldHMoe1xuICAgIHBhZ2luYXRpb24sXG4gICAgc29ydHMsXG4gICAgdmFsdWVzLFxuICB9OiBFbnRpdGllc01vZGVsPEJ1ZGdldD4pOiBFbnRpdGllc01vZGVsPEJ1ZGdldD4ge1xuICAgIGNvbnN0IGJ1ZGdldE1vZGVsczogRW50aXRpZXNNb2RlbDxCdWRnZXQ+ID0ge1xuICAgICAgcGFnaW5hdGlvbixcbiAgICAgIHNvcnRzLFxuICAgICAgdmFsdWVzOiB2YWx1ZXMubWFwKCh2YWx1ZTogYW55KSA9PiAoe1xuICAgICAgICAuLi52YWx1ZSxcbiAgICAgICAgY3VycmVuY3k6IHZhbHVlLmN1cnJlbmN5Py5pc29jb2RlLFxuICAgICAgICB1bml0OiB2YWx1ZS5vcmdVbml0LFxuICAgICAgfSkpLFxuICAgIH07XG4gICAgcmV0dXJuIGJ1ZGdldE1vZGVscztcbiAgfVxufVxuIl19