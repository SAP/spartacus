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
 * Service to populate permission data to `Table` data. The permission
 * data is driven by the table configuration, using the `OrganizationTables.PERMISSION`.
 */
export class PermissionListService extends ListService {
    constructor(tableService, permissionsService) {
        super(tableService);
        this.tableService = tableService;
        this.permissionsService = permissionsService;
        this.tableType = OrganizationTableType.PERMISSION;
    }
    load(pagination) {
        return this.permissionsService.getList(pagination).pipe(filter(isNotUndefined), map((raw) => this.convertPermissions(raw)));
    }
    /**
     * Populates the permission data to a convenient table data model, so that we
     * can skip specific conversion in the view logic where possible.
     */
    convertPermissions({ pagination, sorts, values, }) {
        const permissionGroupModels = {
            pagination,
            sorts,
            values: values.map((value) => ({
                ...value,
                unit: value.orgUnit,
            })),
        };
        return permissionGroupModels;
    }
}
PermissionListService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PermissionListService, deps: [{ token: i1.TableService }, { token: i2.PermissionService }], target: i0.ɵɵFactoryTarget.Injectable });
PermissionListService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PermissionListService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PermissionListService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.TableService }, { type: i2.PermissionService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGVybWlzc2lvbi1saXN0LnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvb3JnYW5pemF0aW9uL2FkbWluaXN0cmF0aW9uL2NvbXBvbmVudHMvcGVybWlzc2lvbi9zZXJ2aWNlcy9wZXJtaXNzaW9uLWxpc3Quc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBRUwsY0FBYyxHQUVmLE1BQU0saUJBQWlCLENBQUM7QUFPekIsT0FBTyxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM3QyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDN0QsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0saUNBQWlDLENBQUM7Ozs7QUFleEU7OztHQUdHO0FBSUgsTUFBTSxPQUFPLHFCQUFzQixTQUFRLFdBQTRCO0lBR3JFLFlBQ1ksWUFBMEIsRUFDMUIsa0JBQXFDO1FBRS9DLEtBQUssQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUhWLGlCQUFZLEdBQVosWUFBWSxDQUFjO1FBQzFCLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBbUI7UUFKdkMsY0FBUyxHQUFHLHFCQUFxQixDQUFDLFVBQVUsQ0FBQztJQU92RCxDQUFDO0lBRVMsSUFBSSxDQUNaLFVBQTJCO1FBRTNCLE9BQU8sSUFBSSxDQUFDLGtCQUFrQixDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQyxJQUFJLENBQ3JELE1BQU0sQ0FBQyxjQUFjLENBQUMsRUFDdEIsR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FDM0MsQ0FBQztJQUNKLENBQUM7SUFFRDs7O09BR0c7SUFDTyxrQkFBa0IsQ0FBQyxFQUMzQixVQUFVLEVBQ1YsS0FBSyxFQUNMLE1BQU0sR0FDbUI7UUFDekIsTUFBTSxxQkFBcUIsR0FBbUM7WUFDNUQsVUFBVTtZQUNWLEtBQUs7WUFDTCxNQUFNLEVBQUUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQVUsRUFBRSxFQUFFLENBQUMsQ0FBQztnQkFDbEMsR0FBRyxLQUFLO2dCQUNSLElBQUksRUFBRSxLQUFLLENBQUMsT0FBTzthQUNwQixDQUFDLENBQUM7U0FDSixDQUFDO1FBQ0YsT0FBTyxxQkFBcUIsQ0FBQztJQUMvQixDQUFDOztrSEFyQ1UscUJBQXFCO3NIQUFyQixxQkFBcUIsY0FGcEIsTUFBTTsyRkFFUCxxQkFBcUI7a0JBSGpDLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgRW50aXRpZXNNb2RlbCxcbiAgaXNOb3RVbmRlZmluZWQsXG4gIFBhZ2luYXRpb25Nb2RlbCxcbn0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7XG4gIFBlcm1pc3Npb25TZXJ2aWNlLFxuICBVc2VyR3JvdXAsXG59IGZyb20gJ0BzcGFydGFjdXMvb3JnYW5pemF0aW9uL2FkbWluaXN0cmF0aW9uL2NvcmUnO1xuaW1wb3J0IHsgVGFibGVTZXJ2aWNlIH0gZnJvbSAnQHNwYXJ0YWN1cy9zdG9yZWZyb250JztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGZpbHRlciwgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgTGlzdFNlcnZpY2UgfSBmcm9tICcuLi8uLi9zaGFyZWQvbGlzdC9saXN0LnNlcnZpY2UnO1xuaW1wb3J0IHsgT3JnYW5pemF0aW9uVGFibGVUeXBlIH0gZnJvbSAnLi4vLi4vc2hhcmVkL29yZ2FuaXphdGlvbi5tb2RlbCc7XG5cbi8qKlxuICogVGhlIFVJIG1vZGVsIGZvciB0aGUgcGVybWlzc2lvbiwgd2hpY2ggaXMgYSBzbGlnaHRseSBmbGF0dGVuZWQgdmVyc2lvblxuICogb2YgdGhlIHBlcm1pc3Npb24gbW9kZWwuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgUGVybWlzc2lvbk1vZGVsIHtcbiAgY29kZT86IHN0cmluZztcbiAgb3JkZXJBcHByb3ZhbFBlcm1pc3Npb25UeXBlPzogeyBuYW1lOiBzdHJpbmcgfTtcbiAgdGhyZXNob2xkPzogYW55O1xuICBwZXJpb2RSYW5nZT86IGFueTtcbiAgb3JnVW5pdD86IGFueTtcbiAgY3VycmVuY3k/OiB7IHN5bWJvbDogc3RyaW5nIH07XG59XG5cbi8qKlxuICogU2VydmljZSB0byBwb3B1bGF0ZSBwZXJtaXNzaW9uIGRhdGEgdG8gYFRhYmxlYCBkYXRhLiBUaGUgcGVybWlzc2lvblxuICogZGF0YSBpcyBkcml2ZW4gYnkgdGhlIHRhYmxlIGNvbmZpZ3VyYXRpb24sIHVzaW5nIHRoZSBgT3JnYW5pemF0aW9uVGFibGVzLlBFUk1JU1NJT05gLlxuICovXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgUGVybWlzc2lvbkxpc3RTZXJ2aWNlIGV4dGVuZHMgTGlzdFNlcnZpY2U8UGVybWlzc2lvbk1vZGVsPiB7XG4gIHByb3RlY3RlZCB0YWJsZVR5cGUgPSBPcmdhbml6YXRpb25UYWJsZVR5cGUuUEVSTUlTU0lPTjtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcm90ZWN0ZWQgdGFibGVTZXJ2aWNlOiBUYWJsZVNlcnZpY2UsXG4gICAgcHJvdGVjdGVkIHBlcm1pc3Npb25zU2VydmljZTogUGVybWlzc2lvblNlcnZpY2VcbiAgKSB7XG4gICAgc3VwZXIodGFibGVTZXJ2aWNlKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBsb2FkKFxuICAgIHBhZ2luYXRpb246IFBhZ2luYXRpb25Nb2RlbFxuICApOiBPYnNlcnZhYmxlPEVudGl0aWVzTW9kZWw8UGVybWlzc2lvbk1vZGVsPj4ge1xuICAgIHJldHVybiB0aGlzLnBlcm1pc3Npb25zU2VydmljZS5nZXRMaXN0KHBhZ2luYXRpb24pLnBpcGUoXG4gICAgICBmaWx0ZXIoaXNOb3RVbmRlZmluZWQpLFxuICAgICAgbWFwKChyYXcpID0+IHRoaXMuY29udmVydFBlcm1pc3Npb25zKHJhdykpXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBQb3B1bGF0ZXMgdGhlIHBlcm1pc3Npb24gZGF0YSB0byBhIGNvbnZlbmllbnQgdGFibGUgZGF0YSBtb2RlbCwgc28gdGhhdCB3ZVxuICAgKiBjYW4gc2tpcCBzcGVjaWZpYyBjb252ZXJzaW9uIGluIHRoZSB2aWV3IGxvZ2ljIHdoZXJlIHBvc3NpYmxlLlxuICAgKi9cbiAgcHJvdGVjdGVkIGNvbnZlcnRQZXJtaXNzaW9ucyh7XG4gICAgcGFnaW5hdGlvbixcbiAgICBzb3J0cyxcbiAgICB2YWx1ZXMsXG4gIH06IEVudGl0aWVzTW9kZWw8VXNlckdyb3VwPik6IEVudGl0aWVzTW9kZWw8UGVybWlzc2lvbk1vZGVsPiB7XG4gICAgY29uc3QgcGVybWlzc2lvbkdyb3VwTW9kZWxzOiBFbnRpdGllc01vZGVsPFBlcm1pc3Npb25Nb2RlbD4gPSB7XG4gICAgICBwYWdpbmF0aW9uLFxuICAgICAgc29ydHMsXG4gICAgICB2YWx1ZXM6IHZhbHVlcy5tYXAoKHZhbHVlOiBhbnkpID0+ICh7XG4gICAgICAgIC4uLnZhbHVlLFxuICAgICAgICB1bml0OiB2YWx1ZS5vcmdVbml0LFxuICAgICAgfSkpLFxuICAgIH07XG4gICAgcmV0dXJuIHBlcm1pc3Npb25Hcm91cE1vZGVscztcbiAgfVxufVxuIl19