/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { NavigationEnd } from '@angular/router';
import { take } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "../../../routing/facade/routing.service";
import * as i2 from "@angular/router";
import * as i3 from "./auth-redirect-storage.service";
import * as i4 from "./auth-flow-routes.service";
/**
 * Responsible for saving last accessed page (or attempted) before login and for redirecting to that page after login.
 */
export class AuthRedirectService {
    /**
     * This service is responsible for remembering the last page before the authentication. "The last page" can be:
     * 1. Just the previously opened page; or
     * 2. The page that we just tried to open, but AuthGuard cancelled it
     *
     * Then, after successful authentication it allows for redirecting to that remembered page via the `redirect()` method.
     *
     * For example:
     * 1. The user opens the product page, then clicks /login link and signs in
     *    -> Then we should redirect to the product page; or
     * 2. The user opens the product page, then he clicks /my-account link,
     *    but is automatically redirected to the login page by the AuthGuard, and he signs in
     *    -> Then we should redirect to the my-account page, not the product page
     */
    constructor(routing, router, authRedirectStorageService, authFlowRoutesService) {
        this.routing = routing;
        this.router = router;
        this.authRedirectStorageService = authRedirectStorageService;
        this.authFlowRoutesService = authFlowRoutesService;
        this.init();
    }
    init() {
        this.subscription = this.router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
                this.setRedirectUrl(event.urlAfterRedirects);
            }
        });
    }
    ngOnDestroy() {
        this.subscription?.unsubscribe();
    }
    /**
     * Redirect to saved url (homepage if nothing is saved).
     */
    redirect() {
        this.authRedirectStorageService
            .getRedirectUrl()
            .pipe(take(1))
            .subscribe((redirectUrl) => {
            if (redirectUrl === undefined) {
                this.routing.go('/');
            }
            else {
                this.routing.goByUrl(redirectUrl);
            }
            this.clearRedirectUrl();
        });
    }
    /**
     * Saves the url of the current navigation as the redirect url, unless
     * the url is a part of the user login flow.
     */
    saveCurrentNavigationUrl() {
        const navigation = this.router.getCurrentNavigation();
        if (!navigation?.finalUrl) {
            return;
        }
        const url = this.router.serializeUrl(navigation.finalUrl);
        this.setRedirectUrl(url);
    }
    /**
     * Save the url as the redirect url, unless it's a part of the user login flow.
     */
    setRedirectUrl(url) {
        if (!this.authFlowRoutesService.isAuthFlow(url)) {
            this.authRedirectStorageService.setRedirectUrl(url);
        }
    }
    /**
     * Sets the redirect URL to undefined.
     */
    clearRedirectUrl() {
        this.authRedirectStorageService.setRedirectUrl(undefined);
    }
}
AuthRedirectService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AuthRedirectService, deps: [{ token: i1.RoutingService }, { token: i2.Router }, { token: i3.AuthRedirectStorageService }, { token: i4.AuthFlowRoutesService }], target: i0.ɵɵFactoryTarget.Injectable });
AuthRedirectService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AuthRedirectService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AuthRedirectService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.RoutingService }, { type: i2.Router }, { type: i3.AuthRedirectStorageService }, { type: i4.AuthFlowRoutesService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC1yZWRpcmVjdC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY29yZS9zcmMvYXV0aC91c2VyLWF1dGgvc2VydmljZXMvYXV0aC1yZWRpcmVjdC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsVUFBVSxFQUFhLE1BQU0sZUFBZSxDQUFDO0FBQ3RELE9BQU8sRUFBUyxhQUFhLEVBQVUsTUFBTSxpQkFBaUIsQ0FBQztBQUUvRCxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7Ozs7OztBQUt0Qzs7R0FFRztBQUlILE1BQU0sT0FBTyxtQkFBbUI7SUFDOUI7Ozs7Ozs7Ozs7Ozs7T0FhRztJQUNILFlBQ1ksT0FBdUIsRUFDdkIsTUFBYyxFQUNkLDBCQUFzRCxFQUN0RCxxQkFBNEM7UUFINUMsWUFBTyxHQUFQLE9BQU8sQ0FBZ0I7UUFDdkIsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUNkLCtCQUEwQixHQUExQiwwQkFBMEIsQ0FBNEI7UUFDdEQsMEJBQXFCLEdBQXJCLHFCQUFxQixDQUF1QjtRQUV0RCxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDZCxDQUFDO0lBSVMsSUFBSTtRQUNaLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsS0FBWSxFQUFFLEVBQUU7WUFDaEUsSUFBSSxLQUFLLFlBQVksYUFBYSxFQUFFO2dCQUNsQyxJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO2FBQzlDO1FBQ0gsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsV0FBVztRQUNULElBQUksQ0FBQyxZQUFZLEVBQUUsV0FBVyxFQUFFLENBQUM7SUFDbkMsQ0FBQztJQUVEOztPQUVHO0lBQ0gsUUFBUTtRQUNOLElBQUksQ0FBQywwQkFBMEI7YUFDNUIsY0FBYyxFQUFFO2FBQ2hCLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDYixTQUFTLENBQUMsQ0FBQyxXQUFXLEVBQUUsRUFBRTtZQUN6QixJQUFJLFdBQVcsS0FBSyxTQUFTLEVBQUU7Z0JBQzdCLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2FBQ3RCO2lCQUFNO2dCQUNMLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDO2FBQ25DO1lBQ0QsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7UUFDMUIsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsd0JBQXdCO1FBQ3RCLE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsb0JBQW9CLEVBQUUsQ0FBQztRQUN0RCxJQUFJLENBQUMsVUFBVSxFQUFFLFFBQVEsRUFBRTtZQUN6QixPQUFPO1NBQ1I7UUFFRCxNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDMUQsSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUMzQixDQUFDO0lBRUQ7O09BRUc7SUFDSCxjQUFjLENBQUMsR0FBVztRQUN4QixJQUFJLENBQUMsSUFBSSxDQUFDLHFCQUFxQixDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUMvQyxJQUFJLENBQUMsMEJBQTBCLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQ3JEO0lBQ0gsQ0FBQztJQUVEOztPQUVHO0lBQ08sZ0JBQWdCO1FBQ3hCLElBQUksQ0FBQywwQkFBMEIsQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDNUQsQ0FBQzs7Z0hBbkZVLG1CQUFtQjtvSEFBbkIsbUJBQW1CLGNBRmxCLE1BQU07MkZBRVAsbUJBQW1CO2tCQUgvQixVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IEluamVjdGFibGUsIE9uRGVzdHJveSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRXZlbnQsIE5hdmlnYXRpb25FbmQsIFJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IHRha2UgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBSb3V0aW5nU2VydmljZSB9IGZyb20gJy4uLy4uLy4uL3JvdXRpbmcvZmFjYWRlL3JvdXRpbmcuc2VydmljZSc7XG5pbXBvcnQgeyBBdXRoRmxvd1JvdXRlc1NlcnZpY2UgfSBmcm9tICcuL2F1dGgtZmxvdy1yb3V0ZXMuc2VydmljZSc7XG5pbXBvcnQgeyBBdXRoUmVkaXJlY3RTdG9yYWdlU2VydmljZSB9IGZyb20gJy4vYXV0aC1yZWRpcmVjdC1zdG9yYWdlLnNlcnZpY2UnO1xuXG4vKipcbiAqIFJlc3BvbnNpYmxlIGZvciBzYXZpbmcgbGFzdCBhY2Nlc3NlZCBwYWdlIChvciBhdHRlbXB0ZWQpIGJlZm9yZSBsb2dpbiBhbmQgZm9yIHJlZGlyZWN0aW5nIHRvIHRoYXQgcGFnZSBhZnRlciBsb2dpbi5cbiAqL1xuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIEF1dGhSZWRpcmVjdFNlcnZpY2UgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuICAvKipcbiAgICogVGhpcyBzZXJ2aWNlIGlzIHJlc3BvbnNpYmxlIGZvciByZW1lbWJlcmluZyB0aGUgbGFzdCBwYWdlIGJlZm9yZSB0aGUgYXV0aGVudGljYXRpb24uIFwiVGhlIGxhc3QgcGFnZVwiIGNhbiBiZTpcbiAgICogMS4gSnVzdCB0aGUgcHJldmlvdXNseSBvcGVuZWQgcGFnZTsgb3JcbiAgICogMi4gVGhlIHBhZ2UgdGhhdCB3ZSBqdXN0IHRyaWVkIHRvIG9wZW4sIGJ1dCBBdXRoR3VhcmQgY2FuY2VsbGVkIGl0XG4gICAqXG4gICAqIFRoZW4sIGFmdGVyIHN1Y2Nlc3NmdWwgYXV0aGVudGljYXRpb24gaXQgYWxsb3dzIGZvciByZWRpcmVjdGluZyB0byB0aGF0IHJlbWVtYmVyZWQgcGFnZSB2aWEgdGhlIGByZWRpcmVjdCgpYCBtZXRob2QuXG4gICAqXG4gICAqIEZvciBleGFtcGxlOlxuICAgKiAxLiBUaGUgdXNlciBvcGVucyB0aGUgcHJvZHVjdCBwYWdlLCB0aGVuIGNsaWNrcyAvbG9naW4gbGluayBhbmQgc2lnbnMgaW5cbiAgICogICAgLT4gVGhlbiB3ZSBzaG91bGQgcmVkaXJlY3QgdG8gdGhlIHByb2R1Y3QgcGFnZTsgb3JcbiAgICogMi4gVGhlIHVzZXIgb3BlbnMgdGhlIHByb2R1Y3QgcGFnZSwgdGhlbiBoZSBjbGlja3MgL215LWFjY291bnQgbGluayxcbiAgICogICAgYnV0IGlzIGF1dG9tYXRpY2FsbHkgcmVkaXJlY3RlZCB0byB0aGUgbG9naW4gcGFnZSBieSB0aGUgQXV0aEd1YXJkLCBhbmQgaGUgc2lnbnMgaW5cbiAgICogICAgLT4gVGhlbiB3ZSBzaG91bGQgcmVkaXJlY3QgdG8gdGhlIG15LWFjY291bnQgcGFnZSwgbm90IHRoZSBwcm9kdWN0IHBhZ2VcbiAgICovXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByb3RlY3RlZCByb3V0aW5nOiBSb3V0aW5nU2VydmljZSxcbiAgICBwcm90ZWN0ZWQgcm91dGVyOiBSb3V0ZXIsXG4gICAgcHJvdGVjdGVkIGF1dGhSZWRpcmVjdFN0b3JhZ2VTZXJ2aWNlOiBBdXRoUmVkaXJlY3RTdG9yYWdlU2VydmljZSxcbiAgICBwcm90ZWN0ZWQgYXV0aEZsb3dSb3V0ZXNTZXJ2aWNlOiBBdXRoRmxvd1JvdXRlc1NlcnZpY2VcbiAgKSB7XG4gICAgdGhpcy5pbml0KCk7XG4gIH1cblxuICBwcm90ZWN0ZWQgc3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG5cbiAgcHJvdGVjdGVkIGluaXQoKSB7XG4gICAgdGhpcy5zdWJzY3JpcHRpb24gPSB0aGlzLnJvdXRlci5ldmVudHMuc3Vic2NyaWJlKChldmVudDogRXZlbnQpID0+IHtcbiAgICAgIGlmIChldmVudCBpbnN0YW5jZW9mIE5hdmlnYXRpb25FbmQpIHtcbiAgICAgICAgdGhpcy5zZXRSZWRpcmVjdFVybChldmVudC51cmxBZnRlclJlZGlyZWN0cyk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbj8udW5zdWJzY3JpYmUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZWRpcmVjdCB0byBzYXZlZCB1cmwgKGhvbWVwYWdlIGlmIG5vdGhpbmcgaXMgc2F2ZWQpLlxuICAgKi9cbiAgcmVkaXJlY3QoKSB7XG4gICAgdGhpcy5hdXRoUmVkaXJlY3RTdG9yYWdlU2VydmljZVxuICAgICAgLmdldFJlZGlyZWN0VXJsKClcbiAgICAgIC5waXBlKHRha2UoMSkpXG4gICAgICAuc3Vic2NyaWJlKChyZWRpcmVjdFVybCkgPT4ge1xuICAgICAgICBpZiAocmVkaXJlY3RVcmwgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIHRoaXMucm91dGluZy5nbygnLycpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMucm91dGluZy5nb0J5VXJsKHJlZGlyZWN0VXJsKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmNsZWFyUmVkaXJlY3RVcmwoKTtcbiAgICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFNhdmVzIHRoZSB1cmwgb2YgdGhlIGN1cnJlbnQgbmF2aWdhdGlvbiBhcyB0aGUgcmVkaXJlY3QgdXJsLCB1bmxlc3NcbiAgICogdGhlIHVybCBpcyBhIHBhcnQgb2YgdGhlIHVzZXIgbG9naW4gZmxvdy5cbiAgICovXG4gIHNhdmVDdXJyZW50TmF2aWdhdGlvblVybCgpOiB2b2lkIHtcbiAgICBjb25zdCBuYXZpZ2F0aW9uID0gdGhpcy5yb3V0ZXIuZ2V0Q3VycmVudE5hdmlnYXRpb24oKTtcbiAgICBpZiAoIW5hdmlnYXRpb24/LmZpbmFsVXJsKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgdXJsID0gdGhpcy5yb3V0ZXIuc2VyaWFsaXplVXJsKG5hdmlnYXRpb24uZmluYWxVcmwpO1xuICAgIHRoaXMuc2V0UmVkaXJlY3RVcmwodXJsKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTYXZlIHRoZSB1cmwgYXMgdGhlIHJlZGlyZWN0IHVybCwgdW5sZXNzIGl0J3MgYSBwYXJ0IG9mIHRoZSB1c2VyIGxvZ2luIGZsb3cuXG4gICAqL1xuICBzZXRSZWRpcmVjdFVybCh1cmw6IHN0cmluZyk6IHZvaWQge1xuICAgIGlmICghdGhpcy5hdXRoRmxvd1JvdXRlc1NlcnZpY2UuaXNBdXRoRmxvdyh1cmwpKSB7XG4gICAgICB0aGlzLmF1dGhSZWRpcmVjdFN0b3JhZ2VTZXJ2aWNlLnNldFJlZGlyZWN0VXJsKHVybCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgdGhlIHJlZGlyZWN0IFVSTCB0byB1bmRlZmluZWQuXG4gICAqL1xuICBwcm90ZWN0ZWQgY2xlYXJSZWRpcmVjdFVybCgpOiB2b2lkIHtcbiAgICB0aGlzLmF1dGhSZWRpcmVjdFN0b3JhZ2VTZXJ2aWNlLnNldFJlZGlyZWN0VXJsKHVuZGVmaW5lZCk7XG4gIH1cbn1cbiJdfQ==