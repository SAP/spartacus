/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { combineLatest } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/core";
import * as i2 from "../services/checkout-config.service";
import * as i3 from "@spartacus/cart/base/root";
import * as i4 from "@angular/router";
export class CheckoutAuthGuard {
    constructor(authService, authRedirectService, checkoutConfigService, activeCartFacade, semanticPathService, router) {
        this.authService = authService;
        this.authRedirectService = authRedirectService;
        this.checkoutConfigService = checkoutConfigService;
        this.activeCartFacade = activeCartFacade;
        this.semanticPathService = semanticPathService;
        this.router = router;
    }
    canActivate() {
        return combineLatest([
            this.authService.isUserLoggedIn(),
            this.activeCartFacade.isGuestCart(),
            this.activeCartFacade.isStable(),
        ]).pipe(map(([isLoggedIn, isGuestCart, isStable]) => ({
            isLoggedIn,
            isGuestCart,
            isStable,
        })), filter((data) => data.isStable), map((data) => {
            if (!data.isLoggedIn) {
                return data.isGuestCart ? true : this.handleAnonymousUser();
            }
            return data.isLoggedIn;
        }));
    }
    handleAnonymousUser() {
        this.authRedirectService.saveCurrentNavigationUrl();
        if (this.checkoutConfigService.isGuestCheckout()) {
            return this.router.createUrlTree([this.semanticPathService.get('login')], { queryParams: { forced: true } });
        }
        else {
            return this.router.parseUrl(this.semanticPathService.get('login') ?? '');
        }
    }
}
CheckoutAuthGuard.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutAuthGuard, deps: [{ token: i1.AuthService }, { token: i1.AuthRedirectService }, { token: i2.CheckoutConfigService }, { token: i3.ActiveCartFacade }, { token: i1.SemanticPathService }, { token: i4.Router }], target: i0.ɵɵFactoryTarget.Injectable });
CheckoutAuthGuard.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutAuthGuard, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutAuthGuard, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.AuthService }, { type: i1.AuthRedirectService }, { type: i2.CheckoutConfigService }, { type: i3.ActiveCartFacade }, { type: i1.SemanticPathService }, { type: i4.Router }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tvdXQtYXV0aC5ndWFyZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9jaGVja291dC9iYXNlL2NvbXBvbmVudHMvZ3VhcmRzL2NoZWNrb3V0LWF1dGguZ3VhcmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFRM0MsT0FBTyxFQUFFLGFBQWEsRUFBYyxNQUFNLE1BQU0sQ0FBQztBQUNqRCxPQUFPLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDOzs7Ozs7QUFNN0MsTUFBTSxPQUFPLGlCQUFpQjtJQUM1QixZQUNZLFdBQXdCLEVBQ3hCLG1CQUF3QyxFQUN4QyxxQkFBNEMsRUFDNUMsZ0JBQWtDLEVBQ2xDLG1CQUF3QyxFQUN4QyxNQUFjO1FBTGQsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFDeEIsd0JBQW1CLEdBQW5CLG1CQUFtQixDQUFxQjtRQUN4QywwQkFBcUIsR0FBckIscUJBQXFCLENBQXVCO1FBQzVDLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFDbEMsd0JBQW1CLEdBQW5CLG1CQUFtQixDQUFxQjtRQUN4QyxXQUFNLEdBQU4sTUFBTSxDQUFRO0lBQ3ZCLENBQUM7SUFFSixXQUFXO1FBQ1QsT0FBTyxhQUFhLENBQUM7WUFDbkIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxjQUFjLEVBQUU7WUFDakMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFdBQVcsRUFBRTtZQUNuQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxFQUFFO1NBQ2pDLENBQUMsQ0FBQyxJQUFJLENBQ0wsR0FBRyxDQUFDLENBQUMsQ0FBQyxVQUFVLEVBQUUsV0FBVyxFQUFFLFFBQVEsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQzVDLFVBQVU7WUFDVixXQUFXO1lBQ1gsUUFBUTtTQUNULENBQUMsQ0FBQyxFQUNILE1BQU0sQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUMvQixHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtZQUNYLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFO2dCQUNwQixPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLG1CQUFtQixFQUFFLENBQUM7YUFDN0Q7WUFDRCxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUM7UUFDekIsQ0FBQyxDQUFDLENBQ0gsQ0FBQztJQUNKLENBQUM7SUFFUyxtQkFBbUI7UUFDM0IsSUFBSSxDQUFDLG1CQUFtQixDQUFDLHdCQUF3QixFQUFFLENBQUM7UUFDcEQsSUFBSSxJQUFJLENBQUMscUJBQXFCLENBQUMsZUFBZSxFQUFFLEVBQUU7WUFDaEQsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FDOUIsQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEVBQ3ZDLEVBQUUsV0FBVyxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxFQUFFLENBQ2xDLENBQUM7U0FDSDthQUFNO1lBQ0wsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO1NBQzFFO0lBQ0gsQ0FBQzs7OEdBekNVLGlCQUFpQjtrSEFBakIsaUJBQWlCLGNBRmhCLE1BQU07MkZBRVAsaUJBQWlCO2tCQUg3QixVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENhbkFjdGl2YXRlLCBSb3V0ZXIsIFVybFRyZWUgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgQWN0aXZlQ2FydEZhY2FkZSB9IGZyb20gJ0BzcGFydGFjdXMvY2FydC9iYXNlL3Jvb3QnO1xuaW1wb3J0IHtcbiAgQXV0aFJlZGlyZWN0U2VydmljZSxcbiAgQXV0aFNlcnZpY2UsXG4gIFNlbWFudGljUGF0aFNlcnZpY2UsXG59IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBjb21iaW5lTGF0ZXN0LCBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBmaWx0ZXIsIG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IENoZWNrb3V0Q29uZmlnU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL2NoZWNrb3V0LWNvbmZpZy5zZXJ2aWNlJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIENoZWNrb3V0QXV0aEd1YXJkIGltcGxlbWVudHMgQ2FuQWN0aXZhdGUge1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcm90ZWN0ZWQgYXV0aFNlcnZpY2U6IEF1dGhTZXJ2aWNlLFxuICAgIHByb3RlY3RlZCBhdXRoUmVkaXJlY3RTZXJ2aWNlOiBBdXRoUmVkaXJlY3RTZXJ2aWNlLFxuICAgIHByb3RlY3RlZCBjaGVja291dENvbmZpZ1NlcnZpY2U6IENoZWNrb3V0Q29uZmlnU2VydmljZSxcbiAgICBwcm90ZWN0ZWQgYWN0aXZlQ2FydEZhY2FkZTogQWN0aXZlQ2FydEZhY2FkZSxcbiAgICBwcm90ZWN0ZWQgc2VtYW50aWNQYXRoU2VydmljZTogU2VtYW50aWNQYXRoU2VydmljZSxcbiAgICBwcm90ZWN0ZWQgcm91dGVyOiBSb3V0ZXJcbiAgKSB7fVxuXG4gIGNhbkFjdGl2YXRlKCk6IE9ic2VydmFibGU8Ym9vbGVhbiB8IFVybFRyZWU+IHtcbiAgICByZXR1cm4gY29tYmluZUxhdGVzdChbXG4gICAgICB0aGlzLmF1dGhTZXJ2aWNlLmlzVXNlckxvZ2dlZEluKCksXG4gICAgICB0aGlzLmFjdGl2ZUNhcnRGYWNhZGUuaXNHdWVzdENhcnQoKSxcbiAgICAgIHRoaXMuYWN0aXZlQ2FydEZhY2FkZS5pc1N0YWJsZSgpLFxuICAgIF0pLnBpcGUoXG4gICAgICBtYXAoKFtpc0xvZ2dlZEluLCBpc0d1ZXN0Q2FydCwgaXNTdGFibGVdKSA9PiAoe1xuICAgICAgICBpc0xvZ2dlZEluLFxuICAgICAgICBpc0d1ZXN0Q2FydCxcbiAgICAgICAgaXNTdGFibGUsXG4gICAgICB9KSksXG4gICAgICBmaWx0ZXIoKGRhdGEpID0+IGRhdGEuaXNTdGFibGUpLFxuICAgICAgbWFwKChkYXRhKSA9PiB7XG4gICAgICAgIGlmICghZGF0YS5pc0xvZ2dlZEluKSB7XG4gICAgICAgICAgcmV0dXJuIGRhdGEuaXNHdWVzdENhcnQgPyB0cnVlIDogdGhpcy5oYW5kbGVBbm9ueW1vdXNVc2VyKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGRhdGEuaXNMb2dnZWRJbjtcbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBoYW5kbGVBbm9ueW1vdXNVc2VyKCk6IGJvb2xlYW4gfCBVcmxUcmVlIHtcbiAgICB0aGlzLmF1dGhSZWRpcmVjdFNlcnZpY2Uuc2F2ZUN1cnJlbnROYXZpZ2F0aW9uVXJsKCk7XG4gICAgaWYgKHRoaXMuY2hlY2tvdXRDb25maWdTZXJ2aWNlLmlzR3Vlc3RDaGVja291dCgpKSB7XG4gICAgICByZXR1cm4gdGhpcy5yb3V0ZXIuY3JlYXRlVXJsVHJlZShcbiAgICAgICAgW3RoaXMuc2VtYW50aWNQYXRoU2VydmljZS5nZXQoJ2xvZ2luJyldLFxuICAgICAgICB7IHF1ZXJ5UGFyYW1zOiB7IGZvcmNlZDogdHJ1ZSB9IH1cbiAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aGlzLnJvdXRlci5wYXJzZVVybCh0aGlzLnNlbWFudGljUGF0aFNlcnZpY2UuZ2V0KCdsb2dpbicpID8/ICcnKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==