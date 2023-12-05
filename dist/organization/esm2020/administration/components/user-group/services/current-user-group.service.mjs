/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { ROUTE_PARAMS } from '@spartacus/organization/administration/root';
import { CurrentItemService } from '../../shared/current-item.service';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/core";
import * as i2 from "@spartacus/organization/administration/core";
export class CurrentUserGroupService extends CurrentItemService {
    constructor(routingService, userGroupService) {
        super(routingService);
        this.routingService = routingService;
        this.userGroupService = userGroupService;
    }
    getParamKey() {
        return ROUTE_PARAMS.userGroupCode;
    }
    getItem(code) {
        return this.userGroupService.get(code);
    }
    getError(code) {
        return this.userGroupService.getErrorState(code);
    }
}
CurrentUserGroupService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CurrentUserGroupService, deps: [{ token: i1.RoutingService }, { token: i2.UserGroupService }], target: i0.ɵɵFactoryTarget.Injectable });
CurrentUserGroupService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CurrentUserGroupService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CurrentUserGroupService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.RoutingService }, { type: i2.UserGroupService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VycmVudC11c2VyLWdyb3VwLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvb3JnYW5pemF0aW9uL2FkbWluaXN0cmF0aW9uL2NvbXBvbmVudHMvdXNlci1ncm91cC9zZXJ2aWNlcy9jdXJyZW50LXVzZXItZ3JvdXAuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQU0zQyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sNkNBQTZDLENBQUM7QUFFM0UsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sbUNBQW1DLENBQUM7Ozs7QUFLdkUsTUFBTSxPQUFPLHVCQUF3QixTQUFRLGtCQUE2QjtJQUN4RSxZQUNZLGNBQThCLEVBQzlCLGdCQUFrQztRQUU1QyxLQUFLLENBQUMsY0FBYyxDQUFDLENBQUM7UUFIWixtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFDOUIscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtJQUc5QyxDQUFDO0lBRVMsV0FBVztRQUNuQixPQUFPLFlBQVksQ0FBQyxhQUFhLENBQUM7SUFDcEMsQ0FBQztJQUVTLE9BQU8sQ0FBQyxJQUFZO1FBQzVCLE9BQU8sSUFBSSxDQUFDLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN6QyxDQUFDO0lBRUQsUUFBUSxDQUFDLElBQVk7UUFDbkIsT0FBTyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ25ELENBQUM7O29IQWxCVSx1QkFBdUI7d0hBQXZCLHVCQUF1QixjQUZ0QixNQUFNOzJGQUVQLHVCQUF1QjtrQkFIbkMsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBSb3V0aW5nU2VydmljZSB9IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQge1xuICBVc2VyR3JvdXAsXG4gIFVzZXJHcm91cFNlcnZpY2UsXG59IGZyb20gJ0BzcGFydGFjdXMvb3JnYW5pemF0aW9uL2FkbWluaXN0cmF0aW9uL2NvcmUnO1xuaW1wb3J0IHsgUk9VVEVfUEFSQU1TIH0gZnJvbSAnQHNwYXJ0YWN1cy9vcmdhbml6YXRpb24vYWRtaW5pc3RyYXRpb24vcm9vdCc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBDdXJyZW50SXRlbVNlcnZpY2UgfSBmcm9tICcuLi8uLi9zaGFyZWQvY3VycmVudC1pdGVtLnNlcnZpY2UnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgQ3VycmVudFVzZXJHcm91cFNlcnZpY2UgZXh0ZW5kcyBDdXJyZW50SXRlbVNlcnZpY2U8VXNlckdyb3VwPiB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByb3RlY3RlZCByb3V0aW5nU2VydmljZTogUm91dGluZ1NlcnZpY2UsXG4gICAgcHJvdGVjdGVkIHVzZXJHcm91cFNlcnZpY2U6IFVzZXJHcm91cFNlcnZpY2VcbiAgKSB7XG4gICAgc3VwZXIocm91dGluZ1NlcnZpY2UpO1xuICB9XG5cbiAgcHJvdGVjdGVkIGdldFBhcmFtS2V5KCkge1xuICAgIHJldHVybiBST1VURV9QQVJBTVMudXNlckdyb3VwQ29kZTtcbiAgfVxuXG4gIHByb3RlY3RlZCBnZXRJdGVtKGNvZGU6IHN0cmluZyk6IE9ic2VydmFibGU8VXNlckdyb3VwPiB7XG4gICAgcmV0dXJuIHRoaXMudXNlckdyb3VwU2VydmljZS5nZXQoY29kZSk7XG4gIH1cblxuICBnZXRFcnJvcihjb2RlOiBzdHJpbmcpOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHtcbiAgICByZXR1cm4gdGhpcy51c2VyR3JvdXBTZXJ2aWNlLmdldEVycm9yU3RhdGUoY29kZSk7XG4gIH1cbn1cbiJdfQ==