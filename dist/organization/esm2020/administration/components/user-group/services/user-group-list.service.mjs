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
export class UserGroupListService extends ListService {
    constructor(tableService, userGroupService) {
        super(tableService);
        this.tableService = tableService;
        this.userGroupService = userGroupService;
        this.tableType = OrganizationTableType.USER_GROUP;
    }
    key() {
        return 'uid';
    }
    load(pagination) {
        return this.userGroupService.getList(pagination).pipe(filter(isNotUndefined), map((raw) => this.convertUserGroups(raw)));
    }
    /**
     * Populates the cost center data to a convenient table data model, so that we
     * can skip specific conversion in the view logic where possible.
     */
    convertUserGroups({ pagination, sorts, values, }) {
        const userGroupModels = {
            pagination,
            sorts,
            values: values.map((value) => ({
                ...value,
                unit: value.orgUnit,
            })),
        };
        return userGroupModels;
    }
}
UserGroupListService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserGroupListService, deps: [{ token: i1.TableService }, { token: i2.UserGroupService }], target: i0.ɵɵFactoryTarget.Injectable });
UserGroupListService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserGroupListService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserGroupListService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.TableService }, { type: i2.UserGroupService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci1ncm91cC1saXN0LnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvb3JnYW5pemF0aW9uL2FkbWluaXN0cmF0aW9uL2NvbXBvbmVudHMvdXNlci1ncm91cC9zZXJ2aWNlcy91c2VyLWdyb3VwLWxpc3Quc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBRUwsY0FBYyxHQUVmLE1BQU0saUJBQWlCLENBQUM7QUFPekIsT0FBTyxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM3QyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDN0QsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0saUNBQWlDLENBQUM7Ozs7QUFXeEU7OztHQUdHO0FBSUgsTUFBTSxPQUFPLG9CQUFxQixTQUFRLFdBQTJCO0lBR25FLFlBQ1ksWUFBMEIsRUFDMUIsZ0JBQWtDO1FBRTVDLEtBQUssQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUhWLGlCQUFZLEdBQVosWUFBWSxDQUFjO1FBQzFCLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFKcEMsY0FBUyxHQUFHLHFCQUFxQixDQUFDLFVBQVUsQ0FBQztJQU92RCxDQUFDO0lBRUQsR0FBRztRQUNELE9BQU8sS0FBSyxDQUFDO0lBQ2YsQ0FBQztJQUVTLElBQUksQ0FDWixVQUEyQjtRQUUzQixPQUFPLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUMsSUFBSSxDQUNuRCxNQUFNLENBQUMsY0FBYyxDQUFDLEVBQ3RCLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQzFDLENBQUM7SUFDSixDQUFDO0lBRUQ7OztPQUdHO0lBQ08saUJBQWlCLENBQUMsRUFDMUIsVUFBVSxFQUNWLEtBQUssRUFDTCxNQUFNLEdBQ21CO1FBQ3pCLE1BQU0sZUFBZSxHQUFrQztZQUNyRCxVQUFVO1lBQ1YsS0FBSztZQUNMLE1BQU0sRUFBRSxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBVSxFQUFFLEVBQUUsQ0FBQyxDQUFDO2dCQUNsQyxHQUFHLEtBQUs7Z0JBQ1IsSUFBSSxFQUFFLEtBQUssQ0FBQyxPQUFPO2FBQ3BCLENBQUMsQ0FBQztTQUNKLENBQUM7UUFDRixPQUFPLGVBQWUsQ0FBQztJQUN6QixDQUFDOztpSEF6Q1Usb0JBQW9CO3FIQUFwQixvQkFBb0IsY0FGbkIsTUFBTTsyRkFFUCxvQkFBb0I7a0JBSGhDLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgRW50aXRpZXNNb2RlbCxcbiAgaXNOb3RVbmRlZmluZWQsXG4gIFBhZ2luYXRpb25Nb2RlbCxcbn0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7XG4gIFVzZXJHcm91cCxcbiAgVXNlckdyb3VwU2VydmljZSxcbn0gZnJvbSAnQHNwYXJ0YWN1cy9vcmdhbml6YXRpb24vYWRtaW5pc3RyYXRpb24vY29yZSc7XG5pbXBvcnQgeyBUYWJsZVNlcnZpY2UgfSBmcm9tICdAc3BhcnRhY3VzL3N0b3JlZnJvbnQnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZmlsdGVyLCBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBMaXN0U2VydmljZSB9IGZyb20gJy4uLy4uL3NoYXJlZC9saXN0L2xpc3Quc2VydmljZSc7XG5pbXBvcnQgeyBPcmdhbml6YXRpb25UYWJsZVR5cGUgfSBmcm9tICcuLi8uLi9zaGFyZWQvb3JnYW5pemF0aW9uLm1vZGVsJztcbi8qKlxuICogVGhlIFVJIG1vZGVsIGZvciB0aGUgY29zdCBjZW50ZXIsIHdoaWNoIGlzIGEgc2xpZ2h0bHkgZmxhdHRlbmVkIHZlcnNpb25cbiAqIG9mIHRoZSBjb3JlIGNvc3QgY2VudGVyIG1vZGVsLlxuICovXG5leHBvcnQgaW50ZXJmYWNlIFVzZXJHcm91cE1vZGVsIHtcbiAgdWlkPzogc3RyaW5nO1xuICBuYW1lPzogc3RyaW5nO1xuICBvcmdVbml0PzogYW55O1xufVxuXG4vKipcbiAqIFNlcnZpY2UgdG8gcG9wdWxhdGUgQ29zdCBDZW50ZXIgZGF0YSB0byBgVGFibGVgIGRhdGEuIFRoZSBjb3N0IGNlbnRlclxuICogZGF0YSBpcyBkcml2ZW4gYnkgdGhlIHRhYmxlIGNvbmZpZ3VyYXRpb24sIHVzaW5nIHRoZSBgT3JnYW5pemF0aW9uVGFibGVzLkNPU1RfQ0VOVEVSYC5cbiAqL1xuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIFVzZXJHcm91cExpc3RTZXJ2aWNlIGV4dGVuZHMgTGlzdFNlcnZpY2U8VXNlckdyb3VwTW9kZWw+IHtcbiAgcHJvdGVjdGVkIHRhYmxlVHlwZSA9IE9yZ2FuaXphdGlvblRhYmxlVHlwZS5VU0VSX0dST1VQO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByb3RlY3RlZCB0YWJsZVNlcnZpY2U6IFRhYmxlU2VydmljZSxcbiAgICBwcm90ZWN0ZWQgdXNlckdyb3VwU2VydmljZTogVXNlckdyb3VwU2VydmljZVxuICApIHtcbiAgICBzdXBlcih0YWJsZVNlcnZpY2UpO1xuICB9XG5cbiAga2V5KCk6IHN0cmluZyB7XG4gICAgcmV0dXJuICd1aWQnO1xuICB9XG5cbiAgcHJvdGVjdGVkIGxvYWQoXG4gICAgcGFnaW5hdGlvbjogUGFnaW5hdGlvbk1vZGVsXG4gICk6IE9ic2VydmFibGU8RW50aXRpZXNNb2RlbDxVc2VyR3JvdXBNb2RlbD4+IHtcbiAgICByZXR1cm4gdGhpcy51c2VyR3JvdXBTZXJ2aWNlLmdldExpc3QocGFnaW5hdGlvbikucGlwZShcbiAgICAgIGZpbHRlcihpc05vdFVuZGVmaW5lZCksXG4gICAgICBtYXAoKHJhdykgPT4gdGhpcy5jb252ZXJ0VXNlckdyb3VwcyhyYXcpKVxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogUG9wdWxhdGVzIHRoZSBjb3N0IGNlbnRlciBkYXRhIHRvIGEgY29udmVuaWVudCB0YWJsZSBkYXRhIG1vZGVsLCBzbyB0aGF0IHdlXG4gICAqIGNhbiBza2lwIHNwZWNpZmljIGNvbnZlcnNpb24gaW4gdGhlIHZpZXcgbG9naWMgd2hlcmUgcG9zc2libGUuXG4gICAqL1xuICBwcm90ZWN0ZWQgY29udmVydFVzZXJHcm91cHMoe1xuICAgIHBhZ2luYXRpb24sXG4gICAgc29ydHMsXG4gICAgdmFsdWVzLFxuICB9OiBFbnRpdGllc01vZGVsPFVzZXJHcm91cD4pOiBFbnRpdGllc01vZGVsPFVzZXJHcm91cE1vZGVsPiB7XG4gICAgY29uc3QgdXNlckdyb3VwTW9kZWxzOiBFbnRpdGllc01vZGVsPFVzZXJHcm91cE1vZGVsPiA9IHtcbiAgICAgIHBhZ2luYXRpb24sXG4gICAgICBzb3J0cyxcbiAgICAgIHZhbHVlczogdmFsdWVzLm1hcCgodmFsdWU6IGFueSkgPT4gKHtcbiAgICAgICAgLi4udmFsdWUsXG4gICAgICAgIHVuaXQ6IHZhbHVlLm9yZ1VuaXQsXG4gICAgICB9KSksXG4gICAgfTtcbiAgICByZXR1cm4gdXNlckdyb3VwTW9kZWxzO1xuICB9XG59XG4iXX0=