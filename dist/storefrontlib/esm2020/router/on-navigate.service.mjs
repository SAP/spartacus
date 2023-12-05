import { ApplicationRef, Injectable, } from '@angular/core';
import { Scroll } from '@angular/router';
import { filter, pairwise } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "./config";
import * as i2 from "@angular/router";
import * as i3 from "@angular/common";
export class OnNavigateService {
    get hostComponent() {
        return this.injector.get(ApplicationRef)?.components?.[0];
    }
    constructor(config, router, viewportScroller, injector) {
        this.config = config;
        this.router = router;
        this.viewportScroller = viewportScroller;
        this.injector = injector;
    }
    /**
     * Reads configuration and enables features based on flags set.
     */
    initializeWithConfig() {
        if (this.config?.enableResetViewOnNavigate?.active) {
            this.setResetViewOnNavigate(this.config.enableResetViewOnNavigate.active);
        }
    }
    /**
     * Resets view back to the original position when performing a back navigation and to the top when performing a front navigation
     * and sets the focus back to the top of the page before skiplinks for any type of navigation
     * @param enable Enable or disable this feature
     */
    setResetViewOnNavigate(enable) {
        this.subscription?.unsubscribe();
        if (enable) {
            // Disable automatic scroll restoration to avoid race conditions
            this.viewportScroller.setHistoryScrollRestoration('manual');
            this.subscription = this.router.events
                .pipe(filter((event) => event instanceof Scroll), pairwise())
                .subscribe((event) => {
                const previousRoute = event[0];
                const currentRoute = event[1];
                const position = currentRoute.position;
                if (position) {
                    // allow the pages to be repainted before scrolling to proper position
                    setTimeout(() => this.viewportScroller.scrollToPosition(position));
                }
                else {
                    if (this.config.enableResetViewOnNavigate?.ignoreQueryString &&
                        this.isPathEqual(previousRoute, currentRoute)) {
                        return;
                    }
                    if (this.isChildRoute(currentRoute)) {
                        return;
                    }
                    setTimeout(() => this.viewportScroller.scrollToPosition([0, 0]), 100);
                }
                this.hostComponent?.location?.nativeElement.focus();
            });
        }
    }
    /**
     * Verifies if the current route is a child route from the given ignore config route
     *
     * @param route
     * @returns boolean whether the route is a child route
     */
    isChildRoute(route) {
        return (this.config.enableResetViewOnNavigate?.ignoreRoutes?.some((configRoute) => route.routerEvent.urlAfterRedirects.split('/').includes(configRoute)) ?? false);
    }
    /**
     * Verifies if the previous and current route are the same without the query string
     *
     * @param previousRoute
     * @param currentRoute
     * @returns boolean depending on the previous and current route are equal without the query strings
     */
    isPathEqual(previousRoute, currentRoute) {
        return (previousRoute.routerEvent.urlAfterRedirects.split('?')[0] ===
            currentRoute.routerEvent.urlAfterRedirects.split('?')[0]);
    }
}
OnNavigateService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OnNavigateService, deps: [{ token: i1.OnNavigateConfig }, { token: i2.Router }, { token: i3.ViewportScroller }, { token: i0.Injector }], target: i0.ɵɵFactoryTarget.Injectable });
OnNavigateService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OnNavigateService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OnNavigateService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.OnNavigateConfig }, { type: i2.Router }, { type: i3.ViewportScroller }, { type: i0.Injector }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib24tbmF2aWdhdGUuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL3N0b3JlZnJvbnRsaWIvcm91dGVyL29uLW5hdmlnYXRlLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBT0EsT0FBTyxFQUNMLGNBQWMsRUFFZCxVQUFVLEdBRVgsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFVLE1BQU0sRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRWpELE9BQU8sRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7Ozs7O0FBTWxELE1BQU0sT0FBTyxpQkFBaUI7SUFHNUIsSUFBSSxhQUFhO1FBQ2YsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsRUFBRSxVQUFVLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUM1RCxDQUFDO0lBRUQsWUFDWSxNQUF3QixFQUN4QixNQUFjLEVBQ2QsZ0JBQWtDLEVBQ2xDLFFBQWtCO1FBSGxCLFdBQU0sR0FBTixNQUFNLENBQWtCO1FBQ3hCLFdBQU0sR0FBTixNQUFNLENBQVE7UUFDZCxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBQ2xDLGFBQVEsR0FBUixRQUFRLENBQVU7SUFDM0IsQ0FBQztJQUVKOztPQUVHO0lBQ0gsb0JBQW9CO1FBQ2xCLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRSx5QkFBeUIsRUFBRSxNQUFNLEVBQUU7WUFDbEQsSUFBSSxDQUFDLHNCQUFzQixDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMseUJBQXlCLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDM0U7SUFDSCxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNILHNCQUFzQixDQUFDLE1BQWU7UUFDcEMsSUFBSSxDQUFDLFlBQVksRUFBRSxXQUFXLEVBQUUsQ0FBQztRQUVqQyxJQUFJLE1BQU0sRUFBRTtZQUNWLGdFQUFnRTtZQUNoRSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsMkJBQTJCLENBQUMsUUFBUSxDQUFDLENBQUM7WUFFNUQsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU07aUJBQ25DLElBQUksQ0FDSCxNQUFNLENBQUMsQ0FBQyxLQUFLLEVBQW1CLEVBQUUsQ0FBQyxLQUFLLFlBQVksTUFBTSxDQUFDLEVBQzNELFFBQVEsRUFBRSxDQUNYO2lCQUNBLFNBQVMsQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFO2dCQUNuQixNQUFNLGFBQWEsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQy9CLE1BQU0sWUFBWSxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFFOUIsTUFBTSxRQUFRLEdBQUcsWUFBWSxDQUFDLFFBQVEsQ0FBQztnQkFDdkMsSUFBSSxRQUFRLEVBQUU7b0JBQ1osc0VBQXNFO29CQUN0RSxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7aUJBQ3BFO3FCQUFNO29CQUNMLElBQ0UsSUFBSSxDQUFDLE1BQU0sQ0FBQyx5QkFBeUIsRUFBRSxpQkFBaUI7d0JBQ3hELElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxFQUFFLFlBQVksQ0FBQyxFQUM3Qzt3QkFDQSxPQUFPO3FCQUNSO29CQUVELElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxZQUFZLENBQUMsRUFBRTt3QkFDbkMsT0FBTztxQkFDUjtvQkFFRCxVQUFVLENBQ1IsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQ3BELEdBQUcsQ0FDSixDQUFDO2lCQUNIO2dCQUVELElBQUksQ0FBQyxhQUFhLEVBQUUsUUFBUSxFQUFFLGFBQWEsQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUN0RCxDQUFDLENBQUMsQ0FBQztTQUNOO0lBQ0gsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0ssWUFBWSxDQUFDLEtBQWE7UUFDaEMsT0FBTyxDQUNMLElBQUksQ0FBQyxNQUFNLENBQUMseUJBQXlCLEVBQUUsWUFBWSxFQUFFLElBQUksQ0FBQyxDQUFDLFdBQVcsRUFBRSxFQUFFLENBQ3hFLEtBQUssQ0FBQyxXQUFXLENBQUMsaUJBQWlCLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsQ0FDckUsSUFBSSxLQUFLLENBQ1gsQ0FBQztJQUNKLENBQUM7SUFFRDs7Ozs7O09BTUc7SUFDSyxXQUFXLENBQUMsYUFBcUIsRUFBRSxZQUFvQjtRQUM3RCxPQUFPLENBQ0wsYUFBYSxDQUFDLFdBQVcsQ0FBQyxpQkFBaUIsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3pELFlBQVksQ0FBQyxXQUFXLENBQUMsaUJBQWlCLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUN6RCxDQUFDO0lBQ0osQ0FBQzs7OEdBakdVLGlCQUFpQjtrSEFBakIsaUJBQWlCLGNBRmhCLE1BQU07MkZBRVAsaUJBQWlCO2tCQUg3QixVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IFZpZXdwb3J0U2Nyb2xsZXIgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtcbiAgQXBwbGljYXRpb25SZWYsXG4gIENvbXBvbmVudFJlZixcbiAgSW5qZWN0YWJsZSxcbiAgSW5qZWN0b3IsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUm91dGVyLCBTY3JvbGwgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBmaWx0ZXIsIHBhaXJ3aXNlIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgT25OYXZpZ2F0ZUNvbmZpZyB9IGZyb20gJy4vY29uZmlnJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIE9uTmF2aWdhdGVTZXJ2aWNlIHtcbiAgcHJvdGVjdGVkIHN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuXG4gIGdldCBob3N0Q29tcG9uZW50KCk6IENvbXBvbmVudFJlZjxhbnk+IHtcbiAgICByZXR1cm4gdGhpcy5pbmplY3Rvci5nZXQoQXBwbGljYXRpb25SZWYpPy5jb21wb25lbnRzPy5bMF07XG4gIH1cblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcm90ZWN0ZWQgY29uZmlnOiBPbk5hdmlnYXRlQ29uZmlnLFxuICAgIHByb3RlY3RlZCByb3V0ZXI6IFJvdXRlcixcbiAgICBwcm90ZWN0ZWQgdmlld3BvcnRTY3JvbGxlcjogVmlld3BvcnRTY3JvbGxlcixcbiAgICBwcm90ZWN0ZWQgaW5qZWN0b3I6IEluamVjdG9yXG4gICkge31cblxuICAvKipcbiAgICogUmVhZHMgY29uZmlndXJhdGlvbiBhbmQgZW5hYmxlcyBmZWF0dXJlcyBiYXNlZCBvbiBmbGFncyBzZXQuXG4gICAqL1xuICBpbml0aWFsaXplV2l0aENvbmZpZygpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5jb25maWc/LmVuYWJsZVJlc2V0Vmlld09uTmF2aWdhdGU/LmFjdGl2ZSkge1xuICAgICAgdGhpcy5zZXRSZXNldFZpZXdPbk5hdmlnYXRlKHRoaXMuY29uZmlnLmVuYWJsZVJlc2V0Vmlld09uTmF2aWdhdGUuYWN0aXZlKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUmVzZXRzIHZpZXcgYmFjayB0byB0aGUgb3JpZ2luYWwgcG9zaXRpb24gd2hlbiBwZXJmb3JtaW5nIGEgYmFjayBuYXZpZ2F0aW9uIGFuZCB0byB0aGUgdG9wIHdoZW4gcGVyZm9ybWluZyBhIGZyb250IG5hdmlnYXRpb25cbiAgICogYW5kIHNldHMgdGhlIGZvY3VzIGJhY2sgdG8gdGhlIHRvcCBvZiB0aGUgcGFnZSBiZWZvcmUgc2tpcGxpbmtzIGZvciBhbnkgdHlwZSBvZiBuYXZpZ2F0aW9uXG4gICAqIEBwYXJhbSBlbmFibGUgRW5hYmxlIG9yIGRpc2FibGUgdGhpcyBmZWF0dXJlXG4gICAqL1xuICBzZXRSZXNldFZpZXdPbk5hdmlnYXRlKGVuYWJsZTogYm9vbGVhbik6IHZvaWQge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9uPy51bnN1YnNjcmliZSgpO1xuXG4gICAgaWYgKGVuYWJsZSkge1xuICAgICAgLy8gRGlzYWJsZSBhdXRvbWF0aWMgc2Nyb2xsIHJlc3RvcmF0aW9uIHRvIGF2b2lkIHJhY2UgY29uZGl0aW9uc1xuICAgICAgdGhpcy52aWV3cG9ydFNjcm9sbGVyLnNldEhpc3RvcnlTY3JvbGxSZXN0b3JhdGlvbignbWFudWFsJyk7XG5cbiAgICAgIHRoaXMuc3Vic2NyaXB0aW9uID0gdGhpcy5yb3V0ZXIuZXZlbnRzXG4gICAgICAgIC5waXBlKFxuICAgICAgICAgIGZpbHRlcigoZXZlbnQpOiBldmVudCBpcyBTY3JvbGwgPT4gZXZlbnQgaW5zdGFuY2VvZiBTY3JvbGwpLFxuICAgICAgICAgIHBhaXJ3aXNlKClcbiAgICAgICAgKVxuICAgICAgICAuc3Vic2NyaWJlKChldmVudCkgPT4ge1xuICAgICAgICAgIGNvbnN0IHByZXZpb3VzUm91dGUgPSBldmVudFswXTtcbiAgICAgICAgICBjb25zdCBjdXJyZW50Um91dGUgPSBldmVudFsxXTtcblxuICAgICAgICAgIGNvbnN0IHBvc2l0aW9uID0gY3VycmVudFJvdXRlLnBvc2l0aW9uO1xuICAgICAgICAgIGlmIChwb3NpdGlvbikge1xuICAgICAgICAgICAgLy8gYWxsb3cgdGhlIHBhZ2VzIHRvIGJlIHJlcGFpbnRlZCBiZWZvcmUgc2Nyb2xsaW5nIHRvIHByb3BlciBwb3NpdGlvblxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLnZpZXdwb3J0U2Nyb2xsZXIuc2Nyb2xsVG9Qb3NpdGlvbihwb3NpdGlvbikpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgIHRoaXMuY29uZmlnLmVuYWJsZVJlc2V0Vmlld09uTmF2aWdhdGU/Lmlnbm9yZVF1ZXJ5U3RyaW5nICYmXG4gICAgICAgICAgICAgIHRoaXMuaXNQYXRoRXF1YWwocHJldmlvdXNSb3V0ZSwgY3VycmVudFJvdXRlKVxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHRoaXMuaXNDaGlsZFJvdXRlKGN1cnJlbnRSb3V0ZSkpIHtcbiAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBzZXRUaW1lb3V0KFxuICAgICAgICAgICAgICAoKSA9PiB0aGlzLnZpZXdwb3J0U2Nyb2xsZXIuc2Nyb2xsVG9Qb3NpdGlvbihbMCwgMF0pLFxuICAgICAgICAgICAgICAxMDBcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdGhpcy5ob3N0Q29tcG9uZW50Py5sb2NhdGlvbj8ubmF0aXZlRWxlbWVudC5mb2N1cygpO1xuICAgICAgICB9KTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogVmVyaWZpZXMgaWYgdGhlIGN1cnJlbnQgcm91dGUgaXMgYSBjaGlsZCByb3V0ZSBmcm9tIHRoZSBnaXZlbiBpZ25vcmUgY29uZmlnIHJvdXRlXG4gICAqXG4gICAqIEBwYXJhbSByb3V0ZVxuICAgKiBAcmV0dXJucyBib29sZWFuIHdoZXRoZXIgdGhlIHJvdXRlIGlzIGEgY2hpbGQgcm91dGVcbiAgICovXG4gIHByaXZhdGUgaXNDaGlsZFJvdXRlKHJvdXRlOiBTY3JvbGwpOiBib29sZWFuIHtcbiAgICByZXR1cm4gKFxuICAgICAgdGhpcy5jb25maWcuZW5hYmxlUmVzZXRWaWV3T25OYXZpZ2F0ZT8uaWdub3JlUm91dGVzPy5zb21lKChjb25maWdSb3V0ZSkgPT5cbiAgICAgICAgcm91dGUucm91dGVyRXZlbnQudXJsQWZ0ZXJSZWRpcmVjdHMuc3BsaXQoJy8nKS5pbmNsdWRlcyhjb25maWdSb3V0ZSlcbiAgICAgICkgPz8gZmFsc2VcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIFZlcmlmaWVzIGlmIHRoZSBwcmV2aW91cyBhbmQgY3VycmVudCByb3V0ZSBhcmUgdGhlIHNhbWUgd2l0aG91dCB0aGUgcXVlcnkgc3RyaW5nXG4gICAqXG4gICAqIEBwYXJhbSBwcmV2aW91c1JvdXRlXG4gICAqIEBwYXJhbSBjdXJyZW50Um91dGVcbiAgICogQHJldHVybnMgYm9vbGVhbiBkZXBlbmRpbmcgb24gdGhlIHByZXZpb3VzIGFuZCBjdXJyZW50IHJvdXRlIGFyZSBlcXVhbCB3aXRob3V0IHRoZSBxdWVyeSBzdHJpbmdzXG4gICAqL1xuICBwcml2YXRlIGlzUGF0aEVxdWFsKHByZXZpb3VzUm91dGU6IFNjcm9sbCwgY3VycmVudFJvdXRlOiBTY3JvbGwpOiBib29sZWFuIHtcbiAgICByZXR1cm4gKFxuICAgICAgcHJldmlvdXNSb3V0ZS5yb3V0ZXJFdmVudC51cmxBZnRlclJlZGlyZWN0cy5zcGxpdCgnPycpWzBdID09PVxuICAgICAgY3VycmVudFJvdXRlLnJvdXRlckV2ZW50LnVybEFmdGVyUmVkaXJlY3RzLnNwbGl0KCc/JylbMF1cbiAgICApO1xuICB9XG59XG4iXX0=