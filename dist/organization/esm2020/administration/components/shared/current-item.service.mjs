/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { ROUTE_PARAMS } from '@spartacus/organization/administration/root';
import { of } from 'rxjs';
import { distinctUntilChanged, map, switchMap } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/core";
/**
 * Abstract Base class for all organization entities. This class simplifies
 * the various entity implementation, that only differ by dependencies and
 * data model.
 */
export class CurrentItemService {
    constructor(routingService) {
        this.routingService = routingService;
        /**
         * Observes the key for the active organization item. The active key is observed
         * from the list of route parameters. The full route parameter list is evaluated,
         * including child routes.
         *
         * To allow for specific ("semantic") route parameters, the route parameter _key_ is
         * retrieved from the `getParamKey`.
         */
        this.key$ = this.routingService.getParams().pipe(map((params) => params[this.getParamKey()]), distinctUntilChanged());
        /**
         * Observes the active item.
         *
         * The active item is loaded by the active `key$`.
         */
        this.item$ = this.key$.pipe(switchMap((code) => (code ? this.getItem(code) : of(undefined))));
        /**
         * Observes the b2bUnit based on the unitCode route parameter.
         */
        this.b2bUnit$ = this.routingService.getParams().pipe(map((params) => params[ROUTE_PARAMS.unitCode]), distinctUntilChanged());
    }
    getRouterParam(paramKey) {
        return this.routingService
            .getParams()
            .pipe(map((params) => params[paramKey]));
    }
}
CurrentItemService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CurrentItemService, deps: [{ token: i1.RoutingService }], target: i0.ɵɵFactoryTarget.Injectable });
CurrentItemService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CurrentItemService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CurrentItemService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.RoutingService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VycmVudC1pdGVtLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvb3JnYW5pemF0aW9uL2FkbWluaXN0cmF0aW9uL2NvbXBvbmVudHMvc2hhcmVkL2N1cnJlbnQtaXRlbS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTNDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSw2Q0FBNkMsQ0FBQztBQUMzRSxPQUFPLEVBQWMsRUFBRSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ3RDLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxHQUFHLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7OztBQUV0RTs7OztHQUlHO0FBRUgsTUFBTSxPQUFnQixrQkFBa0I7SUFDdEMsWUFBc0IsY0FBOEI7UUFBOUIsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBRXBEOzs7Ozs7O1dBT0c7UUFDTSxTQUFJLEdBQXVCLElBQUksQ0FBQyxjQUFjLENBQUMsU0FBUyxFQUFFLENBQUMsSUFBSSxDQUN0RSxHQUFHLENBQUMsQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQyxFQUMzQyxvQkFBb0IsRUFBRSxDQUN2QixDQUFDO1FBRUY7Ozs7V0FJRztRQUNNLFVBQUssR0FBOEIsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQ3hELFNBQVMsQ0FBQyxDQUFDLElBQVksRUFBRSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQ3pFLENBQUM7UUFFRjs7V0FFRztRQUNNLGFBQVEsR0FBdUIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxJQUFJLENBQzFFLEdBQUcsQ0FBQyxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUM5QyxvQkFBb0IsRUFBRSxDQUN2QixDQUFDO0lBOUJxRCxDQUFDO0lBMkN4RCxjQUFjLENBQUMsUUFBZ0I7UUFDN0IsT0FBTyxJQUFJLENBQUMsY0FBYzthQUN2QixTQUFTLEVBQUU7YUFDWCxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzdDLENBQUM7OytHQWhEbUIsa0JBQWtCO21IQUFsQixrQkFBa0I7MkZBQWxCLGtCQUFrQjtrQkFEdkMsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFJvdXRpbmdTZXJ2aWNlIH0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7IFJPVVRFX1BBUkFNUyB9IGZyb20gJ0BzcGFydGFjdXMvb3JnYW5pemF0aW9uL2FkbWluaXN0cmF0aW9uL3Jvb3QnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgb2YgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGRpc3RpbmN0VW50aWxDaGFuZ2VkLCBtYXAsIHN3aXRjaE1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuLyoqXG4gKiBBYnN0cmFjdCBCYXNlIGNsYXNzIGZvciBhbGwgb3JnYW5pemF0aW9uIGVudGl0aWVzLiBUaGlzIGNsYXNzIHNpbXBsaWZpZXNcbiAqIHRoZSB2YXJpb3VzIGVudGl0eSBpbXBsZW1lbnRhdGlvbiwgdGhhdCBvbmx5IGRpZmZlciBieSBkZXBlbmRlbmNpZXMgYW5kXG4gKiBkYXRhIG1vZGVsLlxuICovXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgQ3VycmVudEl0ZW1TZXJ2aWNlPFQ+IHtcbiAgY29uc3RydWN0b3IocHJvdGVjdGVkIHJvdXRpbmdTZXJ2aWNlOiBSb3V0aW5nU2VydmljZSkge31cblxuICAvKipcbiAgICogT2JzZXJ2ZXMgdGhlIGtleSBmb3IgdGhlIGFjdGl2ZSBvcmdhbml6YXRpb24gaXRlbS4gVGhlIGFjdGl2ZSBrZXkgaXMgb2JzZXJ2ZWRcbiAgICogZnJvbSB0aGUgbGlzdCBvZiByb3V0ZSBwYXJhbWV0ZXJzLiBUaGUgZnVsbCByb3V0ZSBwYXJhbWV0ZXIgbGlzdCBpcyBldmFsdWF0ZWQsXG4gICAqIGluY2x1ZGluZyBjaGlsZCByb3V0ZXMuXG4gICAqXG4gICAqIFRvIGFsbG93IGZvciBzcGVjaWZpYyAoXCJzZW1hbnRpY1wiKSByb3V0ZSBwYXJhbWV0ZXJzLCB0aGUgcm91dGUgcGFyYW1ldGVyIF9rZXlfIGlzXG4gICAqIHJldHJpZXZlZCBmcm9tIHRoZSBgZ2V0UGFyYW1LZXlgLlxuICAgKi9cbiAgcmVhZG9ubHkga2V5JDogT2JzZXJ2YWJsZTxzdHJpbmc+ID0gdGhpcy5yb3V0aW5nU2VydmljZS5nZXRQYXJhbXMoKS5waXBlKFxuICAgIG1hcCgocGFyYW1zKSA9PiBwYXJhbXNbdGhpcy5nZXRQYXJhbUtleSgpXSksXG4gICAgZGlzdGluY3RVbnRpbENoYW5nZWQoKVxuICApO1xuXG4gIC8qKlxuICAgKiBPYnNlcnZlcyB0aGUgYWN0aXZlIGl0ZW0uXG4gICAqXG4gICAqIFRoZSBhY3RpdmUgaXRlbSBpcyBsb2FkZWQgYnkgdGhlIGFjdGl2ZSBga2V5JGAuXG4gICAqL1xuICByZWFkb25seSBpdGVtJDogT2JzZXJ2YWJsZTxUIHwgdW5kZWZpbmVkPiA9IHRoaXMua2V5JC5waXBlKFxuICAgIHN3aXRjaE1hcCgoY29kZTogc3RyaW5nKSA9PiAoY29kZSA/IHRoaXMuZ2V0SXRlbShjb2RlKSA6IG9mKHVuZGVmaW5lZCkpKVxuICApO1xuXG4gIC8qKlxuICAgKiBPYnNlcnZlcyB0aGUgYjJiVW5pdCBiYXNlZCBvbiB0aGUgdW5pdENvZGUgcm91dGUgcGFyYW1ldGVyLlxuICAgKi9cbiAgcmVhZG9ubHkgYjJiVW5pdCQ6IE9ic2VydmFibGU8c3RyaW5nPiA9IHRoaXMucm91dGluZ1NlcnZpY2UuZ2V0UGFyYW1zKCkucGlwZShcbiAgICBtYXAoKHBhcmFtcykgPT4gcGFyYW1zW1JPVVRFX1BBUkFNUy51bml0Q29kZV0pLFxuICAgIGRpc3RpbmN0VW50aWxDaGFuZ2VkKClcbiAgKTtcblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgcm91dGUgcGFyYW1ldGVyIGtleSBmb3IgdGhlIGl0ZW0uIFRoZSByb3V0ZSBwYXJhbWV0ZXIga2V5IGRpZmZlcnNcbiAgICogcGVyIGl0ZW0sIHNvIHRoYXQgcm91dGUgcGFyYW1ldGVycyBhcmUgZGlzdGluZ3Vpc2hlZCBpbiB0aGUgcm91dGUgY29uZmlndXJhdGlvbi5cbiAgICovXG4gIHByb3RlY3RlZCBhYnN0cmFjdCBnZXRQYXJhbUtleSgpOiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIEVtaXRzIHRoZSBjdXJyZW50IG1vZGVsIG9yIHVuZGVmaW5lZCwgaWYgdGhlcmUgaXMgbm8gbW9kZWwgYXZhaWxhYmxlXG4gICAqL1xuICBwcm90ZWN0ZWQgYWJzdHJhY3QgZ2V0SXRlbSguLi5wYXJhbXM6IGFueVtdKTogT2JzZXJ2YWJsZTxUIHwgdW5kZWZpbmVkPjtcblxuICBnZXRSb3V0ZXJQYXJhbShwYXJhbUtleTogc3RyaW5nKTogT2JzZXJ2YWJsZTxzdHJpbmc+IHtcbiAgICByZXR1cm4gdGhpcy5yb3V0aW5nU2VydmljZVxuICAgICAgLmdldFBhcmFtcygpXG4gICAgICAucGlwZShtYXAoKHBhcmFtcykgPT4gcGFyYW1zW3BhcmFtS2V5XSkpO1xuICB9XG5cbiAgYWJzdHJhY3QgZ2V0RXJyb3IoX2tleTogc3RyaW5nKTogT2JzZXJ2YWJsZTxib29sZWFuPjtcbn1cbiJdfQ==