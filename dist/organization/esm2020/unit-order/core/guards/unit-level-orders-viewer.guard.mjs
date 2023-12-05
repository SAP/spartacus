/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { B2BUserRight, B2BUserRole, GlobalMessageType, } from '@spartacus/core';
import { filter, map } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/user/account/root";
import * as i2 from "@spartacus/core";
export class UnitLevelOrdersViewerGuard {
    constructor(userAccountFacade, routingService, globalMessageService) {
        this.userAccountFacade = userAccountFacade;
        this.routingService = routingService;
        this.globalMessageService = globalMessageService;
    }
    canActivate() {
        return this.userAccountFacade.get().pipe(filter((user) => !!user && Object.keys(user).length > 0), map((user) => user.roles), map((roles) => {
            const hasRole = Array.isArray(roles) &&
                (roles.includes(B2BUserRight.UNITORDERVIEWER) ||
                    roles.includes(B2BUserRole.ADMIN));
            if (!hasRole) {
                this.routingService.go({ cxRoute: 'home' });
                this.globalMessageService.add({
                    key: 'organization.notification.noSufficientPermissions',
                }, GlobalMessageType.MSG_TYPE_WARNING);
            }
            return hasRole;
        }));
    }
}
UnitLevelOrdersViewerGuard.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitLevelOrdersViewerGuard, deps: [{ token: i1.UserAccountFacade }, { token: i2.RoutingService }, { token: i2.GlobalMessageService }], target: i0.ɵɵFactoryTarget.Injectable });
UnitLevelOrdersViewerGuard.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitLevelOrdersViewerGuard, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitLevelOrdersViewerGuard, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.UserAccountFacade }, { type: i2.RoutingService }, { type: i2.GlobalMessageService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidW5pdC1sZXZlbC1vcmRlcnMtdmlld2VyLmd1YXJkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL29yZ2FuaXphdGlvbi91bml0LW9yZGVyL2NvcmUvZ3VhcmRzL3VuaXQtbGV2ZWwtb3JkZXJzLXZpZXdlci5ndWFyZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUzQyxPQUFPLEVBQ0wsWUFBWSxFQUNaLFdBQVcsRUFFWCxpQkFBaUIsR0FFbEIsTUFBTSxpQkFBaUIsQ0FBQztBQUd6QixPQUFPLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDOzs7O0FBSzdDLE1BQU0sT0FBTywwQkFBMEI7SUFDckMsWUFDWSxpQkFBb0MsRUFDcEMsY0FBOEIsRUFDOUIsb0JBQTBDO1FBRjFDLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBbUI7UUFDcEMsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBQzlCLHlCQUFvQixHQUFwQixvQkFBb0IsQ0FBc0I7SUFDbkQsQ0FBQztJQUVKLFdBQVc7UUFDVCxPQUFPLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQ3RDLE1BQU0sQ0FBQyxDQUFDLElBQUksRUFBZ0IsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLEVBQ3RFLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUUsSUFBb0MsQ0FBQyxLQUFLLENBQUMsRUFDMUQsR0FBRyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUU7WUFDWixNQUFNLE9BQU8sR0FDWCxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQztnQkFDcEIsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxlQUFlLENBQUM7b0JBQzNDLEtBQUssQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFFdkMsSUFBSSxDQUFDLE9BQU8sRUFBRTtnQkFDWixJQUFJLENBQUMsY0FBYyxDQUFDLEVBQUUsQ0FBQyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUFDO2dCQUU1QyxJQUFJLENBQUMsb0JBQW9CLENBQUMsR0FBRyxDQUMzQjtvQkFDRSxHQUFHLEVBQUUsbURBQW1EO2lCQUN6RCxFQUNELGlCQUFpQixDQUFDLGdCQUFnQixDQUNuQyxDQUFDO2FBQ0g7WUFFRCxPQUFPLE9BQU8sQ0FBQztRQUNqQixDQUFDLENBQUMsQ0FDSCxDQUFDO0lBQ0osQ0FBQzs7dUhBL0JVLDBCQUEwQjsySEFBMUIsMEJBQTBCLGNBRnpCLE1BQU07MkZBRVAsMEJBQTBCO2tCQUh0QyxVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENhbkFjdGl2YXRlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7XG4gIEIyQlVzZXJSaWdodCxcbiAgQjJCVXNlclJvbGUsXG4gIEdsb2JhbE1lc3NhZ2VTZXJ2aWNlLFxuICBHbG9iYWxNZXNzYWdlVHlwZSxcbiAgUm91dGluZ1NlcnZpY2UsXG59IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBVc2VyLCBVc2VyQWNjb3VudEZhY2FkZSB9IGZyb20gJ0BzcGFydGFjdXMvdXNlci9hY2NvdW50L3Jvb3QnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZmlsdGVyLCBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBVbml0TGV2ZWxPcmRlcnNWaWV3ZXJHdWFyZCBpbXBsZW1lbnRzIENhbkFjdGl2YXRlIHtcbiAgY29uc3RydWN0b3IoXG4gICAgcHJvdGVjdGVkIHVzZXJBY2NvdW50RmFjYWRlOiBVc2VyQWNjb3VudEZhY2FkZSxcbiAgICBwcm90ZWN0ZWQgcm91dGluZ1NlcnZpY2U6IFJvdXRpbmdTZXJ2aWNlLFxuICAgIHByb3RlY3RlZCBnbG9iYWxNZXNzYWdlU2VydmljZTogR2xvYmFsTWVzc2FnZVNlcnZpY2VcbiAgKSB7fVxuXG4gIGNhbkFjdGl2YXRlKCk6IE9ic2VydmFibGU8Ym9vbGVhbj4ge1xuICAgIHJldHVybiB0aGlzLnVzZXJBY2NvdW50RmFjYWRlLmdldCgpLnBpcGUoXG4gICAgICBmaWx0ZXIoKHVzZXIpOiB1c2VyIGlzIFVzZXIgPT4gISF1c2VyICYmIE9iamVjdC5rZXlzKHVzZXIpLmxlbmd0aCA+IDApLFxuICAgICAgbWFwKCh1c2VyKSA9PiAodXNlciBhcyBVc2VyICYgeyByb2xlcz86IHN0cmluZ1tdIH0pLnJvbGVzKSxcbiAgICAgIG1hcCgocm9sZXMpID0+IHtcbiAgICAgICAgY29uc3QgaGFzUm9sZSA9XG4gICAgICAgICAgQXJyYXkuaXNBcnJheShyb2xlcykgJiZcbiAgICAgICAgICAocm9sZXMuaW5jbHVkZXMoQjJCVXNlclJpZ2h0LlVOSVRPUkRFUlZJRVdFUikgfHxcbiAgICAgICAgICAgIHJvbGVzLmluY2x1ZGVzKEIyQlVzZXJSb2xlLkFETUlOKSk7XG5cbiAgICAgICAgaWYgKCFoYXNSb2xlKSB7XG4gICAgICAgICAgdGhpcy5yb3V0aW5nU2VydmljZS5nbyh7IGN4Um91dGU6ICdob21lJyB9KTtcblxuICAgICAgICAgIHRoaXMuZ2xvYmFsTWVzc2FnZVNlcnZpY2UuYWRkKFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBrZXk6ICdvcmdhbml6YXRpb24ubm90aWZpY2F0aW9uLm5vU3VmZmljaWVudFBlcm1pc3Npb25zJyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBHbG9iYWxNZXNzYWdlVHlwZS5NU0dfVFlQRV9XQVJOSU5HXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBoYXNSb2xlO1xuICAgICAgfSlcbiAgICApO1xuICB9XG59XG4iXX0=