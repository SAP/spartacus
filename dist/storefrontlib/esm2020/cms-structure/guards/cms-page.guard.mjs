/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { isNotUndefined, } from '@spartacus/core';
import { of } from 'rxjs';
import { filter, first, switchMap, take } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/core";
import * as i2 from "./cms-page-guard.service";
export class CmsPageGuard {
    constructor(routingService, cmsService, protectedRoutesGuard, service, routingConfig) {
        this.routingService = routingService;
        this.cmsService = cmsService;
        this.protectedRoutesGuard = protectedRoutesGuard;
        this.service = service;
        this.routingConfig = routingConfig;
    }
    /**
     * Tries to load the CMS page data for the anticipated route and returns:
     * - `true` - if it can be activated
     * - `false` - if it cannot be activated
     * - `UrlTree` - if user should be redirected to a given `UrlTree`
     *
     * If the route can be activated, it fires additional calculations on the CMS components present on this CMS page,
     * based on their configuration (`cmsComponents` config).
     *
     * For more, see docs of the `CmsPageGuardService.canActivatePage`.
     */
    canActivate(route, state) {
        return this.protectedRoutesGuard.canActivate(route).pipe(switchMap((canActivate) => canActivate === true
            ? this.routingService.getNextPageContext().pipe(filter(isNotUndefined), take(1), switchMap((pageContext) => this.cmsService.getPage(pageContext, this.shouldReload()).pipe(first(), switchMap((pageData) => pageData
                ? this.service.canActivatePage(pageContext, pageData, route, state)
                : this.service.canActivateNotFoundPage(pageContext, route, state)))))
            : of(canActivate)));
    }
    /**
     * Returns whether we should reload the CMS page data, even when it was loaded before.
     */
    shouldReload() {
        return this.routingConfig.getLoadStrategy() !== "once" /* RouteLoadStrategy.ONCE */;
    }
}
CmsPageGuard.guardName = 'CmsPageGuard';
CmsPageGuard.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CmsPageGuard, deps: [{ token: i1.RoutingService }, { token: i1.CmsService }, { token: i1.ProtectedRoutesGuard }, { token: i2.CmsPageGuardService }, { token: i1.RoutingConfigService }], target: i0.ɵɵFactoryTarget.Injectable });
CmsPageGuard.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CmsPageGuard, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CmsPageGuard, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.RoutingService }, { type: i1.CmsService }, { type: i1.ProtectedRoutesGuard }, { type: i2.CmsPageGuardService }, { type: i1.RoutingConfigService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY21zLXBhZ2UuZ3VhcmQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9zdG9yZWZyb250bGliL2Ntcy1zdHJ1Y3R1cmUvZ3VhcmRzL2Ntcy1wYWdlLmd1YXJkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTNDLE9BQU8sRUFHTCxjQUFjLEdBS2YsTUFBTSxpQkFBaUIsQ0FBQztBQUN6QixPQUFPLEVBQWMsRUFBRSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ3RDLE9BQU8sRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7OztBQU1oRSxNQUFNLE9BQU8sWUFBWTtJQUd2QixZQUNZLGNBQThCLEVBQzlCLFVBQXNCLEVBQ3RCLG9CQUEwQyxFQUMxQyxPQUE0QixFQUM1QixhQUFtQztRQUpuQyxtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFDOUIsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUN0Qix5QkFBb0IsR0FBcEIsb0JBQW9CLENBQXNCO1FBQzFDLFlBQU8sR0FBUCxPQUFPLENBQXFCO1FBQzVCLGtCQUFhLEdBQWIsYUFBYSxDQUFzQjtJQUM1QyxDQUFDO0lBRUo7Ozs7Ozs7Ozs7T0FVRztJQUNILFdBQVcsQ0FDVCxLQUFnQyxFQUNoQyxLQUEwQjtRQUUxQixPQUFPLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUN0RCxTQUFTLENBQUMsQ0FBQyxXQUFXLEVBQUUsRUFBRSxDQUN4QixXQUFXLEtBQUssSUFBSTtZQUNsQixDQUFDLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxrQkFBa0IsRUFBRSxDQUFDLElBQUksQ0FDM0MsTUFBTSxDQUFDLGNBQWMsQ0FBQyxFQUN0QixJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQ1AsU0FBUyxDQUFDLENBQUMsV0FBVyxFQUFFLEVBQUUsQ0FDeEIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FDNUQsS0FBSyxFQUFFLEVBQ1AsU0FBUyxDQUFDLENBQUMsUUFBUSxFQUFFLEVBQUUsQ0FDckIsUUFBUTtnQkFDTixDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQzFCLFdBQVcsRUFDWCxRQUFRLEVBQ1IsS0FBSyxFQUNMLEtBQUssQ0FDTjtnQkFDSCxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyx1QkFBdUIsQ0FDbEMsV0FBVyxFQUNYLEtBQUssRUFDTCxLQUFLLENBQ04sQ0FDTixDQUNGLENBQ0YsQ0FDRjtZQUNILENBQUMsQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDLENBQ3BCLENBQ0YsQ0FBQztJQUNKLENBQUM7SUFFRDs7T0FFRztJQUNLLFlBQVk7UUFDbEIsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDLGVBQWUsRUFBRSx3Q0FBMkIsQ0FBQztJQUN6RSxDQUFDOztBQTdETSxzQkFBUyxHQUFHLGNBQWMsQ0FBQzt5R0FEdkIsWUFBWTs2R0FBWixZQUFZLGNBRlgsTUFBTTsyRkFFUCxZQUFZO2tCQUh4QixVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENhbkFjdGl2YXRlLCBSb3V0ZXJTdGF0ZVNuYXBzaG90LCBVcmxUcmVlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7XG4gIENtc0FjdGl2YXRlZFJvdXRlU25hcHNob3QsXG4gIENtc1NlcnZpY2UsXG4gIGlzTm90VW5kZWZpbmVkLFxuICBQcm90ZWN0ZWRSb3V0ZXNHdWFyZCxcbiAgUm91dGVMb2FkU3RyYXRlZ3ksXG4gIFJvdXRpbmdDb25maWdTZXJ2aWNlLFxuICBSb3V0aW5nU2VydmljZSxcbn0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUsIG9mIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBmaWx0ZXIsIGZpcnN0LCBzd2l0Y2hNYXAsIHRha2UgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBDbXNQYWdlR3VhcmRTZXJ2aWNlIH0gZnJvbSAnLi9jbXMtcGFnZS1ndWFyZC5zZXJ2aWNlJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIENtc1BhZ2VHdWFyZCBpbXBsZW1lbnRzIENhbkFjdGl2YXRlIHtcbiAgc3RhdGljIGd1YXJkTmFtZSA9ICdDbXNQYWdlR3VhcmQnO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByb3RlY3RlZCByb3V0aW5nU2VydmljZTogUm91dGluZ1NlcnZpY2UsXG4gICAgcHJvdGVjdGVkIGNtc1NlcnZpY2U6IENtc1NlcnZpY2UsXG4gICAgcHJvdGVjdGVkIHByb3RlY3RlZFJvdXRlc0d1YXJkOiBQcm90ZWN0ZWRSb3V0ZXNHdWFyZCxcbiAgICBwcm90ZWN0ZWQgc2VydmljZTogQ21zUGFnZUd1YXJkU2VydmljZSxcbiAgICBwcm90ZWN0ZWQgcm91dGluZ0NvbmZpZzogUm91dGluZ0NvbmZpZ1NlcnZpY2VcbiAgKSB7fVxuXG4gIC8qKlxuICAgKiBUcmllcyB0byBsb2FkIHRoZSBDTVMgcGFnZSBkYXRhIGZvciB0aGUgYW50aWNpcGF0ZWQgcm91dGUgYW5kIHJldHVybnM6XG4gICAqIC0gYHRydWVgIC0gaWYgaXQgY2FuIGJlIGFjdGl2YXRlZFxuICAgKiAtIGBmYWxzZWAgLSBpZiBpdCBjYW5ub3QgYmUgYWN0aXZhdGVkXG4gICAqIC0gYFVybFRyZWVgIC0gaWYgdXNlciBzaG91bGQgYmUgcmVkaXJlY3RlZCB0byBhIGdpdmVuIGBVcmxUcmVlYFxuICAgKlxuICAgKiBJZiB0aGUgcm91dGUgY2FuIGJlIGFjdGl2YXRlZCwgaXQgZmlyZXMgYWRkaXRpb25hbCBjYWxjdWxhdGlvbnMgb24gdGhlIENNUyBjb21wb25lbnRzIHByZXNlbnQgb24gdGhpcyBDTVMgcGFnZSxcbiAgICogYmFzZWQgb24gdGhlaXIgY29uZmlndXJhdGlvbiAoYGNtc0NvbXBvbmVudHNgIGNvbmZpZykuXG4gICAqXG4gICAqIEZvciBtb3JlLCBzZWUgZG9jcyBvZiB0aGUgYENtc1BhZ2VHdWFyZFNlcnZpY2UuY2FuQWN0aXZhdGVQYWdlYC5cbiAgICovXG4gIGNhbkFjdGl2YXRlKFxuICAgIHJvdXRlOiBDbXNBY3RpdmF0ZWRSb3V0ZVNuYXBzaG90LFxuICAgIHN0YXRlOiBSb3V0ZXJTdGF0ZVNuYXBzaG90XG4gICk6IE9ic2VydmFibGU8Ym9vbGVhbiB8IFVybFRyZWU+IHtcbiAgICByZXR1cm4gdGhpcy5wcm90ZWN0ZWRSb3V0ZXNHdWFyZC5jYW5BY3RpdmF0ZShyb3V0ZSkucGlwZShcbiAgICAgIHN3aXRjaE1hcCgoY2FuQWN0aXZhdGUpID0+XG4gICAgICAgIGNhbkFjdGl2YXRlID09PSB0cnVlXG4gICAgICAgICAgPyB0aGlzLnJvdXRpbmdTZXJ2aWNlLmdldE5leHRQYWdlQ29udGV4dCgpLnBpcGUoXG4gICAgICAgICAgICAgIGZpbHRlcihpc05vdFVuZGVmaW5lZCksXG4gICAgICAgICAgICAgIHRha2UoMSksXG4gICAgICAgICAgICAgIHN3aXRjaE1hcCgocGFnZUNvbnRleHQpID0+XG4gICAgICAgICAgICAgICAgdGhpcy5jbXNTZXJ2aWNlLmdldFBhZ2UocGFnZUNvbnRleHQsIHRoaXMuc2hvdWxkUmVsb2FkKCkpLnBpcGUoXG4gICAgICAgICAgICAgICAgICBmaXJzdCgpLFxuICAgICAgICAgICAgICAgICAgc3dpdGNoTWFwKChwYWdlRGF0YSkgPT5cbiAgICAgICAgICAgICAgICAgICAgcGFnZURhdGFcbiAgICAgICAgICAgICAgICAgICAgICA/IHRoaXMuc2VydmljZS5jYW5BY3RpdmF0ZVBhZ2UoXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHBhZ2VDb250ZXh0LFxuICAgICAgICAgICAgICAgICAgICAgICAgICBwYWdlRGF0YSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgcm91dGUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRlXG4gICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgOiB0aGlzLnNlcnZpY2UuY2FuQWN0aXZhdGVOb3RGb3VuZFBhZ2UoXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHBhZ2VDb250ZXh0LFxuICAgICAgICAgICAgICAgICAgICAgICAgICByb3V0ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGVcbiAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgIClcbiAgICAgICAgICA6IG9mKGNhbkFjdGl2YXRlKVxuICAgICAgKVxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB3aGV0aGVyIHdlIHNob3VsZCByZWxvYWQgdGhlIENNUyBwYWdlIGRhdGEsIGV2ZW4gd2hlbiBpdCB3YXMgbG9hZGVkIGJlZm9yZS5cbiAgICovXG4gIHByaXZhdGUgc2hvdWxkUmVsb2FkKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLnJvdXRpbmdDb25maWcuZ2V0TG9hZFN0cmF0ZWd5KCkgIT09IFJvdXRlTG9hZFN0cmF0ZWd5Lk9OQ0U7XG4gIH1cbn1cbiJdfQ==