/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
import * as i2 from "@spartacus/core";
import * as i3 from "../services/checkout-config.service";
import * as i4 from "../services/express-checkout.service";
import * as i5 from "@spartacus/cart/base/root";
import * as i6 from "../services/checkout-step.service";
export class CheckoutGuard {
    constructor(router, routingConfigService, checkoutConfigService, expressCheckoutService, activeCartFacade, checkoutStepService) {
        this.router = router;
        this.routingConfigService = routingConfigService;
        this.checkoutConfigService = checkoutConfigService;
        this.expressCheckoutService = expressCheckoutService;
        this.activeCartFacade = activeCartFacade;
        this.checkoutStepService = checkoutStepService;
        this.firstStep$ = this.checkoutStepService.steps$.pipe(map((steps) => {
            return this.router.parseUrl(this.routingConfigService.getRouteConfig(steps[0].routeName)
                ?.paths?.[0]);
        }));
    }
    canActivate() {
        const expressCheckout$ = this.expressCheckoutService
            .trySetDefaultCheckoutDetails()
            .pipe(switchMap((expressCheckoutPossible) => {
            const reviewOrderRoute = this.checkoutStepService.getCheckoutStepRoute("reviewOrder" /* CheckoutStepType.REVIEW_ORDER */);
            return expressCheckoutPossible && reviewOrderRoute
                ? of(this.router.parseUrl(this.routingConfigService.getRouteConfig(reviewOrderRoute)
                    ?.paths?.[0]))
                : this.firstStep$;
        }));
        return this.activeCartFacade
            .isGuestCart()
            .pipe(switchMap((isGuestCart) => this.checkoutConfigService.isExpressCheckout() && !isGuestCart
            ? expressCheckout$
            : this.firstStep$));
    }
}
CheckoutGuard.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutGuard, deps: [{ token: i1.Router }, { token: i2.RoutingConfigService }, { token: i3.CheckoutConfigService }, { token: i4.ExpressCheckoutService }, { token: i5.ActiveCartFacade }, { token: i6.CheckoutStepService }], target: i0.ɵɵFactoryTarget.Injectable });
CheckoutGuard.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutGuard, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutGuard, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.Router }, { type: i2.RoutingConfigService }, { type: i3.CheckoutConfigService }, { type: i4.ExpressCheckoutService }, { type: i5.ActiveCartFacade }, { type: i6.CheckoutStepService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tvdXQuZ3VhcmQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvY2hlY2tvdXQvYmFzZS9jb21wb25lbnRzL2d1YXJkcy9jaGVja291dC5ndWFyZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUszQyxPQUFPLEVBQWMsRUFBRSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ3RDLE9BQU8sRUFBRSxHQUFHLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7Ozs7Ozs7O0FBUWhELE1BQU0sT0FBTyxhQUFhO0lBV3hCLFlBQ1ksTUFBYyxFQUNkLG9CQUEwQyxFQUMxQyxxQkFBNEMsRUFDNUMsc0JBQThDLEVBQzlDLGdCQUFrQyxFQUNsQyxtQkFBd0M7UUFMeEMsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUNkLHlCQUFvQixHQUFwQixvQkFBb0IsQ0FBc0I7UUFDMUMsMEJBQXFCLEdBQXJCLHFCQUFxQixDQUF1QjtRQUM1QywyQkFBc0IsR0FBdEIsc0JBQXNCLENBQXdCO1FBQzlDLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFDbEMsd0JBQW1CLEdBQW5CLG1CQUFtQixDQUFxQjtRQWhCbkMsZUFBVSxHQUN6QixJQUFJLENBQUMsbUJBQW1CLENBQUMsTUFBTSxDQUFDLElBQUksQ0FDbEMsR0FBRyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUU7WUFDWixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUN6QixJQUFJLENBQUMsb0JBQW9CLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUM7Z0JBQzFELEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFXLENBQ3pCLENBQUM7UUFDSixDQUFDLENBQUMsQ0FDSCxDQUFDO0lBU0QsQ0FBQztJQUVKLFdBQVc7UUFDVCxNQUFNLGdCQUFnQixHQUFHLElBQUksQ0FBQyxzQkFBc0I7YUFDakQsNEJBQTRCLEVBQUU7YUFDOUIsSUFBSSxDQUNILFNBQVMsQ0FBQyxDQUFDLHVCQUF1QixFQUFFLEVBQUU7WUFDcEMsTUFBTSxnQkFBZ0IsR0FDcEIsSUFBSSxDQUFDLG1CQUFtQixDQUFDLG9CQUFvQixtREFFNUMsQ0FBQztZQUNKLE9BQU8sdUJBQXVCLElBQUksZ0JBQWdCO2dCQUNoRCxDQUFDLENBQUMsRUFBRSxDQUNBLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUNsQixJQUFJLENBQUMsb0JBQW9CLENBQUMsY0FBYyxDQUFDLGdCQUFnQixDQUFDO29CQUN4RCxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBVyxDQUN6QixDQUNGO2dCQUNILENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDO1FBQ3RCLENBQUMsQ0FBQyxDQUNILENBQUM7UUFFSixPQUFPLElBQUksQ0FBQyxnQkFBZ0I7YUFDekIsV0FBVyxFQUFFO2FBQ2IsSUFBSSxDQUNILFNBQVMsQ0FBQyxDQUFDLFdBQVcsRUFBRSxFQUFFLENBQ3hCLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxpQkFBaUIsRUFBRSxJQUFJLENBQUMsV0FBVztZQUM1RCxDQUFDLENBQUMsZ0JBQWdCO1lBQ2xCLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUNwQixDQUNGLENBQUM7SUFDTixDQUFDOzswR0FqRFUsYUFBYTs4R0FBYixhQUFhLGNBRlosTUFBTTsyRkFFUCxhQUFhO2tCQUh6QixVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENhbkFjdGl2YXRlLCBSb3V0ZXIsIFVybFRyZWUgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgQWN0aXZlQ2FydEZhY2FkZSB9IGZyb20gJ0BzcGFydGFjdXMvY2FydC9iYXNlL3Jvb3QnO1xuaW1wb3J0IHsgQ2hlY2tvdXRTdGVwVHlwZSB9IGZyb20gJ0BzcGFydGFjdXMvY2hlY2tvdXQvYmFzZS9yb290JztcbmltcG9ydCB7IFJvdXRpbmdDb25maWdTZXJ2aWNlIH0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUsIG9mIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBtYXAsIHN3aXRjaE1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IENoZWNrb3V0Q29uZmlnU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL2NoZWNrb3V0LWNvbmZpZy5zZXJ2aWNlJztcbmltcG9ydCB7IENoZWNrb3V0U3RlcFNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9jaGVja291dC1zdGVwLnNlcnZpY2UnO1xuaW1wb3J0IHsgRXhwcmVzc0NoZWNrb3V0U2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL2V4cHJlc3MtY2hlY2tvdXQuc2VydmljZSc7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBDaGVja291dEd1YXJkIGltcGxlbWVudHMgQ2FuQWN0aXZhdGUge1xuICBwcml2YXRlIHJlYWRvbmx5IGZpcnN0U3RlcCQ6IE9ic2VydmFibGU8VXJsVHJlZT4gPVxuICAgIHRoaXMuY2hlY2tvdXRTdGVwU2VydmljZS5zdGVwcyQucGlwZShcbiAgICAgIG1hcCgoc3RlcHMpID0+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMucm91dGVyLnBhcnNlVXJsKFxuICAgICAgICAgIHRoaXMucm91dGluZ0NvbmZpZ1NlcnZpY2UuZ2V0Um91dGVDb25maWcoc3RlcHNbMF0ucm91dGVOYW1lKVxuICAgICAgICAgICAgPy5wYXRocz8uWzBdIGFzIHN0cmluZ1xuICAgICAgICApO1xuICAgICAgfSlcbiAgICApO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByb3RlY3RlZCByb3V0ZXI6IFJvdXRlcixcbiAgICBwcm90ZWN0ZWQgcm91dGluZ0NvbmZpZ1NlcnZpY2U6IFJvdXRpbmdDb25maWdTZXJ2aWNlLFxuICAgIHByb3RlY3RlZCBjaGVja291dENvbmZpZ1NlcnZpY2U6IENoZWNrb3V0Q29uZmlnU2VydmljZSxcbiAgICBwcm90ZWN0ZWQgZXhwcmVzc0NoZWNrb3V0U2VydmljZTogRXhwcmVzc0NoZWNrb3V0U2VydmljZSxcbiAgICBwcm90ZWN0ZWQgYWN0aXZlQ2FydEZhY2FkZTogQWN0aXZlQ2FydEZhY2FkZSxcbiAgICBwcm90ZWN0ZWQgY2hlY2tvdXRTdGVwU2VydmljZTogQ2hlY2tvdXRTdGVwU2VydmljZVxuICApIHt9XG5cbiAgY2FuQWN0aXZhdGUoKTogT2JzZXJ2YWJsZTxib29sZWFuIHwgVXJsVHJlZT4ge1xuICAgIGNvbnN0IGV4cHJlc3NDaGVja291dCQgPSB0aGlzLmV4cHJlc3NDaGVja291dFNlcnZpY2VcbiAgICAgIC50cnlTZXREZWZhdWx0Q2hlY2tvdXREZXRhaWxzKClcbiAgICAgIC5waXBlKFxuICAgICAgICBzd2l0Y2hNYXAoKGV4cHJlc3NDaGVja291dFBvc3NpYmxlKSA9PiB7XG4gICAgICAgICAgY29uc3QgcmV2aWV3T3JkZXJSb3V0ZSA9XG4gICAgICAgICAgICB0aGlzLmNoZWNrb3V0U3RlcFNlcnZpY2UuZ2V0Q2hlY2tvdXRTdGVwUm91dGUoXG4gICAgICAgICAgICAgIENoZWNrb3V0U3RlcFR5cGUuUkVWSUVXX09SREVSXG4gICAgICAgICAgICApO1xuICAgICAgICAgIHJldHVybiBleHByZXNzQ2hlY2tvdXRQb3NzaWJsZSAmJiByZXZpZXdPcmRlclJvdXRlXG4gICAgICAgICAgICA/IG9mKFxuICAgICAgICAgICAgICAgIHRoaXMucm91dGVyLnBhcnNlVXJsKFxuICAgICAgICAgICAgICAgICAgdGhpcy5yb3V0aW5nQ29uZmlnU2VydmljZS5nZXRSb3V0ZUNvbmZpZyhyZXZpZXdPcmRlclJvdXRlKVxuICAgICAgICAgICAgICAgICAgICA/LnBhdGhzPy5bMF0gYXMgc3RyaW5nXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICA6IHRoaXMuZmlyc3RTdGVwJDtcbiAgICAgICAgfSlcbiAgICAgICk7XG5cbiAgICByZXR1cm4gdGhpcy5hY3RpdmVDYXJ0RmFjYWRlXG4gICAgICAuaXNHdWVzdENhcnQoKVxuICAgICAgLnBpcGUoXG4gICAgICAgIHN3aXRjaE1hcCgoaXNHdWVzdENhcnQpID0+XG4gICAgICAgICAgdGhpcy5jaGVja291dENvbmZpZ1NlcnZpY2UuaXNFeHByZXNzQ2hlY2tvdXQoKSAmJiAhaXNHdWVzdENhcnRcbiAgICAgICAgICAgID8gZXhwcmVzc0NoZWNrb3V0JFxuICAgICAgICAgICAgOiB0aGlzLmZpcnN0U3RlcCRcbiAgICAgICAgKVxuICAgICAgKTtcbiAgfVxufVxuIl19