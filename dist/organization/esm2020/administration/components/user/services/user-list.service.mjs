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
 * Service to populate User data to `Table` data. The user
 * data is driven by the table configuration, using the `OrganizationTables.USER`.
 */
export class UserListService extends ListService {
    constructor(tableService, userService) {
        super(tableService);
        this.tableService = tableService;
        this.userService = userService;
        this.tableType = OrganizationTableType.USER;
    }
    key() {
        return 'customerId';
    }
    load(pagination) {
        return this.userService.getList(pagination).pipe(filter(isNotUndefined), map((raw) => this.convertUsers(raw)));
    }
    /**
     * Populates the cost center data to a convenient table data model, so that we
     * can skip specific conversion in the view logic where possible.
     */
    convertUsers({ pagination, sorts, values, }) {
        const availableRoles = this.userService.getAllRoles();
        const userModels = {
            pagination,
            sorts,
            values: values.map((value) => ({
                ...value,
                unit: value.orgUnit,
                roles: value.roles?.filter((role) => availableRoles.includes(role)),
            })),
        };
        return userModels;
    }
}
UserListService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserListService, deps: [{ token: i1.TableService }, { token: i2.B2BUserService }], target: i0.ɵɵFactoryTarget.Injectable });
UserListService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserListService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserListService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.TableService }, { type: i2.B2BUserService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci1saXN0LnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvb3JnYW5pemF0aW9uL2FkbWluaXN0cmF0aW9uL2NvbXBvbmVudHMvdXNlci9zZXJ2aWNlcy91c2VyLWxpc3Quc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBSUwsY0FBYyxHQUVmLE1BQU0saUJBQWlCLENBQUM7QUFJekIsT0FBTyxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM3QyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDN0QsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0saUNBQWlDLENBQUM7Ozs7QUFheEU7OztHQUdHO0FBSUgsTUFBTSxPQUFPLGVBQWdCLFNBQVEsV0FBc0I7SUFHekQsWUFDWSxZQUEwQixFQUMxQixXQUEyQjtRQUVyQyxLQUFLLENBQUMsWUFBWSxDQUFDLENBQUM7UUFIVixpQkFBWSxHQUFaLFlBQVksQ0FBYztRQUMxQixnQkFBVyxHQUFYLFdBQVcsQ0FBZ0I7UUFKN0IsY0FBUyxHQUFHLHFCQUFxQixDQUFDLElBQUksQ0FBQztJQU9qRCxDQUFDO0lBRUQsR0FBRztRQUNELE9BQU8sWUFBWSxDQUFDO0lBQ3RCLENBQUM7SUFFUyxJQUFJLENBQ1osVUFBMkI7UUFFM0IsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQyxJQUFJLENBQzlDLE1BQU0sQ0FBQyxjQUFjLENBQUMsRUFDdEIsR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQ3JDLENBQUM7SUFDSixDQUFDO0lBRUQ7OztPQUdHO0lBQ08sWUFBWSxDQUFDLEVBQ3JCLFVBQVUsRUFDVixLQUFLLEVBQ0wsTUFBTSxHQUNpQjtRQUN2QixNQUFNLGNBQWMsR0FBa0IsSUFBSSxDQUFDLFdBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNyRSxNQUFNLFVBQVUsR0FBNkI7WUFDM0MsVUFBVTtZQUNWLEtBQUs7WUFDTCxNQUFNLEVBQUUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQVUsRUFBRSxFQUFFLENBQUMsQ0FBQztnQkFDbEMsR0FBRyxLQUFLO2dCQUNSLElBQUksRUFBRSxLQUFLLENBQUMsT0FBTztnQkFDbkIsS0FBSyxFQUFFLEtBQUssQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLENBQUMsSUFBUyxFQUFFLEVBQUUsQ0FDdkMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FDOUI7YUFDRixDQUFDLENBQUM7U0FDSixDQUFDO1FBQ0YsT0FBTyxVQUFVLENBQUM7SUFDcEIsQ0FBQzs7NEdBN0NVLGVBQWU7Z0hBQWYsZUFBZSxjQUZkLE1BQU07MkZBRVAsZUFBZTtrQkFIM0IsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICBCMkJVc2VyLFxuICBCMkJVc2VyUm9sZSxcbiAgRW50aXRpZXNNb2RlbCxcbiAgaXNOb3RVbmRlZmluZWQsXG4gIFBhZ2luYXRpb25Nb2RlbCxcbn0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7IEIyQlVzZXJTZXJ2aWNlIH0gZnJvbSAnQHNwYXJ0YWN1cy9vcmdhbml6YXRpb24vYWRtaW5pc3RyYXRpb24vY29yZSc7XG5pbXBvcnQgeyBUYWJsZVNlcnZpY2UgfSBmcm9tICdAc3BhcnRhY3VzL3N0b3JlZnJvbnQnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZmlsdGVyLCBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBMaXN0U2VydmljZSB9IGZyb20gJy4uLy4uL3NoYXJlZC9saXN0L2xpc3Quc2VydmljZSc7XG5pbXBvcnQgeyBPcmdhbml6YXRpb25UYWJsZVR5cGUgfSBmcm9tICcuLi8uLi9zaGFyZWQvb3JnYW5pemF0aW9uLm1vZGVsJztcblxuLyoqXG4gKiBUaGUgVUkgbW9kZWwgZm9yIHRoZSBjb3N0IGNlbnRlciwgd2hpY2ggaXMgYSBzbGlnaHRseSBmbGF0dGVuZWQgdmVyc2lvblxuICogb2YgdGhlIGNvcmUgY29zdCBjZW50ZXIgbW9kZWwuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgVXNlck1vZGVsIHtcbiAgdWlkPzogc3RyaW5nO1xuICBuYW1lPzogc3RyaW5nO1xuICBvcmdVbml0PzogYW55O1xuICByb2xlcz86IHN0cmluZ1tdO1xufVxuXG4vKipcbiAqIFNlcnZpY2UgdG8gcG9wdWxhdGUgVXNlciBkYXRhIHRvIGBUYWJsZWAgZGF0YS4gVGhlIHVzZXJcbiAqIGRhdGEgaXMgZHJpdmVuIGJ5IHRoZSB0YWJsZSBjb25maWd1cmF0aW9uLCB1c2luZyB0aGUgYE9yZ2FuaXphdGlvblRhYmxlcy5VU0VSYC5cbiAqL1xuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIFVzZXJMaXN0U2VydmljZSBleHRlbmRzIExpc3RTZXJ2aWNlPFVzZXJNb2RlbD4ge1xuICBwcm90ZWN0ZWQgdGFibGVUeXBlID0gT3JnYW5pemF0aW9uVGFibGVUeXBlLlVTRVI7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJvdGVjdGVkIHRhYmxlU2VydmljZTogVGFibGVTZXJ2aWNlLFxuICAgIHByb3RlY3RlZCB1c2VyU2VydmljZTogQjJCVXNlclNlcnZpY2VcbiAgKSB7XG4gICAgc3VwZXIodGFibGVTZXJ2aWNlKTtcbiAgfVxuXG4gIGtleSgpOiBzdHJpbmcge1xuICAgIHJldHVybiAnY3VzdG9tZXJJZCc7XG4gIH1cblxuICBwcm90ZWN0ZWQgbG9hZChcbiAgICBwYWdpbmF0aW9uOiBQYWdpbmF0aW9uTW9kZWxcbiAgKTogT2JzZXJ2YWJsZTxFbnRpdGllc01vZGVsPFVzZXJNb2RlbD4+IHtcbiAgICByZXR1cm4gdGhpcy51c2VyU2VydmljZS5nZXRMaXN0KHBhZ2luYXRpb24pLnBpcGUoXG4gICAgICBmaWx0ZXIoaXNOb3RVbmRlZmluZWQpLFxuICAgICAgbWFwKChyYXcpID0+IHRoaXMuY29udmVydFVzZXJzKHJhdykpXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBQb3B1bGF0ZXMgdGhlIGNvc3QgY2VudGVyIGRhdGEgdG8gYSBjb252ZW5pZW50IHRhYmxlIGRhdGEgbW9kZWwsIHNvIHRoYXQgd2VcbiAgICogY2FuIHNraXAgc3BlY2lmaWMgY29udmVyc2lvbiBpbiB0aGUgdmlldyBsb2dpYyB3aGVyZSBwb3NzaWJsZS5cbiAgICovXG4gIHByb3RlY3RlZCBjb252ZXJ0VXNlcnMoe1xuICAgIHBhZ2luYXRpb24sXG4gICAgc29ydHMsXG4gICAgdmFsdWVzLFxuICB9OiBFbnRpdGllc01vZGVsPEIyQlVzZXI+KTogRW50aXRpZXNNb2RlbDxVc2VyTW9kZWw+IHtcbiAgICBjb25zdCBhdmFpbGFibGVSb2xlczogQjJCVXNlclJvbGVbXSA9IHRoaXMudXNlclNlcnZpY2UuZ2V0QWxsUm9sZXMoKTtcbiAgICBjb25zdCB1c2VyTW9kZWxzOiBFbnRpdGllc01vZGVsPFVzZXJNb2RlbD4gPSB7XG4gICAgICBwYWdpbmF0aW9uLFxuICAgICAgc29ydHMsXG4gICAgICB2YWx1ZXM6IHZhbHVlcy5tYXAoKHZhbHVlOiBhbnkpID0+ICh7XG4gICAgICAgIC4uLnZhbHVlLFxuICAgICAgICB1bml0OiB2YWx1ZS5vcmdVbml0LFxuICAgICAgICByb2xlczogdmFsdWUucm9sZXM/LmZpbHRlcigocm9sZTogYW55KSA9PlxuICAgICAgICAgIGF2YWlsYWJsZVJvbGVzLmluY2x1ZGVzKHJvbGUpXG4gICAgICAgICksXG4gICAgICB9KSksXG4gICAgfTtcbiAgICByZXR1cm4gdXNlck1vZGVscztcbiAgfVxufVxuIl19