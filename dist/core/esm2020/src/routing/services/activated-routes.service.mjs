/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { NavigationEnd } from '@angular/router';
import { filter, map, shareReplay, startWith } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
/**
 * Helper service to expose all activated routes
 */
export class ActivatedRoutesService {
    constructor(router) {
        this.router = router;
        /**
         * Array of currently activated routes (from the root route to the leaf route).
         */
        this.routes$ = this.router.events.pipe(filter((event) => event instanceof NavigationEnd), 
        // eslint-disable-next-line import/no-deprecated
        startWith(undefined), // emit value for consumer who subscribed lately after NavigationEnd event
        map(() => {
            let route = this.router.routerState.snapshot.root;
            const routes = [route];
            // traverse to the leaf route:
            while ((route = route.firstChild)) {
                routes.push(route);
            }
            return routes;
        }), shareReplay({ bufferSize: 1, refCount: true }));
    }
}
ActivatedRoutesService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ActivatedRoutesService, deps: [{ token: i1.Router }], target: i0.ɵɵFactoryTarget.Injectable });
ActivatedRoutesService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ActivatedRoutesService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ActivatedRoutesService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: i1.Router }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWN0aXZhdGVkLXJvdXRlcy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY29yZS9zcmMvcm91dGluZy9zZXJ2aWNlcy9hY3RpdmF0ZWQtcm91dGVzLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUEwQixhQUFhLEVBQVUsTUFBTSxpQkFBaUIsQ0FBQztBQUVoRixPQUFPLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxXQUFXLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7OztBQUVyRTs7R0FFRztBQUVILE1BQU0sT0FBTyxzQkFBc0I7SUFDakMsWUFBc0IsTUFBYztRQUFkLFdBQU0sR0FBTixNQUFNLENBQVE7UUFFcEM7O1dBRUc7UUFDTSxZQUFPLEdBQ2QsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUNyQixNQUFNLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLEtBQUssWUFBWSxhQUFhLENBQUM7UUFDakQsZ0RBQWdEO1FBQ2hELFNBQVMsQ0FBQyxTQUFTLENBQUMsRUFBRSwwRUFBMEU7UUFDaEcsR0FBRyxDQUFDLEdBQUcsRUFBRTtZQUNQLElBQUksS0FBSyxHQUNQLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUM7WUFDeEMsTUFBTSxNQUFNLEdBQTZCLENBQUMsS0FBSyxDQUFDLENBQUM7WUFFakQsOEJBQThCO1lBQzlCLE9BQU8sQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDLFVBQVUsQ0FBQyxFQUFFO2dCQUNqQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQ3BCO1lBRUQsT0FBTyxNQUFNLENBQUM7UUFDaEIsQ0FBQyxDQUFDLEVBQ0YsV0FBVyxDQUFDLEVBQUUsVUFBVSxFQUFFLENBQUMsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FDL0MsQ0FBQztJQXZCbUMsQ0FBQzs7bUhBRDdCLHNCQUFzQjt1SEFBdEIsc0JBQXNCLGNBRFQsTUFBTTsyRkFDbkIsc0JBQXNCO2tCQURsQyxVQUFVO21CQUFDLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFjdGl2YXRlZFJvdXRlU25hcHNob3QsIE5hdmlnYXRpb25FbmQsIFJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBmaWx0ZXIsIG1hcCwgc2hhcmVSZXBsYXksIHN0YXJ0V2l0aCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuLyoqXG4gKiBIZWxwZXIgc2VydmljZSB0byBleHBvc2UgYWxsIGFjdGl2YXRlZCByb3V0ZXNcbiAqL1xuQEluamVjdGFibGUoeyBwcm92aWRlZEluOiAncm9vdCcgfSlcbmV4cG9ydCBjbGFzcyBBY3RpdmF0ZWRSb3V0ZXNTZXJ2aWNlIHtcbiAgY29uc3RydWN0b3IocHJvdGVjdGVkIHJvdXRlcjogUm91dGVyKSB7fVxuXG4gIC8qKlxuICAgKiBBcnJheSBvZiBjdXJyZW50bHkgYWN0aXZhdGVkIHJvdXRlcyAoZnJvbSB0aGUgcm9vdCByb3V0ZSB0byB0aGUgbGVhZiByb3V0ZSkuXG4gICAqL1xuICByZWFkb25seSByb3V0ZXMkOiBPYnNlcnZhYmxlPEFjdGl2YXRlZFJvdXRlU25hcHNob3RbXT4gPVxuICAgIHRoaXMucm91dGVyLmV2ZW50cy5waXBlKFxuICAgICAgZmlsdGVyKChldmVudCkgPT4gZXZlbnQgaW5zdGFuY2VvZiBOYXZpZ2F0aW9uRW5kKSxcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBpbXBvcnQvbm8tZGVwcmVjYXRlZFxuICAgICAgc3RhcnRXaXRoKHVuZGVmaW5lZCksIC8vIGVtaXQgdmFsdWUgZm9yIGNvbnN1bWVyIHdobyBzdWJzY3JpYmVkIGxhdGVseSBhZnRlciBOYXZpZ2F0aW9uRW5kIGV2ZW50XG4gICAgICBtYXAoKCkgPT4ge1xuICAgICAgICBsZXQgcm91dGU6IEFjdGl2YXRlZFJvdXRlU25hcHNob3QgfCBudWxsID1cbiAgICAgICAgICB0aGlzLnJvdXRlci5yb3V0ZXJTdGF0ZS5zbmFwc2hvdC5yb290O1xuICAgICAgICBjb25zdCByb3V0ZXM6IEFjdGl2YXRlZFJvdXRlU25hcHNob3RbXSA9IFtyb3V0ZV07XG5cbiAgICAgICAgLy8gdHJhdmVyc2UgdG8gdGhlIGxlYWYgcm91dGU6XG4gICAgICAgIHdoaWxlICgocm91dGUgPSByb3V0ZS5maXJzdENoaWxkKSkge1xuICAgICAgICAgIHJvdXRlcy5wdXNoKHJvdXRlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiByb3V0ZXM7XG4gICAgICB9KSxcbiAgICAgIHNoYXJlUmVwbGF5KHsgYnVmZmVyU2l6ZTogMSwgcmVmQ291bnQ6IHRydWUgfSlcbiAgICApO1xufVxuIl19