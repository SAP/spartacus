/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "./site-context-params.service";
import * as i2 from "./site-context-url-serializer";
// PRIVATE API
export class SiteContextRoutesHandler {
    constructor(siteContextParams, serializer, injector) {
        this.siteContextParams = siteContextParams;
        this.serializer = serializer;
        this.injector = injector;
        this.subscription = new Subscription();
        this.contextValues = {};
        /**
         * Tells whether there is a pending navigation at the moment, so we can avoid an infinite loop caused by the cyclic dependency:
         * - `subscribeChanges` method triggers a navigation on update of site context state
         * - `subscribeRouting` method updates the site context state on navigation
         */
        this.isNavigating = false;
    }
    /**
     * Initializes the two-way synchronization between the site context state and the URL.
     */
    init() {
        this.router = this.injector.get(Router);
        this.location = this.injector.get(Location);
        const routingParams = this.siteContextParams.getUrlEncodingParameters();
        if (routingParams.length) {
            this.setContextParamsFromRoute(this.location.path(true));
            this.subscribeChanges(routingParams);
            this.subscribeRouting();
        }
    }
    /**
     * After each change of the site context state, it modifies the current URL in place.
     * But it happens only for the parameters configured to be persisted in the URL.
     */
    subscribeChanges(params) {
        params.forEach((param) => {
            const service = this.siteContextParams.getSiteContextService(param);
            if (service) {
                this.subscription.add(service.getActive().subscribe((value) => {
                    if (!this.isNavigating &&
                        this.contextValues[param] &&
                        this.contextValues[param] !== value) {
                        const parsed = this.router.parseUrl(this.router.url);
                        const serialized = this.router.serializeUrl(parsed);
                        this.location.replaceState(serialized);
                    }
                    this.contextValues[param] = value;
                }));
            }
        });
    }
    /**
     * After each Angular NavigationStart event it updates the site context state based on
     * site context params encoded in the anticipated URL.
     */
    subscribeRouting() {
        this.subscription.add(this.router.events
            .pipe(filter((event) => event instanceof NavigationStart ||
            event instanceof NavigationEnd ||
            event instanceof NavigationError ||
            event instanceof NavigationCancel))
            .subscribe((event) => {
            this.isNavigating = event instanceof NavigationStart;
            if (this.isNavigating) {
                this.setContextParamsFromRoute(event.url);
            }
        }));
    }
    /**
     * Updates the site context state based on the context params encoded in the given URL
     *
     * @param url URL with encoded context params
     */
    setContextParamsFromRoute(url) {
        const { params } = this.serializer.urlExtractContextParameters(url);
        Object.keys(params).forEach((param) => this.siteContextParams.setValue(param, params[param]));
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
SiteContextRoutesHandler.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: SiteContextRoutesHandler, deps: [{ token: i1.SiteContextParamsService }, { token: i2.SiteContextUrlSerializer }, { token: i0.Injector }], target: i0.ɵɵFactoryTarget.Injectable });
SiteContextRoutesHandler.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: SiteContextRoutesHandler, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: SiteContextRoutesHandler, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.SiteContextParamsService }, { type: i2.SiteContextUrlSerializer }, { type: i0.Injector }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2l0ZS1jb250ZXh0LXJvdXRlcy1oYW5kbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY29yZS9zcmMvc2l0ZS1jb250ZXh0L3NlcnZpY2VzL3NpdGUtY29udGV4dC1yb3V0ZXMtaGFuZGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzNDLE9BQU8sRUFBRSxVQUFVLEVBQXVCLE1BQU0sZUFBZSxDQUFDO0FBQ2hFLE9BQU8sRUFDTCxnQkFBZ0IsRUFDaEIsYUFBYSxFQUNiLGVBQWUsRUFDZixlQUFlLEVBQ2YsTUFBTSxHQUNQLE1BQU0saUJBQWlCLENBQUM7QUFDekIsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNwQyxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7Ozs7QUFJeEMsY0FBYztBQUlkLE1BQU0sT0FBTyx3QkFBd0I7SUFDbkMsWUFDVSxpQkFBMkMsRUFDM0MsVUFBb0MsRUFDcEMsUUFBa0I7UUFGbEIsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUEwQjtRQUMzQyxlQUFVLEdBQVYsVUFBVSxDQUEwQjtRQUNwQyxhQUFRLEdBQVIsUUFBUSxDQUFVO1FBR3BCLGlCQUFZLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUVsQyxrQkFBYSxHQUVqQixFQUFFLENBQUM7UUFLUDs7OztXQUlHO1FBQ0ssaUJBQVksR0FBRyxLQUFLLENBQUM7SUFoQjFCLENBQUM7SUFrQko7O09BRUc7SUFDSCxJQUFJO1FBQ0YsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBUyxNQUFNLENBQUMsQ0FBQztRQUVoRCxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFXLFFBQVEsQ0FBQyxD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d0I7a0JBSHBDLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgTG9jYXRpb24gfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgSW5qZWN0YWJsZSwgSW5qZWN0b3IsIE9uRGVzdHJveSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgTmF2aWdhdGlvbkNhbmNlbCxcbiAgTmF2aWdhdGlvbkVuZCxcbiAgTmF2aWdhdGlvbkVycm9yLFxuICBOYXZpZ2F0aW9uU3RhcnQsXG4gIFJvdXRlcixcbn0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZmlsdGVyIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgU2l0ZUNvbnRleHRQYXJhbXNTZXJ2aWNlIH0gZnJvbSAnLi9zaXRlLWNvbnRleHQtcGFyYW1zLnNlcnZpY2UnO1xuaW1wb3J0IHsgU2l0ZUNvbnRleHRVcmxTZXJpYWxpemVyIH0gZnJvbSAnLi9zaXRlLWNvbnRleHQtdXJsLXNlcmlhbGl6ZXInO1xuXG4vLyBQUklWQVRFIEFQSVxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIFNpdGVDb250ZXh0Um91dGVzSGFuZGxlciBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgc2l0ZUNvbnRleHRQYXJhbXM6IFNpdGVDb250ZXh0UGFyYW1zU2VydmljZSxcbiAgICBwcml2YXRlIHNlcmlhbGl6ZXI6IFNpdGVDb250ZXh0VXJsU2VyaWFsaXplcixcbiAgICBwcml2YXRlIGluamVjdG9yOiBJbmplY3RvclxuICApIHt9XG5cbiAgcHJpdmF0ZSBzdWJzY3JpcHRpb24gPSBuZXcgU3Vic2NyaXB0aW9uKCk7XG5cbiAgcHJpdmF0ZSBjb250ZXh0VmFsdWVzOiB7XG4gICAgW3BhcmFtOiBzdHJpbmddOiBzdHJpbmc7XG4gIH0gPSB7fTtcblxuICBwcml2YXRlIHJvdXRlcjogUm91dGVyO1xuICBwcml2YXRlIGxvY2F0aW9uOiBMb2NhdGlvbjtcblxuICAvKipcbiAgICogVGVsbHMgd2hldGhlciB0aGVyZSBpcyBhIHBlbmRpbmcgbmF2aWdhdGlvbiBhdCB0aGUgbW9tZW50LCBzbyB3ZSBjYW4gYXZvaWQgYW4gaW5maW5pdGUgbG9vcCBjYXVzZWQgYnkgdGhlIGN5Y2xpYyBkZXBlbmRlbmN5OlxuICAgKiAtIGBzdWJzY3JpYmVDaGFuZ2VzYCBtZXRob2QgdHJpZ2dlcnMgYSBuYXZpZ2F0aW9uIG9uIHVwZGF0ZSBvZiBzaXRlIGNvbnRleHQgc3RhdGVcbiAgICogLSBgc3Vic2NyaWJlUm91dGluZ2AgbWV0aG9kIHVwZGF0ZXMgdGhlIHNpdGUgY29udGV4dCBzdGF0ZSBvbiBuYXZpZ2F0aW9uXG4gICAqL1xuICBwcml2YXRlIGlzTmF2aWdhdGluZyA9IGZhbHNlO1xuXG4gIC8qKlxuICAgKiBJbml0aWFsaXplcyB0aGUgdHdvLXdheSBzeW5jaHJvbml6YXRpb24gYmV0d2VlbiB0aGUgc2l0ZSBjb250ZXh0IHN0YXRlIGFuZCB0aGUgVVJMLlxuICAgKi9cbiAgaW5pdCgpIHtcbiAgICB0aGlzLnJvdXRlciA9IHRoaXMuaW5qZWN0b3IuZ2V0PFJvdXRlcj4oUm91dGVyKTtcblxuICAgIHRoaXMubG9jYXRpb24gPSB0aGlzLmluamVjdG9yLmdldDxMb2NhdGlvbj4oTG9jYXRpb24pO1xuICAgIGNvbnN0IHJvdXRpbmdQYXJhbXMgPSB0aGlzLnNpdGVDb250ZXh0UGFyYW1zLmdldFVybEVuY29kaW5nUGFyYW1ldGVycygpO1xuXG4gICAgaWYgKHJvdXRpbmdQYXJhbXMubGVuZ3RoKSB7XG4gICAgICB0aGlzLnNldENvbnRleHRQYXJhbXNGcm9tUm91dGUodGhpcy5sb2NhdGlvbi5wYXRoKHRydWUpKTtcbiAgICAgIHRoaXMuc3Vic2NyaWJlQ2hhbmdlcyhyb3V0aW5nUGFyYW1zKTtcbiAgICAgIHRoaXMuc3Vic2NyaWJlUm91dGluZygpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBBZnRlciBlYWNoIGNoYW5nZSBvZiB0aGUgc2l0ZSBjb250ZXh0IHN0YXRlLCBpdCBtb2RpZmllcyB0aGUgY3VycmVudCBVUkwgaW4gcGxhY2UuXG4gICAqIEJ1dCBpdCBoYXBwZW5zIG9ubHkgZm9yIHRoZSBwYXJhbWV0ZXJzIGNvbmZpZ3VyZWQgdG8gYmUgcGVyc2lzdGVkIGluIHRoZSBVUkwuXG4gICAqL1xuICBwcml2YXRlIHN1YnNjcmliZUNoYW5nZXMocGFyYW1zOiBzdHJpbmdbXSkge1xuICAgIHBhcmFtcy5mb3JFYWNoKChwYXJhbSkgPT4ge1xuICAgICAgY29uc3Qgc2VydmljZSA9IHRoaXMuc2l0ZUNvbnRleHRQYXJhbXMuZ2V0U2l0ZUNvbnRleHRTZXJ2aWNlKHBhcmFtKTtcbiAgICAgIGlmIChzZXJ2aWNlKSB7XG4gICAgICAgIHRoaXMuc3Vic2NyaXB0aW9uLmFkZChcbiAgICAgICAgICBzZXJ2aWNlLmdldEFjdGl2ZSgpLnN1YnNjcmliZSgodmFsdWUpID0+IHtcbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgIXRoaXMuaXNOYXZpZ2F0aW5nICYmXG4gICAgICAgICAgICAgIHRoaXMuY29udGV4dFZhbHVlc1twYXJhbV0gJiZcbiAgICAgICAgICAgICAgdGhpcy5jb250ZXh0VmFsdWVzW3BhcmFtXSAhPT0gdmFsdWVcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICBjb25zdCBwYXJzZWQgPSB0aGlzLnJvdXRlci5wYXJzZVVybCh0aGlzLnJvdXRlci51cmwpO1xuICAgICAgICAgICAgICBjb25zdCBzZXJpYWxpemVkID0gdGhpcy5yb3V0ZXIuc2VyaWFsaXplVXJsKHBhcnNlZCk7XG4gICAgICAgICAgICAgIHRoaXMubG9jYXRpb24ucmVwbGFjZVN0YXRlKHNlcmlhbGl6ZWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5jb250ZXh0VmFsdWVzW3BhcmFtXSA9IHZhbHVlO1xuICAgICAgICAgIH0pXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQWZ0ZXIgZWFjaCBBbmd1bGFyIE5hdmlnYXRpb25TdGFydCBldmVudCBpdCB1cGRhdGVzIHRoZSBzaXRlIGNvbnRleHQgc3RhdGUgYmFzZWQgb25cbiAgICogc2l0ZSBjb250ZXh0IHBhcmFtcyBlbmNvZGVkIGluIHRoZSBhbnRpY2lwYXRlZCBVUkwuXG4gICAqL1xuICBwcml2YXRlIHN1YnNjcmliZVJvdXRpbmcoKSB7XG4gICAgdGhpcy5zdWJzY3JpcHRpb24uYWRkKFxuICAgICAgdGhpcy5yb3V0ZXIuZXZlbnRzXG4gICAgICAgIC5waXBlKFxuICAgICAgICAgIGZpbHRlcihcbiAgICAgICAgICAgIChldmVudCkgPT5cbiAgICAgICAgICAgICAgZXZlbnQgaW5zdGFuY2VvZiBOYXZpZ2F0aW9uU3RhcnQgfHxcbiAgICAgICAgICAgICAgZXZlbnQgaW5zdGFuY2VvZiBOYXZpZ2F0aW9uRW5kIHx8XG4gICAgICAgICAgICAgIGV2ZW50IGluc3RhbmNlb2YgTmF2aWdhdGlvbkVycm9yIHx8XG4gICAgICAgICAgICAgIGV2ZW50IGluc3RhbmNlb2YgTmF2aWdhdGlvbkNhbmNlbFxuICAgICAgICAgIClcbiAgICAgICAgKVxuICAgICAgICAuc3Vic2NyaWJlKChldmVudCkgPT4ge1xuICAgICAgICAgIHRoaXMuaXNOYXZpZ2F0aW5nID0gZXZlbnQgaW5zdGFuY2VvZiBOYXZpZ2F0aW9uU3RhcnQ7XG4gICAgICAgICAgaWYgKHRoaXMuaXNOYXZpZ2F0aW5nKSB7XG4gICAgICAgICAgICB0aGlzLnNldENvbnRleHRQYXJhbXNGcm9tUm91dGUoKGV2ZW50IGFzIE5hdmlnYXRpb25TdGFydCkudXJsKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGVzIHRoZSBzaXRlIGNvbnRleHQgc3RhdGUgYmFzZWQgb24gdGhlIGNvbnRleHQgcGFyYW1zIGVuY29kZWQgaW4gdGhlIGdpdmVuIFVSTFxuICAgKlxuICAgKiBAcGFyYW0gdXJsIFVSTCB3aXRoIGVuY29kZWQgY29udGV4dCBwYXJhbXNcbiAgICovXG4gIHByaXZhdGUgc2V0Q29udGV4dFBhcmFtc0Zyb21Sb3V0ZSh1cmw6IHN0cmluZykge1xuICAgIGNvbnN0IHsgcGFyYW1zIH0gPSB0aGlzLnNlcmlhbGl6ZXIudXJsRXh0cmFjdENvbnRleHRQYXJhbWV0ZXJzKHVybCk7XG4gICAgT2JqZWN0LmtleXMocGFyYW1zKS5mb3JFYWNoKChwYXJhbSkgPT5cbiAgICAgIHRoaXMuc2l0ZUNvbnRleHRQYXJhbXMuc2V0VmFsdWUocGFyYW0sIHBhcmFtc1twYXJhbV0pXG4gICAgKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gIH1cbn1cbiJdfQ==