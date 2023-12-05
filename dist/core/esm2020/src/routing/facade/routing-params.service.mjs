/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { map, shareReplay } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
import * as i2 from "../services/activated-routes.service";
/**
 * Service to expose all parameters for the router, including child routes.
 * This is convenient in case the parent route (component) requires awareness
 * of child routes parameters.
 */
export class RoutingParamsService {
    constructor(router, activatedRoutesService) {
        this.router = router;
        this.activatedRoutesService = activatedRoutesService;
        this.params$ = this.activatedRoutesService.routes$.pipe(map((routes) => this.findAllParam(routes)), shareReplay({ refCount: true, bufferSize: 1 }));
    }
    /**
     * Get the list of all parameters of the full route. This includes
     * active child routes.
     */
    getParams() {
        return this.params$;
    }
    findAllParam(routes) {
        return Object.assign({}, ...routes.map((route) => route.params));
    }
}
RoutingParamsService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: RoutingParamsService, deps: [{ token: i1.Router }, { token: i2.ActivatedRoutesService }], target: i0.ɵɵFactoryTarget.Injectable });
RoutingParamsService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: RoutingParamsService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: RoutingParamsService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: i1.Router }, { type: i2.ActivatedRoutesService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGluZy1wYXJhbXMuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NvcmUvc3JjL3JvdXRpbmcvZmFjYWRlL3JvdXRpbmctcGFyYW1zLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFHM0MsT0FBTyxFQUFFLEdBQUcsRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7OztBQUdsRDs7OztHQUlHO0FBRUgsTUFBTSxPQUFPLG9CQUFvQjtJQVEvQixZQUNZLE1BQWMsRUFDZCxzQkFBOEM7UUFEOUMsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUNkLDJCQUFzQixHQUF0QixzQkFBc0IsQ0FBd0I7UUFUdkMsWUFBTyxHQUVyQixJQUFJLENBQUMsc0JBQXNCLENBQUMsT0FBTyxDQUFDLElBQUksQ0FDM0MsR0FBRyxDQUFDLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQzFDLFdBQVcsQ0FBQyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQy9DLENBQUM7SUFLQyxDQUFDO0lBRUo7OztPQUdHO0lBQ0gsU0FBUztRQUNQLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQztJQUN0QixDQUFDO0lBRVMsWUFBWSxDQUFDLE1BQWdDO1FBR3JELE9BQU8sTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztJQUNuRSxDQUFDOztpSEF6QlUsb0JBQW9CO3FIQUFwQixvQkFBb0IsY0FEUCxNQUFNOzJGQUNuQixvQkFBb0I7a0JBRGhDLFVBQVU7bUJBQUMsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQWN0aXZhdGVkUm91dGVTbmFwc2hvdCwgUm91dGVyIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IG1hcCwgc2hhcmVSZXBsYXkgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBBY3RpdmF0ZWRSb3V0ZXNTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvYWN0aXZhdGVkLXJvdXRlcy5zZXJ2aWNlJztcblxuLyoqXG4gKiBTZXJ2aWNlIHRvIGV4cG9zZSBhbGwgcGFyYW1ldGVycyBmb3IgdGhlIHJvdXRlciwgaW5jbHVkaW5nIGNoaWxkIHJvdXRlcy5cbiAqIFRoaXMgaXMgY29udmVuaWVudCBpbiBjYXNlIHRoZSBwYXJlbnQgcm91dGUgKGNvbXBvbmVudCkgcmVxdWlyZXMgYXdhcmVuZXNzXG4gKiBvZiBjaGlsZCByb3V0ZXMgcGFyYW1ldGVycy5cbiAqL1xuQEluamVjdGFibGUoeyBwcm92aWRlZEluOiAncm9vdCcgfSlcbmV4cG9ydCBjbGFzcyBSb3V0aW5nUGFyYW1zU2VydmljZSB7XG4gIHByb3RlY3RlZCByZWFkb25seSBwYXJhbXMkOiBPYnNlcnZhYmxlPHtcbiAgICBba2V5OiBzdHJpbmddOiBzdHJpbmc7XG4gIH0+ID0gdGhpcy5hY3RpdmF0ZWRSb3V0ZXNTZXJ2aWNlLnJvdXRlcyQucGlwZShcbiAgICBtYXAoKHJvdXRlcykgPT4gdGhpcy5maW5kQWxsUGFyYW0ocm91dGVzKSksXG4gICAgc2hhcmVSZXBsYXkoeyByZWZDb3VudDogdHJ1ZSwgYnVmZmVyU2l6ZTogMSB9KVxuICApO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByb3RlY3RlZCByb3V0ZXI6IFJvdXRlcixcbiAgICBwcm90ZWN0ZWQgYWN0aXZhdGVkUm91dGVzU2VydmljZTogQWN0aXZhdGVkUm91dGVzU2VydmljZVxuICApIHt9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgbGlzdCBvZiBhbGwgcGFyYW1ldGVycyBvZiB0aGUgZnVsbCByb3V0ZS4gVGhpcyBpbmNsdWRlc1xuICAgKiBhY3RpdmUgY2hpbGQgcm91dGVzLlxuICAgKi9cbiAgZ2V0UGFyYW1zKCk6IE9ic2VydmFibGU8eyBba2V5OiBzdHJpbmddOiBzdHJpbmcgfT4ge1xuICAgIHJldHVybiB0aGlzLnBhcmFtcyQ7XG4gIH1cblxuICBwcm90ZWN0ZWQgZmluZEFsbFBhcmFtKHJvdXRlczogQWN0aXZhdGVkUm91dGVTbmFwc2hvdFtdKToge1xuICAgIFtrZXk6IHN0cmluZ106IHN0cmluZztcbiAgfSB7XG4gICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIC4uLnJvdXRlcy5tYXAoKHJvdXRlKSA9PiByb3V0ZS5wYXJhbXMpKTtcbiAgfVxufVxuIl19