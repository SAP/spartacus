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
export class UserGroupUserListService extends SubListService {
    constructor(tableService, userGroupService, userService) {
        super(tableService);
        this.tableService = tableService;
        this.userGroupService = userGroupService;
        this.userService = userService;
        this.tableType = OrganizationTableType.USER_GROUP_USERS;
        this._domainType = OrganizationTableType.USER;
    }
    /**
     *
     * @override
     * Loads all b2b users.
     *
     * @param code The user group code.
     */
    load(pagination, code) {
        return this.userGroupService.getAvailableOrgCustomers(code, pagination);
    }
    /**
     * @override
     * Assign user to the user group.
     */
    assign(userGroupCode, customerId) {
        this.userGroupService.assignMember(userGroupCode, customerId);
        return this.userService.getLoadingStatus(customerId);
    }
    /**
     * @override
     * Unassigns the user from the user group.
     */
    unassign(userGroupCode, customerId) {
        this.userGroupService.unassignMember(userGroupCode, customerId);
        return this.userService.getLoadingStatus(customerId);
    }
    unassignAllMembers(userGroupCode) {
        this.userGroupService.unassignAllMembers(userGroupCode);
        return this.userGroupService.getLoadingStatus(userGroupCode);
    }
}
UserGroupUserListService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserGroupUserListService, deps: [{ token: i1.TableService }, { token: i2.UserGroupService }, { token: i2.B2BUserService }], target: i0.ɵɵFactoryTarget.Injectable });
UserGroupUserListService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserGroupUserListService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserGroupUserListService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.TableService }, { type: i2.UserGroupService }, { type: i2.B2BUserService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci1ncm91cC11c2VyLWxpc3Quc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9vcmdhbml6YXRpb24vYWRtaW5pc3RyYXRpb24vY29tcG9uZW50cy91c2VyLWdyb3VwL3VzZXJzL3VzZXItZ3JvdXAtdXNlci1saXN0LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFVM0MsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDeEUsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHdDQUF3QyxDQUFDOzs7O0FBS3hFLE1BQU0sT0FBTyx3QkFBeUIsU0FBUSxjQUF1QjtJQUluRSxZQUNZLFlBQTBCLEVBQzFCLGdCQUFrQyxFQUNsQyxXQUEyQjtRQUVyQyxLQUFLLENBQUMsWUFBWSxDQUFDLENBQUM7UUFKVixpQkFBWSxHQUFaLFlBQVksQ0FBYztRQUMxQixxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBQ2xDLGdCQUFXLEdBQVgsV0FBVyxDQUFnQjtRQU43QixjQUFTLEdBQUcscUJBQXFCLENBQUMsZ0JBQWdCLENBQUM7UUFDbkQsZ0JBQVcsR0FBRyxxQkFBcUIsQ0FBQyxJQUFJLENBQUM7SUFRbkQsQ0FBQztJQUVEOzs7Ozs7T0FNRztJQUNPLElBQUksQ0FDWixVQUEyQixFQUMzQixJQUFZO1FBRVosT0FBTyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsd0JBQXdCLENBQUMsSUFBSSxFQUFFLFVBQVUsQ0FBQyxDQUFDO0lBQzFFLENBQUM7SUFFRDs7O09BR0c7SUFDSCxNQUFNLENBQ0osYUFBcUIsRUFDckIsVUFBa0I7UUFFbEIsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFlBQVksQ0FBQyxhQUFhLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFDOUQsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLGdCQUFnQixDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ3ZELENBQUM7SUFFRDs7O09BR0c7SUFDSCxRQUFRLENBQ04sYUFBcUIsRUFDckIsVUFBa0I7UUFFbEIsSUFBSSxDQUFDLGdCQUFnQixDQUFDLGNBQWMsQ0FBQyxhQUFhLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFDaEUsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLGdCQUFnQixDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ3ZELENBQUM7SUFFRCxrQkFBa0IsQ0FDaEIsYUFBcUI7UUFFckIsSUFBSSxDQUFDLGdCQUFnQixDQUFDLGtCQUFrQixDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQ3hELE9BQU8sSUFBSSxDQUFDLGdCQUFnQixDQUFDLGdCQUFnQixDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBQy9ELENBQUM7O3FIQXZEVSx3QkFBd0I7eUhBQXhCLHdCQUF3QixjQUZ2QixNQUFNOzJGQUVQLHdCQUF3QjtrQkFIcEMsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBCMkJVc2VyLCBFbnRpdGllc01vZGVsLCBQYWdpbmF0aW9uTW9kZWwgfSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHtcbiAgQjJCVXNlclNlcnZpY2UsXG4gIE9yZ2FuaXphdGlvbkl0ZW1TdGF0dXMsXG4gIFVzZXJHcm91cCxcbiAgVXNlckdyb3VwU2VydmljZSxcbn0gZnJvbSAnQHNwYXJ0YWN1cy9vcmdhbml6YXRpb24vYWRtaW5pc3RyYXRpb24vY29yZSc7XG5pbXBvcnQgeyBUYWJsZVNlcnZpY2UgfSBmcm9tICdAc3BhcnRhY3VzL3N0b3JlZnJvbnQnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgT3JnYW5pemF0aW9uVGFibGVUeXBlIH0gZnJvbSAnLi4vLi4vc2hhcmVkL29yZ2FuaXphdGlvbi5tb2RlbCc7XG5pbXBvcnQgeyBTdWJMaXN0U2VydmljZSB9IGZyb20gJy4uLy4uL3NoYXJlZC9zdWItbGlzdC9zdWItbGlzdC5zZXJ2aWNlJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIFVzZXJHcm91cFVzZXJMaXN0U2VydmljZSBleHRlbmRzIFN1Ykxpc3RTZXJ2aWNlPEIyQlVzZXI+IHtcbiAgcHJvdGVjdGVkIHRhYmxlVHlwZSA9IE9yZ2FuaXphdGlvblRhYmxlVHlwZS5VU0VSX0dST1VQX1VTRVJTO1xuICBwcm90ZWN0ZWQgX2RvbWFpblR5cGUgPSBPcmdhbml6YXRpb25UYWJsZVR5cGUuVVNFUjtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcm90ZWN0ZWQgdGFibGVTZXJ2aWNlOiBUYWJsZVNlcnZpY2UsXG4gICAgcHJvdGVjdGVkIHVzZXJHcm91cFNlcnZpY2U6IFVzZXJHcm91cFNlcnZpY2UsXG4gICAgcHJvdGVjdGVkIHVzZXJTZXJ2aWNlOiBCMkJVc2VyU2VydmljZVxuICApIHtcbiAgICBzdXBlcih0YWJsZVNlcnZpY2UpO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEBvdmVycmlkZVxuICAgKiBMb2FkcyBhbGwgYjJiIHVzZXJzLlxuICAgKlxuICAgKiBAcGFyYW0gY29kZSBUaGUgdXNlciBncm91cCBjb2RlLlxuICAgKi9cbiAgcHJvdGVjdGVkIGxvYWQoXG4gICAgcGFnaW5hdGlvbjogUGFnaW5hdGlvbk1vZGVsLFxuICAgIGNvZGU6IHN0cmluZ1xuICApOiBPYnNlcnZhYmxlPEVudGl0aWVzTW9kZWw8QjJCVXNlcj4gfCB1bmRlZmluZWQ+IHtcbiAgICByZXR1cm4gdGhpcy51c2VyR3JvdXBTZXJ2aWNlLmdldEF2YWlsYWJsZU9yZ0N1c3RvbWVycyhjb2RlLCBwYWdpbmF0aW9uKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAb3ZlcnJpZGVcbiAgICogQXNzaWduIHVzZXIgdG8gdGhlIHVzZXIgZ3JvdXAuXG4gICAqL1xuICBhc3NpZ24oXG4gICAgdXNlckdyb3VwQ29kZTogc3RyaW5nLFxuICAgIGN1c3RvbWVySWQ6IHN0cmluZ1xuICApOiBPYnNlcnZhYmxlPE9yZ2FuaXphdGlvbkl0ZW1TdGF0dXM8QjJCVXNlcj4+IHtcbiAgICB0aGlzLnVzZXJHcm91cFNlcnZpY2UuYXNzaWduTWVtYmVyKHVzZXJHcm91cENvZGUsIGN1c3RvbWVySWQpO1xuICAgIHJldHVybiB0aGlzLnVzZXJTZXJ2aWNlLmdldExvYWRpbmdTdGF0dXMoY3VzdG9tZXJJZCk7XG4gIH1cblxuICAvKipcbiAgICogQG92ZXJyaWRlXG4gICAqIFVuYXNzaWducyB0aGUgdXNlciBmcm9tIHRoZSB1c2VyIGdyb3VwLlxuICAgKi9cbiAgdW5hc3NpZ24oXG4gICAgdXNlckdyb3VwQ29kZTogc3RyaW5nLFxuICAgIGN1c3RvbWVySWQ6IHN0cmluZ1xuICApOiBPYnNlcnZhYmxlPE9yZ2FuaXphdGlvbkl0ZW1TdGF0dXM8QjJCVXNlcj4+IHtcbiAgICB0aGlzLnVzZXJHcm91cFNlcnZpY2UudW5hc3NpZ25NZW1iZXIodXNlckdyb3VwQ29kZSwgY3VzdG9tZXJJZCk7XG4gICAgcmV0dXJuIHRoaXMudXNlclNlcnZpY2UuZ2V0TG9hZGluZ1N0YXR1cyhjdXN0b21lcklkKTtcbiAgfVxuXG4gIHVuYXNzaWduQWxsTWVtYmVycyhcbiAgICB1c2VyR3JvdXBDb2RlOiBzdHJpbmdcbiAgKTogT2JzZXJ2YWJsZTxPcmdhbml6YXRpb25JdGVtU3RhdHVzPFVzZXJHcm91cD4+IHtcbiAgICB0aGlzLnVzZXJHcm91cFNlcnZpY2UudW5hc3NpZ25BbGxNZW1iZXJzKHVzZXJHcm91cENvZGUpO1xuICAgIHJldHVybiB0aGlzLnVzZXJHcm91cFNlcnZpY2UuZ2V0TG9hZGluZ1N0YXR1cyh1c2VyR3JvdXBDb2RlKTtcbiAgfVxufVxuIl19